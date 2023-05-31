import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, NativeModules} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import Style from '../../constants/Style';
import RootNavigation from '../../navigation/RootNavigation';
import Colors from '../../theme/Colors';
import Validator from '../../utility/validation/Validator';
import AuthBaseScreen from './AuthBaseScreen';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AuthStackScreenProps} from '../../navigation/stack/AuthStackNavigator';
import Snackbar from 'react-native-snackbar';
import {store} from '../../store/Store';
import {generateOtp} from '../../store/thunks/ApiThunks';
import Spacer from '../../components/layout/Spacer';
import {useDispatch} from 'react-redux';
import {openPopup} from '../../store/slices/AppSlice';
import {Convert} from '../../utility/converter/Convert';
import Icon from 'react-native-vector-icons/AntDesign';
import GaInputValidationMessage from '../../components/GaInputValidationMessage';
import GaInputField from '../../components/GaInputField';
import SharedPreference from '../../storage/SharedPreference';

const LoginScreen: React.FC<AuthStackScreenProps<'LoginScreen'>> = props => {
  const forUpdateContact = props.route?.params?.forUpdateContact;
  const contactType = props.route?.params?.contactType;
  const dispatch = useDispatch();
  const [mobileNo, setMobileNo] = useState('');
  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    setLoading(true);
    try {
      const data = await store
        .dispatch(
          generateOtp({
            mobile_value: mobileNo,
            mode: forUpdateContact
              ? contactType === 'mobile'
                ? 'sms'
                : 'whatsapp'
              : 'sms',
          }),
        )
        .unwrap();

      if (data?.success) {
      } else {
        dispatch(
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
      if (forUpdateContact) {
        setLoading(false);
        RootNavigation.navigate('EnterUpdateContactOtpScreen', {
          isLogin: true,
          mobileNumber: mobileNo,
          fromNewContact: forUpdateContact,
          contactType: contactType,
        });
      } else {
        setLoading(false);
        RootNavigation.navigate('EnterOTPScreen', {
          isLogin: false,
          mobileNumber: mobileNo,
        });
      }
    } catch (error) {
      console.log('FROM_LOGOM', error);
    }
    setLoading(false);
  };

  const termsHandler = () => {
    RootNavigation.navigate('TermsConditionsScreen', {
      isLogin: true,
      mobileNumber: mobileNo,
    });
  };

  const helpHandler = () => {
    RootNavigation.navigate('LoginHelpScreen');
  };
  return (
    <>
      {forUpdateContact && (
        <AdaptiveButton
          buttonStyle={{
            position: 'absolute',
            bottom: hp('89%'),
            zIndex: 100,
            right: wp('90%'),
          }}
          onPress={() => props.navigation.goBack()}
          icon="arrow_back"
          iconColor={Colors.primary}
          iconSize={wp('6%')}
          type="text"
        />
      )}
      <Spacer height={hp(10)} />
      <AuthBaseScreen
        title={
          forUpdateContact
            ? 'Please enter the new mobile number'
            : AppLocalizedStrings.auth.loginWithMobile
        }
        iconName="mobile_number">
        <GaInputField
          value={mobileNo}
          keyboardType="number-pad"
          onChangeText={(e: string) => {
            setMobileNo(e);
          }}
          placeholder={AppLocalizedStrings.auth.mobileNo}
          label={
            !forUpdateContact ? 'Enter Mobile' : AppLocalizedStrings.enterMobile
          } // style={{
          //   ...styles.input,
          //   borderColor:
          //     mobileNo.length >= 10 && !Validator.isValidMobileNumber(mobileNo)
          //       ? Colors.red
          //       : Colors.primary,
          // }}
        />
        {mobileNo?.length > 1 && (
          <GaInputValidationMessage
            message={AppLocalizedStrings.validMobile}
            canShow={Validator.isValidMobileNumber(mobileNo)}
          />
        )}
        <Spacer height={hp(2)} />
        {forUpdateContact && (
          <>
            <Text style={{color: Colors.grey}}>
              An otp will be sent to this number for confirmation
            </Text>
            <Spacer height={hp('15%')} />
          </>
        )}

        <AdaptiveButton
          loading={loading}
          isDisable={!Validator.isValidMobileNumber(mobileNo)}
          title={
            forUpdateContact
              ? 'SEND OTP TO NEW NUMBER'
              : AppLocalizedStrings.auth.login +
                ' / ' +
                AppLocalizedStrings.auth.register
          }
          onPress={loginHandler}
          buttonStyle={styles.btn}
        />
        <View style={styles.viewBottom}>
          {!forUpdateContact && (
            <AdaptiveButton
              icon="info"
              iconColor={Colors.black}
              iconSize={wp(3)}
              textStyle={styles.btnCondition}
              type="text"
              title={AppLocalizedStrings.auth.help}
              onPress={helpHandler}
            />
          )}
        </View>
      </AuthBaseScreen>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    marginBottom: hp('2.5%'),
  },
  btn: {
    width: '100%',
  },
  btnCondition: {
    ...Style.getTextStyle(12, 'Regular', Colors.darkBlack),
  },
  viewBottom: {
    paddingTop: hp(1),
    flex: 1,
    justifyContent: 'space-between',
    top: hp(27),
  },
  line: {
    backgroundColor: Colors.lightPurple,
    height: 1,
    width: '100%',
    marginVertical: hp('3.5%'),
  },
});
