import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVGIcon from '../../../utility/svg/SVGIcon';
import Spacer from '../../layout/Spacer';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';

interface PriortyNotificationItemProps {
  title: string;
}
const PriortyNotificationItem = (props: PriortyNotificationItemProps) => {
  return (
    <View>
      <Spacer height={hp(1.5)} />
      <View style={styles.outerView}>
        <View style={[styles.innerView]}>
          <SVGIcon name={'staryellow'} size={28} />
          <Text style={styles.innerText}>{props.title}</Text>
        </View>
        <View style={[styles.rightView]}>
          <SVGIcon name={'rightarrow'} color={Colors.black} size={15} />
        </View>
      </View>
    </View>
  );
};
export default PriortyNotificationItem;

const styles = StyleSheet.create({
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  outerView: {
    flexDirection: 'row',
    backgroundColor: Colors.lightYellow,
    height: wp('10%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.black,
    ),
    marginHorizontal: 15,
  },
  rightView: {
    marginHorizontal: 15,
  },
});
