import {
  Animated,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import ProfileTextInput from './ProfileTextInput';
import Spacer from '../../layout/Spacer';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {ChannelPartner, User} from '../../../models/interfaces/AuthResponse';
import {store} from '../../../store/Store';
import {
  generateOtp,
  updateContactInfo,
  verifyOtp,
} from '../../../store/thunks/ApiThunks';
import {
  contactType,
  modeType,
  UpdateContactParams,
} from '../../../domain/usages/UpdateContact';
import Snackbar from 'react-native-snackbar';
import Colors from '../../../theme/Colors';
import PopupContainer from '../../popup/PopupContainer';
import OTPView from '../auth/OTPView';
import {
  GenerateOtpMode,
  GenerateOtpParams,
} from '../../../domain/usages/GenerateOtp';
import AdaptiveButton from '../../button/AdaptiveButton';
import ResendOTPMode from '../auth/ResendOTPMode';
import useTimer from '../../../utility/timer/Timer';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import AdaptiveTextInput from '../../input/AdaptiveTextInput';
import Validator from '../../../utility/validation/Validator';

interface PersonalDetailsViewProps {
  style?: ViewStyle;
  channelPartner: ChannelPartner;
  user: User;
}

const kSpacing = Platform.OS == 'android' ? hp(2.5) : hp(2.5);
const PersonalDetailsView: React.FC<PersonalDetailsViewProps> = ({
  style,
  channelPartner,
  user,
}) => {
  const address = channelPartner?.address;
  const [emailId, setEmailId] = useState('sandeepsuthar4582@gmail.com');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timeLimit, setTimeLimit] = useState(2);
  const [seconds, minutes] = useTimer(timeLimit);
  const [updatingContact, setUpdatingContact] = useState(false);
  const [mobileNo, setMobileNo] = useState(user?.mobile);
  const [whatsAppNo, setWhatsAppNo] = useState(user?.whats_app_number);
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [otp, setOtp] = useState('');
  const [newOtp, setNewOtp] = useState('');
  const [generatingOtp, setgeneratingOtp] = useState(false);
  const [newMob, setNewMob] = useState<string>('');
  const [oldOtpVerified, setOldOtpVerified] = useState(false);
  const [newOtpVerified, setNewOtpVerified] = useState(false);
  const [newOtpSent, setNewOtpSent] = useState(false);

  const resetState = () => {
    setOtp('');
    setOldOtpVerified(false);
    setNewOtpVerified(false);
    setNewOtpSent(false);
    setNewMob('');
    setMobileNo('');
  };

  const handleContactUpdate = async (key: contactType, mode: modeType) => {
    setUpdatingContact(true);
    const params: UpdateContactParams.params = {
      mode: mode,
      [key]:
        mode === 'whatsapp'
          ? whatsAppNo.toString()
          : mode === 'mobile'
          ? newMob
          : emailId.toString(),
      otp: parseInt(newOtp),
    };

    const data = await store.dispatch(updateContactInfo(params)).unwrap();
    if (data.success) {
      Snackbar.show({
        text: data.message,
        backgroundColor: Colors.green,
        textColor: Colors.white,
      });
      setIsOtpSent(true);
    } else {
      Snackbar.show({
        text: data.errors
          ? data.errors?.message
          : AppLocalizedStrings.somethingWrong,
        backgroundColor: Colors.red,
        textColor: Colors.white,
      });
    }
    setUpdatingContact(false);
  };

  const getOtp = async (
    mode: GenerateOtpMode,
    mobile: string,
    fromNewNumber?: boolean,
  ) => {
    setgeneratingOtp(true);
    const params: GenerateOtpParams.params = {
      mobile_value: mobile,
      mode,
    };
    const data = await store.dispatch(generateOtp(params)).unwrap();
    if (data.success) {
      Snackbar.show({
        text: 'Otp Sent',
        backgroundColor: Colors.green,
        textColor: Colors.white,
      });
      fromNewNumber ? setNewOtpSent(true) : setIsOtpSent(true);
    } else {
      Snackbar.show({
        text: 'Something went wrong',
        backgroundColor: Colors.red,
        textColor: Colors.white,
      });
    }
  };

  const onSubmitHandler = async (
    mobileNumber: string,
    otp: string,
    fromNewNumber?: boolean,
  ) => {
    console.log(mobileNumber, otp);

    try {
      let params = {
        mobile: fromNewNumber ? newMob : mobileNumber,
        otp: fromNewNumber ? newOtp : otp,
      };

      const data = await store.dispatch(verifyOtp(params)).unwrap();

      if (data?.success) {
        Snackbar.show({
          text: 'Otp verification successfull!',
          backgroundColor: Colors.green,
          textColor: Colors.white,
        });
        setOldOtpVerified(true);
        fromNewNumber && setNewOtpVerified(true);
      } else {
        Snackbar.show({
          text: data?.errors
            ? data?.errors?.message
            : 'Otp verification failed',
          backgroundColor: Colors.red,
          textColor: Colors.white,
        });
      }
    } catch (error) {
      console.error('ERROR_FROM_OTP_SCREEN', error);
    }
  };

  const styleContainer = useMemo(() => [styles.container, style], [style]);
  return (
    <View style={[styleContainer]}>
      <ProfileTextInput
        title={AppLocalizedStrings.profile.emailId}
        value={emailId}
        onChangeText={setEmailId}
      />

      {isOtpSent && (
        <PopupContainer
          onDismiss={() => {
            setIsOtpSent(false);
          }}
          showDismiss={true}
          title={
            oldOtpVerified
              ? 'Enter new number'
              : AppLocalizedStrings.auth.enterOTP
          }
          children={
            <View>
              {oldOtpVerified ? (
                <View>
                  <Text>NEW OTP</Text>
                  <AdaptiveTextInput
                    value={newMob}
                    style={{
                      borderColor: !Validator.isValidMobileNumber(newMob)
                        ? Colors.red
                        : Colors.primary,
                    }}
                    keyboardType="decimal-pad"
                    onChangeText={setNewMob}
                    placeholder={AppLocalizedStrings.enterMobile}
                  />
                  {!Validator.isValidMobileNumber(newMob) && (
                    <Text style={{color: Colors.red}}>
                      {AppLocalizedStrings.enterValidNumber}
                    </Text>
                  )}
                  <Spacer height={hp('5%')} />
                  {newOtpSent && <OTPView onSelect={setNewOtp} />}
                  <AdaptiveButton
                    onPress={() => {
                      !newOtpSent
                        ? getOtp('sms', newMob, true).then(() => {
                            setIsOtpSent(true);
                          })
                        : handleContactUpdate('mobile_value', 'mobile');
                    }}
                    isDisable={
                      !Validator.isValidMobileNumber(newMob) || !oldOtpVerified
                    }
                    iconColor={Colors.white}
                    title={newOtpSent ? 'Updated contact' : 'Generate Otp'}
                  />
                </View>
              ) : (
                <View>
                  <Text>Old OTP</Text>
                  <OTPView onSelect={setOtp} />
                  <Spacer height={hp('5%')} />

                  <AdaptiveButton
                    onPress={() => {
                      onSubmitHandler(mobileNo, otp);
                    }}
                    iconColor={Colors.white}
                    title={AppLocalizedStrings.submit}
                  />
                  <Spacer height={hp('1%')} />
                  <Animated.View style={styles.resendOTPContainer}>
                    <Text style={styles.resendOTP}>
                      {AppLocalizedStrings.auth.dontReceiveOTP}
                    </Text>
                    <Spacer height={hp('10%')} />
                  </Animated.View>
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
                  <Spacer height={hp('2%')} />
                  <ResendOTPMode
                    setTimeLimit={setTimeLimit}
                    minutes={minutes}
                    seconds={seconds}
                  />
                </View>
              )}
            </View>
          }
        />
      )}

      <Spacer height={kSpacing} />

      <ProfileTextInput
        loading={generatingOtp}
        title={AppLocalizedStrings.profile.mobileNo}
        value={user?.mobile}
        onChangeText={setMobileNo}
        handleUpdateContact={handleContactUpdate}
        onEditPress={() => {
          getOtp('sms', mobileNo);
        }}
      />

      <Spacer height={kSpacing} />

      <ProfileTextInput
        title={AppLocalizedStrings.profile.whatsAppNo}
        value={user?.whats_app_number}
        onChangeText={setWhatsAppNo}
      />

      <Spacer height={kSpacing} />

      <ProfileTextInput
        title={AppLocalizedStrings.profile?.address}
        value={
          address?.line &&
          address?.line + address?.state?.name &&
          address?.state?.name
        }
        onChangeText={setUpdatedAddress}
      />
    </View>
  );
};

export default PersonalDetailsView;

const styles = StyleSheet.create({
  container: {},
  resendOTP: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  resendOTPContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    ...Style.getTextStyle(Fonts.getFontSize('headline5'), 'Bold', Colors.blue),
  },
});
