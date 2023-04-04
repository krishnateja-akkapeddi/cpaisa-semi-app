import {View, StyleSheet} from 'react-native';
import React from 'react';
import InvoiceCard from './InvoiceCard';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {
  MonthlyInvoiceStatusEntity,
  OverallInvoiceStatus,
} from '../../../models/interfaces/InvoiceSummaryResponse';
import {AppLocalizedStrings} from '../../../localization/Localization';

type Props = {
  loading?: boolean;
  invoiceSummary?: OverallInvoiceStatus;
  monthlyInvoices: MonthlyInvoiceStatusEntity[] | undefined;
  selectedOverallSummary: boolean;
};
const InvoiceStatusCardList: React.FC<Props> = ({
  invoiceSummary,
  monthlyInvoices,
  selectedOverallSummary,
  loading,
}) => {
  return (
    <View>
      {/* <FlatList
        data={card}
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{width: wp('5%')}} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <InvoiceCard
            status={item.status}
            totalInvoice={item.totalInvoice}
            invoiceText={item.invoiceText}
            rupees={item.rupees}
            rewardPointText={item.rewardPoint}
            buttonStyle={{backgroundColor: item.color}}
          />
        )}
      /> */}
      {!selectedOverallSummary && monthlyInvoices && (
        <View style={styles.container}>
          {monthlyInvoices.length !== 0 ? (
            monthlyInvoices.map((val, ind) => {
              return (
                <>
                  <InvoiceCard
                    status={AppLocalizedStrings.invoice.pending}
                    totalInvoice={
                      loading ? '...' : val.pending_invoice_count.toString()
                    }
                    invoiceText={AppLocalizedStrings.invoice.invoiceText}
                    rupees={loading ? '...' : val.pending_amount.toString()}
                    rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
                    buttonStyle={{backgroundColor: '#F7DFC4'}}
                  />
                  <InvoiceCard
                    status={AppLocalizedStrings.invoice.approved}
                    totalInvoice={
                      loading ? '...' : val.approved_invoice_count.toString()
                    }
                    invoiceText={AppLocalizedStrings.invoice.invoiceText}
                    rupees={loading ? '...' : val.approved_amount.toString()}
                    rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
                    buttonStyle={{backgroundColor: '#B5EAD7'}}
                  />
                  <InvoiceCard
                    status={AppLocalizedStrings.invoice.rejected}
                    totalInvoice={
                      loading ? '...' : val.rejected_invoice_count.toString()
                    }
                    invoiceText={AppLocalizedStrings.invoice.invoiceText}
                    rupees={loading ? '...' : val.rejected_amount.toString()}
                    rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
                    buttonStyle={{backgroundColor: '#FFD7DA'}}
                  />
                </>
              );
            })
          ) : (
            <>
              <InvoiceCard
                status={AppLocalizedStrings.invoice.pending}
                totalInvoice={'0'}
                invoiceText={AppLocalizedStrings.invoice.invoiceText}
                rupees={'0'}
                rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
                buttonStyle={{backgroundColor: '#F7DFC4'}}
              />
              <InvoiceCard
                status={AppLocalizedStrings.invoice.approved}
                totalInvoice={'0'}
                invoiceText={AppLocalizedStrings.invoice.invoiceText}
                rupees={'0'}
                rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
                buttonStyle={{backgroundColor: '#B5EAD7'}}
              />
              <InvoiceCard
                status={AppLocalizedStrings.invoice.rejected}
                totalInvoice={'0'}
                invoiceText={AppLocalizedStrings.invoice.invoiceText}
                rupees={'0'}
                rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
                buttonStyle={{backgroundColor: '#FFD7DA'}}
              />
            </>
          )}
        </View>
      )}

      {selectedOverallSummary && (
        <View style={styles.container}>
          {invoiceSummary && (
            <InvoiceCard
              status={AppLocalizedStrings.invoice.pending}
              totalInvoice={invoiceSummary.pending_invoice_count.toString()}
              invoiceText={AppLocalizedStrings.invoice.invoiceText}
              rupees={invoiceSummary.pending_amount.toString()}
              rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
              buttonStyle={{backgroundColor: '#F7DFC4'}}
            />
          )}
          {invoiceSummary && (
            <InvoiceCard
              status={AppLocalizedStrings.invoice.approved}
              totalInvoice={invoiceSummary.approved_invoice_count.toString()}
              invoiceText={AppLocalizedStrings.invoice.invoiceText}
              rupees={invoiceSummary.approved_amount.toString()}
              rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
              buttonStyle={{backgroundColor: '#B5EAD7'}}
            />
          )}
          {invoiceSummary && (
            <InvoiceCard
              status={AppLocalizedStrings.invoice.rejected}
              totalInvoice={invoiceSummary.rejected_invoice_count.toString()}
              invoiceText={AppLocalizedStrings.invoice.invoiceText}
              rupees={invoiceSummary.rejected_amount.toString()}
              rewardPointText={AppLocalizedStrings.invoice.rewardPoints}
              buttonStyle={{backgroundColor: '#FFD7DA'}}
            />
          )}
        </View>
      )}
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
