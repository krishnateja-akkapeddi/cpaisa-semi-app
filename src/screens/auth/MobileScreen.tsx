import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import RootNavigation from '../../navigation/RootNavigation';
import Colors from '../../theme/Colors';
import {hp} from '../../utility/responsive/ScreenResponsive';
import Validator from '../../utility/validation/Validator';
import AuthBaseScreen from './AuthBaseScreen';

const MobileScreen = () => {
  const [mobileNo, setMobileNo] = useState('7737548212');

  const getOTPHandler = () => {
    RootNavigation.navigate('EnterOTPScreen');
  };

  const termsHandler = () => {
    RootNavigation.navigate('TermsConditionsScreen');
  };
  return (
    <AuthBaseScreen
      title={AppLocalizedStrings.auth.enterMobileNo}
      iconName="mobile_number">
      <AdaptiveTextInput
        value={mobileNo}
        keyboardType="phone-pad"
        onChangeText={setMobileNo}
        placeholder={AppLocalizedStrings.auth.mobileNo}
        style={styles.input}
      />
      <AdaptiveButton
        isDisable={!Validator.isValidMobileNumber(mobileNo)}
        title={AppLocalizedStrings.auth.getOTP}
        onPress={getOTPHandler}
        buttonStyle={styles.btnOTP}
      />
      <View style={styles.viewBottom}>
        <AdaptiveButton
          textStyle={styles.btnCondition}
          type="text"
          title={AppLocalizedStrings.auth.termsAndConditions}
          onPress={termsHandler}
        />
      </View>
    </AuthBaseScreen>
  );
};

export default MobileScreen;

const styles = StyleSheet.create({
  input: {
    marginBottom: hp('2.5%'),
  },
  btnOTP: {
    width: '100%',
  },
  btnCondition: {
    ...Style.getTextStyle(12, 'Regular', Colors.darkBlack),
  },
  viewBottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
