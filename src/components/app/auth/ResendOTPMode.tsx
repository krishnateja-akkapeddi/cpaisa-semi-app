import {StyleSheet, View} from 'react-native';
import React from 'react';
import AdaptiveButton from '../../button/AdaptiveButton';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

type Props = {
  minutes: number;
  seconds: number;
  setTimeLimit: React.Dispatch<React.SetStateAction<number>>;
};
const ResendOTPMode: React.FC<Props> = ({minutes, seconds, setTimeLimit}) => {
  const onSMSHandler = () => {
    setTimeLimit(2);
  };
  const onWhatsAppHandler = () => {
    setTimeLimit(2);
  };
  const onCallHandler = () => {
    setTimeLimit(2);
  };

  return (
    <View style={styles.btnContainer}>
      <AdaptiveButton
        isDisable={minutes > 0 || seconds > 0}
        type="light"
        title={AppLocalizedStrings.auth.sms}
        icon="msg"
        onPress={onSMSHandler}
        buttonStyle={styles.btnSMS}
        textStyle={styles.btnSMSText}
      />
      <AdaptiveButton
        isDisable={minutes > 0 || seconds > 0}
        type="light"
        title={AppLocalizedStrings.auth.whatsApp}
        icon="whatsapp"
        onPress={onWhatsAppHandler}
        buttonStyle={styles.btnWhatsapp}
        textStyle={styles.btnWhatsappText}
      />
      <AdaptiveButton
        isDisable={minutes > 0 || seconds > 0}
        type="light"
        title={AppLocalizedStrings.auth.call}
        icon="call"
        onPress={onCallHandler}
        buttonStyle={styles.btnCall}
        textStyle={styles.btnCallText}
      />
    </View>
  );
};

export default ResendOTPMode;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    marginBottom: hp('3%'),
    justifyContent: 'space-between',
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
