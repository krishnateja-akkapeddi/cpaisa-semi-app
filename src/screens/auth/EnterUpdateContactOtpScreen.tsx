import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import Snackbar from 'react-native-snackbar';
import OTPView from '../../components/app/auth/OTPView';
import ResendOTPMode from '../../components/app/auth/ResendOTPMode';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import Spacer from '../../components/layout/Spacer';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import RootNavigation from '../../navigation/RootNavigation';
import {AuthStackScreenProps} from '../../navigation/stack/AuthStackNavigator';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import AuthBaseScreen from './AuthBaseScreen';
import {hp} from '../../utility/responsive/ScreenResponsive';
import useTimer from '../../utility/timer/Timer';
import {store} from '../../store/Store';
import {updateContactInfo} from '../../store/thunks/ApiThunks';
import AppLoader from '../../components/indicator/AppLoader';
import {UpdateContactParams} from '../../domain/usages/UpdateContact';
import {useDispatch} from 'react-redux';
import {appSlice, clearAppSlice, openPopup} from '../../store/slices/AppSlice';
import {Timer, TimerType} from '../../utility/timer/TimerClass';
import {clearAuthSlice} from '../../store/slices/AuthSlice';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';
import {Convert} from '../../utility/converter/Convert';
import {pickMessageFromErrors} from '../../utility/ErrorPicker';

const EnterUpdateContactOtpScreen: React.FC<
  AuthStackScreenProps<'EnterUpdateContactOtpScreen'>
> = props => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [timeLimit, setTimeLimit] = useState(0.5);
  const [timer, setTimer] = useState({minutes: 0, seconds: 0});
  const onRequestHandler = () => {};
  const [clearInput, setClearInput] = useState(false);
  const mobile = props.route.params?.mobileNumber;
  const contactType = props.route.params?.contactType;

  function resetTimer() {
    const timer = new Timer();
    timer.startTimer(0.5, (time: TimerType) => {
      setTimer({minutes: time.minutes, seconds: time.seconds});
    });
  }

  const logoutHandler = () => {
    Alert.alert('', AppLocalizedStrings.alert.logout, [
      {
        text: AppLocalizedStrings.no,
        style: 'cancel',
      },
      {
        style: 'destructive',
        text: AppLocalizedStrings.yes,
        onPress: async () => {
          await SharedPreference.shared.removeItem(kSharedKeys.userDetails);
          await SharedPreference.shared.removeItem(kSharedKeys.authToken);
          dispatch(appSlice.actions.resetState());
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'EnterUpdateContactOtpScreen',
                params: {screen: 'LoginScreen'},
              },
            ],
          });
        },
      },
    ]);
  };

  const onSubmitHandler = async () => {
    setVerifyOtpLoading(true);
    try {
      let params: UpdateContactParams.params = {} as UpdateContactParams.params;
      params.mode = contactType;
      if (contactType === 'mobile') {
        params.mobile_value = parseInt(mobile);
      } else {
        params.whatsapp_value = parseInt(mobile);
      }
      params.otp = parseInt(otp);

      const updatedContact = await store
        .dispatch(updateContactInfo(params))
        .unwrap();
      if (updatedContact.success) {
        setOtp('');
        dispatch(
          appSlice.actions.openPopup({
            message: updatedContact.message,
            title: '',
            type: 'success',
          }),
        );
        store.dispatch(clearAppSlice());
        store.dispatch(clearAuthSlice());
        logoutHandler();
        setClearInput(true);
        setTimeout(() => {
          () => {
            setClearInput(false);
          };
        }, 1000);
      } else {
        store.dispatch(
          openPopup({
            title: 'Otp',
            type: 'error',
            message: updatedContact?.errors
              ? pickMessageFromErrors(updatedContact.errors)
              : AppLocalizedStrings.otpSent,
            onSubmit: () => {
              return RootNavigation.navigate('ProfileScreen');
            },
          }),
        );

        setVerifyOtpLoading(false);
        setClearInput(true);
        setTimeout(() => {
          () => {
            setClearInput(false);
          };
        }, 1000);
      }
      setOtp('');
      setVerifyOtpLoading(false);
    } catch (error) {
      console.error('ERROR_FROM_OTP_SCREEN', error);
      setVerifyOtpLoading(false);
    }

    setVerifyOtpLoading(false);
  };

  useEffect(() => {
    const timer = new Timer();
    timer.startTimer(0.5, (time: TimerType) => {
      setTimer({minutes: time.minutes, seconds: time.seconds});
    });
  }, []);

  return (
    <AuthBaseScreen
      title={'Enter the otp to update your contact'}
      iconName="enter_otp">
      <OTPView clearInput={clearInput} code={otp} onSelect={setOtp} />

      <Spacer height={hp('3')} />
      {timer.seconds > 0 ? (
        <Text style={styles.resendOTP}>
          {AppLocalizedStrings.auth.requestOTPIn}
          <Text style={styles.timer}>
            {timer.minutes < 10 ? '0' + timer.minutes : timer.minutes} :
            {timer.seconds < 10 ? '0' + timer.seconds : timer.seconds}
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
        minutes={timer.minutes}
        seconds={timer.seconds}
        mobile={mobile}
        resetTimer={resetTimer}
      />
      <AdaptiveButton
        isDisable={otp.length < 4 || verifyOtpLoading}
        title={
          verifyOtpLoading ? (
            <AppLoader type="none" loading />
          ) : (
            'Update Contact'
          )
        }
        onPress={onSubmitHandler}
        buttonStyle={styles.btnSubmit}
      />
    </AuthBaseScreen>
  );
};

export default EnterUpdateContactOtpScreen;

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
