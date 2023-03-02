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
import {Data} from '../../models/interfaces/AuthResponse';
import {appSlice, AppSliceState} from '../../store/slices/AppSlice';
import QRCodePopup from '../../components/popup/QRCodePopup';
import {QrCodeExpiryStatus} from '../../constants/QrCodeExpiryStatus';
import RootNavigation from '../../navigation/RootNavigation';
import {generateQrCode} from '../../store/thunks/ApiThunks';
import {Convert} from '../../utility/converter/Convert';
import getLocation from '../../utility/custom-hooks/GetLocation';
import {PermissionManager} from '../../utility/permissions/PermissionManager';

enum ProfileMode {
  Personal,
  Business,
}

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [qrLoading, setQrLoading] = useState(false);
  const selected = useSelector<RootState, Data>(state => state?.auth?.userInfo);
  const channel_partner = selected?.channel_partner;
  const user = selected?.user;
  const {isQrCodeExpired, openQrCode, qrExpiry, qrCodeData} = useSelector<
    RootState,
    AppSliceState
  >(state => state.app);
  const segmentBarItems = [
    AppLocalizedStrings.profile.personalDetails,
    AppLocalizedStrings.profile.businessDetails,
  ];
  const [mode, setMode] = useState(ProfileMode.Personal);
  const onValueChange = (index: number) => {
    setMode(index);
  };
  const [qrMessage, setQrMessage] = useState('');

  const onQRCodeHandler = async (fromRegenerate?: boolean) => {
    setQrLoading(true);
    // if (fromRegenerate) {
    //   dispatch(appSlice.actions.setOpenQrCode(true));
    // }

    if (fromRegenerate && isQrCodeExpired !== QrCodeExpiryStatus.ACTIVE) {
      const locationInfo = await getLocation();
      const locationPermission = await PermissionManager?.checkPermission(
        'location',
      );
      if (!locationPermission) {
        RootNavigation.navigate('LocationPermissionScreen');
      }

      const params = {
        lat: locationInfo?.latitude,
        long: locationInfo?.longitude,
      };
      const data = await store.dispatch(generateQrCode(params)).unwrap();
      dispatch(
        appSlice.actions.setQrCodeData(
          Convert.base64ToFileConverter(data.qr_code.image),
        ),
      );
      setQrMessage(data.qr_code.message);
      dispatch(appSlice.actions.setQrExpiryDate(parseInt(data.qr_code.expiry)));
      dispatch(appSlice.actions.setIsQrCodeExpired(QrCodeExpiryStatus.ACTIVE));
      dispatch(appSlice.actions.setOpenQrCode(true));
    } else {
      dispatch(appSlice.actions.setOpenQrCode(true));
    }
    setQrLoading(false);
  };

  useEffect(() => {}, [channel_partner, user, isQrCodeExpired, openQrCode]);

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.container}>
          <View style={styles.upperView}>
            <ImageView
              style={styles.profilePic}
              source={'https://picsum.photos/seed/picsum/200/300'}
            />
            <Text style={styles.name}>{user?.full_name}</Text>
            <Text style={styles.company}>
              {channel_partner?.address?.line
                ? channel_partner?.address?.line
                : '' + ', ' + channel_partner?.address?.state?.name}
            </Text>

            <SVGIcon
              onPress={() => {
                dispatch(appSlice.actions.setOpenQrCode(true));
              }}
              name="qrcode"
              size={wp(25)}
              color={Colors.black}
            />

            {openQrCode && (
              <QRCodePopup
                loadingQr={qrLoading}
                onQRCodeHandler={onQRCodeHandler}
                qrMessage={qrMessage}
              />
            )}
          </View>
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
            {AppLocalizedStrings?.profile?.appVersion + 'v2.6'}
          </Text>
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
    ...Style.getTextStyle(Fonts.getFontSize('headline2'), 'Bold', Colors.black),
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
