import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Style from '../../../constants/Style';
import Colors from '../../../theme/Colors';
import Spacer from '../../layout/Spacer';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import RootNavigation from '../../../navigation/RootNavigation';
import AdaptiveButton from '../../button/AdaptiveButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Fonts from '../../../theme/Fonts';
import {RootState} from '../../../store/Store';
import {store} from '../../../store/Store';
import {useDispatch, useSelector} from 'react-redux';
import {
  appSlice,
  AppSliceState,
  setOpenQrCode,
} from '../../../store/slices/AppSlice';
import AppLoader from '../../indicator/AppLoader';

interface HeaderRightViewProps {
  showQRCode?: boolean;
  showBell?: boolean;
  showOffers?: boolean;
  showHelp?: boolean;
}

const HeaderRightView: React.FC<HeaderRightViewProps> = props => {
  const dispatch = useDispatch();
  const {
    app: {openQrCode, isQrCodeExpired, qrExpiry, qrCodeData, trigger},
  } = useSelector<RootState, RootState>(state => state);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrMessage, setQrMessage] = useState('');
  const {
    showQRCode = false,
    showBell = true,
    showOffers = false,
    showHelp = false,
  } = props;

  const onShowOffers = () => {
    RootNavigation.navigate('HomeStack', {
      screen: 'TabStack',
      params: {screen: 'OffersScreen'},
    });
  };

  const onBellHandler = () => {
    RootNavigation.navigate('NotificationScreen');
  };

  const onHelpHandler = () => {
    RootNavigation.navigate('Help');
  };

  React.useEffect(() => {}, [qrCodeData, qrExpiry, isQrCodeExpired, qrLoading]);

  React.useEffect(() => {
    if (trigger) {
      setQrLoading(true);
      setQrLoading(false);
      dispatch(appSlice.actions.triggerQrCode(false));
    }
  }, [trigger]);

  return (
    <View>
      <View style={styles.stackView}>
        {showHelp && (
          <AdaptiveButton
            type="text"
            title={AppLocalizedStrings.invoice.help}
            icon="info"
            iconSize={wp(5)}
            iconColor={Colors.primary}
            buttonStyle={styles.btnHelp}
            textStyle={styles.btnHelpText}
            onPress={onHelpHandler}
          />
        )}
        {showHelp && (showOffers || showQRCode || showBell) && (
          <Spacer width={10} />
        )}
        {showOffers && (
          <AdaptiveButton
            isReverse={true}
            title={AppLocalizedStrings.tab.offers.toLocaleUpperCase()}
            icon="offers_tag"
            iconSize={wp('4%')}
            buttonStyle={styles.btnOffers}
            textStyle={styles.btnOffersText}
            onPress={onShowOffers}
          />
        )}
        {showOffers && (showQRCode || showBell) && <Spacer width={10} />}
        {showQRCode &&
          (qrLoading ? (
            <AppLoader loading={true} type="none" />
          ) : (
            <AdaptiveButton
              icon="qrcode"
              type="text"
              iconSize={wp('6.5%')}
              buttonStyle={styles.qrcode}
              onPress={() => store.dispatch(setOpenQrCode(true))}
            />
          ))}
        {showBell && (showOffers || showQRCode) && <Spacer width={10} />}
        {showBell && (
          <AdaptiveButton
            icon="bell"
            type="text"
            iconSize={wp('5%')}
            iconColor={Colors.black}
            buttonStyle={styles.bell}
            onPress={onBellHandler}
          />
        )}
      </View>
    </View>
  );
};

export default HeaderRightView;

const styles = StyleSheet.create({
  stackView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: wp(8),
  },
  bell: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.border,
    aspectRatio: 1,
    height: '100%',
    padding: 5,
  },
  qrcode: {
    height: '100%',
  },
  btnOffers: {
    backgroundColor: Colors.primary,
    height: '100%',
    paddingHorizontal: 8,
    borderRadius: wp(8) / 2,
  },
  btnOffersText: {
    ...Style.getTextStyle(Fonts.getFontSize('headline6'), 'Bold', Colors.white),
  },
  btnHelp: {
    height: '100%',
    paddingHorizontal: 8,
    borderRadius: wp(8) / 2,
  },
  btnHelpText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.primary,
    ),
  },
});
