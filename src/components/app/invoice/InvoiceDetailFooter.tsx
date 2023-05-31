import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';
import InvColorStatus from './InvColorStatus';
import Spacer from '../../layout/Spacer';
import {InvoiceDetail} from '../../../models/interfaces/InvoiceDetailResponse';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SVGIcon from '../../../utility/svg/SVGIcon';
import {InvoiceListEntity} from '../../../models/interfaces/InvoiceListResponse';

const InvoiceDetailFooter = (props: {
  invoice: InvoiceDetail;
  loading: boolean;
  mainInvoice: InvoiceListEntity;
}) => {
  const {invoice, mainInvoice} = props;
  return (
    <View>
      {/* {invoice?.invoice_items?.length < 0 && */}
      {invoice?.invoice_items?.length > 0 && <InvColorStatus />}
      {invoice?.invoice_items?.length > 0 ? (
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
      ) : (
        <View>
          {mainInvoice?.comments && (
            <View style={styles.summeryContainer}>
              <SVGIcon name="info" size={hp('2%')} color="red" />
              <Text style={styles.summeryText}>
                {mainInvoice?.comments ?? ''}
              </Text>
            </View>
          )}
        </View>
      )}
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
  summeryText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    marginLeft: wp('2%'),
    flex: 1,
  },
  summeryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
});
