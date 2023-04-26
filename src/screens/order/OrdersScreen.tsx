import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ListRenderItemInfo,
  Text,
  RefreshControl,
  Animated,
} from 'react-native';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import {AppLocalizedStrings} from '../../localization/Localization';
import TransactionFilterPopup from '../../components/popup/TransactionFilterPopup';
import {
  InvoiceOverview,
  MonthlyInvoiceStatusEntity,
} from '../../models/interfaces/InvoiceSummaryResponse';
import {Convert} from '../../utility/converter/Convert';
import {
  fetchOrderSummary,
  fetchOrders,
  fetchOrdersFromService,
} from '../../store/thunks/ApiThunks';
import {RootState, store} from '../../store/Store';
import {FetchInvoiceSummaryParams} from '../../domain/usages/FetchInvoiceSummary';
import GaScrollView from '../../components/GaScrollView';
import GaCaughtUp from '../../components/GaCaughtUp';
import {debounce} from '../../utility/debounce';
import {OrderSkeletonCard} from '../../components/SkeletonCards';
import Spacer from '../../components/layout/Spacer';
import {BottomTabScreenProps} from '../../navigation/navigator/BottomTabNavigator';
import SearchBar from '../../components/app/SearchBar';
import OrdersFilterTabs, {
  OrderStatusFilterType,
} from '../../components/app/orders/OrdersFilterTabs';
import OrderListItem from '../../components/app/orders/OrderListItem';
import {OrderEntity} from '../../models/interfaces/OrdersListResponse';
import {useSelector} from 'react-redux';
import {AuthResult} from '../../models/interfaces/AuthResponse';
import {OrderStatus} from '../../models/enum/OrderStatusEnum';

import OrdersFilterView from '../../components/app/orders/OrdersFilterView';
import {FetchOrdersListParams} from '../../domain/usages/FetchOrdersList';

import {
  OrderServiceItemEntity,
  OrderServiceSubItemEntity,
  OrderStatusEntity,
} from '../../models/interfaces/OrderServiceResponse';
import OrderServiceListItem from '../../components/app/orders/OrderServiceListItem';
import OrdersStatusCardList from '../../components/app/orders/OrdersStatusCardList';
import {AppCode} from '../../models/enum/AppCode';
import OrderSummary from '../../components/app/orders/OrderSummary';
import SVGIcon from '../../utility/svg/SVGIcon';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export type getInvoiceListArgs = {
  fromFilter?: boolean;
  fromResetFilter?: boolean;
  length?: number;
  query?: string;
  status: OrderStatus;
};

const OrdersScreen: React.FC<BottomTabScreenProps<'OrdersScreen'>> = props => {
  const selected = useSelector<RootState, AuthResult>(
    state => state.auth.authResult,
  );
  const [invoices, setInvoices] = useState<InvoiceOverview>();
  const [selectedOverallSummary, setSelectedOverallSummary] = useState(true);
  const [monthlyInvoices, setMonthlyInvoices] =
    useState<MonthlyInvoiceStatusEntity[]>();
  const [startDate, setStartDate] = useState<null | Date>();
  const [endDate, setEndDate] = useState<null | Date>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(
    OrderStatus.ON_HOLD,
  );
  const [orderServiceStatusInfo, setOrderServiceStatusInfo] = useState<
    OrderStatusEntity[]
  >([] as OrderStatusEntity[]);

  const [orderServiceList, setOrderServiceList] = useState<
    OrderServiceItemEntity[]
  >([] as OrderServiceItemEntity[]);
  const [lastPage, setLastPage] = useState<number | null>();
  const [orderSummaryLoading, setOrderSummaryLoading] = useState(true);
  const [ordersListLoading, setOrdersListLoading] = useState(true);
  const [resetFilterLoading, setResetFilterLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [ordersSummary, setOrderSummary] = useState<OrderStatusEntity[]>([]);
  const [dates, setDates] = React.useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [status, selectedStatus] = useState(OrderStatus.ACCEPTED);
  const [selectedDates, setSelectedDates] =
    React.useState<FetchInvoiceSummaryParams.params | null>();
  const [num, setNum] = useState<number>(0);
  const [ordersList, setOrdersList] = useState<OrderEntity[]>(
    [] as OrderEntity[],
  );
  const [ordersListParams, setOrdersListParams] =
    useState<FetchOrdersListParams.params>({} as FetchOrdersListParams.params);

  const onFilterHandler = useCallback(() => {
    setShowFilter(val => !val);
  }, []);

  const debounceSearch = () => {
    setOrdersList([]);
    setCurrentPage(1);
    getOrdersList({status: selectedOrderStatus}, 1, false);
  };

  function filterAnItem(refNumber: string) {
    const filteredData = ordersList.filter(
      val => val.reference_number !== refNumber,
    );
    setOrdersList(filteredData);
  }

  const filterCount = (): number => {
    return startDate || endDate ? 1 : 0;
  };

  const handleOnTabChange = async (tabValue: OrderStatusFilterType) => {
    setOrdersListLoading(true);
    setSelectedOrderStatus(tabValue.value);
    setCurrentPage(1);
    setLastPage(null);
    setOrdersList([]);
    setOrderServiceList([]);
    getOrdersList({status: tabValue.value}, 1, false);
  };

  const listHeaderComponent = useCallback(() => {
    return (
      <View style={{zIndex: 40}}>
        {orderSummaryLoading ? (
          <Animated.View style={{display: 'flex', flexDirection: 'row'}}>
            {[1, 2, 3, 4].map(val => {
              return (
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item
                    borderRadius={10}
                    width={wp('30%')}
                    height={hp('20%')}
                    marginLeft={val === 1 ? wp(1) : wp(2)}
                  />
                </SkeletonPlaceholder>
              );
            })}
          </Animated.View>
        ) : (
          <OrdersStatusCardList
            loading={!orderSummaryLoading}
            ordersMonthlyStatus={ordersSummary}
          />
        )}
        <OrdersFilterView
          filterCount={filterCount()}
          onFilterHandler={onFilterHandler}
        />
        <View style={styles.topView}>
          <SearchBar
            keyboardType="decimal-pad"
            onChange={setQuery}
            value={query}
            hideButton={true}
            shadow={false}
            placeholder={AppLocalizedStrings.search.enterProductName}
          />

          <Spacer height={hp('2')} />
          <OrdersFilterTabs
            selectedOrderStatus={selectedOrderStatus}
            onTabChange={handleOnTabChange}
          />
        </View>
      </View>
    );
  }, [
    selectedOrderStatus,
    selectedDates,
    num,
    selectedOverallSummary,
    orderSummaryLoading,
    dates,
    invoices?.overall_invoice_status,
    monthlyInvoices,
    onFilterHandler,
    query,
    startDate,
    endDate,
    ordersSummary,
  ]);

  const onApplyHandler = async () => {
    await getOrdersList({fromFilter: true, status: selectedOrderStatus});
    setCurrentPage(1);
    setShowFilter(false);
  };

  const getOrdersList = useCallback(
    async (params: getInvoiceListArgs, page?: number, scrolled?: boolean) => {
      const {fromResetFilter} = params;

      fromResetFilter
        ? setResetFilterLoading(true)
        : setOrdersListLoading(true);
      var orderParams = {length: 10} as FetchOrdersListParams.params;

      if (startDate) {
        const convertedStartDate = Convert.dateFormatter(
          null,
          'YYYY-MM-DD',
          startDate,
        );
        orderParams.from_date = convertedStartDate;
      }

      if (endDate) {
        const convertedEndDate = Convert.dateFormatter(
          null,
          'YYYY-MM-DD',
          endDate,
        );
        orderParams.to_date = convertedEndDate;
      }
      console.log('CONFEIDENTIAL', params.status);

      if (params.status) {
        orderParams.status = params.status;
      } else {
        orderParams.status = selectedOrderStatus;
      }

      if (fromResetFilter) {
        delete orderParams.from_date;
        delete orderParams.to_date;
      }

      if (scrolled) {
        if (page === 1) {
          page = 2;
          setCurrentPage(prev => prev + 1);
        }
      }
      if (query) {
        orderParams.q = query;
      }
      console.log('CPARTNER_ID', selected?.data?.channel_partner?.id);

      if (
        orderParams.status === OrderStatus.ON_HOLD ||
        orderParams.status === OrderStatus.DENIED
      ) {
        const result = await store
          .dispatch(
            fetchOrders({
              page: page ?? 1,
              params: {
                ...orderParams,
                status:
                  orderParams.status === OrderStatus.DENIED
                    ? OrderStatus.REJECTED
                    : orderParams.status,
              },
              forNew: true,
            }),
          )
          .unwrap();
        if (result.success) {
          setLastPage(result.orders[0].last_page);
          await debounce(2000);
          if (scrolled) {
            setOrdersList(oldData => [...oldData, ...result?.orders[0]?.data]);
          } else {
            setOrdersList(result?.orders[0]?.data);
          }
        }
      } else {
        delete orderParams.customer_uuid;
        const result = await store
          .dispatch(
            fetchOrdersFromService({
              page: page ?? 1,
              params: {
                ...orderParams,
              },
              forNew: true,
            }),
          )
          .unwrap();
        if (result.success) {
          setLastPage(
            result.orders[0].next_page_url === null
              ? currentPage
              : currentPage + 2,
          );
          await debounce(2000);
          if (scrolled) {
            setOrderServiceList(oldData => [
              ...oldData,
              ...result?.orders[0]?.data.orders,
            ]);
          } else {
            setOrderServiceList(result?.orders[0]?.data.orders);
            setOrderServiceStatusInfo(result?.orders[0]?.data.order_statues);
          }
        }
      }

      fromResetFilter
        ? setResetFilterLoading(false)
        : setOrdersListLoading(false);
    },

    [selectedOrderStatus, currentPage, query, startDate, endDate],
  );

  const onClearHandler = async () => {
    setOrdersListParams({} as FetchOrdersListParams.params);
    setResetFilterLoading(true);
    setCurrentPage(1);
    setStartDate(null);
    setEndDate(null);
    await getOrdersList(
      {fromResetFilter: true, status: selectedOrderStatus},
      1,
    );
    setResetFilterLoading(false);
    setShowFilter(false);
  };

  const onDismissHandler = () => {
    setShowFilter(false);
  };

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<OrderEntity>) => {
      return <OrderListItem item={item} />;
    },

    [ordersList, ordersListLoading, ordersListParams, resetFilterLoading],
  );

  const renderOrderServiceItem = useCallback(
    ({item}: ListRenderItemInfo<OrderServiceItemEntity>) => {
      return (
        <OrderServiceListItem
          item={item}
          orderServiceStatusInfo={orderServiceStatusInfo}
        />
      );
    },

    [ordersList, ordersListLoading, ordersListParams, resetFilterLoading],
  );

  const keyExtractor = useCallback(
    (item: OrderEntity, index: number) => index.toString(),
    [],
  );

  const refId = props?.route?.params?.referenceId;

  console.log('LOG_RAJ', currentPage);

  const getOrdersSummary = async () => {
    setOrderSummaryLoading(true);
    try {
      const data = await store
        .dispatch(
          fetchOrderSummary({
            app_code: AppCode.CPAISA,
            length: '10',
            customer_uuid: selected?.data?.channel_partner.universal_id,
            order_by: 'DESC',
          }),
        )
        .unwrap();
      console.log('DSDWDEFEWFE', data);

      setOrderSummary(data.orders[0].data.order_statues);
    } catch (err) {
      console.log('ORR_err', err);
    }
    setOrderSummaryLoading(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setOrdersList([]);
    setOrderServiceList([]);
    setOrderSummary([]);
    onClearHandler();
    getOrdersSummary();
    setSelectedOrderStatus(OrderStatus.ON_HOLD);
    getOrdersList({status: OrderStatus.ON_HOLD});
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // debounce the search function
    const debounceArch = setTimeout(() => {
      debounceSearch();
    }, 1500);

    // clear the timeout on unmount
    return () => {
      clearTimeout(debounceArch);
    };
  }, [query]);

  //This is to refresh the api on order accepted or rejected
  useEffect(() => {
    if (refId) {
      onRefresh();
    }
  }, [refId]);

  useEffect(() => {
    getOrdersSummary();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.keyboard}>
        <View style={styles.listContainer}>
          <GaScrollView
            onRefresh={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            hasMore={
              !ordersListLoading && currentPage < (lastPage ? lastPage + 1 : 1)
            }
            onEndReached={() => {
              setCurrentPage(prev => prev + 1);
              {
                lastPage &&
                  currentPage !== lastPage &&
                  getOrdersList(
                    {status: selectedOrderStatus},
                    currentPage,
                    true,
                  ).then(() => {});
              }
            }}
            data={
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainerStyle}
                  data={[]}
                  extraData={ordersList}
                  ListHeaderComponent={
                    <>
                      <View>
                        <View style={styles.invoiceContainer}>
                          <Text>{AppLocalizedStrings.orders.overview}</Text>
                        </View>
                      </View>

                      {listHeaderComponent()}
                    </>
                  }
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                />

                <View>
                  {selectedOrderStatus === OrderStatus.ON_HOLD ? (
                    <FlatList
                      ItemSeparatorComponent={() => (
                        <View style={{height: hp('2%')}} />
                      )}
                      renderItem={renderItem}
                      data={ordersList}
                    />
                  ) : (
                    <FlatList
                      ItemSeparatorComponent={() => (
                        <View style={{height: hp('2%')}} />
                      )}
                      renderItem={renderOrderServiceItem}
                      data={orderServiceList}
                    />
                  )}

                  {ordersListLoading ? (
                    <View style={{marginVertical: 10, marginBottom: hp(7)}}>
                      <Spacer height={hp('1%')} />
                      <OrderSkeletonCard />
                      <Spacer height={hp('2%')} />
                    </View>
                  ) : selectedOrderStatus === OrderStatus.ON_HOLD ? (
                    ordersList.length === 0 &&
                    !refreshing && (
                      <View
                        style={{alignContent: 'center', alignItems: 'center'}}>
                        <SVGIcon name="no_orders_svg" size={wp('60%')} />
                        <Spacer height={hp(3)} />

                        <Text style={{fontWeight: '500', color: Colors.grey}}>
                          No Orders Found
                        </Text>
                        <Spacer height={hp(10)} />
                      </View>
                    )
                  ) : (
                    orderServiceList.length === 0 &&
                    !refreshing && (
                      <View
                        style={{alignContent: 'center', alignItems: 'center'}}>
                        <SVGIcon name="no_orders_svg" size={wp('60%')} />
                        <Spacer height={hp(3)} />

                        <Text style={{fontWeight: '500', color: Colors.grey}}>
                          No Orders Found
                        </Text>
                        <Spacer height={hp(10)} />
                      </View>
                    )
                  )}

                  {orderServiceList.length > 0 &&
                    lastPage &&
                    currentPage === lastPage + 1 && (
                      <GaCaughtUp message="You're all caught up!" />
                    )}
                </View>
              </View>
            }
          />
        </View>
      </View>

      {showFilter && (
        <TransactionFilterPopup
          showInvoiceStatus={false}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          endDate={endDate}
          startDate={startDate}
          applyLoading={ordersListLoading}
          resetFilterLoading={resetFilterLoading}
          showRange={false}
          params={ordersListParams}
          setParams={setOrdersListParams}
          pointsRangeTitle={AppLocalizedStrings.filter.approvedPointsRange}
          showTransaxtion={false}
          showReedem={false}
          onApply={onApplyHandler}
          onClear={onClearHandler}
          onDismiss={onClearHandler}
        />
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    marginHorizontal: wp('0.5%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  keyboard: {
    flex: 1,
    marginHorizontal: hp('2%'),
  },
  invoiceTextStyle: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
  },
  listContainer: {flex: 1},
  contentContainerStyle: {paddingBottom: hp(2)},
  invoiceContainer: {
    marginTop: hp('3%'),
    marginBottom: hp('1.8%'),
  },
  skelItem: {
    padding: 16,
    fontSize: 18,
  },
  skelLoadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  skelLoadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  noInvoicesImage: {
    width: hp('25%'),
    resizeMode: 'contain',
    height: hp('24%'),
    marginLeft: wp('20%'),
    // position: 'absolute',

    // zIndex: 100,
    // bottom: -140,
    // left: 90,
  },
});
