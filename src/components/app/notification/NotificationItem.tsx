import {View, Text, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import ImageView from '../../image/ImageView';
import Style from '../../../constants/Style';

interface NotificationItemProps {
  title: string;
  isLast: boolean;
}
const NotificationItem: React.FC<NotificationItemProps> = props => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondContainer}>
        <ImageView
          source={'https://picsum.photos/seed/picsum/200/300'}
          style={styles.img}
        />
        <View style={styles.innerView}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{props.title}</Text>
          </View>
          {props.isLast == false && <View style={styles.lineView} />}
        </View>
      </View>
    </View>
  );
};
export default memo(NotificationItem);

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    minHeight: hp(10),
    justifyContent: 'center',
  },
  secondContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
    flex: 1,
    alignItems: 'center',
  },
  innerView: {
    flex: 1,
    paddingLeft: hp(2.5),
    justifyContent: 'space-between',
  },
  titleText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Medium',
      Colors.black,
    ),
    textAlignVertical: 'center',
  },
  lineView: {
    backgroundColor: '#E5E5E5',
    height: 1,
  },
  img: {
    width: wp(12),
    aspectRatio: 1,
    borderRadius: wp(12) / 2,
  },
  titleContainer: {flex: 1, justifyContent: 'center', marginRight: wp(5)},
});
