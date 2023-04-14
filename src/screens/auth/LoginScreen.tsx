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
import {useDispatch} from 'react-redux';
import {openPopup} from '../../store/slices/AppSlice';
import {Convert} from '../../utility/converter/Convert';
import Icon from 'react-native-vector-icons/AntDesign';

const LoginScreen: React.FC<AuthStackScreenProps<'LoginScreen'>> = props => {
  const forUpdateContact = props.route?.params?.forUpdateContact;
  const contactType = props.route?.params?.contactType;
  const dispatch = useDispatch();
  const [mobileNo, setMobileNo] = useState(
    forUpdateContact ? '' : '7396730681',
  );

  const loginHandler = async () => {
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
        dispatch(
          openPopup({
            title: 'Otp',
            type: 'success',
            message:
              Convert.capitalize(data?.otp) ?? AppLocalizedStrings.otpSent,
          }),
        );
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
        RootNavigation.navigate('EnterUpdateContactOtpScreen', {
          isLogin: true,
          mobileNumber: mobileNo,
          fromNewContact: forUpdateContact,
          contactType: contactType,
        });
      } else {
        RootNavigation.navigate('EnterOTPScreen', {
          isLogin: false,
          mobileNumber: mobileNo,
        });
        // RootNavigation.navigate('EnterGSTScreen');
      }
    } catch (error) {
      console.log('FROM_LOGOM', error);
    }
    // RootNavigation.navigate('EnterOTPScreen');
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
    <AuthBaseScreen
      title={
        forUpdateContact
          ? 'Please enter the new mobile number'
          : AppLocalizedStrings.auth.loginWithMobile
      }
      iconName="mobile_number">
      {!Validator.isValidMobileNumber(mobileNo) && (
        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon color={Colors.red} name="infocirlceo" />
          <Spacer width={wp(1)} />
          <View>
            <Text style={{textAlign: 'left', color: Colors.red}}>
              {AppLocalizedStrings.validMobile}
            </Text>
          </View>
          <Spacer height={hp(4)} />
        </View>
      )}

      <AdaptiveTextInput
        value={mobileNo}
        keyboardType="number-pad"
        onChangeText={e => {
          setMobileNo(e);
        }}
        placeholder={AppLocalizedStrings.auth.mobileNo}
        style={{
          ...styles.input,
          borderColor:
            mobileNo.length >= 10 && !Validator.isValidMobileNumber(mobileNo)
              ? Colors.red
              : Colors.primary,
        }}
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
