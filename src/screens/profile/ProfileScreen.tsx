import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import KeyboardAvoidingView from '../../components/keyboard/KeyboardAvoidingView';
import ImageView from '../../components/image/ImageView';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import SVGIcon from '../../utility/svg/SVGIcon';
import BusinessDetailsView from '../../components/app/profile/BusinessDetailsView';
import PersonalDetailsView from '../../components/app/profile/PersonalDetailsView';
import SegmentBar from '../../components/app/SegmentBar';
import {AppLocalizedStrings} from '../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, store} from '../../store/Store';
import {AuthResult, Data} from '../../models/interfaces/AuthResponse';
import {
  appSlice,
  AppSliceState,
  setOpenQrCode,
} from '../../store/slices/AppSlice';

import {ProfileStackScreenProps} from '../../navigation/stack/ProfileStackNavigator';
import {Convert} from '../../utility/converter/Convert';
import Spacer from '../../components/layout/Spacer';
import {notificationHelper} from '../../utility/NotificationHelper';
import GaNoInternetFound from '../../components/GaNoInternetFound';

enum ProfileMode {
  Personal,
  Business,
}

const ProfileScreen: React.FC<
  ProfileStackScreenProps<'ProfileScreen'>
> = props => {
  const dispatch = useDispatch();
  const selected = useSelector<RootState, AuthResult>(
    state => state.auth.authResult,
  );
  const channel_partner = selected?.data?.channel_partner;
  const user = selected?.data?.user;
  const {
    app: {openQrCode},
    api: {internetAvailable},
  } = useSelector<RootState, RootState>(state => state);
  const segmentBarItems = [
    AppLocalizedStrings.profile.personalDetails,
    AppLocalizedStrings.profile.businessDetails,
  ];
  const [mode, setMode] = useState(ProfileMode.Personal);
  const onValueChange = (index: number) => {
    setMode(index);
  };

  useEffect(() => {}, [channel_partner, user, openQrCode]);

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.container}>
          {internetAvailable ? (
            <View>
              {!openQrCode && (
                <View style={styles.upperView}>
                  <ImageView
                    style={styles.profilePic}
                    source={'https://picsum.photos/seed/picsum/200/300'}
                  />
                  <Text style={styles.name}>
                    {Convert.toTitleCase(user?.full_name) ?? ''}
                  </Text>
                  <Spacer height={hp(2)} />
                  <SVGIcon
                    onPress={() => {
                      store.dispatch(setOpenQrCode(true));
                    }}
                    name="qrcode"
                    size={wp(25)}
                    color={Colors.black}
                  />
                </View>
              )}
              <SegmentBar
                containerStyle={styles.bar}
                selectedIndex={mode}
                items={segmentBarItems}
                onValueChange={onValueChange}
              />
              {mode == ProfileMode.Business ? (
                <BusinessDetailsView
                  channelPartner={channel_partner}
                  style={styles.details}
                />
              ) : (
                <PersonalDetailsView
                  user={user}
                  channelPartner={channel_partner}
                  style={styles.details}
                />
              )}
              <Text style={styles.appVersion}>
                {AppLocalizedStrings?.profile?.appVersion +
                  notificationHelper.getDeviceInfo().app_version}
              </Text>
            </View>
          ) : (
            <GaNoInternetFound children={<View />} />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  keyboard: {
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: hp(6),
  },
  container: {
    width: '100%',
    paddingHorizontal: wp(5),
  },
  upperView: {alignItems: 'center'},
  profilePic: {
    marginTop: hp(2),
    width: wp(20),
    aspectRatio: 1,
    borderRadius: wp(20) / 2,
  },
  name: {
    marginTop: hp(2.3),
    ...Style.getTextStyle(Fonts.getFontSize('headline3'), 'Bold', Colors.black),
  },
  company: {
    marginTop: hp(0.2),
    marginBottom: hp(3),
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.black,
    ),
  },
  details: {
    marginTop: hp(3),
    marginBottom: hp(5),
  },
  bar: {
    marginTop: hp(4),
  },
  appVersion: {
    alignSelf: 'flex-end',
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.grey,
    ),
    marginBottom: hp(3),
  },
});
