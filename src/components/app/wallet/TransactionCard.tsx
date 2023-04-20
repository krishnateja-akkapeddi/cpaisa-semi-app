import React, {memo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Style from '../../../constants/Style';
import Transaction from '../../../models/interfaces/Transaction';
import Colors from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';
import {hp} from '../../../utility/responsive/ScreenResponsive';

interface TransactionCardProps {
  item: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = props => {
  const {item} = props;
  const [isVisible, setisVisible] = useState(true);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={styles.transactionName}>
          <Text style={styles.transactionText}>Cipla</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleText}>{item.name}</Text>
          <Text
            style={[styles.titleText, {color: '#008700', fontWeight: '700'}]}>
            {item.price}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.titleText}>Coupon No.:</Text>
          <Text style={[styles.titleText, {fontWeight: '700'}]}>
            {item.couponCode}
          </Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleText}>{item.date}</Text>
          <Text style={styles.titleText}>{item.transationId}</Text>
        </View>
        <View style={styles.lineBottom} />
      </View>
    </View>
  );
};

export default memo(TransactionCard);

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineBottom: {
    height: 1,
    backgroundColor: '#7F7F7F',
    width: '100%',
    marginTop: hp('2%'),
  },
  mainContainer: {
    zIndex: 1,
    borderRadius: 10,
    position: 'relative',
  },
  subContainer: {
    flexDirection: 'column',
  },
  transactionName: {
    borderRadius: 5,
    backgroundColor: '#F89E1B',
    alignSelf: 'flex-start',
    marginTop: hp('1.5%'),
    marginLeft: hp('1%'),
  },
  transactionText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.white,
    ),
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  titleText: {
    color: '#474747',
    marginTop: hp('1.1%'),
    marginLeft: hp('0.9%'),
  },
});
