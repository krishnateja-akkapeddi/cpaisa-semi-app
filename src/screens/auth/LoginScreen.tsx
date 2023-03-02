import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import Style from '../../constants/Style';
import RootNavigation from '../../navigation/RootNavigation';
import Colors from '../../theme/Colors';
import Validator from '../../utility/validation/Validator';
import AuthBaseScreen from './AuthBaseScreen';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';

const LoginScreen = () => {
  const [mobileNo, setMobileNo] = useState('8976733351');
  const loginHandler = async () => {
    RootNavigation.navigate('EnterOTPScreen', {
      isLogin: true,
      mobileNumber: mobileNo,
    });
  };

  const termsHandler = () => {
    RootNavigation.navigate('TermsConditionsScreen', {
      isLogin: true,
      mobileNumber: mobileNo,
    });
  };

  const helpHandler = () => {};

  return (
    <AuthBaseScreen
      title={AppLocalizedStrings.auth.loginWithMobile}
      iconName="mobile_number">
      <AdaptiveTextInput
        value={mobileNo}
        keyboardType="number-pad"
        onChangeText={setMobileNo}
        placeholder={AppLocalizedStrings.auth.mobileNo}
        style={styles.input}
      />

      <AdaptiveButton
        isDisable={!Validator.isValidMobileNumber(mobileNo)}
        title={
          AppLocalizedStrings.auth.login +
          ' / ' +
          AppLocalizedStrings.auth.register
        }
        onPress={loginHandler}
        buttonStyle={styles.btn}
      />
      <View style={styles.viewBottom}>
        <AdaptiveButton
          textStyle={styles.btnCondition}
          type="text"
          title={AppLocalizedStrings.auth.termsAndConditions}
          onPress={termsHandler}
        />
        <AdaptiveButton
          icon="info"
          iconColor={Colors.black}
          iconSize={wp(3)}
          textStyle={styles.btnCondition}
          type="text"
          title={AppLocalizedStrings.auth.help}
          onPress={helpHandler}
        />
      </View>
    </AuthBaseScreen>
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
  },
  line: {
    backgroundColor: Colors.lightPurple,
    height: 1,
    width: '100%',
    marginVertical: hp('3.5%'),
  },
});
