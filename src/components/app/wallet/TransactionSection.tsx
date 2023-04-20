import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SegmentBar from '../../../components/app/SegmentBar';
import TransactionList from './TransactionList';
import CouponCodeList from './CouponCodeList';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';

interface TransactinoSectionProps {}

enum TransactionMode {
  AllTransaction,
  CouponCode,
}

const TransactinoSection: React.FC<TransactinoSectionProps> = props => {
  const [transactionMode, setTransactionMode] = useState(
    TransactionMode.AllTransaction,
  );
  const segmentBarItems = [
    AppLocalizedStrings.wallet.allTransactions,
    AppLocalizedStrings.wallet.couponsCode,
  ];

  const onValueChange = (index: number) => {
    setTransactionMode(index);
  };

  return (
    <View>
      <SegmentBar
        containerStyle={styles.bar}
        selectedIndex={transactionMode}
        items={segmentBarItems}
        onValueChange={onValueChange}
      />
      {transactionMode == TransactionMode.CouponCode ? (
        <CouponCodeList />
      ) : (
        <TransactionList />
      )}
    </View>
  );
};

export default TransactinoSection;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    paddingRight: wp(4),
  },
  details: {
    marginVertical: hp(2),
  },
  bar: {
    marginTop: hp(1),
  },
  itemSeparatorStyle: {
    height: hp(1.8),
  },
});
