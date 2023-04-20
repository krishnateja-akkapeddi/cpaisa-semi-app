import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
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
import {generateOtp, verifyOtp} from '../../store/thunks/ApiThunks';
import {openPopup} from '../../store/slices/AppSlice';
import VerifyMobileNumber from '../../components/app/auth/VerifyMobileNumber';

const EnterAdditionalDetails: React.FC<
  AuthStackScreenProps<'EnterAdditionalDetails'>
> = props => {
  console.log('PARF_IUDID', props.route.params);
  const infoFromIdentity = props?.route?.params;
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isWhatsappVerified, setIsWhatsappVerified] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [customersCount, setCustomersCount] = useState('');
  const [referredBy, setReferredBy] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('');

  const onContinueHandler = () => {
    RootNavigation.navigate('CompleteKYCScreen', {
      ...infoFromIdentity,
      whats_app_number: whatsappNumber,
      no_of_customer: customersCount,
      referred_by: referredBy,
      annual_turnover: annualRevenue,
    });
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

    return true;
  }

  return (
    <AuthBaseScreen
      title={AppLocalizedStrings.auth.additionalDetails}
      iconName="enter_details">
      {whatsappNumber.length > 1 && (
        <GaInputValidationMessage
          message={AppLocalizedStrings.validMobile}
          canShow={Validator.isValidMobileNumber(whatsappNumber)}
        />
      )}

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
        label="Customer Count"
        value={customersCount}
        onChangeText={setCustomersCount}
        keyboardType="decimal-pad"
        placeholder={AppLocalizedStrings.auth.enterCustomerCount}
      />
      <Spacer height={hp('2%')} />

      <GaInputField
        label={'Annual Revenue'}
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

      <View style={styles.viewBottom}>
        <AdaptiveButton
          isDisable={!checkStatesNotEmpty()}
          title={AppLocalizedStrings.continue}
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
