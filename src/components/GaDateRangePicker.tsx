import React, {memo, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

import {Convert} from '../utility/converter/Convert';
import AdaptiveButton from './button/AdaptiveButton';
import Colors from '../theme/Colors';
import Style from '../constants/Style';
import Fonts from '../theme/Fonts';
import {hp, wp} from '../utility/responsive/ScreenResponsive';
import Spacer from './layout/Spacer';

interface DateRangePickerProps {
  onDatesSelected: (startDate: Date, endDate: Date) => void;
  startDate?: Date | null;
  setStartDate: Function;
  endDate?: Date | null;
  setEndDate: Function;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onDatesSelected,
  setEndDate,
  setStartDate,
  startDate,
  endDate,
}) => {
  const [showStartDatePicker, setShowStartDatePicker] =
    useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  const onStartDatePress = () => setShowStartDatePicker(true);

  const onEndDatePress = () => setShowEndDatePicker(true);

  const onStartDateChange = (date: Date) => setStartDate(date);

  const onEndDateChange = (date: Date) => setEndDate(date);

  const onLastMonthPress = () => {
    const lastMonthStartDate = moment().subtract(30, 'days').toDate();
    const lastMonthEndDate = moment().toDate();
    setStartDate(lastMonthStartDate);
    setEndDate(lastMonthEndDate);
    onDatesSelected(lastMonthStartDate, lastMonthEndDate);
  };

  const onLastTwoMonthsPress = () => {
    const lastTwoMonthsStartDate = moment().subtract(60, 'days').toDate();
    const lastTwoMonthsEndDate = moment().toDate();
    setStartDate(lastTwoMonthsStartDate);
    setEndDate(lastTwoMonthsEndDate);
    onDatesSelected(lastTwoMonthsStartDate, lastTwoMonthsEndDate);
  };

  const isLastMonth = useMemo(() => {
    const lastMonthStartDate = moment().subtract(30, 'days').toDate();
    const lastMonthEndDate = moment().toDate();
    return (
      moment(lastMonthStartDate).isSame(startDate, 'day') &&
      moment(lastMonthEndDate).isSame(endDate, 'day')
    );
  }, [startDate, endDate]);

  const isLast2Months = useMemo(() => {
    const lastTwoMonthsStartDate = moment().subtract(60, 'days').toDate();
    const lastMonthEndDate = moment().toDate();
    return (
      moment(lastTwoMonthsStartDate).isSame(startDate, 'day') &&
      moment(lastMonthEndDate).isSame(endDate, 'day')
    );
  }, [startDate, endDate]);

  return (
    <View>
      <View style={{...styles.container, alignSelf: 'flex-start'}}>
        <TouchableOpacity onPress={onLastMonthPress}>
          <View
            style={{
              // width: wp('25%'),
              paddingLeft: wp('3%'),
              paddingRight: wp('3%'),
              paddingTop: wp('2%'),
              paddingBottom: wp('2%'),
              borderWidth: 0.5,
              borderRadius: wp(10),
              borderColor: Colors.primary,
              backgroundColor: isLastMonth ? Colors.primary : Colors.white,
            }}>
            <Text
              style={{
                color: isLastMonth ? Colors.white : Colors.primary,
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              Last 30 days
            </Text>
          </View>
        </TouchableOpacity>
        <Spacer width={wp('2%')} />
        <TouchableOpacity onPress={onLastTwoMonthsPress}>
          <View
            style={{
              backgroundColor: isLast2Months ? Colors.primary : Colors.white,
              // width: wp('25%'),
              paddingLeft: wp('3%'),
              paddingRight: wp('3%'),
              paddingTop: wp('2%'),
              paddingBottom: wp('2%'),
              borderWidth: 0.5,
              borderRadius: wp(10),
              borderColor: Colors.primary,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: isLast2Months ? Colors.white : Colors.primary,
              }}>
              Last 60 days
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Spacer height={hp('2%')} />

      <View style={styles.container}>
        {startDate && (
          <View
            style={{
              backgroundColor: Colors.white,
              position: 'absolute',
              top: hp('-1%'),
              zIndex: 30,
              left: hp('1%'),
              paddingLeft: wp(1),
              paddingRight: wp(1),
            }}>
            <Text style={{color: Colors.grey}}>Start Date</Text>
          </View>
        )}
        <View>
          <AdaptiveButton
            type="text"
            buttonStyle={{
              borderWidth: 1,
              padding: wp(2),
              borderRadius: wp(2),
              borderColor: Colors.primary,
              width: wp('35%'),
            }}
            textStyle={{color: Colors.grey}}
            onPress={onStartDatePress}
            title={
              startDate
                ? Convert.dateFormatter(null, 'DD, MMM yyyy', startDate)
                : 'Start Date'
            }
          />
        </View>
        <Spacer width={wp('4%')} />

        {endDate && (
          <View
            style={{
              backgroundColor: Colors.white,
              position: 'absolute',
              top: hp('-1%'),
              zIndex: 30,
              left: wp('41%'),
              paddingLeft: wp(1),
              paddingRight: wp(1),
            }}>
            <Text style={{color: Colors.grey}}>End Date</Text>
          </View>
        )}
        <View>
          <AdaptiveButton
            textStyle={{color: Colors.grey}}
            type="text"
            buttonStyle={{
              borderWidth: 1,
              padding: wp(2),
              borderRadius: wp(2),
              borderColor: Colors.primary,
              width: wp('35%'),
            }}
            onPress={() => setShowEndDatePicker(true)}
            title={
              endDate
                ? Convert.dateFormatter(null, 'DD, MMM yyyy', endDate)
                : 'End Date'
            }
          />
        </View>

        <View>
          <DatePicker
            open={showStartDatePicker}
            modal
            mode="date"
            date={startDate ?? new Date()}
            onDateChange={onStartDateChange}
            onConfirm={date => {
              setStartDate(date);
              setShowStartDatePicker(false);
            }}
            onCancel={() => {
              setShowStartDatePicker(false);
            }}
          />
        </View>

        <View style={{flexDirection: 'column', display: 'flex'}}>
          <DatePicker
            open={showEndDatePicker}
            modal
            mode="date"
            date={endDate ?? new Date()}
            onDateChange={onEndDateChange}
            onConfirm={date => {
              if (!startDate) {
                Alert.alert('Please select the start date first');
                setEndDate(null);
                setShowEndDatePicker(false);
                return;
              }
              if (moment(date).isBefore(startDate)) {
                Alert.alert('End date cannot be lesser than start date');
                setEndDate(null);
                setShowEndDatePicker(false);
                return;
              }
              setEndDate(date);
              setShowEndDatePicker(false);
            }}
            onCancel={() => {
              setShowEndDatePicker(false);
            }}
          />
        </View>
      </View>
      <Spacer height={hp('1%')} />
    </View>
  );
};

export default memo(DateRangePicker);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
  },
  btnActive: {
    height: hp(3.5),
    paddingHorizontal: wp(3),
    borderColor: Colors.primary,
    borderWidth: 1,
  },

  btnTextActive: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.white,
    ),
  },
  btnInactive: {
    height: hp(3.5),
    paddingHorizontal: wp(3),
    borderColor: Colors.darkBlack,
  },
  btnTextInactive: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  picker: {
    height: hp(3.5),
    paddingHorizontal: wp(3),
    borderColor: Colors.darkBlack,
    borderRadius: Style.kBorderRadius,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  textInput: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.darkBlack,
    ),
  },
});
