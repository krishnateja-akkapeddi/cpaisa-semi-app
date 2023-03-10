import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {useDispatch} from 'react-redux';
import OTPView from '../../components/app/auth/OTPView';
import ResendOTPMode from '../../components/app/auth/ResendOTPMode';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import Spacer from '../../components/layout/Spacer';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import RootNavigation from '../../navigation/RootNavigation';
import {AuthStackScreenProps} from '../../navigation/stack/AuthStackNavigator';
import {authSlice} from '../../store/slices/AuthSlice';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import AuthBaseScreen from './AuthBaseScreen';
import {hp} from '../../utility/responsive/ScreenResponsive';
import useTimer from '../../utility/timer/Timer';
import {store} from '../../store/Store';
import {updateContactInfo, verifyOtp} from '../../store/thunks/ApiThunks';
import {setClientHeaders} from '../../store/workers/ApiWorkers';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';
import {fromPairs} from 'lodash';
import AppLoader from '../../components/indicator/AppLoader';

const EnterOTPScreen: React.FC<
  AuthStackScreenProps<'EnterOTPScreen'>
> = props => {
  const [otp, setOtp] = useState('');
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [timeLimit, setTimeLimit] = useState(0.5);
  const [seconds, minutes] = useTimer(timeLimit);
  const dispatch = useDispatch();
  const onRequestHandler = () => {};
  const mobile = props.route.params?.mobileNumber;
  const fromNewContact = props.route.params?.fromNewContact;
  const forUpdateContact = props.route.params.forUpdateContact;

  const onSubmitHandler = async () => {
    setVerifyOtpLoading(true);
    try {
      let params = {
        mobile: mobile,
        otp: otp,
      };

      if (forUpdateContact) {
        const data = await store.dispatch(verifyOtp(params)).unwrap();
        if (data.success) {
          RootNavigation.navigate('LoginScreen', {
            forUpdateContact: true,
            isLogin: true,
          });
        } else {
          Snackbar.show({text: 'Something went wrong'});
        }
        setVerifyOtpLoading(false);
        return;
      } else if (fromNewContact) {
        const updatedContact = await store
          .dispatch(
            updateContactInfo({
              mode: 'mobile',
              otp: parseInt(params.otp),
              mobile_value: parseInt(mobile),
            }),
          )
          .unwrap();
        if (updatedContact.success) {
          RootNavigation.navigate('LoginScreen');
        } else {
          Snackbar.show({text: 'Something went wrong'});
        }
        setVerifyOtpLoading(false);
        return;
      } else if (!fromNewContact && !forUpdateContact) {
        const data = await store.dispatch(verifyOtp(params)).unwrap();
        if (data.success) {
          const stringData = JSON.stringify(data);
          await setClientHeaders();
          dispatch(authSlice.actions.storeAuthResult(data));
          await SharedPreference.shared.setUser(stringData);
          await SharedPreference.shared.setToken(data.data.user.auth_token);
          RootNavigation.replace('Drawer');
        } else {
          Snackbar.show({
            text: data?.errors
              ? data?.errors?.message
              : AppLocalizedStrings.somethingWrong,
            backgroundColor: Colors.red,
            textColor: Colors.white,
          });
        }
      } else {
        setVerifyOtpLoading(false);
        return;
      }
      setVerifyOtpLoading(false);
    } catch (error) {
      console.error('ERROR_FROM_OTP_SCREEN', error);
    }
  };

  return (
    <AuthBaseScreen
      title={
        forUpdateContact
          ? 'Verify Your Account'
          : fromNewContact
          ? 'Enter the otp to update your contact'
          : AppLocalizedStrings.auth.enterOTP
      }
      iconName="enter_otp">
      {forUpdateContact && (
        <View style={styles.resendOTPContainer}>
          <Text style={styles.resendOTP}>
            To update contact, you need to first verify your existing contact by
            entering otp sent to{' '}
            {<Text style={{fontWeight: 'bold'}}>{mobile}</Text>}
          </Text>
        </View>
      )}
      {forUpdateContact && <Spacer height={hp('5%')} />}
      <OTPView onSelect={setOtp} />
      <Spacer height={hp('3')} />
      {seconds > 0 ? (
        <Text style={styles.resendOTP}>
          {AppLocalizedStrings.auth.requestOTPIn}
          <Text style={styles.timer}>
            {minutes < 10 ? '0' + minutes : minutes} :
            {seconds < 10 ? '0' + seconds : seconds}
          </Text>
        </Text>
      ) : (
        ''
      )}

      <Text style={styles.or}>{AppLocalizedStrings.auth.or}</Text>
      <View style={styles.resendOTPContainer}>
        <Text style={styles.resendOTP}>
          {AppLocalizedStrings.auth.dontReceiveOTP}
        </Text>
        <AdaptiveButton
          type="text"
          title={AppLocalizedStrings.auth.requestOn}
          textStyle={styles.requestOnText}
          buttonStyle={styles.requestOnBtn}
          onPress={onRequestHandler}
        />
      </View>
      <Spacer height={hp('3%')} />
      <ResendOTPMode
        setTimeLimit={setTimeLimit}
        minutes={minutes}
        seconds={seconds}
      />
      <AdaptiveButton
        isDisable={otp.length < 4 || verifyOtpLoading}
        title={
          verifyOtpLoading ? (
            <AppLoader loading type="none" />
          ) : fromNewContact ? (
            'Update Contact'
          ) : (
            AppLocalizedStrings.submit
          )
        }
        onPress={onSubmitHandler}
        buttonStyle={styles.btnSubmit}
      />
    </AuthBaseScreen>
  );
};

export default EnterOTPScreen;

const styles = StyleSheet.create({
  btnSubmit: {
    width: '100%',
    marginVertical: hp('5%'),
  },
  btnCondition: {
    ...Style.getTextStyle(12, 'Regular', Colors.darkBlack),
  },
  resendOTP: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  timer: {
    ...Style.getTextStyle(Fonts.getFontSize('headline5'), 'Bold', Colors.blue),
  },
  or: {
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Regular',
      Colors.lightPurple,
    ),
  },
  requestOnText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Bold',
      Colors.darkBlack,
    ),
  },
  requestOnBtn: {
    height: undefined,
  },
  resendOTPContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
