import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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

const LoginScreen: React.FC<AuthStackScreenProps<'LoginScreen'>> = props => {
  const forUpdateContact = props.route?.params?.forUpdateContact;
  const [mobileNo, setMobileNo] = useState(
    forUpdateContact ? '' : '8976733351',
  );

  const loginHandler = async () => {
    const data = await store
      .dispatch(generateOtp({mobile_value: mobileNo, mode: 'sms'}))
      .unwrap();
    if (data.success) {
      Snackbar.show({
        text: 'Otp Sent',
        backgroundColor: Colors.green,
        textColor: Colors.white,
      });
      RootNavigation.navigate('AuthStack', {
        screen: 'EnterOTPScreen',
        params: {
          isLogin: true,
          mobileNumber: mobileNo,
          forUpdateContact: true,
        },
      });
    } else {
      Snackbar.show({
        text: 'Something went wrong',
        backgroundColor: Colors.red,
        textColor: Colors.white,
      });
    }
    RootNavigation.navigate('EnterOTPScreen', {
      isLogin: true,
      mobileNumber: mobileNo,
      fromNewContact: forUpdateContact,
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
      title={
        forUpdateContact
          ? 'Please enter the new mobile number'
          : AppLocalizedStrings.auth.loginWithMobile
      }
      iconName="mobile_number">
      <AdaptiveTextInput
        value={mobileNo}
        keyboardType="number-pad"
        onChangeText={setMobileNo}
        placeholder={AppLocalizedStrings.auth.mobileNo}
        style={styles.input}
      />
      {forUpdateContact && (
        <>
          <Text style={{color: Colors.grey}}>
            An otp will be sent to this number for confirmation
          </Text>
          <Spacer height={hp('15%')} />
        </>
      )}

      <AdaptiveButton
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
            textStyle={styles.btnCondition}
            type="text"
            title={AppLocalizedStrings.auth.termsAndConditions}
            onPress={termsHandler}
          />
        )}
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
