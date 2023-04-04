import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PopupContainer from './PopupContainer';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp} from '../../utility/responsive/ScreenResponsive';
import RadioView from '../app/filters/RadioView';
import Spacer from '../layout/Spacer';
import QuarterView from '../app/filters/QuarterView';
import FilterActionView from '../app/filters/FilterActionView';
import {Generator} from '../../utility/Generator';
import {Convert} from '../../utility/converter/Convert';
import {PickerItem} from 'react-native-woodpicker';
import RangeSliderView from '../app/filters/RangeSliderView';
import Colors from '../../theme/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import GaDateRangePicker from '../GaDateRangePicker';
import PriceChipView from '../app/wallet/PriceChipView';

const INVOICE_STATUS = AppLocalizedStrings.filter.invoiceStatusValues;
const REEDEM_STATUS = AppLocalizedStrings.filter.reedemStatusValue;
const TRANSACTION_TYPES = AppLocalizedStrings.filter.transactionValues;

interface TransactionFilterPopupProps {
  applyLoading: boolean;
  resetFilterLoading: boolean;
  pointsRangeTitle?: string;
  showRange?: boolean;
  showReedem?: boolean;
  showTransaxtion?: boolean;
  onDismiss?: () => void;
  onApply: () => void;
  onClear: () => void;
  enablePoints?: boolean;
  params?: any;
  setParams?: any;
  showInvoiceStatus?: boolean;
  year: number | null;
  setYear: React.Dispatch<React.SetStateAction<number | null>>;
  setQuarter: React.Dispatch<React.SetStateAction<number | null>>;
  startDate?: Date | null;
  setStartDate?: Function;
  endDate?: Date | null;
  setEndDate?: Function;
  quarter?: number | null;
}
const TransactionFilterPopup: React.FC<TransactionFilterPopupProps> = props => {
  const {
    showRange = true,
    showReedem = true,
    showTransaxtion = true,
    pointsRangeTitle = AppLocalizedStrings.filter.approvedPointsRange,
    onApply,
    onClear,
    params,
    setParams,
    setQuarter,
    setYear,
    year,
    quarter,
    applyLoading,
    resetFilterLoading,
    enablePoints,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;
  let quarters = ['empty', 'Q1', 'Q2', 'Q3', 'Q4'];

  const yearData: Array<PickerItem> = [
    {label: 'Year', value: null},
    ...Generator.generateYears(5).map((val, ind) => {
      return {label: val.toString(), value: ind + 1};
    }),
  ];
  const [isSelectionError, setIsSelectionError] = useState(false);

  useEffect(() => {
    if ((quarter && !year) || (!quarter && year)) {
      setIsSelectionError(true);
    } else {
      setIsSelectionError(false);
    }
  }, [quarter, year]);

  return (
    <PopupContainer
      title={AppLocalizedStrings.filter.filters}
      showDismiss={true}
      showLine={false}
      onDismiss={props.onDismiss}>
      <View style={styles.main}>
        {showRange == true && (
          <RangeSliderView
            style={styles.rangeView}
            title={AppLocalizedStrings.filter.amountRange}
            min={0}
            max={100}
            value={[0, 100]}
          />
        )}

        {/* <RadioView
          title={AppLocalizedStrings.filter.timeline}
          data={TIMELINE_DATA}
        /> */}

        <Spacer height={hp(2.5)} />
        {/* <QuarterView
          yearData={yearData}
          selectedIds={[quarter ? quarter : -1]}
          selectedYear={
            year
              ? yearData.find(val => val?.label === year?.toString())
              : yearData[0]
          }
          params={params && params}
          onYearChange={(item: any, ind: any) => {
            if (ind !== 0) {
              setYear(item.label);
              setParams((prev: any) => {
                return {...prev, year: parseInt(item.label)};
              });
            } else {
              setParams((prev: any) => {
                return {...prev, year: null};
              });
              setYear(null);
            }
          }}
          data={quarters}
          onValueChange={e => {
            if (e[0]) {
              setQuarter(e[0]);
              setParams((prev: any) => {
                return {...prev, q: e[0]};
              });
            } else {
              setQuarter(null);
              setParams((prev: any) => {
                return {...prev, q: null};
              });
            }
          }}
        /> */}

        {setEndDate && setStartDate && (
          <GaDateRangePicker
            onDatesSelected={(s, e) => {
              console.log(s, e);
            }}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}

        <Spacer height={hp(2.5)} />
        {/* {showReedem && (
          <RangeSliderView
            style={styles.rangeView}
            title={pointsRangeTitle}
            min={0}
            max={100}
            value={[
              params.start_point ? params.start_point : 0,
              params.end_point ? params.end_point : 200,
            ]}
            handleSlideComplete={(e: any) => {
              console.log(params);

              setParams((prev: any) => {
                return {...prev, start_point: e[0], end_point: e[1]};
              });
            }}
          />
        )} */}

        {!showReedem && !showTransaxtion && (
          <RadioView
            selectedIds={
              params?.status
                ? params?.status[0] === 'not_eligible'
                  ? [3]
                  : [
                      INVOICE_STATUS.indexOf(
                        Convert.capitalize(params?.status[0]),
                      ),
                    ]
                : [-1]
            }
            onValueChange={value => {
              let status = INVOICE_STATUS[value[0]];
              if (setParams) {
                if (status) {
                  if (status === INVOICE_STATUS[3]) {
                    let updatedStatus =
                      status.split(' ')[0].toLowerCase() +
                      '_' +
                      status.split(' ')[1].toLowerCase();
                    setParams((prev: any) => {
                      return {...prev, status: [updatedStatus]};
                    });
                  } else {
                    setParams((prev: any) => {
                      return {...prev, status: [status.toLowerCase()]};
                    });
                  }
                } else {
                  setParams((val: any) => {
                    delete val.status;
                    return val;
                  });
                }
              }
            }}
            style={styles.radioView}
            title={AppLocalizedStrings.filter.invoiceStatus}
            data={INVOICE_STATUS}
          />
        )}

        {showTransaxtion == true && (
          <RadioView
            style={styles.radioView}
            title={AppLocalizedStrings.filter.transaction}
            data={TRANSACTION_TYPES}
          />
        )}
        {showReedem == true && (
          <RadioView
            onValueChange={value => {
              let status = REEDEM_STATUS[value[0]];
              if (setParams) {
                if (status) {
                  setParams((prev: any) => {
                    return {...prev, status: status.toLowerCase()};
                  });
                } else {
                  setParams((val: any) => {
                    delete val.status;
                    return val;
                  });
                }
              }
            }}
            selectedIds={
              params?.status
                ? [REEDEM_STATUS.indexOf(Convert.capitalize(params?.status))]
                : [-1]
            }
            style={styles.radioView}
            title={AppLocalizedStrings.filter.reedemStatus}
            data={REEDEM_STATUS}
          />
        )}
        <Spacer height={hp(2)} />
        <FilterActionView
          onApplyDisabled={
            isSelectionError || applyLoading || resetFilterLoading
          }
          resetFilterLoading={resetFilterLoading}
          resetDisabled={resetFilterLoading || applyLoading}
          applyLoading={applyLoading}
          onApply={onApply}
          onClear={onClear}
        />
        <Spacer height={hp('2%')} />
        {isSelectionError && (
          <Text
            style={{
              textAlign: 'right',
              fontSize: 15,
              paddingRight: 8,
              color: Colors.red,
            }}>
            <Icon name="exclamationcircle"></Icon>
            <Spacer width={5} />
            <Text>
              {quarter && !year
                ? 'Please select year'
                : year && !quarter
                ? 'Please select quarter'
                : ''}
            </Text>
          </Text>
        )}
      </View>
    </PopupContainer>
  );
};

export default TransactionFilterPopup;

const styles = StyleSheet.create({
  main: {
    paddingTop: hp(1.5),
  },
  rangeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2.5),
  },
  radioView: {
    marginBottom: hp(2.5),
  },
});
