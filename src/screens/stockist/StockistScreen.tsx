import {SafeAreaView, StyleSheet, View, FlatList, AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import AdaptiveButton from '../../components/button/AdaptiveButton';
import OrganisationFilterPopup from '../../components/popup/OrganisationFilterPopup';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/Store';
import {Data} from '../../models/interfaces/AuthResponse';
import {ClientListParams} from '../../domain/usages/FetchClientsList';
import Snackbar from 'react-native-snackbar';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';
import {fetchClients} from '../../store/thunks/ApiThunks';
import {store} from '../../store/Store';

const kOrganisations = [
  {name: AppLocalizedStrings.viewAll, url: ''},
  ...OrganisationJson,
];

const StockistScreen = () => {
  const {
    channel_partner: {
      address: {state},
    },
  } = useSelector<RootState, Data>(state => state.auth.authResult.data);
  const [data, setData] = useState(StockistData);
  const [organizations, setOrganizations] = useState<ClientEntity[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([0]);
  const [expandIndex, setExpandIndex] = useState(-1);
  const [showFilter, setShowFilter] = useState(false);

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

  const getClients = async () => {
    let params = {} as ClientListParams.params;
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
  };

  useEffect(() => {
    getClients();
  }, [state]);

  useEffect(() => {
    console.log('OLG_DI', organizations);
  }, [organizations, state]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.topContainer}>
        <View style={styles.flatlistContainer}>
          <OrganisationList
            selectedIds={selectedIds}
            horizontal={true}
            showAll={true}
            data={organizations}
            onSelect={ids => setSelectedIds(ids)}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.searchContainer}>
          <View style={{flex: 1}}>
            <SearchBar
              type="small"
              placeholder={AppLocalizedStrings.search.enterDepartmentName}
            />
          </View>
          <AdaptiveButton
            isReverse
            type="text"
            icon="filter"
            iconColor={Colors.primary}
            iconSize={wp('6%')}
            textStyle={styles.filterText}
            title={AppLocalizedStrings.filter.filter}
            onPress={toggleFilter}
          />
        </View>
        <View style={styles.bottomFlatListContainer}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            renderItem={({item, index}) => (
              <StockistList
                name={item.name}
                image={item.image}
                isVisible={expandIndex == index}
                onPress={() => dropDownHandler(index)}
              />
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
    marginLeft: hp('2%'),
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
