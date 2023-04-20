import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import RootNavigation from '../../navigation/RootNavigation';
import {store} from '../../store/Store';
import {fetchDivisions, registerUser} from '../../store/thunks/ApiThunks';
import {DivisionEntity} from '../../models/interfaces/FetchDivisionsResponse';
import DepartmentItem from '../../components/app/offers/DepartmentItem';
import Spacer from '../../components/layout/Spacer';
import {Convert} from '../../utility/converter/Convert';
import Colors from '../../theme/Colors';
import {AuthStackScreenProps} from '../../navigation/stack/AuthStackNavigator';
import {sortBy} from 'lodash';
import {
  RegisterAddress,
  RegisterUserParams,
} from '../../domain/usages/RegisterUser';
import {authSlice} from '../../store/slices/AuthSlice';
import {useDispatch} from 'react-redux';
import {openPopup} from '../../store/slices/AppSlice';
import {RegisteredUserResponse} from '../../models/interfaces/RegisteredUserResponse';
import {pickMessageFromErrors} from '../../utility/ErrorPicker';
import {convertToAuthResult} from '../../utility/ConvertToAuthResult';
import SharedPreference from '../../storage/SharedPreference';
import {setClientHeaders} from '../../store/workers/ApiWorkers';

const ChooseOrganisationScreen: React.FC<
  AuthStackScreenProps<'ChooseOrganisationScreen'>
> = props => {
  const dispatch = useDispatch();
  const infoFromAdditionalDetails = props?.route?.params;
  const [divisions, setDivisions] = useState<DivisionEntity[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<DivisionEntity>();

  const onProceedHandler = async () => {
    if (infoFromAdditionalDetails) {
      const registerUserParams: RegisterUserParams.params = {
        no_of_customer: infoFromAdditionalDetails.no_of_customer ?? '',
        address: infoFromAdditionalDetails.address ?? ({} as RegisterAddress),
        annual_turnover: infoFromAdditionalDetails.annual_turnover ?? '00',
        creator_organization_id: selectedDivision?.id.toString() ?? '',
        firm_name: infoFromAdditionalDetails.firm_name ?? '',
        dl_no: infoFromAdditionalDetails.dl_no,
        mobile: infoFromAdditionalDetails.mobile ?? '',
        referred_by: infoFromAdditionalDetails.referred_by ?? '',
        type: infoFromAdditionalDetails.type ?? '',
        whats_app_number: infoFromAdditionalDetails.whats_app_number ?? '',
      };
      if (infoFromAdditionalDetails.gst_no) {
        registerUserParams.gst_no = infoFromAdditionalDetails.gst_no;
      }
      if (infoFromAdditionalDetails.pan_no) {
        registerUserParams.pan_no = infoFromAdditionalDetails.pan_no;
      }
      const data = await store
        .dispatch(registerUser(registerUserParams))
        .unwrap();
      if (data.success) {
        const authResult = convertToAuthResult(data);
        store.dispatch(authSlice.actions.storeAuthResult(authResult));
        const stringData = JSON.stringify(authResult);
        await SharedPreference.shared.setUser(stringData);
        await SharedPreference.shared
          .setToken(authResult?.data?.user.auth_token)
          .then(async () => {
            await setClientHeaders();
          })
          .then(() => {
            RootNavigation.replace('Drawer');
          });
      } else {
        if (data.errors) {
          store.dispatch(
            openPopup({
              message: pickMessageFromErrors(data.errors),
              type: 'danger',
              title: 'Registration',
            }),
          );
        }
      }
      console.log('FINAL_PARAMS', registerUserParams);
    }
  };

  function handleOrgChange(item: DivisionEntity) {
    setSelectedDivision(item);
  }

  const renderItem = ({index, item}: ListRenderItemInfo<DivisionEntity>) => {
    return (
      <View
        key={item.code}
        style={{marginLeft: index % 3 !== 0 ? wp('12%') : 0}}>
        <DepartmentItem
          style={{
            borderColor: Colors.primary,
            width: wp('22%'),
          }}
          isRounded={false}
          image={item.image?.path ?? ''}
          isViewAll={false}
          name={Convert.capitalize(item.name)}
          isActive={selectedDivision?.code === item.code}
          onPress={() => handleOrgChange(item)}
        />
      </View>
    );
  };

  const getDevisions = async () => {
    const data = await store.dispatch(fetchDivisions()).unwrap();
    if (data.success) {
      setDivisions(data.organizations);
    }
  };

  useEffect(() => {
    getDevisions();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        ItemSeparatorComponent={() => <Spacer height={hp(2)} />}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
        }}
        data={divisions}
        numColumns={3}
        renderItem={renderItem}
      />
      <Spacer height={hp(2)} />
      <AdaptiveButton
        buttonStyle={styles.btn}
        title={AppLocalizedStrings.proceed}
        onPress={onProceedHandler}
      />
    </SafeAreaView>
  );
};

export default ChooseOrganisationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: wp('5%'),
    justifyContent: 'space-between',
  },
  list: {
    flexGrow: 1,
  },
  btn: {},
});
