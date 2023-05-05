import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import OrganisationList from '../../components/app/offers/OrganisationList';
import {AppLocalizedStrings} from '../../localization/Localization';
import OrganisationJson from '../../mock/Organisation.json';
import StockistData from '../../mock/StockistData.json';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import SearchBar from '../../components/app/SearchBar';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import StockistList from '../../components/app/StockistList';
import Spacer from '../../components/layout/Spacer';
import OrganisationFilterPopup from '../../components/popup/OrganisationFilterPopup';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/Store';
import {Data} from '../../models/interfaces/AuthResponse';
import {ClientListParams} from '../../domain/usages/FetchClientsList';
import Snackbar from 'react-native-snackbar';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';
import {
  fetchAuthorizedStockists,
  fetchClients,
} from '../../store/thunks/ApiThunks';
import {store} from '../../store/Store';
import {StockistEntity} from '../../models/interfaces/AuthorizedStockistsResponse';
import {FetchAuthorizedStockistsParams} from '../../domain/usages/FetchAuthorizedStockists';
import {debounce} from '../../utility/debounce';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import GaCaughtUp from '../../components/GaCaughtUp';
import {OrganisationSkeletonItem} from '../../components/SkeletonCards';
import RootNavigation from '../../navigation/RootNavigation';

export type getStockistsListParams = {
  fromFilter?: boolean;
  fromResetFilter?: boolean;
  length?: number;
  query?: string;
  client_code?: string;
};

const kOrganisations = [
  {name: AppLocalizedStrings.viewAll, url: ''},
  ...OrganisationJson,
];

const StockistScreen = () => {
  const userInfo = useSelector<RootState, Data>(
    state => state?.auth?.authResult?.data,
  );
  const [data, setData] = useState(StockistData);
  const [isNextPageThere, setIsNextPageThere] = useState(true);
  const [organizations, setOrganizations] = useState<ClientEntity[]>([]);
  const [selectedOrganization, setSelectedOrganization] =
    useState<ClientEntity | null>();
  const [stockists, setStockists] = useState<StockistEntity[]>([]);
  const [loadingOrganisations, setLoadingOrganisations] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([0]);
  const [expandIndex, setExpandIndex] = useState(-1);
  const [showFilter, setShowFilter] = useState(false);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingStockists, setLoadingStockists] = useState(false);
  const [resetFilterLoading, setResetFilterLoading] = useState(false);
  const dropDownHandler = (index: number) => {
    setExpandIndex(index == expandIndex ? -1 : index);
  };

  const toggleFilter = () => {
    setShowFilter(val => !val);
  };

  const onApplyFilter = () => {
    toggleFilter();
  };

  const onClearFilter = () => {
    toggleFilter();
  };

  const getStockistsList = useCallback(
    async (
      params: getStockistsListParams,
      page?: number,
      scrolled?: boolean,
    ) => {
      const {fromResetFilter} = params;

      fromResetFilter ? setResetFilterLoading(true) : setLoadingStockists(true);
      var stockistParams = {
        length: 10,
      } as FetchAuthorizedStockistsParams.params;

      if (params.client_code) {
        params.client_code !== '-1'
          ? (stockistParams.client_code = params.client_code)
          : delete stockistParams.client_code;
      } else if (selectedOrganization) {
        stockistParams.client_code = selectedOrganization.short_code;
      }
      if (scrolled) {
        if (page === 1) {
          page = 2;
          setCurrentPage(prev => prev + 1);
        }
      }
      if (query) {
        stockistParams.q = query;
      }

      if (fromResetFilter) {
        delete stockistParams.client_code;
        delete stockistParams.q;
      }
      const result = await store
        .dispatch(
          fetchAuthorizedStockists({
            page: page ? page : 1,
            params: stockistParams,
          }),
        )
        .unwrap();
      console.log('STOCSIID', result);

      if (result.success) {
        setIsNextPageThere(result.stockists.has_next_page);

        // await debounce(2000);
        if (scrolled) {
          setStockists(oldData => [...oldData, ...result.stockists.data]);
        } else {
          setStockists(result.stockists.data);
        }
      }
      fromResetFilter
        ? setResetFilterLoading(false)
        : setLoadingStockists(false);
    },

    [currentPage, query, selectedOrganization, selectedIds],
  );

  const getClients = async () => {
    setLoadingOrganisations(true);
    let params = {mapped_organization: 1} as ClientListParams.params;
    // params.state = state.name;
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
  };

  const handleSearch = () => {
    setStockists([]);
    setCurrentPage(1);
    getStockistsList({}, 1, false);
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      handleSearch();
    }, 1500);

    return () => {
      clearTimeout(debounceSearch);
    };
  }, [query]);

  useEffect(() => {
    getClients();
  }, [userInfo?.channel_partner?.address?.state]);

  // useEffect(() => {
  //   getStockistsList({}, 1, false);
  // }, []);

  useEffect(() => {}, [
    organizations,
    userInfo?.channel_partner?.address?.state,
    stockists,
  ]);

  useLayoutEffect(() => {
    RootNavigation.setDisplayName('Krishna');
  }, []);

  console.log('ISN_EST', isNextPageThere);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.topContainer}>
        <View style={styles.flatlistContainer}>
          {loadingOrganisations ? (
            <View>
              <Spacer height={hp('1%')} />
              <View style={{paddingLeft: wp('5'), paddingRight: wp('5')}}>
                <OrganisationSkeletonItem />
              </View>
              <Spacer height={hp('3%')} />
            </View>
          ) : (
            <View>
              <OrganisationList
                style={{paddingLeft: wp('5'), paddingRight: wp('5')}}
                selectedIds={selectedIds}
                horizontal={true}
                showAll={true}
                data={organizations}
                onSelect={ids => {
                  setSelectedIds(ids);
                  const orgId = organizations && organizations[ids[0]]?.id;
                  if (orgId) {
                    setStockists([]);
                    setCurrentPage(1);
                    setSelectedOrganization(organizations[ids[0]]);
                    getStockistsList({
                      client_code: organizations[ids[0]].short_code,
                    });
                  } else {
                    setSelectedOrganization(null);
                    setStockists([]);
                    setCurrentPage(1);
                    getStockistsList({client_code: '-1'}, 1, false);
                  }
                }}
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.searchContainer}>
          <View style={{flex: 1}}>
            <SearchBar
              onChange={setQuery}
              value={query}
              type="small"
              placeholder={AppLocalizedStrings.search.enterName}
            />
          </View>
          {
            // Todo: Under review
            /* <AdaptiveButton
            isReverse
            type="text"
            icon="filter"
            iconColor={Colors.primary}
            iconSize={wp('6%')}
            textStyle={styles.filterText}
            title={AppLocalizedStrings.filter.filter}
            onPress={toggleFilter}
          /> */
          }
        </View>
        <View style={styles.bottomFlatListContainer}>
          <FlatList
            onEndReached={() => {
              setCurrentPage(prev => prev + 1);
              isNextPageThere &&
                getStockistsList({}, currentPage, true).then(() => {});
            }}
            ListFooterComponent={
              <View>
                {loadingStockists ? (
                  [1, 2, 3, 4, 5, 6].map((val, ind) => {
                    return (
                      <View key={ind.toString()}>
                        <Spacer height={hp('3%')} />
                        <SkeletonPlaceholder borderRadius={10}>
                          <SkeletonPlaceholder.Item
                            width={wp('90%')}
                            height={hp('6.5%')}
                          />
                        </SkeletonPlaceholder>
                      </View>
                    );
                  })
                ) : !isNextPageThere ? (
                  <GaCaughtUp message={AppLocalizedStrings.caughtUp} />
                ) : (
                  <View />
                )}
              </View>
            }
            data={stockists}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            renderItem={({item, index}) => (
              <>
                <StockistList
                  organisations={item.organizations}
                  name={item.firm_name}
                  gstNo={item.gst_number}
                  //Todo: Update it
                  // image={item}
                  isVisible={expandIndex == index}
                  onPress={() => dropDownHandler(index)}
                />
              </>
            )}
          />
          <Spacer height={hp('2%')} />
        </View>
      </View>

      {showFilter && (
        <OrganisationFilterPopup
          onApply={onApplyFilter}
          onClear={onClearFilter}
          onDismiss={toggleFilter}
        />
      )}
    </SafeAreaView>
  );
};

export default StockistScreen;

const styles = StyleSheet.create({
  topContainer: {
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    shadowOffset: {width: 0, height: 8},
  },
  flatlistContainer: {
    marginTop: hp('2%'),
    marginBottom: hp('1.5%'),
    // marginLeft: hp('2%'),
  },
  bottomContainer: {
    flex: 1,
    marginHorizontal: hp('2%'),
  },
  filterText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline4'),
    color: Colors.black,
    paddingRight: wp('2%'),
    paddingLeft: wp('6%'),
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('3%'),
  },
  itemSeparator: {
    height: hp('3%'),
  },
  bottomFlatListContainer: {
    flex: 1,
  },
});
