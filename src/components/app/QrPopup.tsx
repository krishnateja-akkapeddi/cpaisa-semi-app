import {Image, Platform, StyleSheet, Text, View, AppState} from 'react-native';
import React, {useEffect} from 'react';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import AdaptiveButton from '../button/AdaptiveButton';
import {useSelector} from 'react-redux';
import {
  openPopup,
  setOpenQrCode,
  setQrCodeData,
  setQrExpiryDate,
  setQrLoading,
  setQrMessage,
} from '../../store/slices/AppSlice';
import {RootState, store} from '../../store/Store';
import PopupContainer from '../popup/PopupContainer';
import RootNavigation from '../../navigation/RootNavigation';
import {generateQrCode} from '../../store/thunks/ApiThunks';
import {Convert} from '../../utility/converter/Convert';
import getLocation from '../../utility/custom-hooks/GetLocation';
import {PermissionManager} from '../../utility/permissions/PermissionManager';
import {
  PermissionType,
  PlatformType,
} from '../../utility/permissions/PermissionsList';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Spacer from '../layout/Spacer';
import {TimerType} from '../../utility/timer/TimerClass';
import Animated from 'react-native-reanimated';

interface QRCodePopupProps {
  timerState: TimerType;
  resetTimer: Function;
}

const QRPopup: React.FC<QRCodePopupProps> = ({timerState, resetTimer}) => {
  const appState = React.useRef(AppState.currentState);
  const [isAppInBackground, setIsAppInBackground] = React.useState(false);

  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current,
  );
  const {
    app: {qrExpiry, qrCodeData, qrMessage, qrLoading},
  } = useSelector<RootState, RootState>(state => state);

  const confirmLocation = async (): Promise<boolean> => {
    const locationPermission = await PermissionManager?.checkPermissions(
      PermissionType.LOCATION,
    );
    if (!locationPermission) {
      store.dispatch(setOpenQrCode(false));
      store.dispatch(setQrLoading(false));
      RootNavigation.navigate('LocationPermissionScreen', {
        fromQrCodeHeader: true,
        isLogin: true,
      });
      return false;
    } else {
      if (Platform.OS === PlatformType.ANDROID) {
        const data = await PermissionManager.locationEnabler();
        if (!data) {
          store.dispatch(
            openPopup({
              title: 'Location Permission',
              message: 'You must enable the location to generate the QR code',
              type: 'plain',
            }),
          );
          store.dispatch(setOpenQrCode(false));
          return false;
        } else {
          return true;
        }
      }
      return true;
    }
  };

  const onQRCodeHandler = async (fromRegenerate?: boolean) => {
    store.dispatch(setQrLoading(true));
    await confirmLocation().then(async response => {
      if (response) {
        console.log('QR_COEUR_DRES', response);

        const locationInfo = await getLocation();
        const params = {
          lat: locationInfo?.latitude,
          long: locationInfo?.longitude,
        };
        const data = await store.dispatch(generateQrCode(params)).unwrap();
        console.log('CODE_DATa', data);
        store.dispatch(
          setQrCodeData(Convert.base64ToFileConverter(data.qr_code.image)),
        );
        store.dispatch(setQrExpiryDate(parseInt(data.qr_code.expiry)));
        store.dispatch(setQrMessage(data.qr_code.message));
        setQrMessage(data.qr_code.message);
        await resetTimer(
          Math.ceil(parseInt(data.qr_code.expiry) - Date.now() / 1000),
        );
      }
    });

    store.dispatch(setQrLoading(false));
  };

  async function reseTimer() {
    await resetTimer(Math.ceil(new Date().getTime()));
  }

  useEffect(() => {
    console.log('FER93dd', timerState);

    if (timerState.seconds <= 0 && timerState.minutes <= 0) {
      onQRCodeHandler();
    }
  }, [timerState]);

  useEffect(() => {
    console.log('', qrExpiry);
  }, [qrExpiry, timerState, qrCodeData]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsAppInBackground(true);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  console.log(appState.current);

  return (
    <PopupContainer showHeader={false}>
      <View style={styles.main}>
        {qrLoading ? (
          <View>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item height={hp(40)} width={wp(80)} />
            </SkeletonPlaceholder>
            <Spacer height={hp(2)} />
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item height={hp(1)} width={wp(70)} />
            </SkeletonPlaceholder>
            <Spacer height={hp(1)} />
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item height={hp(1)} width={wp(60)} />
            </SkeletonPlaceholder>
            <Spacer height={hp(1)} />
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item height={hp(1)} width={wp(50)} />
            </SkeletonPlaceholder>
            <Spacer height={hp(2)} />
          </View>
        ) : (
          <View>
            <Image
              style={{
                width: wp('78%'),
                height: wp('78%'),
                resizeMode: 'contain',
              }}
              source={{uri: qrCodeData ?? ''}}
            />
            <Text style={styles.info}>{qrMessage}</Text>
          </View>
        )}
        {qrLoading ? (
          <Animated.View>
            <Spacer height={hp(2)} />
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                borderRadius={wp(4)}
                width={wp(30)}
                height={hp(3)}
              />
            </SkeletonPlaceholder>
          </Animated.View>
        ) : (
          <Text style={styles.codeExpire}>
            {AppLocalizedStrings.QRCodePopup.codeExpire}

            <Text style={styles.timer}>
              {timerState.minutes < 10
                ? '0' + timerState.minutes
                : timerState.minutes}
              :
              {timerState.seconds < 10
                ? '0' + timerState.seconds
                : timerState.seconds}
            </Text>
          </Text>
        )}
        <AdaptiveButton
          buttonStyle={styles.dismiss}
          title={AppLocalizedStrings.dimiss}
          onPress={() => store.dispatch(setOpenQrCode(false))}
        />
      </View>
    </PopupContainer>
  );
};

export default React.memo(QRPopup);

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
