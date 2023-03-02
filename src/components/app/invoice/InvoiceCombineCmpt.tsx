import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import InvoiceDateList from './InvoiceDateList';
import InvoiceStatusCardList from './InvoiceStatusCardList';
import InvoiceFilterView from './InvoiceFilterView';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {
  MonthlyInvoiceStatusEntity,
  OverallInvoiceStatus,
} from '../../../models/interfaces/InvoiceSummaryResponse';
import {FetchInvoiceSummaryParams} from '../../../domain/usages/FetchInvoiceSummary';
interface InvoiceCombineCmptProps {
  onFilterHandler: () => void;
  invoiceSummary?: OverallInvoiceStatus;
  dates: string[];
  setSelectedOverallSummary: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDates: FetchInvoiceSummaryParams.params | null | undefined;
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  monthlyInvoices: MonthlyInvoiceStatusEntity[] | undefined;
  setSelectedDatesHandler: (params: FetchInvoiceSummaryParams.params) => void;
  selectedOverallSummary: boolean;
  loading?: boolean;
}
const InvoiceCombineCmpt = (props: InvoiceCombineCmptProps) => {
  const {
    onFilterHandler,
    invoiceSummary,
    dates,
    setSelectedDatesHandler,
    selectedDates,
    num,
    setNum,
    setSelectedOverallSummary,
    selectedOverallSummary,
    monthlyInvoices,
    loading,
  } = props;
  useEffect(() => {}, [selectedDates, loading]);

  return (
    <>
      <InvoiceStatusCardList
        loading={loading}
        selectedOverallSummary={selectedOverallSummary}
        monthlyInvoices={monthlyInvoices}
        invoiceSummary={invoiceSummary}
      />
      <InvoiceFilterView onFilterHandler={onFilterHandler} />
    </>
  );
};

export default InvoiceCombineCmpt;

const styles = StyleSheet.create({
  invoiceContainer: {
    marginTop: hp('3%'),
    marginBottom: hp('1.8%'),
  },
});
