import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';
import {AppLocalizedStrings} from '../../../localization/Localization';

interface ButtonStyle {
  buttonStyle: ViewStyle;
}

interface CardProps {
  status: String;
  totalInvoice: String | React.ReactNode;
  invoiceText: String;
  rupees: String | React.ReactNode;
  rewardPointText: String;
  buttonStyle?: ViewStyle;
}

const OrderCard: React.FC<CardProps> = props => {
  const btnStyle: ButtonStyle = useMemo(() => {
    let style: ButtonStyle = {
      buttonStyle: {...styles.cardContainer, ...props.buttonStyle},
    };
    return style;
  }, [props.buttonStyle]);

  return (
    <View style={btnStyle.buttonStyle}>
      <Text style={styles.commonTextStyle}>
        {props.status ?? AppLocalizedStrings.na}
      </Text>
      <Spacer height={10} />
      <Text style={styles.totalInvoiceText}>
        {props.totalInvoice ?? AppLocalizedStrings.na}
      </Text>
      <Text style={styles.invoiceText}>
        {props.invoiceText ?? AppLocalizedStrings.na}
      </Text>
      <Spacer height={10} />

      <Text style={styles.commonTextStyle}>
        {props.rupees ?? AppLocalizedStrings.na}
      </Text>
      <Text style={styles.rewardPoint}>
        {props.rewardPointText ?? AppLocalizedStrings.na}
      </Text>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 15,
    paddingTop: 18,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: wp('30%'),
    margin: 4,
  },
  commonTextStyle: {
    fontFamily: Fonts.medium,
    fontWeight: '500',
    fontSize: Fonts.getFontSize('headline4'),
    color: Colors.white,
    lineHeight: hp(3),
    textAlign: 'center',
    marginBottom: hp('1'),
  },
  totalInvoiceText: {
    fontFamily: Fonts.bold,
    fontWeight: '700',
    fontSize: Fonts.getFontSize('headline2'),
    color: Colors.white,
    lineHeight: hp(3),
    textAlign: 'center',
    marginBottom: hp('1'),
  },
  invoiceText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.white,
    textAlign: 'center',
    marginBottom: hp('1'),
  },
  rewardPoint: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.white,
    textAlign: 'center',
    marginBottom: hp('1'),
  },
});
