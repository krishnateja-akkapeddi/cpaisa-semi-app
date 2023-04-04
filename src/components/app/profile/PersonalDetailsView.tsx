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
import {generateOtp} from '../../../store/thunks/ApiThunks';

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
import RootNavigation from '../../../navigation/RootNavigation';
import {useDispatch} from 'react-redux';
import {appSlice} from '../../../store/slices/AppSlice';

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
  const [emailId, setEmailId] = useState(user.email_id);
  const [mobileNo, setMobileNo] = useState(user?.mobile);
  const [whatsAppNo, setWhatsAppNo] = useState(user?.whats_app_number);
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [generatingOtp, setgeneratingOtp] = useState(false);
  const dispatch = useDispatch();

  const styleContainer = useMemo(() => [styles.container, style], [style]);
  return (
    <View style={[styleContainer]}>
      <ProfileTextInput
        onEditPress={() => {
          dispatch(
            appSlice.actions.openPopup({
              message: 'Testing',
              title: 'Test title',
              type: 'success',
            }),
          );
        }}
        title={AppLocalizedStrings.profile.emailId}
        value={emailId}
        onChangeText={setEmailId}
      />

      <Spacer height={kSpacing} />

      <ProfileTextInput
        isEditable
        loading={generatingOtp}
        title={AppLocalizedStrings.profile.mobileNo}
        value={user?.mobile ?? ''}
        onChangeText={setMobileNo}
        onEditPress={async () => {
          const data = await store
            .dispatch(generateOtp({mobile_value: mobileNo, mode: 'sms'}))
            .unwrap();

          if (data.success) {
            Snackbar.show({
              text: 'Otp Sent',
              backgroundColor: Colors.green,
              textColor: Colors.white,
            });
          }
          RootNavigation.navigate('AuthStack', {
            screen: 'EnterOTPScreen',
            params: {
              forUpdateContact: true,
              isLogin: true,
              mobileNumber: mobileNo,
              contactType: 'mobile',
            },
          });
        }}
      />

      <Spacer height={kSpacing} />

      <ProfileTextInput
        isEditable
        title={AppLocalizedStrings.profile.whatsAppNo}
        value={user?.whats_app_number ?? ''}
        onChangeText={setWhatsAppNo}
        onEditPress={async () => {
          const data = await store
            .dispatch(generateOtp({mobile_value: whatsAppNo, mode: 'whatsapp'}))
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
                forUpdateContact: true,
                isLogin: true,
                mobileNumber: whatsAppNo,
                contactType: 'whatsapp',
              },
            });
          } else {
            Snackbar.show({
              text: data.errors?.mobile ?? '',
              backgroundColor: Colors.red,
            });
          }
        }}
      />

      <Spacer height={kSpacing} />

      <ProfileTextInput
        title={AppLocalizedStrings.profile?.address}
        value={address?.line ?? '' + address?.state?.name ?? ''}
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
