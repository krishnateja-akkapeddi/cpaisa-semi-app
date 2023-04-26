import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AdaptiveButton from '../../button/AdaptiveButton';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {store} from '../../../store/Store';
import {generateOtp} from '../../../store/thunks/ApiThunks';
import {useDispatch} from 'react-redux';
import {appSlice, openPopup} from '../../../store/slices/AppSlice';
import {Convert} from '../../../utility/converter/Convert';
import RootNavigation from '../../../navigation/RootNavigation';
import {Timer} from '../../../utility/timer/TimerClass';

type Props = {
  minutes: number;
  seconds: number;
  mobile: string;
  resetTimer: Function;
  onlyWhatsapp?: boolean;
};

const ResendOTPMode: React.FC<Props> = ({
  minutes,
  seconds,
  mobile,
  resetTimer,
  onlyWhatsapp = false,
}) => {
  const dispatch = useDispatch();

  const resendOtpHandler = async (mode: 'sms' | 'whatsapp') => {
    const data = await store
      .dispatch(generateOtp({mobile_value: mobile, mode}))
      .unwrap();
    if (data.success) {
      dispatch(
        openPopup({
          message: Convert.capitalize(data.otp),
          title: '',
          type: 'success',
        }),
      );
      const timer = new Timer();

      resetTimer();
    } else {
      dispatch(
        openPopup({
          message: Convert.capitalize(
            data.errors?.mobile ?? AppLocalizedStrings.somethingWrong,
          ),
          title: '',
          type: 'error',
        }),
      );
    }
    resetTimer();
  };

  useEffect(() => {}, [minutes, seconds]);
  return (
    <View style={styles.btnContainer}>
      {!onlyWhatsapp && (
        <AdaptiveButton
          isDisable={minutes > 0 || seconds > 0}
          type="light"
          title={AppLocalizedStrings.auth.sms}
          icon="msg"
          onPress={() => {
            resendOtpHandler('sms');
          }}
          buttonStyle={styles.btnSMS}
          textStyle={styles.btnSMSText}
        />
      )}
      <AdaptiveButton
        isDisable={minutes > 0 || seconds > 0}
        type="light"
        title={AppLocalizedStrings.auth.whatsApp}
        icon="whatsapp"
        onPress={() => {
          resendOtpHandler('whatsapp');
        }}
        buttonStyle={styles.btnWhatsapp}
        textStyle={styles.btnWhatsappText}
      />
      {
        // Todo: Next release
        /* <AdaptiveButton
        isDisable={minutes > 0 || seconds > 0}
        type="light"
        title={AppLocalizedStrings.auth.call}
        icon="call"
        onPress={onCallHandler}
        buttonStyle={styles.btnCall}
        textStyle={styles.btnCallText}
      /> */
      }
    </View>
  );
};

export default ResendOTPMode;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    marginBottom: hp('3%'),
    // justifyContent: 'space-between',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  btnSMS: {
    height: hp('4%'),
    borderColor: Colors.blue,
    paddingHorizontal: wp('2%'),
  },
  btnSMSText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.blue,
    ),
  },
  btnWhatsapp: {
    height: hp('4%'),
    borderColor: Colors.primary,
    paddingHorizontal: wp('2%'),
  },
  btnWhatsappText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.primary,
    ),
  },
  btnCall: {
    height: hp('4%'),
    borderColor: Colors.green,
    paddingHorizontal: wp('2%'),
  },
  btnCallText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.green,
    ),
  },
});
