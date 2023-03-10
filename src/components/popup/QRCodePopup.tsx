import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import PopupContainer from './PopupContainer';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import AdaptiveButton from '../button/AdaptiveButton';
import useMinutesAndSecondsFromUnixTime from '../../utility/custom-hooks/UseCountdown';
import {useDispatch, useSelector} from 'react-redux';
import {appSlice, AppSliceState} from '../../store/slices/AppSlice';
import {QrCodeExpiryStatus} from '../../constants/QrCodeExpiryStatus';
import {RootState} from '../../store/Store';
import AppLoader from '../indicator/AppLoader';

interface QRCodePopupProps {
  loadingQr: boolean;
  qrMessage: string;
  onQRCodeHandler: (fromRegenerate?: boolean) => Promise<void>;
}

const QRCodePopup: React.FC<QRCodePopupProps> = props => {
  const {
    app: {openQrCode, isQrCodeExpired, qrExpiry, qrCodeData},
  } = useSelector<RootState, RootState>(state => state);
  const dispatch = useDispatch();
  const [minutes, seconds] = useMinutesAndSecondsFromUnixTime({
    unixTime: qrExpiry ? qrExpiry : 10,
  });

  // React.useEffect(() => {
  //   console.log('QR_EXPDATE', qrExpiry);
  //   if (!props.qrExpiry && !props.qrImage) {
  //     setLoading(true);
  //   }
  // }, [props]);

  React.useEffect(() => {
    if (seconds < 0) {
      dispatch(appSlice.actions.setIsQrCodeExpired(QrCodeExpiryStatus.EXPIRED));
    }
  }, [minutes, seconds, openQrCode, qrCodeData]);
  useEffect(() => {}, [qrExpiry]);
  return (
    <PopupContainer showHeader={false}>
      <View style={styles.main}>
        {isQrCodeExpired !==
          (QrCodeExpiryStatus.EXPIRED || QrCodeExpiryStatus.DEFAULT) && (
          <>
            <Image
              style={{
                width: wp('70%'),
                height: wp('75%'),
                resizeMode: 'contain',
              }}
              source={{uri: qrCodeData}}
            />
            <Text style={styles.info}>{props.qrMessage}</Text>
          </>
        )}
        {isQrCodeExpired ===
        (QrCodeExpiryStatus.EXPIRED || QrCodeExpiryStatus.DEFAULT) ? (
          <Text style={styles.codeExpire}>
            {AppLocalizedStrings.QRCodePopup.codeExpired}
          </Text>
        ) : (
          <Text style={styles.codeExpire}>
            {AppLocalizedStrings.QRCodePopup.codeExpire}
            {!qrExpiry ? (
              <Text style={styles.timer}>Loading...</Text>
            ) : (
              <Text style={styles.timer}>
                {minutes < 10 ? '0' + minutes : minutes}:
                {seconds < 10 ? '0' + seconds : seconds}
              </Text>
            )}
          </Text>
        )}
        <AdaptiveButton
          buttonStyle={styles.dismiss}
          title={AppLocalizedStrings.dimiss}
          onPress={() => dispatch(appSlice.actions.setOpenQrCode(false))}
        />
        {isQrCodeExpired ===
          (QrCodeExpiryStatus.EXPIRED || QrCodeExpiryStatus.DEFAULT) && (
          <AdaptiveButton
            isDisable={props.loadingQr}
            buttonStyle={styles.dismiss}
            title={
              props.loadingQr ? (
                <AppLoader type="none" color={Colors.white} loading />
              ) : (
                AppLocalizedStrings.QRCodePopup.regenerate
              )
            }
            onPress={async () => await props.onQRCodeHandler(true)}
          />
        )}
      </View>
    </PopupContainer>
  );
};

export default QRCodePopup;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('6%'),
  },
  info: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline6'),
      'Regular',
      Colors.darkBlack,
    ),
    textAlign: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
  },
  codeExpire: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Medium',
      Colors.black,
    ),
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  timer: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Medium',
      Colors.primary,
    ),
  },
  dismiss: {
    marginTop: hp('2.5%'),
    paddingHorizontal: wp('15%'),
  },
});
