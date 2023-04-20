import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import SVGIcon from '../../../utility/svg/SVGIcon';
import Spacer from '../../layout/Spacer';

const InvColorStatus = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.rowView}>
        <View style={styles.rightTextView}>
          <SVGIcon name="light_green" size={8} />
          <Spacer width={wp('2%')} />
          <Text style={styles.statusText}>Products Approved</Text>
        </View>
        <View style={styles.leftTextView}>
          <SVGIcon name="light_yellow" size={8} />
          <Spacer width={wp('2%')} />
          <Text style={styles.statusText}>Products Pending</Text>
        </View>
      </View>
      <Spacer height={hp('1%')} />
      <View style={styles.rowView}>
        <View style={styles.rightTextView}>
          <SVGIcon name="light_red" size={8} />
          <Spacer width={wp('2%')} />
          <Text style={styles.statusText}>Products Rejected</Text>
        </View>

        <View style={styles.leftTextView}>
          <SVGIcon name="light_gray" size={8} />
          <Spacer width={wp('2%')} />
          <Text style={styles.statusText}>Products Not Eligible</Text>
        </View>
      </View>
    </View>
  );
};

export default InvColorStatus;

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: wp('13%'),
    marginVertical: hp('2%'),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightTextView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftTextView: {
    flex: 1,
    flexDirection: 'row',
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
  statusText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline6'),
    color: Colors.black,
  },
});
