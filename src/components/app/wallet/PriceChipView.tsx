import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ColorValue,
} from 'react-native';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import {Int32} from 'react-native/Libraries/Types/CodegenTypes';

interface PriceChipProps {
  title: string;
  titleNumberLine: Int32;
  titleColor?: string;
  isTitleColorActive?: boolean;
  priceColor?: string;
  isPriceColorActive?: boolean;
  price?: string | React.ReactNode;
  backGroundColor: string;
  onPress: () => void;
  loading?: boolean;
}

const PriceChipView: React.FC<PriceChipProps> = props => {
  const titleCol =
    props.isTitleColorActive == true ? props.titleColor : Colors.black;
  const priceCol =
    props.isPriceColorActive == true ? props.priceColor : Colors.black;
  return (
    <View
      style={[
        stylesWallet.walletTouch,
        {backgroundColor: props.backGroundColor},
      ]}
      // onPress={props.onPress}
    >
      <Text
        numberOfLines={props.titleNumberLine}
        style={[stylesWallet.wallettext, {color: titleCol, width: wp('26%')}]}>
        {props.title}
      </Text>
      <Text style={[stylesWallet.walletRate, {color: priceCol}]}>
        {props.price}
      </Text>
    </View>
  );
};

export default PriceChipView;

const stylesWallet = StyleSheet.create({
  walletTouch: {
    flexDirection: 'row',
    height: wp('13%'),
    width: wp('44%'),
    // flex: 1,
    borderRadius: Style.kBorderRadius,
    backgroundColor: Colors.black,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
  },

  redeemNow: {
    height: wp('13%'),
    width: wp('45%'),
    borderRadius: Style.kBorderRadius,
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wallettext: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.white,
    ),
    width: wp('20%'),
    alignSelf: 'center',
  },

  walletRate: {
    ...Style.getTextStyle(Fonts.getFontSize('headline4'), 'Bold', Colors.black),
  },

  walletRedeem: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Bold',
      Colors.primary,
    ),
  },
});
