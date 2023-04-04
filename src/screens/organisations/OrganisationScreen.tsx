import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import OrganisationList from '../../components/app/offers/OrganisationList';
import Snackbar from 'react-native-snackbar';
import {ClientListParams} from '../../domain/usages/FetchClientsList';
import {AppLocalizedStrings} from '../../localization/Localization';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';
import {store} from '../../store/Store';
import {fetchClients} from '../../store/thunks/ApiThunks';
import {OrganisationSkeletonItem} from '../../components/SkeletonCards';
import Spacer from '../../components/layout/Spacer';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import {FlatList} from 'react-native-gesture-handler';
import Colors from '../../theme/Colors';
import ImageView from '../../components/image/ImageView';
import DepartmentItem from '../../components/app/offers/DepartmentItem';
import {Convert} from '../../utility/converter/Convert';
import RootNavigation from '../../navigation/RootNavigation';

type Props = {};
const kScreenPadding = wp(5);

const OrganisationScreen = (props: Props) => {
  const [selectedOrg, setSelectedOrg] = useState<null | number>();
  const [organizations, setOrganizations] = useState<ClientEntity[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([0]);
  const [loadingOrganisations, setLoadingOrganisations] = useState(false);

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

  useEffect(() => {
    getClients();
  }, []);

  return (
    <View>
      <Spacer height={hp(2)} />
      <View>
        <FlatList
          style={{height: hp('100%')}}
          data={organizations}
          renderItem={val => {
            if (val.index !== 0) {
              return (
                <TouchableOpacity>
                  <View
                    style={{
                      width: '95%',
                      margin: 10,
                      flex: 1,
                      alignSelf: 'center',
                      flexDirection: 'row',
                      backgroundColor: Colors.lightGrey,
                      borderRadius: 20,
                      paddingLeft: wp(2),
                      paddingRight: wp(2),

                      alignItems: 'center',
                    }}>
                    <View>
                      <ImageView
                        resizeMode="contain"
                        style={styles.logo}
                        source={val.item.logo_link}
                      />
                    </View>
                    <Spacer width={wp(7)} />
                    <View>
                      <Text style={styles.title}>
                        {Convert.capitalize(val.item.name)}
                      </Text>
                    </View>

                    <View style={{position: 'absolute', right: wp('5%')}}>
                      <Text style={{color: Colors.primary, textAlign: 'right'}}>
                        View Details
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return <View />;
            }
          }}
        />
      </View>
    </View>
  );
};

export default OrganisationScreen;

const styles = StyleSheet.create({
  container: {
    width: hp('10%'),
  },
  inputContainer: {
    width: '100%',
    padding: 3,
    borderWidth: 2,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
    overflow: 'hidden',
  },
  logo: {
    width: wp('17%'),
    height: hp('9%'),
  },
  title: {
    color: '#000',
    // marginVertical: hp('1%'),
    fontSize: Fonts.getFontSize('headline4'),
    fontFamily: Fonts.regular,
    width: wp(40),
    fontWeight: 'bold',
  },
  titleViewAll: {
    color: '#000',
    textAlign: 'center',
    marginVertical: hp(1),
    fontSize: hp(1.7),
    fontFamily: Fonts.bold,
  },
});
