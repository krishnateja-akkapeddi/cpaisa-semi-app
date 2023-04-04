import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ListRenderItemInfo,
  Text,
  Image,
  RefreshControl,
} from 'react-native';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import InvoiceListItem from '../../components/app/invoice/InvoiceListItem';
import InvoiceCombineCmpt from '../../components/app/invoice/InvoiceCombineCmpt';
import {AppLocalizedStrings} from '../../localization/Localization';
import TransactionFilterPopup from '../../components/popup/TransactionFilterPopup';
import {
  InvoiceOverview,
  MonthlyInvoiceStatusEntity,
} from '../../models/interfaces/InvoiceSummaryResponse';
import {Generator} from '../../utility/Generator';
import {Convert} from '../../utility/converter/Convert';
import {
  fetchInvoiceList,
  fetchInvoiceSummary,
} from '../../store/thunks/ApiThunks';
import {store} from '../../store/Store';
import {FetchInvoiceSummaryParams} from '../../domain/usages/FetchInvoiceSummary';
import InvoiceDateList from '../../components/app/invoice/InvoiceDateList';
import {FetchInvoiceListParams} from '../../domain/usages/FetchInvoiceList';
import {InvoiceListEntity} from '../../models/interfaces/InvoiceListResponse';
import GaScrollView from '../../components/GaScrollView';
import GaCaughtUp from '../../components/GaCaughtUp';
import {debounce} from '../../utility/debounce';
import {InvoiceSkeletonItem} from '../../components/SkeletonCards';
import Spacer from '../../components/layout/Spacer';
import {BottomTabScreenProps} from '../../navigation/navigator/BottomTabNavigator';
import SearchBar from '../../components/app/SearchBar';

export type getInvoiceListArgs = {
  fromFilter?: boolean;
  fromResetFilter?: boolean;
  page?: number;
  length?: number;
  query?: string;
};

const InvoiceScreen: React.FC<
  BottomTabScreenProps<'InvoiceScreen'>
> = props => {
  const fromInvoiceUpload = props?.route?.params?.fromInvoiceUpload;
  const [invoices, setInvoices] = useState<InvoiceOverview>();
  const [refreshInvoices, setRefreshInvoices] = useState<boolean>();
  const [selectedOverallSummary, setSelectedOverallSummary] = useState(true);
  const [monthlyInvoices, setMonthlyInvoices] =
    useState<MonthlyInvoiceStatusEntity[]>();
  const [startDate, setStartDate] = useState<null | Date>();
  const [endDate, setEndDate] = useState<null | Date>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quarter, setQuarter] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [lastPage, setLastPage] = useState<number>(10);
  const [invoiceSummaryLoading, setInvoiceSummaryLoading] = useState(false);
  const [invoiceListLoading, setInvoiceListLoading] = useState(false);
  const [resetFilterLoading, setResetFilterLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [dates, setDates] = React.useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [selectedDates, setSelectedDates] =
    React.useState<FetchInvoiceSummaryParams.params | null>();
  const [num, setNum] = useState<number>(0);
  const [invoiceList, setInvoiceList] = useState<InvoiceListEntity[]>(
    [] as InvoiceListEntity[],
  );
  const [invoiceListParams, setInvoiceListParams] =
    useState<FetchInvoiceListParams.params>(
      {} as FetchInvoiceListParams.params,
    );

  const onFilterHandler = useCallback(() => {
    setShowFilter(val => !val);
  }, []);

  const setSelectedDatesHandler = (params: FetchInvoiceSummaryParams.params) =>
    setSelectedDates(params);

  const debounceSearch = () => {
    setInvoiceList([]);
    setCurrentPage(1);
    getInvoiceList({}, 1, false);
  };
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

  useEffect(() => {
    if (fromInvoiceUpload !== undefined) {
      onRefresh();
    }
  }, [fromInvoiceUpload]);

  const listHeaderComponent = useCallback(() => {
    return (
      <>
        <InvoiceCombineCmpt
          filterChecked={true}
          setSelectedDatesHandler={setSelectedDatesHandler}
          selectedDates={selectedDates}
          num={num}
          selectedOverallSummary={selectedOverallSummary}
          setNum={setNum}
          loading={invoiceSummaryLoading}
          dates={dates}
          setSelectedOverallSummary={setSelectedOverallSummary}
          invoiceSummary={invoices?.overall_invoice_status}
          monthlyInvoices={monthlyInvoices}
          onFilterHandler={onFilterHandler}
        />
        <View style={styles.topView}>
          <SearchBar
            keyboardType="decimal-pad"
            onChange={setQuery}
            value={query}
            hideButton={true}
            shadow={false}
            placeholder={AppLocalizedStrings.search.enterDepartmentName}
          />
        </View>
      </>
    );
  }, [
    selectedDates,
    num,
    selectedOverallSummary,
    invoiceSummaryLoading,
    dates,
    invoices?.overall_invoice_status,
    monthlyInvoices,
    onFilterHandler,
    query,
    startDate,
    endDate,
  ]);

  const onApplyHandler = async () => {
    await getInvoiceList({fromFilter: true});
    setCurrentPage(1);
    setShowFilter(false);
  };

  const getInvoiceList = useCallback(
    async (params: getInvoiceListArgs, page?: number, scrolled?: boolean) => {
      const {fromResetFilter} = params;

      fromResetFilter
        ? setResetFilterLoading(true)
        : setInvoiceListLoading(true);
      var invParams = {length: 10} as FetchInvoiceListParams.params;

      // if (quarter && year) {
      //   const {end, start} = Generator.getQuarterDates(quarter, year);
      //   const convertedStartDate = Convert.dateFormatter(
      //     null,
      //     'YYYY-MM-DD',
      //     start,
      //   );

      //   const convertedEndDate = Convert.dateFormatter(null, 'YYYY-MM-DD', end);
      //   invParams.from_date = convertedStartDate;
      //   invParams.to_date = convertedEndDate;
      // }

      if (startDate) {
        const convertedStartDate = Convert.dateFormatter(
          null,
          'YYYY-MM-DD',
          startDate,
        );

        invParams.from_date = convertedStartDate;
      }

      if (endDate) {
        const convertedEndDate = Convert.dateFormatter(
          null,
          'YYYY-MM-DD',
          endDate,
        );
        invParams.to_date = convertedEndDate;
      }

      if (invoiceListParams.status) {
        invParams.status = invoiceListParams.status;
      }

      if (fromResetFilter) {
        delete invParams.status;
        delete invParams.from_date;
        delete invParams.to_date;
      }

      if (scrolled) {
        if (page === 1) {
          page = 2;
          setCurrentPage(prev => prev + 1);
        }
      }
      if (query) {
        invParams.q = query;
      }
      const result = await store
        .dispatch(fetchInvoiceList({page: page ? page : 1, params: invParams}))
        .unwrap();
      if (result.success) {
        setLastPage(result.last_page);
        await debounce(2000);
        if (scrolled) {
          setInvoiceList(oldData => [...oldData, ...result.invoices]);
        } else {
          setInvoiceList(result.invoices);
        }
      }
      fromResetFilter
        ? setResetFilterLoading(false)
        : setInvoiceListLoading(false);
    },

    [invoiceListParams, currentPage, query, startDate, endDate],
  );

  const onClearHandler = async () => {
    setQuarter(null);
    setYear(null);
    setInvoiceListParams({} as FetchInvoiceListParams.params);
    setResetFilterLoading(true);
    setCurrentPage(1);
    setStartDate(null);
    setEndDate(null);
    await getInvoiceList({fromResetFilter: true}, 1);
    setResetFilterLoading(false);
    setShowFilter(false);
  };

  const onDismissHandler = () => {
    setShowFilter(false);
  };

  const fetchInvoices = useCallback(
    async (params: FetchInvoiceSummaryParams.params) => {
      setInvoiceSummaryLoading(true);
      const data = await store.dispatch(fetchInvoiceSummary(params)).unwrap();
      setInvoices(data.invoice_overview);
      data.invoice_overview.monthly_invoice_status &&
        setMonthlyInvoices(data.invoice_overview.monthly_invoice_status);
      setInvoiceSummaryLoading(false);
    },
    [invoiceSummaryLoading],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<InvoiceListEntity>) => {
      return <InvoiceListItem item={item} />;
    },

    [invoiceList, invoiceListLoading, invoiceListParams, resetFilterLoading],
  );

  const keyExtractor = useCallback(
    (item: InvoiceListEntity, index: number) => index.toString(),
    [],
  );

  useEffect(() => {
    getInvoiceList({}, 1, false);
  }, [refreshInvoices]);

  console.log('FROM_INVL_UPL', fromInvoiceUpload);

  useEffect(() => {
    const yearMonthsList = Generator.generateYearMonth(11);
    yearMonthsList.unshift('All');
    setDates(yearMonthsList);
  }, []);

  useEffect(() => {
    if (dates)
      Convert.dateFormatter('MMM YY', 'YYYY-MM', dates[1]) !== 'Invalid+date' &&
        fetchInvoices(
          selectedDates
            ? selectedDates
            : {
                start_date: Convert.dateFormatter(
                  'MMM YY',
                  'YYYY-MM',
                  dates[1],
                ),
                end_date: Convert.dateFormatter('MMM YY', 'YYYY-MM', dates[1]),
              },
        );
  }, [dates, selectedDates]);

  useEffect(() => {}, [
    selectedDates,
    monthlyInvoices,
    invoiceListParams,
    invoiceList,
    year,
    quarter,
    invoiceListLoading,
    invoiceSummaryLoading,
  ]);
  console.log('LOG_RAJ', currentPage);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    onClearHandler();
    setInvoiceList([]);
    setInvoiceListLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefreshInvoices(prev => !prev);
    }, 2000);
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
              !invoiceListLoading && currentPage < (lastPage ? lastPage + 1 : 1)
            }
            onEndReached={() => {
              setCurrentPage(prev => prev + 1);
              getInvoiceList({}, currentPage, true).then(() => {});
            }}
            data={
              <View>
                <FlatList
                  contentContainerStyle={styles.contentContainerStyle}
                  data={[]}
                  extraData={invoiceList}
                  ListHeaderComponent={
                    <>
                      <View>
                        <View style={styles.invoiceContainer}>
                          <Text>
                            {AppLocalizedStrings.invoice.invoiceOverview}
                          </Text>
                        </View>
                        <InvoiceDateList
                          setSelectedOverallSummary={setSelectedOverallSummary}
                          num={num}
                          setNum={setNum}
                          selectedDates={selectedDates}
                          setSelectedDatesHandler={setSelectedDatesHandler}
                          dates={dates}
                        />
                      </View>

                      {listHeaderComponent()}
                    </>
                  }
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                />
                <View>
                  <FlatList
                    ItemSeparatorComponent={() => (
                      <View style={{height: hp('2%')}} />
                    )}
                    renderItem={renderItem}
                    data={invoiceList}
                  />
                  {invoiceList.length === 0 && !invoiceListLoading && (
                    <>
                      <Image
                        style={styles.noInvoicesImage}
                        source={require('../../assets/images/no_invoices_art.png')}
                      />
                      <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                        No Invoices Found
                      </Text>
                    </>
                  )}
                  {invoiceListLoading && (
                    <View style={{marginVertical: 10, marginBottom: hp(7)}}>
                      <InvoiceSkeletonItem />
                      <Spacer height={hp('2%')} />
                      <InvoiceSkeletonItem />
                    </View>
                  )}

                  {currentPage === lastPage + 1 && (
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
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          endDate={endDate}
          startDate={startDate}
          setQuarter={setQuarter}
          applyLoading={invoiceListLoading}
          resetFilterLoading={resetFilterLoading}
          quarter={quarter}
          setYear={setYear}
          showRange={false}
          year={year}
          params={invoiceListParams}
          setParams={setInvoiceListParams}
          pointsRangeTitle={AppLocalizedStrings.filter.approvedPointsRange}
          showTransaxtion={false}
          showReedem={false}
          onApply={onApplyHandler}
          onClear={onClearHandler}
          onDismiss={onDismissHandler}
        />
      )}
    </SafeAreaView>
  );
};

export default InvoiceScreen;

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
