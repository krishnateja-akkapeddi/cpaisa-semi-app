import React from 'react';
import {StyleSheet, View} from 'react-native';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import Spacer from '../../../components/layout/Spacer';
import AdaptiveButton from '../../../components/button/AdaptiveButton';
import Carousel from '../../carousel/Carousel';
import RedeemPointCard from '../../app/wallet/RedeemPointCard';
import Fonts from '../../../theme/Fonts';

interface RedeemDetailProps {
  onDismiss: () => void;
  onRedeem?: () => void;
  title: string;
}

const RedeemPointDetail: React.FC<RedeemDetailProps> = props => {
  const {onDismiss, onRedeem, title} = props;
  const renderItem = (item: number) => {
    return <RedeemPointCard />;
  };
  return (
    <View style={[styles.mainCardStyle]}>
      <View style={[styles.cardViewTop]}>
        <AdaptiveButton
          title={title}
          type="text"
          icon="arrow_back"
          buttonStyle={styles.backBtn}
          textStyle={styles.backBtnText}
          onPress={onDismiss}
        />
        <AdaptiveButton
          title={AppLocalizedStrings.wallet.dismissX}
          type="text"
          buttonStyle={styles.backBtn}
          textStyle={styles.textRedeemTitel}
          onPress={onDismiss}
        />
      </View>
      <Spacer height={hp(2.8)} />
      <Carousel items={[1, 2]} renderItem={renderItem} />
      <Spacer height={hp(1.8)} />
      <AdaptiveButton
        type="dark"
        title={AppLocalizedStrings.continue}
        onPress={onRedeem}
      />
    </View>
  );
};

export default RedeemPointDetail;

const styles = StyleSheet.create({
  backBtn: {
    height: 'auto',
  },

  backBtnText: {
    marginStart: 5,
  },

  middelLineStyle: {
    backgroundColor: Colors.grey,
    height: 0.5,
  },
  mainCardStyle: {
    borderColor: Colors.placeholder,
    borderRadius: Style.kBorderRadius,
    borderWidth: 1,
    padding: hp('1.8'),
    marginBottom: hp('2.5%'),
  },
  cardViewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRedeemPointTitel: {
    ...Style.getTextStyle(Fonts.getFontSize('headline4'), 'Bold', Colors.black),
  },
  textRedeemTitel: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.black,
    ),
  },
  leftBtnView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rightBtnView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  leftBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  rightBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
