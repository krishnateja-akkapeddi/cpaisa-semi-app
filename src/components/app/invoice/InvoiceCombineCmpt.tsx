import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import InvoiceDateList from './InvoiceDateList';
import InvoiceStatusCardList from './InvoiceStatusCardList';
import InvoiceFilterView from './InvoiceFilterView';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {
  MonthlyInvoiceStatusEntity,
  OverallInvoiceStatus,
} from '../../../models/interfaces/InvoiceSummaryResponse';
import {FetchInvoiceSummaryParams} from '../../../domain/usages/FetchInvoiceSummary';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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
  filterChecked?: boolean;
  isFilterApplied?: boolean;
  filterCount: Function;
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
    filterCount,
    isFilterApplied,
  } = props;
  useEffect(() => {}, [selectedDates, loading]);
  console.log('FROK_DUFJSJ', filterCount());

  return (
    <View>
      <InvoiceStatusCardList
        loading={loading}
        selectedOverallSummary={selectedOverallSummary}
        monthlyInvoices={monthlyInvoices}
        invoiceSummary={invoiceSummary}
      />

      <InvoiceFilterView
        filterCount={filterCount()}
        onFilterHandler={onFilterHandler}
      />
    </View>
  );
};

export default InvoiceCombineCmpt;

const styles = StyleSheet.create({
  invoiceContainer: {
    marginTop: hp('3%'),
    marginBottom: hp('1.8%'),
  },
  filterBadge: {
    position: 'absolute',
    top: wp('-1%'),
    right: wp('-2%'),
    backgroundColor: Colors.red,
    borderRadius: wp('100%'),
    minWidth: 20,
    height: 20,
    textAlign: 'center',
    zIndex: 1,
    paddingTop: 1,
  },
  filterBadgeText: {
    color: Colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
});
