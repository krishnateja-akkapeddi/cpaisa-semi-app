import React, {useCallback, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import OrganisationList from '../../components/app/offers/OrganisationList';
import {AppLocalizedStrings} from '../../localization/Localization';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import WalletPointsView from '../../components/app/wallet/WalletPointsView';
import RedeemPoint from '../../components/app/wallet/RedeemPoint';
import RedeemPointDetail from '../../components/app/wallet/RedeemPointDetail';
import Spacer from '../../components/layout/Spacer';
import SegmentBar from '../../components/app/SegmentBar';
import Transactions from '../../mock/Transactions.json';
import Transaction from '../../models/interfaces/Transaction';
import CouponCard from '../../components/app/wallet/CouponCard';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import TransactionFilterPopup from '../../components/popup/TransactionFilterPopup';
import {
  WalletSummaryEntity,
  WalletSummary,
} from '../../models/interfaces/WalletSummary';
import {PickerItem} from 'react-native-woodpicker';
import {store} from '../../store/Store';
import {
  fetchClients,
  fetchCouponPartners,
  fetchRewardRequestList,
  fetchWalletSummary,
} from '../../store/thunks/ApiThunks';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';
import Snackbar from 'react-native-snackbar';
import {RewardTransactionEntity} from '../../models/interfaces/RewardRequestResponse';
import {FetchRewardRequestListParams} from '../../domain/usages/FetchRewardRequestList';
import {ClientListParams} from '../../domain/usages/FetchClientsList';
import {Convert} from '../../utility/converter/Convert';
import GaScrollView from '../../components/GaScrollView';
import GaCaughtUp from '../../components/GaCaughtUp';
import AppLoader from '../../components/indicator/AppLoader';
import {CouponPartnerEntity} from '../../models/interfaces/ReemPartnersResponse';
import {Filter} from '../../models/enum/Filter';
import {
  DivisionPickerSkeleton,
  OrganisationSkeletonItem,
} from '../../components/SkeletonCards';
import WalletDivisionPicker, {
  WalletDivisionPickerProps,
} from '../../components/app/wallet/WalletDivisionPicker';
import {WalletStackScreenProps} from '../../navigation/stack/WalletStackNavigator';
import SVGIcon from '../../utility/svg/SVGIcon';

export enum WalletMode {
  Transaction,
  Redeem,
  RedeemDetails,
}

enum TransactionMode {
  AllTransaction = 1,
  CouponCode,
}

export type getRewardRequestListArgs = {
  fromFilter?: boolean;
  fromResetFilter?: boolean;
  paramsPage?: number;
  fromScroll?: boolean;
  client_id?: number;
  deleteOrg?: boolean;
  deleteAllParams?: boolean;
  fromDate?: string;
  toDate?: string;
  organization_id?: number;
};

const kScreenPadding = wp(5);
const segmentBarItems = [
  // Todo: will be added in next release
  // AppLocalizedStrings.wallet.allTransactions,

  AppLocalizedStrings.wallet.couponsCode,
];

const WalletScreen: React.FC<
  WalletStackScreenProps<'WalletScreen'>
> = props => {
  const [transactions, setTransactions] = useState(
    Transactions as Transaction[],
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const [organizations, setOrganizations] = useState<ClientEntity[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([0]);
  const [mode, setMode] = useState(WalletMode.Transaction);
  const [couponPartners, setCouponPartners] = useState<CouponPartnerEntity[]>(
    [],
  );
  const [loadingOrganisations, setLoadingOrganisations] = useState(true);
  const [walletSummaryLoading, setWalletSummaryLoading] = useState(true);
  const [sectedReedemOrg, setSectionedReedemOrg] = useState('');
  const [walletSummary, setWalletSummary] =
    React.useState<WalletSummary | null>();
  const [walletSummaries, setWalletSummaries] = React.useState<PickerItem[]>(
    [],
  );
  const [startDate, setStartDate] = useState<null | Date>();
  const [endDate, setEndDate] = useState<null | Date>();

  const [selectedWallet, setSelectedWallet] =
    useState<WalletSummaryEntity | null>();
  const [transactionMode, setTransactionMode] = useState(
    TransactionMode.CouponCode,
  );
  const [showFilter, setShowFilter] = useState(false);
  const [rewardRequestList, setRewardRequestList] = useState<
    RewardTransactionEntity[]
  >([] as RewardTransactionEntity[]);
  const [year, setYear] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quarter, setQuarter] = useState<number | null>(null);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [rewardRequestListLoading, setRewardRequestListLoading] =
    useState(false);
  const [resetFilterLoading, setResetFilterLoading] = useState(false);
  const [rewardRequestListParams, setRewardRequestListParams] = useState<
    FetchRewardRequestListParams.params & {
      q?: number | null;
      year?: number | null;
    }
  >({} as FetchRewardRequestListParams.params);
  const [selectedOrg, setSelectedOrg] = useState<null | number>();

  const getWalletSummary = React.useCallback(async (clientId?: number) => {
    setWalletSummaryLoading(true);

    const data = await store
      .dispatch(fetchWalletSummary(clientId ? {client_id: clientId} : {}))
      .unwrap();

    setWalletSummary(data.wallet_summary);
    data.wallet_summary.wallet_summaries &&
      setSelectedWallet({
        display_name: Filter.SELECT_ALL,
        division_name: Filter.SELECT_ALL,
        division_code: Filter.SELECT_ALL,
        team_id: -1,
        organization_code: Filter.SELECT_ALL,
        organization_id: -1,
        organization_name: Filter.SELECT_ALL,
        redeemable_points:
          data.wallet_summary.total_redeemable_points.toString(),
        pending_points: data.wallet_summary.total_pending_points.toString(),
        redeemed_points: data.wallet_summary.total_redeemed_points,
        total_redeemed_points:
          walletSummary?.total_redeemed_points ?? AppLocalizedStrings.noData,
      });

    if (data.wallet_summary.wallet_summaries) {
      const summaries: PickerItem[] = data.wallet_summary.wallet_summaries?.map(
        (val: {division_code: string; display_name: string}, ind: any) => {
          return {
            value: val.division_code,
            label: val.display_name,
          };
        },
      );

      summaries.unshift({value: Filter.SELECT_ALL, label: Filter.SELECT_ALL});

      summaries && setWalletSummaries(summaries);
      setWalletSummaryLoading(false);
    }
  }, []);

  const getCouponPartners = async (id: number) => {
    try {
      const data = await store.dispatch(fetchCouponPartners({id})).unwrap();
      setCouponPartners(data.rewards);
    } catch (err) {}
  };

  const getRewardRequestList = useCallback(
    async (
      params: getRewardRequestListArgs,
      page?: number,
      scrolled?: boolean,
    ) => {
      const {fromResetFilter, client_id} = params;

      fromResetFilter
        ? setResetFilterLoading(true)
        : setRewardRequestListLoading(true);
      var rewardParams = {length: 10} as FetchRewardRequestListParams.params;

      // if (quarter && year) {
      //   const {end, start} = Generator.getQuarterDates(quarter, year);
      //   const convertedStartDate = Convert.dateFormatter(
      //     null,
      //     'YYYY-MM-DD',
      //     start,
      //   );

      //   const convertedEndDate = Convert.dateFormatter(null, 'YYYY-MM-DD', end);
      //   rewardParams.from_date = convertedStartDate;
      //   rewardParams.to_date = convertedEndDate;
      // }

      if (startDate) {
        const convertedStartDate = Convert.dateFormatter(
          null,
          'YYYY-MM-DD',
          startDate,
        );

        rewardParams.from_date = convertedStartDate;
      }

      if (endDate) {
        const convertedEndDate = Convert.dateFormatter(
          null,
          'YYYY-MM-DD',
          endDate,
        );
        rewardParams.to_date = convertedEndDate;
      }

      if (client_id) {
        if (client_id === -1) {
          delete rewardParams.client_id;
        } else {
          rewardParams.client_id = client_id;
        }
      } else if (selectedOrg) {
        rewardParams.client_id = selectedOrg;
      }

      if (rewardRequestListParams.status) {
        rewardParams.status = rewardRequestListParams.status;
      }

      rewardParams.start_point = rewardRequestListParams.start_point;
      rewardParams.end_point = rewardRequestListParams.end_point;

      if (fromResetFilter) {
        delete rewardParams.client_id;
        delete rewardParams.end_point;
        delete rewardParams.status;
        delete rewardParams.organization_id;
        delete rewardParams.start_point;
        delete rewardParams.end_point;
        delete rewardParams.from_date;
        delete rewardParams.to_date;
      }
      if (rewardRequestListParams.organization_id) {
        rewardParams.organization_id = rewardRequestListParams.organization_id;
      }

      if (params.organization_id) {
        if (params.organization_id === -1) {
          delete rewardParams.organization_id;
        } else {
          rewardParams.organization_id = params.organization_id;
        }
      }

      const result = await store
        .dispatch(
          fetchRewardRequestList({page: page ? page : 1, params: rewardParams}),
        )
        .unwrap();

      if (result.success) {
        setCurrentPage(result.reward_transactions.current_page);
        setLastPage(result.reward_transactions.last_page);
        if (scrolled) {
          setRewardRequestList(oldData => [
            ...oldData,
            ...result.reward_transactions.data,
          ]);
        } else {
          setRewardRequestList(result.reward_transactions.data);
        }
      }
      fromResetFilter
        ? setResetFilterLoading(false)
        : setRewardRequestListLoading(false);
    },

    [rewardRequestListParams, selectedOrg, startDate, endDate],
  );

  const onFilterHandler = useCallback(() => {
    setShowFilter(val => !val);
  }, []);

  const onTransactionModeChange = useCallback((index: number) => {
    setTransactionMode(index);
  }, []);

  const changeMode = useCallback((mode: WalletMode) => {
    setMode(mode);
  }, []);

  const onRedeemHandler = useCallback(() => {
    changeMode(WalletMode.RedeemDetails);
  }, [changeMode]);

  const onGoToDashboardHandler = useCallback(
    (toDashboard = false) => {
      setMode(WalletMode.Transaction);
      if (toDashboard === true) {
        props.navigation.navigate('WalletScreen');
      }
    },
    [props],
  );

  const onCompanySelect = (title: string) => {
    setSectionedReedemOrg(title);
    changeMode(WalletMode.RedeemDetails);
  };

  const onApplyHandler = async () => {
    await getRewardRequestList({
      fromFilter: true,
    });
    setShowFilter(false);
  };

  const resetFilterState = () => {
    setYear(null);
    setQuarter(null);
    setRewardRequestListParams({} as FetchRewardRequestListParams.params);
  };

  const onClearHandler = async () => {
    console.log('DUMCHIK_AJFHJDE');

    setYear(null);
    setQuarter(null);
    setRewardRequestListParams({} as FetchRewardRequestListParams.params);
    setResetFilterLoading(true);
    setStartDate(null);
    setEndDate(null);
    await getRewardRequestList({fromResetFilter: true, paramsPage: 1});
    setResetFilterLoading(false);
    setShowFilter(false);
  };

  const onDismissHandler = async () => {
    // await onClearHandler();
    setShowFilter(false);
  };

  const getClients = useCallback(async () => {
    setLoadingOrganisations(true);
    let params = {
      active_wallet_clients: 1,
    } as ClientListParams.params;
    const data = await store.dispatch(fetchClients(params)).unwrap();
    if (data.success) {
      data.clients.data.unshift({} as ClientEntity);
      setOrganizations(data.clients.data);
    } else {
      Snackbar.show({
        text: data?.errors
          ? data?.errors?.message
          : AppLocalizedStrings.somethingWrong,
        backgroundColor: Colors.red,
        textColor: Colors.white,
      });
    }
    setLoadingOrganisations(false);
  }, []);

  const PickerView = useCallback(() => {
    return (
      <>
        <Text style={styles.selectDivision}>
          {AppLocalizedStrings.wallet.selectDivision}
        </Text>
        <View>
          {walletSummaryLoading ? (
            <>
              <DivisionPickerSkeleton />
              <Spacer height={hp(2)} />
            </>
          ) : (
            <View>
              {selectedWallet && walletSummaries && walletSummary ? (
                <WalletDivisionPicker
                  organizations={organizations}
                  walletSummaries={walletSummaries}
                  selectedWallet={selectedWallet}
                  setSelectedWallet={setSelectedWallet}
                  walletSummary={walletSummary}
                  resetFilterState={resetFilterState}
                  getRewardRequestList={getRewardRequestList}
                  setCouponPartners={setCouponPartners}
                  selectedIds={selectedIds}
                  setRewardRequestListParams={setRewardRequestListParams}
                />
              ) : (
                <View></View>
              )}
            </View>
          )}
        </View>
        {walletSummaries && (
          <WalletPointsView
            walletSummaryLoading={loadingOrganisations || walletSummaryLoading}
            selectedWallet={
              selectedWallet ? selectedWallet : ({} as WalletSummaryEntity)
            }
            onPress={onRedeemHandler}
          />
        )}
        <Spacer height={hp(2)} />
      </>
    );
  }, [
    selectedWallet,
    walletSummaries,
    walletSummary,
    walletSummaryLoading,
    loadingOrganisations,
  ]);

  const filterCount = (): number => {
    return rewardRequestListParams.status
      ? startDate
        ? 2
        : 1
      : startDate
      ? 1
      : 0;
  };

  const segmentContainer = useMemo(() => {
    return (
      <View style={styles.segmentContainer}>
        <SegmentBar
          containerStyle={styles.bar}
          selectedIndex={0}
          items={segmentBarItems}
          onValueChange={onTransactionModeChange}
        />
        <View style={styles.filterContainer}>
          <AdaptiveButton
            type="text"
            isReverse
            title={AppLocalizedStrings.filter.filter}
            icon="filter"
            iconSize={hp('2.3')}
            iconColor={Colors.primary}
            textStyle={styles.btnFilterText}
            onPress={onFilterHandler}
          />
          {filterCount() !== 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{filterCount()} </Text>
            </View>
          )}
        </View>
      </View>
    );
  }, [transactionMode, onTransactionModeChange, onFilterHandler, filterCount]);

  const handleRefreshApi = () => {
    setRewardRequestList([]);
    onClearHandler();
    getWalletSummary();
  };

  const listHeaderComponent = useCallback(() => {
    return (
      <>
        <View style={styles.bottomContainer}>
          <>
            {walletSummaries && <PickerView />}
            {mode === WalletMode.Transaction && segmentContainer}
            {mode === WalletMode.Redeem && (
              <RedeemPoint
                organisations={organizations}
                selectedOrgID={selectedIds}
                onCompanySelect={onCompanySelect}
                onDismiss={changeMode.bind(this, WalletMode.Transaction)}
              />
            )}

            {mode === WalletMode.RedeemDetails && selectedWallet && (
              <RedeemPointDetail
                refreshApi={handleRefreshApi}
                getRewardRequestList={getRewardRequestList}
                setMode={setMode}
                couponPartners={couponPartners}
                onGoToDashboardHandler={onGoToDashboardHandler}
                selectedWallet={selectedWallet}
                onDismiss={changeMode.bind(this, WalletMode.Transaction)}
                title={selectedWallet?.organization_code ?? ''}
              />
            )}
          </>
        </View>
      </>
    );
  }, [
    mode,
    rewardRequestList,
    organizations,
    sectedReedemOrg,
    walletSummaries,
    selectedWallet,
    selectedIds,
    selectedWallet,
    couponPartners,
    handleRefreshApi,
  ]);

  // Todo: Will be implemented for transactions in the next release
  // const getDataSource = () => {
  //   return mode == WalletMode.Transaction
  //     ? transactionMode == TransactionMode.AllTransaction
  //       ? transactions
  //       : coupons
  //     : [];
  // };

  const itemSeparatorComponent = useCallback(() => {
    return <View style={styles.itemSeparatorStyle} />;
  }, []);

  const keyExtractor = (item: RewardTransactionEntity, index: number) =>
    index.toString();

  const renderItem = ({item}: {item: RewardTransactionEntity}) => {
    return (
      <View style={styles.listItem}>
        {transactionMode == TransactionMode.AllTransaction ? (
          // <TransactionCard item={item} />
          <View></View>
        ) : (
          <CouponCard item={item} />
        )}
      </View>
    );
  };

  const fetchScreenData = useCallback(() => {
    getClients();
    getWalletSummary();
    getRewardRequestList({}, 1, false);
  }, []);

  React.useEffect(() => {
    fetchScreenData();
  }, []);

  React.useEffect(() => {}, [
    walletSummary,
    selectedWallet,
    organizations,
    rewardRequestList,
    couponPartners,
  ]);

  const resetState = () => {
    setOrganizations([]);
    setSelectedIds([0]);
    setMode(WalletMode.Transaction);
    setCouponPartners([]);
    setSectionedReedemOrg('');
    setWalletSummary(null);
    setWalletSummaries([]);
    setStartDate(null);
    setEndDate(null);
    setSelectedWallet(null);
    setTransactionMode(TransactionMode.CouponCode);
    setRewardRequestList([]);
    setCurrentPage(1);
    setLastPage(null);
    setRewardRequestListParams({});
    setSelectedOrg(null);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoadingOrganisations(true);
    setRewardRequestListLoading(true);
    resetState();
    setTimeout(() => {
      fetchScreenData();
      setRefreshing(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (selectedWallet?.organization_id) {
      getCouponPartners(selectedWallet?.organization_id);
    }
  }, [selectedWallet]);

  return (
    <SafeAreaView>
      <GaScrollView
        onRefresh={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        hasMore={currentPage < (lastPage ? lastPage : 1)}
        onEndReached={async () => {
          !rewardRequestListLoading &&
            (await getRewardRequestList({}, currentPage + 1, true));
        }}
        data={
          <View>
            <FlatList
              onEndReachedThreshold={2}
              extraData={rewardRequestList}
              windowSize={21}
              initialNumToRender={10}
              maxToRenderPerBatch={rewardRequestList.length}
              ListHeaderComponent={
                <>
                  <View style={styles.topContainer}>
                    {loadingOrganisations ? (
                      <View style={styles.flatList}>
                        <Spacer height={hp('1%')} />
                        <View style={{paddingLeft: wp('5%')}}>
                          <OrganisationSkeletonItem />
                        </View>
                        <Spacer height={hp('3%')} />
                      </View>
                    ) : (
                      <OrganisationList
                        loading={!organizations}
                        style={styles.flatList}
                        contentContainerStyle={styles.flatListContent}
                        selectedIds={selectedIds}
                        horizontal={true}
                        showAll={true}
                        data={organizations}
                        onSelect={ids => {
                          setSelectedIds(ids);
                          setSelectedWallet(null);
                          setRewardRequestListParams({});
                          const orgId =
                            organizations && organizations[ids[0]]?.id;
                          if (orgId) {
                            setSelectedOrg(orgId);
                            getRewardRequestList({
                              client_id: orgId,
                              paramsPage: 1,
                              organization_id: -1,
                            });
                            getWalletSummary(orgId);
                          } else {
                            setSelectedOrg(null);
                            getRewardRequestList({
                              client_id: -1,
                              paramsPage: 1,
                              organization_id: -1,
                            });
                            getWalletSummary();
                          }
                        }}
                      />
                    )}
                  </View>
                  {listHeaderComponent()}
                </>
              }
              data={[]}
              ItemSeparatorComponent={itemSeparatorComponent}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />

            <View>
              <FlatList renderItem={renderItem} data={rewardRequestList} />
              {rewardRequestListLoading && (
                <View style={{marginVertical: 40, marginBottom: hp(10)}}>
                  <AppLoader type="none" loading={true} />
                </View>
              )}

              {currentPage === lastPage && rewardRequestList.length > 0 && (
                <GaCaughtUp message={AppLocalizedStrings.caughtUp} />
              )}
              {!rewardRequestListLoading && rewardRequestList.length === 0 && (
                <>
                  <SVGIcon
                    style={{marginLeft: wp(20)}}
                    name={'no-coupon-found-art'}
                    size={wp(60)}
                  />
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    No Coupons Found
                  </Text>
                </>
              )}
            </View>
          </View>
        }
      />
      {showFilter && (
        <TransactionFilterPopup
          enablePoints={false}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          endDate={endDate}
          startDate={startDate}
          setQuarter={setQuarter}
          applyLoading={rewardRequestListLoading}
          resetFilterLoading={resetFilterLoading}
          quarter={quarter}
          setYear={setYear}
          year={year}
          params={rewardRequestListParams}
          setParams={setRewardRequestListParams}
          pointsRangeTitle={
            transactionMode === TransactionMode.AllTransaction
              ? AppLocalizedStrings.filter.approvedPointsRange
              : AppLocalizedStrings.filter.rewardPointsRange
          }
          showRange={transactionMode == TransactionMode.AllTransaction}
          showInvoiceStatus={transactionMode == TransactionMode.AllTransaction}
          showTransaxtion={transactionMode == TransactionMode.AllTransaction}
          showReedem={transactionMode == TransactionMode.CouponCode}
          onApply={onApplyHandler}
          onClear={onClearHandler}
          onDismiss={onDismissHandler}
        />
      )}
      {rewardRequestList.length === 0 && !rewardRequestListLoading && (
        <View style={styles.noDataContainer}>
          <Text
            style={{
              ...styles.noDataText,
              color: Colors.primary,
            }}>
            No Coupons Found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    paddingRight: wp(4),
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topContainer: {
    shadowColor: Colors.darkBlack,
    backgroundColor: Colors.white,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    shadowOffset: {width: 0, height: 1},
  },
  flatList: {
    marginTop: hp(3),
    marginBottom: hp(1.5),
  },
  flatListContent: {
    paddingHorizontal: kScreenPadding,
  },
  bottomContainer: {
    flex: 1,
    paddingVertical: kScreenPadding,
    marginHorizontal: kScreenPadding,
  },
  searchBarView: {
    marginBottom: hp(2),
  },
  details: {
    marginVertical: hp(2),
  },
  bar: {
    marginTop: hp(1),
  },
  itemSeparatorStyle: {
    height: hp(1.8),
  },
  listItem: {
    marginHorizontal: kScreenPadding,
  },
  segmentContainer: {
    flexDirection: 'row',

    // todo: Will be using this once the transactions are also implemented
    justifyContent: 'space-between',
  },
  skelLoadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  noDataContainer: {
    padding: 90,
    alignItems: 'center',
  },
  noDataText: {marginTop: 0, fontSize: 20},
  skelLoadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  btnFilter: {paddingHorizontal: 0, height: 'auto', marginLeft: wp('70%')},
  btnFilterText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Medium',
      Colors.black,
    ),
    paddingEnd: wp(2),
  },
  selectDivision: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.grey,
    ),
    marginBottom: wp(2),
  },
  noInvoicesImage: {
    width: hp('25%'),
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 100,
    bottom: -220,
    left: 90,
  },
  filterBadge: {
    position: 'absolute',
    top: wp('-1%'),
    right: wp('-2%'),
    backgroundColor: Colors.red,
    borderRadius: wp('100%'),
    minWidth: 20,
    height: 20,
    textAlign: 'center',
    zIndex: 1,
    paddingTop: 1,
  },
  filterBadgeText: {
    color: Colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
});
