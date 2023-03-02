import {View, FlatList} from 'react-native';
import React from 'react';
import InvoiceMonth from './InvoiceMonth';
import {Convert} from '../../../utility/converter/Convert';
import {FetchInvoiceSummaryParams} from '../../../domain/usages/FetchInvoiceSummary';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/Store';

type Props = {
  dates: string[];
  selectedDates: FetchInvoiceSummaryParams.params | null | undefined;
  setSelectedDatesHandler: (params: FetchInvoiceSummaryParams.params) => void;
  num: number;
  setSelectedOverallSummary: React.Dispatch<React.SetStateAction<boolean>>;

  setNum: (num: number) => void;
};
const InvoiceDateList: React.FC<Props> = ({
  dates,
  setSelectedOverallSummary,
  setSelectedDatesHandler,
  num,
  setNum,
}) => {
  return (
    <View>
      <FlatList
        data={dates}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <InvoiceMonth
            text={item}
            index={index}
            isActive={index === num}
            onPress={() => {
              setNum(dates.indexOf(item));
              if (index === 0) {
                setSelectedOverallSummary(true);
              }
              if (index !== 0) {
                setSelectedOverallSummary(false);
                setSelectedDatesHandler({
                  start_date: Convert.dateFormatter('MMM YY', 'YYYY-MM', item),
                  end_date: Convert.dateFormatter('MMM YY', 'YYYY-MM', item),
                });
              }
            }}
          />
        )}
      />
    </View>
  );
};

export default InvoiceDateList;
