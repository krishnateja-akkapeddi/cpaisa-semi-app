import React, {useCallback, useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet, View, FlatList, Text} from 'react-native';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import OrganisationList from '../../components/app/offers/OrganisationList';
import {AppLocalizedStrings} from '../../localization/Localization';
import OrganisationJson from '../../mock/Organisation.json';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import Style from '../../constants/Style';
import Picker, {DropDownItem} from '../../components/picker/Picker';
import WalletPointsView from '../../components/app/wallet/WalletPointsView';
import RedeemPoint from '../../components/app/wallet/RedeemPoint';
import RedeemPointDetail from '../../components/app/wallet/RedeemPointDetail';
import Spacer from '../../components/layout/Spacer';
import SegmentBar from '../../components/app/SegmentBar';
import Transactions from '../../mock/Transactions.json';
import Coupons from '../../mock/Coupons.json';
import Transaction from '../../models/interfaces/Transaction';
import Coupon from '../../models/interfaces/Coupon';
import CouponCard from '../../components/app/wallet/CouponCard';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import TransactionFilterPopup from '../../components/popup/TransactionFilterPopup';
import ReedemRequestPopup from '../../components/popup/ReedemRequestPopup';
import {BottomTabScreenProps} from '../../navigation/navigator/BottomTabNavigator';
import {
  WalletSummaryEntity,
  WalletSummary,
} from '../../models/interfaces/WalletSummary';
import {PickerItem} from 'react-native-woodpicker';
import {store} from '../../store/Store';
import {
  fetchClients,
  fetchRewardRequestList,
  fetchWalletSummary,
} from '../../store/thunks/ApiThunks';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';
import Snackbar from 'react-native-snackbar';
import {RewardTransactionEntity} from '../../models/interfaces/RewardRequestResponse';
import {FetchRewardRequestListParams} from '../../domain/usages/FetchRewardRequestList';
import {ClientListParams} from '../../domain/usages/FetchClientsList';
import {Generator} from '../../utility/Generator';
import {Convert} from '../../utility/converter/Convert';
import GaScrollView from '../../components/GaScrollView';
import GaCaughtUp from '../../components/GaCaughtUp';
import AppLoader from '../../components/indicator/AppLoader';

enum WalletMode {
  Transaction,
  Redeem,
  RedeemDetails,
}

enum TransactionMode {
  AllTransaction,
  CouponCode,
}

export type getRewardRequestListArgs = {
  fromFilter?: boolean;
  fromResetFilter?: boolean;
  paramsPage?: number;
  fromScroll?: boolean;
  organizationId?: number;
  deleteOrg?: boolean;
  deleteAllParams?: boolean;
  fromDate?: string;
  toDate?: string;
};

const kOrganisations = [
  {name: AppLocalizedStrings.viewAll, url: ''},
  ...OrganisationJson,
];

const pickerData: DropDownItem[] = [
  {label: 'Value 1', value: 1},
  {label: 'Value 2', value: 2},
  {label: 'Value 3', value: 3},
  {label: 'Value 4', value: 4},
  {label: 'Value 5', value: 5},
  {label: 'Value 6', value: 6},
];

const kScreenPadding = wp(5);
const segmentBarItems = [
  AppLocalizedStrings.wallet.allTransactions,
  AppLocalizedStrings.wallet.couponsCode,
];

const WalletScreen: React.FC<BottomTabScreenProps<'WalletScreen'>> = props => {
  const [transactions, setTransactions] = useState(
    Transactions as Transaction[],
  );
  const [coupons, setCoupons] = useState(Coupons as Coupon[]);
  const [organizations, setOrganizations] = useState<ClientEntity[]>();
  const [selectedIds, setSelectedIds] = useState<number[]>([0]);
  const [mode, setMode] = useState(WalletMode.Transaction);
  const [redeemSelectTitle, setRedeemTitle] = useState('');
  const [walletSummaryLoading, setWalletSummaryLoading] = useState(false);

  //wallet summary states
  const [walletSummary, setWalletSummary] = React.useState<WalletSummary>();
  const [walletSummaries, setWalletSummaries] = React.useState<PickerItem[]>();
  const [selectedWallet, setSelectedWallet] = useState<WalletSummaryEntity>();
  const [transactionMode, setTransactionMode] = useState(
    TransactionMode.AllTransaction,
  );
  const [showFilter, setShowFilter] = useState(false);
  const [showRedeem, setShowRedeem] = useState(false);

  //Reward request list states
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

  const getWalletSummary = React.useCallback(async () => {
    setWalletSummaryLoading(true);

    const data = await store.dispatch(fetchWalletSummary()).unwrap();
    setWalletSummary(data.wallet_summary);

    data.wallet_summary.wallet_summaries &&
      setSelectedWallet(data?.wallet_summary.wallet_summaries[0]);
    const summaries: PickerItem[] | undefined =
      data.wallet_summary.wallet_summaries?.map(
        (val: {division_code: string; division_name: string}, ind: any) => {
          return {value: val.division_code, label: val.division_name};
        },
      );
    setWalletSummaries(summaries);
    setWalletSummaryLoading(false);
  }, []);

  const getRewardRequestList = useCallback(
    async (
      params: getRewardRequestListArgs,
      page?: number,
      scrolled?: boolean,
    ) => {
      const {fromResetFilter, organizationId} = params;

      fromResetFilter
        ? setResetFilterLoading(true)
        : setRewardRequestListLoading(true);
      var rewardParams = {length: 10} as FetchRewardRequestListParams.params;

      if (quarter && year) {
        const {end, start} = Generator.getQuarterDates(quarter, year);
        const convertedStartDate = Convert.dateFormatter(
          null,
          'YYYY-MM-DD',
          start,
        );
        const convertedEndDate = Convert.dateFormatter(null, 'YYYY-MM-DD', end);
        rewardParams.from_date = convertedStartDate;
        rewardParams.to_date = convertedEndDate;
      }
      if (organizationId) {
        if (organizationId === -1) {
          delete rewardParams.organization_id;
        } else {
          rewardParams.organization_id = organizationId;
        }
      } else if (selectedOrg) {
        rewardParams.organization_id = selectedOrg;
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
      console.log('PARAMS_RAJ', rewardParams, 'page', page);
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

    [rewardRequestListParams, selectedOrg],
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
    changeMode(WalletMode.Redeem);
  }, [changeMode]);
  rewardRequestListParams.status;

  const onRedeemSuccessHandler = useCallback(() => {
    setShowRedeem(true);
  }, []);

  const onGoToDashboardHandler = useCallback(
    (toDashboard = false) => {
      setShowRedeem(false);
      setMode(WalletMode.Transaction);
      if (toDashboard === true) {
        props.navigation.jumpTo('DashboardScreen');
      }
    },
    [props],
  );

  const onCompanySelect = (title: string) => {
    setRedeemTitle(title);
    changeMode(WalletMode.RedeemDetails);
  };

  const onApplyHandler = async () => {
    await getRewardRequestList({
      fromFilter: true,
    });
    setShowFilter(false);
  };

  const onClearHandler = async () => {
    setYear(null);
    setQuarter(null);
    setRewardRequestListParams({} as FetchRewardRequestListParams.params);
    setResetFilterLoading(true);
    await getRewardRequestList({fromResetFilter: true, paramsPage: 1});
    setResetFilterLoading(false);
    setShowFilter(false);
    setShowFilter(false);
  };

  const onDismissHandler = () => {
    setShowFilter(false);
  };

  const getClients = useCallback(async () => {
    let params = {mapped_organization: 1} as ClientListParams.params;
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
  }, []);

  const OrganisationListComponet = () => {
    return (
      <View style={styles.topContainer}>
        <OrganisationList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          selectedIds={selectedIds}
          horizontal={true}
          showAll={true}
          data={organizations}
          onSelect={ids => {
            setSelectedIds(ids);
            const orgId = organizations && organizations[ids[0]]?.id;
            if (orgId) {
              setSelectedOrg(orgId);
              getRewardRequestList({organizationId: orgId, paramsPage: 1});
            } else {
              setSelectedOrg(null);
              getRewardRequestList({organizationId: -1, paramsPage: 1});
            }
          }}
        />
      </View>
    );
  };

  const PickerView = () => {
    return (
      <>
        <Text style={styles.selectDivision}>
          {AppLocalizedStrings.wallet.selectDivision}
        </Text>
        {walletSummaries && (
          <Picker
            item={walletSummaries.find(val => {
              return val.value === selectedWallet?.division_code;
            })}
            onItemChange={val => {
              const findItem = walletSummary?.wallet_summaries?.find(
                (item, ind) => {
                  return item.division_code === val.value;
                },
              );
              setSelectedWallet(findItem);
            }}
            textStyle={styles.pickerText}
            style={styles.picker}
            items={walletSummaries}
          />
        )}
        <WalletPointsView
          selectedWallet={selectedWallet}
          onPress={onRedeemHandler}
        />
        <Spacer height={hp(2)} />
      </>
    );
  };

  const segmentContainer = useMemo(() => {
    return (
      <View style={styles.segmentContainer}>
        <SegmentBar
          containerStyle={styles.bar}
          selectedIndex={transactionMode}
          items={segmentBarItems}
          onValueChange={onTransactionModeChange}
        />
        <AdaptiveButton
          type="text"
          isReverse
          title={AppLocalizedStrings.filter.filter}
          icon="filter"
          iconSize={hp('2.3')}
          iconColor={Colors.primary}
          buttonStyle={styles.btnFilter}
          textStyle={styles.btnFilterText}
          onPress={onFilterHandler}
        />
      </View>
    );
  }, [transactionMode, onTransactionModeChange, onFilterHandler]);

  const listHeaderComponent = useCallback(() => {
    return (
      <>
        <OrganisationListComponet />
        <View style={styles.bottomContainer}>
          <>
            <PickerView />
            {mode === WalletMode.Transaction && segmentContainer}
            {mode === WalletMode.Redeem && (
              <RedeemPoint
                onCompanySelect={onCompanySelect}
                onDismiss={changeMode.bind(this, WalletMode.Transaction)}
              />
            )}
            {mode === WalletMode.RedeemDetails && (
              <RedeemPointDetail
                onRedeem={onRedeemSuccessHandler}
                onDismiss={changeMode.bind(this, WalletMode.Redeem)}
                title={redeemSelectTitle}
              />
            )}
          </>
        </View>
      </>
    );
  }, [
    mode,
    OrganisationListComponet,
    PickerView,
    onRedeemSuccessHandler,
    rewardRequestList,
  ]);

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

  React.useEffect(() => {
    getClients();
    getWalletSummary();
    getRewardRequestList({}, 1, false);
  }, []);

  React.useEffect(() => {}, [
    walletSummary,
    selectedWallet,
    organizations,
    rewardRequestList,
  ]);

  return (
    <SafeAreaView>
      <GaScrollView
        endMessage={<Text>This is the end!</Text>}
        hasMore={currentPage < (lastPage ? lastPage : 1)}
        onEndReached={async () => {
          await getRewardRequestList({}, currentPage + 1, true);
        }}
        data={
          <View>
            <FlatList
              onEndReachedThreshold={2}
              extraData={rewardRequestList}
              windowSize={21}
              initialNumToRender={10}
              maxToRenderPerBatch={rewardRequestList.length}
              ListHeaderComponent={listHeaderComponent}
              data={[]}
              ItemSeparatorComponent={itemSeparatorComponent}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
            <View>
              <FlatList renderItem={renderItem} data={rewardRequestList} />

              {lastPage && currentPage !== lastPage && (
                <View style={{marginVertical: 40, marginBottom: hp(10)}}>
                  <AppLoader type="none" loading={true} />
                </View>
              )}

              {currentPage === lastPage && (
                <GaCaughtUp message="You're all caught up!" />
              )}
            </View>
          </View>
        }
      />
      {showFilter && (
        <TransactionFilterPopup
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
            No Coupons
          </Text>
        </View>
      )}

      {showRedeem && (
        <ReedemRequestPopup
          onDismiss={onGoToDashboardHandler.bind(this, false)}
          goToDashboard={onGoToDashboardHandler.bind(this, true)}
        />
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

  pickerText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  picker: {
    height: hp(5),
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: wp(3),
    borderRadius: Style.kBorderRadius,
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
  noDataText: {marginTop: 4, fontSize: 20},
  skelLoadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  btnFilter: {paddingHorizontal: 0, height: 'auto'},
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
});
