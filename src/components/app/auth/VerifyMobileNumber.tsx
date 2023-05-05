import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {store} from '../../../store/Store';
import {verifyOtp} from '../../../store/thunks/ApiThunks';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import AdaptiveButton from '../../button/AdaptiveButton';
import AppLoader from '../../indicator/AppLoader';
import Spacer from '../../layout/Spacer';
import OTPView from './OTPView';
import ResendOTPMode from './ResendOTPMode';
import {Timer, TimerType} from '../../../utility/timer/TimerClass';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';

type Props = {
  mobile: string;
  onVerified: Function;
};

const VerifyMobileNumber = ({mobile, onVerified}: Props) => {
  const [timer, setTimer] = useState({minutes: 0, seconds: 0});
  const [otp, setOtp] = useState('');
  const [isWhatsappVerified, setIsWhatsappVerified] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);

  function resetTimer() {
    const timer = new Timer();
    timer.startTimer(0.5, (time: TimerType) => {
      setTimer({minutes: time.minutes, seconds: time.seconds});
    });
  }

  useEffect(() => {
    const timer = new Timer();
    timer.startTimer(0.5, (time: TimerType) => {
      setTimer({minutes: time.minutes, seconds: time.seconds});
    });
  }, []);

  return (
    <View>
      <OTPView code={otp} onSelect={setOtp} />
      <Spacer height={hp('2%')} />

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
      <Spacer height={hp('4%')} />

      <AdaptiveButton
        type="text"
        title={AppLocalizedStrings.auth.requestOn}
        textStyle={styles.requestOnText}
        buttonStyle={styles.requestOnBtn}
      />
      <Spacer height={hp('1%')} />

      <ResendOTPMode
        onlyWhatsapp
        minutes={timer.minutes}
        seconds={timer.seconds}
        mobile={mobile.toString()}
        resetTimer={resetTimer}
      />
      <Spacer height={hp(5)} />
      <AdaptiveButton
        loading={verifyOtpLoading}
        isDisable={otp.length < 4 || verifyOtpLoading}
        title={AppLocalizedStrings.submit}
        onPress={async () => {
          setVerifyOtpLoading(true);
          const data = await store
            .dispatch(verifyOtp({mobile: mobile.toString(), otp: otp}))
            .unwrap();

          if (data.success) {
            setIsWhatsappVerified(true);
            onVerified();
          }
          if (!data.success) {
            Snackbar.show({
              text: data?.errors?.message ?? AppLocalizedStrings.somethingWrong,
              duration: 3000,
              backgroundColor: Colors.red,
            });
          }
          setVerifyOtpLoading(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  resendOTP: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.darkBlack,
    ),
    textAlign: 'center',
  },
  timer: {
    ...Style.getTextStyle(Fonts.getFontSize('headline5'), 'Bold', Colors.blue),
    textAlign: 'center',
  },
  input: {
    marginBottom: hp('2.5%'),
    borderWidth: 1,
    borderColor: Colors.primary,
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
});

export default VerifyMobileNumber;
