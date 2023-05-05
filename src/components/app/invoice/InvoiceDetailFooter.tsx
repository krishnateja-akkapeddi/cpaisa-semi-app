import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';
import InvColorStatus from './InvColorStatus';
import Spacer from '../../layout/Spacer';
import {InvoiceDetail} from '../../../models/interfaces/InvoiceDetailResponse';
import {AppLocalizedStrings} from '../../../localization/Localization';

const InvoiceDetailFooter = (props: {
  invoice: InvoiceDetail;
  loading: boolean;
}) => {
  const {invoice} = props;
  return (
    <View>
      {/* {invoice?.invoice_items?.length < 0 && */}
      {invoice?.invoice_items?.length > 0 && <InvColorStatus />}
      <View style={styles.totalPoint}>
        <Text style={styles.textStyle}>Total Points</Text>
        <Text style={styles.textStyle}>
          {invoice?.invoice_items?.length > 0
            ? invoice.total_points
              ? invoice.total_points
              : AppLocalizedStrings.noData
            : AppLocalizedStrings.notYetProcessed}
        </Text>
      </View>
      <Spacer height={hp('2%')} />
    </View>
  );
};

export default InvoiceDetailFooter;
const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    padding: hp('1.3%'),
    borderRadius: 10,
  },
  textStyle: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.white,
  },
});
