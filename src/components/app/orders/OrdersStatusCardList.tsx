import {View, StyleSheet} from 'react-native';
import React from 'react';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import InvoiceCard from '../../components/app/invoice/InvoiceCard';
import {AppLocalizedStrings} from '../../localization/Localization';

import {hp} from '../../utility/responsive/ScreenResponsive';
import OrderCard from '../../components/app/orders/OrdersCard';
import {
  OverallInvoiceStatus,
  MonthlyInvoiceStatusEntity,
} from '../../models/interfaces/InvoiceSummaryResponse';

type Props = {
  loading?: boolean;
  ordersSummary?: OverallInvoiceStatus;
  monthlyInvoices: MonthlyInvoiceStatusEntity[] | undefined;
  selectedOverallSummary: boolean;
};
const InvoiceStatusCardList: React.FC<Props> = ({ordersSummary, loading}) => {
  return (
    <View>
      <View style={styles.container}>
        {ordersSummary && (
          <OrderCard
            status={AppLocalizedStrings.invoice.pending}
            totalInvoice={ordersSummary.pending_invoice_count.toString()}
            invoiceText={AppLocalizedStrings.invoice.invoiceText}
            rupees={ordersSummary.pending_amount.toString()}
            rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
            buttonStyle={{backgroundColor: '#F7DFC4'}}
          />
        )}
        {ordersSummary && (
          <OrderCard
            status={AppLocalizedStrings.invoice.approved}
            totalInvoice={ordersSummary.approved_invoice_count.toString()}
            invoiceText={AppLocalizedStrings.invoice.invoiceText}
            rupees={ordersSummary.approved_amount.toString()}
            rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
            buttonStyle={{backgroundColor: '#B5EAD7'}}
          />
        )}
        {ordersSummary && (
          <OrderCard
            status={AppLocalizedStrings.invoice.rejected}
            totalInvoice={ordersSummary.rejected_invoice_count.toString()}
            invoiceText={AppLocalizedStrings.invoice.invoiceText}
            rupees={ordersSummary.rejected_amount.toString()}
            rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
            buttonStyle={{backgroundColor: '#FFD7DA'}}
          />
        )}
      </View>
    </View>
  );
};

export default InvoiceStatusCardList;

const styles = StyleSheet.create({
  cardlistContainer: {
    marginTop: hp('2%'),
  },
  container: {
    marginTop: hp('2%'),

    alignItems: 'center', // ignore this - we'll come back to it
    justifyContent: 'center', // ignore this - we'll come back to it
    flexDirection: 'row',
    flex: 1,
  },
});
