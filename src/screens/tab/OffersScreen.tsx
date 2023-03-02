import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {hp} from '../../utility/responsive/ScreenResponsive';
import OfferJson from '../../mock/Offers.json';
import OfferListComponent from '../../components/app/offers/OfferListComponent';
import OfferHeaderComponent from '../../components/app/offers/OfferHeaderComponent';
import OfferCalculatorPopup from '../../components/popup/OfferCalculatorPopup';
import Snackbar from 'react-native-snackbar';
import {ClientListParams} from '../../domain/usages/FetchClientsList';
import {AppLocalizedStrings} from '../../localization/Localization';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';
import {store} from '../../store/Store';
import {fetchClients, fetchOffersList} from '../../store/thunks/ApiThunks';
import {FetchOffersListParams} from '../../domain/usages/FetchOffersList';
import {OffersListEntity} from '../../models/interfaces/OffersListResponse';
import Colors from '../../theme/Colors';
import SearchBar from '../../components/app/SearchBar';
import AppLoader from '../../components/indicator/AppLoader';
import Spacer from '../../components/layout/Spacer';
import GaCaughtUp from '../../components/GaCaughtUp';

interface Offer {
  name: string;
  image: string;
  pointText: string;
  percentage: string;
  minOrder: string;
}

const OffersScreen = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [organizations, setOrganizations] = useState<ClientEntity[]>([]);
  const [offersListLoading, setOffersListLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState<null | string>(null);
  const [query, setQuery] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<null | number>();
  const [offersList, setOffersList] = useState<OffersListEntity[]>(
    [] as OffersListEntity[],
  );

  const Header = useCallback(() => {
    return (
      <OfferHeaderComponent
        onSelect={ids => {
          setOffersList([]);
          const orgId = organizations && organizations[ids[0]]?.id;
          if (orgId) {
            setSelectedOrg(orgId);
            getOffersList(1, false, orgId);
          } else {
            setSelectedOrg(null);
            getOffersList(1, false, -1);
          }
        }}
        organizations={organizations}
      />
    );
  }, [organizations]);

  const getClients = async () => {
    let params = {} as ClientListParams.params;
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
  };

  const getOffersList = async (
    page: number,
    scrolled?: boolean,
    organizationId?: number,
  ) => {
    setOffersListLoading(true);
    const params = {} as FetchOffersListParams.params;

    if (selectedOrg) {
      params.client_id = selectedOrg;
    }
    if (query) {
      params.q = query;
    }

    if (organizationId) {
      if (organizationId === -1) {
        delete params.client_id;
      } else {
        params.client_id = organizationId;
      }
    } else if (selectedOrg) {
      params.client_id = selectedOrg;
    }

    params.page = page;
    const result = await store.dispatch(fetchOffersList(params)).unwrap();
    if (result.success) {
      setCurrentPage(result.offers.current_page);
      setNextPage(result.offers.next_page_url);
      if (scrolled) {
        setOffersList(prev => {
          return [...prev, ...result.offers.data];
        });
      } else {
        setOffersList(result.offers.data);
      }
    } else {
      Snackbar.show({
        text: AppLocalizedStrings.somethingWrong,
        textColor: Colors.white,
        backgroundColor: Colors.red,
      });
    }
    setOffersListLoading(false);
  };

  const renderItem: ListRenderItem<OffersListEntity> = useCallback(
    ({item}) => {
      const onItemPress = () => {
        setShowCalculator(val => !val);
      };
      return (
        <TouchableOpacity onPress={onItemPress} style={styles.itemContainer}>
          <OfferListComponent item={item} />
        </TouchableOpacity>
      );
    },

    [offersList],
  );

  async function handleSearch(e: string) {
    setQuery(e);
  }

  const itemSeprator = useCallback(
    () => <View style={styles.itemSeparatorStyle} />,
    [],
  );

  const onDismissCalculator = useCallback(() => {
    setShowCalculator(val => !val);
  }, []);

  useEffect(() => {
    getClients();
    getOffersList(1);
  }, []);

  useEffect(() => {
    if (query === '') {
      setOffersList([]);
      getOffersList(1, false);
    }
  }, [query]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.searchBarView}></View>
      <FlatList
        showsHorizontalScrollIndicator
        alwaysBounceVertical={false}
        data={offersList}
        removeClippedSubviews={false}
        ListHeaderComponent={
          <View>
            <Header />
            <View style={styles.searchBarView}>
              <SearchBar
                onPress={() => {
                  setOffersList([]);
                  getOffersList(1, false);
                }}
                value={query}
                onChange={handleSearch}
                shadow={true}
                placeholder={AppLocalizedStrings.search.enterProductName}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <>
            {offersListLoading ? (
              <View
                style={{
                  marginVertical: 10,
                  marginBottom: hp('5%'),
                  marginTop: hp('4%'),
                }}>
                <AppLoader type="none" loading={true} />
              </View>
            ) : !nextPage ? (
              ''
            ) : (
              offersList.length !== 0 && (
                <GaCaughtUp message="You're all caught up!" />
              )
            )}
          </>
        }
        ItemSeparatorComponent={itemSeprator}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReached={async () => {
          if (nextPage !== null) {
            await getOffersList(currentPage + 1, true);
          } else {
            return;
          }
        }}
      />

      {!offersListLoading && offersList.length === 0 && (
        <>
          <Image
            style={{bottom: hp('15%')}}
            source={require('../../assets/images/NoOffersArt.png')}
          />
          <Text
            style={{
              bottom: hp('15%'),
              fontSize: 20,
              textAlign: 'center',
              marginTop: hp(4),
              color: Colors.black,
              fontWeight: '500',
            }}>
            No Offers Found
          </Text>
        </>
      )}
      <Spacer height={hp('2%')}></Spacer>
      {showCalculator && (
        <OfferCalculatorPopup onDismiss={onDismissCalculator} />
      )}
    </SafeAreaView>
  );
};

export default OffersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemSeparatorStyle: {
    height: hp('2.5%'),
  },
  itemContainer: {marginHorizontal: hp(2)},
  searchBarView: {
    marginBottom: hp(2.5),
    paddingHorizontal: hp(2),
  },
  noInvoicesImage: {
    width: hp('25%'),
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 100,
    bottom: -140,
    left: 90,
  },
});
