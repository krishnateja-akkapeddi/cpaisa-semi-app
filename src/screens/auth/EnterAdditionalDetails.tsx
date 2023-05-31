import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import Icon from 'react-native-vector-icons/AntDesign';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AuthBaseScreen from './AuthBaseScreen';
import Validator from '../../utility/validation/Validator';
import RootNavigation from '../../navigation/RootNavigation';
import {AuthStackScreenProps} from '../../navigation/stack/AuthStackNavigator';
import GaInputValidationMessage from '../../components/GaInputValidationMessage';
import GaInputField from '../../components/GaInputField';
import Spacer from '../../components/layout/Spacer';
import PopupContainer from '../../components/popup/PopupContainer';
import Fonts from '../../theme/Fonts';
import {store} from '../../store/Store';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  fetchDivisions,
  generateOtp,
  registerUser,
  verifyOtp,
} from '../../store/thunks/ApiThunks';
import {openPopup} from '../../store/slices/AppSlice';
import VerifyMobileNumber from '../../components/app/auth/VerifyMobileNumber';
import {Picker, PickerItem} from 'react-native-woodpicker';
import {DivisionEntity} from '../../models/interfaces/FetchDivisionsResponse';
import {Convert} from '../../utility/converter/Convert';
import {
  RegisterUserParams,
  RegisterAddress,
} from '../../domain/usages/RegisterUser';
import SharedPreference from '../../storage/SharedPreference';
import {authSlice} from '../../store/slices/AuthSlice';
import {setClientHeaders} from '../../store/workers/ApiWorkers';
import {convertToAuthResult} from '../../utility/ConvertToAuthResult';
import {pickMessageFromErrors} from '../../utility/ErrorPicker';

const EnterAdditionalDetails: React.FC<
  AuthStackScreenProps<'EnterAdditionalDetails'>
> = props => {
  console.log('PARF_IUDID', props.route.params);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isWhatsappVerified, setIsWhatsappVerified] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [customersCount, setCustomersCount] = useState('');
  const [referredBy, setReferredBy] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('');
  const [divisions, setDivisions] = useState<PickerItem[]>();
  const [selectedDivision, setSelectedDivision] = useState<PickerItem>();
  const [loading, setLoading] = useState(false);
  const [isTermsAndCondtionsAgreed, setIsTermsAndCondtionsAgreed] =
    useState(false);
  const infoFromAdditionalDetails = props?.route?.params;

  const onContinueHandler = async () => {
    validator();
    setLoading(true);
    if (infoFromAdditionalDetails) {
      const registerUserParams: RegisterUserParams.params = {
        no_of_customer: customersCount,
        address: infoFromAdditionalDetails.address ?? ({} as RegisterAddress),
        annual_turnover: annualRevenue,
        creator_organization_id: selectedDivision?.value.toString() ?? '',
        firm_name: infoFromAdditionalDetails.firm_name ?? '',
        dl_no: infoFromAdditionalDetails.dl_no,
        mobile: infoFromAdditionalDetails.mobile ?? '',
        referred_by: referredBy,
        type: infoFromAdditionalDetails.type ?? '',
        whats_app_number: whatsappNumber,
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
    setLoading(false);
  };

  const getOtp = async () => {
    const data = await store
      .dispatch(
        generateOtp({
          mobile_value: whatsappNumber,
          mode: 'whatsapp',
        }),
      )
      .unwrap();
    if (data?.success) {
      setShowWhatsapp(true);
    } else {
      store.dispatch(
        openPopup({
          title: 'Otp',
          type: 'error',
          message:
            data?.errors?.mobile ??
            data?.errors?.mode ??
            AppLocalizedStrings.somethingWrong,
        }),
      );
    }
  };

  function checkStatesNotEmpty() {
    if (!Validator.isValidMobileNumber(whatsappNumber)) {
      return false;
    }
    if (customersCount === '' || customersCount.length === 0) {
      return false;
    }
    if (referredBy === '' || referredBy.length === 0) {
      return false;
    }
    if (annualRevenue === '' || annualRevenue.length === 0) {
      return false;
    }
    if (!isWhatsappVerified) {
      return false;
    }
    if (!isTermsAndCondtionsAgreed) {
      return false;
    }

    return true;
  }

  const validator = () => {
    return {
      referredBy: referredBy ? true : false,
      annualRevenue: annualRevenue ? true : false,
      customersCount: customersCount ? true : false,
      whatsappNumber: whatsappNumber ? true : false,
      isTermsAndCondtionsAgreed,
      isWhatsappVerified,
    };
  };

  const getDevisions = async () => {
    const data = await store.dispatch(fetchDivisions()).unwrap();
    if (data.success) {
      const orgs: PickerItem[] = data.organizations?.map((val, ind) => {
        return {
          value: val.id.toString(),
          label: Convert.toTitleCase(val.name),
        };
      });
      orgs.unshift({label: 'Select Division', value: 'select_division'});
      setDivisions(orgs);
    }
  };

  useEffect(() => {
    getDevisions();
  }, []);

  return (
    <AuthBaseScreen
      title={AppLocalizedStrings.auth.additionalDetails}
      iconName="details_illustration">
      {whatsappNumber.length > 1 && (
        <GaInputValidationMessage
          message={AppLocalizedStrings.validMobile}
          canShow={Validator.isValidMobileNumber(whatsappNumber)}
        />
      )}
      {/* <View style={{height: hp('45%')}}> */}
      <GaInputValidationMessage
        message={'Please verify your whatsapp number.'}
        canShow={whatsappNumber.length !== 10 || isWhatsappVerified}
      />

      {showWhatsapp && (
        <PopupContainer
          showDismiss
          onDismiss={() => {
            setShowWhatsapp(false);
          }}
          title="Verify Whatsapp Number">
          <VerifyMobileNumber
            onVerified={() => {
              setIsWhatsappVerified(true);
              setShowWhatsapp(false);
            }}
            mobile={whatsappNumber}
          />
        </PopupContainer>
      )}
      <Spacer height={hp(1)} />
      <GaInputField
        showVerificationStatus={whatsappNumber.length === 10}
        onIconPresss={() => {
          getOtp();
          setShowWhatsapp(true);
        }}
        isVerified={isWhatsappVerified}
        value={whatsappNumber}
        keyboardType="decimal-pad"
        onChangeText={setWhatsappNumber}
        placeholder={AppLocalizedStrings.auth.enterWhatsapp}
        label={'Whatsapp Number'}
      />
      <Spacer height={hp('2%')} />
      <GaInputField
        label="Approx Customer Count"
        value={customersCount}
        onChangeText={setCustomersCount}
        keyboardType="decimal-pad"
        placeholder={AppLocalizedStrings.auth.enterCustomerCount}
      />
      <Spacer height={hp('2%')} />

      <GaInputField
        label={'Approx Revenue'}
        value={annualRevenue}
        keyboardType="decimal-pad"
        onChangeText={setAnnualRevenue}
        placeholder={'Enter Revenue'}
      />
      <Spacer height={hp('2%')} />
      <GaInputField
        label={AppLocalizedStrings.auth.referredBy}
        value={referredBy}
        onChangeText={setReferredBy}
        placeholder={AppLocalizedStrings.auth.referredBy}
      />
      <Spacer height={hp('2%')} />
      {divisions && (
        <View>
          <Icon
            name="caretdown"
            color={Colors.black}
            style={{
              position: 'absolute',
              zIndex: 10,
              top: hp('2%'),
              left: wp('63%'),
            }}
          />
          {selectedDivision && (
            <Text
              style={{
                position: 'absolute',
                zIndex: 10,
                bottom: hp(7),
                left: wp(1.7),
                paddingHorizontal: wp(1),
                backgroundColor: Colors.white,
              }}>
              Division
            </Text>
          )}
          <Picker
            placeholder="Select Division"
            title="Select Division"
            textInputStyle={styles.pickerText}
            style={styles.picker}
            item={selectedDivision ?? {label: 'Select Organization', value: ''}}
            items={divisions}
            onItemChange={function (item: PickerItem, index: number): void {
              setSelectedDivision(item);
            }}
          />
        </View>
      )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'flex-start',
        }}>
        <BouncyCheckbox
          isChecked={isTermsAndCondtionsAgreed}
          innerIconStyle={{borderRadius: 0}}
          iconImageStyle={{borderRadius: 0}}
          iconStyle={{borderRadius: 0}}
          size={wp(4)}
          onPress={(isChecked: boolean) => {
            setIsTermsAndCondtionsAgreed(isChecked);
          }}
        />
        <Text style={{fontSize: wp(3)}}>Please read and accept our </Text>

        <AdaptiveButton
          onPress={() => {
            RootNavigation.navigate('TermsConditionsScreen');
          }}
          textStyle={{
            color: Colors.primary,
            fontSize: wp(3),
            fontWeight: 'normal',
          }}
          type="text"
          title={'Terms and Conditions'}
        />
      </View>
      <Spacer height={hp('2%')} />
      {/* </View> */}
      <View style={styles.viewBottom}>
        <AdaptiveButton
          loading={loading}
          isDisable={
            !checkStatesNotEmpty() ||
            loading ||
            selectedDivision?.value === 'select_division'
          }
          title={AppLocalizedStrings.submit}
          onPress={onContinueHandler}
          buttonStyle={styles.btnContinue}
        />
      </View>
    </AuthBaseScreen>
  );
};

export default EnterAdditionalDetails;

const styles = StyleSheet.create({
  resendOTP: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.darkBlack,
    ),
    textAlign: 'center',
  },
  pickerText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  picker: {
    height: hp(6),
    width: wp(70),
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderColor: Colors.lightGrey,
    paddingHorizontal: wp(3),
    borderRadius: Style.kBorderRadius,
    marginBottom: hp(2),
    borderWidth: 1,
  },
  input: {
    marginBottom: hp('2.5%'),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  ownerPickerStyles: {
    height: hp(5),
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: wp(6),
    marginBottom: hp('2.5%'),
  },
  btnContinue: {
    width: '100%',
  },
  btnGST: {
    ...Style.getTextStyle(12, 'Regular', Colors.darkBlack),
  },
  viewBottom: {
    flex: 1,
    width: '100%',
    // justifyContent: 'flex-end',
    marginTop: hp('1%'),
    marginBottom: hp('5%'),
  },
});
