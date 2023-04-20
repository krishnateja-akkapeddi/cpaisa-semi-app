import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';

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

const InvoiceCard: React.FC<CardProps> = props => {
  const btnStyle: ButtonStyle = useMemo(() => {
    let style: ButtonStyle = {
      buttonStyle: {...styles.cardContainer, ...props.buttonStyle},
    };
    return style;
  }, [props.buttonStyle]);

  return (
    <View style={btnStyle.buttonStyle}>
      <Text style={styles.commonTextStyle}>{props.status}</Text>
      <Spacer height={10} />
      <Text style={styles.totalInvoiceText}>{props.totalInvoice}</Text>
      <Text style={styles.invoiceText}>{props.invoiceText}</Text>
      <Spacer height={10} />

      <Text style={styles.commonTextStyle}>{props.rupees}</Text>
      <Text style={styles.rewardPoint}>{props.rewardPointText}</Text>
    </View>
  );
};

export default InvoiceCard;

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 15,
    paddingTop: 18,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: wp('27%'),
    margin: 4,
  },
  commonTextStyle: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline4'),
    color: Colors.black,
    lineHeight: 16,
    textAlign: 'center',
    marginBottom: hp('1'),
  },
  totalInvoiceText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline4'),
    color: Colors.black,
    lineHeight: 16,
    textAlign: 'center',
    marginBottom: hp('1'),
  },
  invoiceText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: hp('1'),
  },
  rewardPoint: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: hp('1'),
  },
});
