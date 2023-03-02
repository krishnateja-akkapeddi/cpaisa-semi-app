import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';

interface CardProps {
  text: String;
  index?: Number;
  isActive?: Boolean;
  onPress: () => void;
}

const InvoiceMonth: React.FC<CardProps> = props => {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={
            props.isActive == true ? styles.trueContainer : styles.dateContainer
          }
          onPress={props.onPress}>
          <Text
            style={props.isActive == true ? styles.trueText : styles.dateText}>
            {props.text}
          </Text>
        </TouchableOpacity>
        <View
          style={props.index == 0 ? styles.spaceStyle : styles.spaceStyleSecond}
        />
      </View>
    </View>
  );
};

export default InvoiceMonth;

const styles = StyleSheet.create({
  dateContainer: {
    width: wp('20%'),
    backgroundColor: '#F3F3F3',
    height: hp('4%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trueContainer: {
    width: wp('20%'),
    backgroundColor: Colors.primary,
    height: hp('4%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.primary,
    lineHeight: 14,
  },
  trueText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.white,
    lineHeight: 14,
  },
  spaceStyle: {
    borderLeftWidth: 1,
    marginVertical: hp('1%'),
    marginHorizontal: wp('3%'),
    borderColor: '#ccc',
  },
  spaceStyleSecond: {
    marginHorizontal: wp('2%'),
    borderColor: 'grey',
  },
});
