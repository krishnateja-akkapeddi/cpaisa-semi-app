import {View, Text, StyleSheet, Touchable, Animated} from 'react-native';
import React, {memo, useState, useRef} from 'react';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import ImageView from '../../image/ImageView';
import Style from '../../../constants/Style';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Spacer from '../../layout/Spacer';
import {NotificationEntity} from '../../../models/interfaces/NotificationsResponse';

interface NotificationItemProps {
  isLast: boolean;
  item: NotificationEntity;
}

const NotificationItem: React.FC<NotificationItemProps> = ({item, isLast}) => {
  const [isSelected, setIsSelected] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setIsSelected(prev => !prev);
    Animated.timing(animatedHeight, {
      toValue: isSelected ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const dropdownHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, hp(6)],
  });

  return (
    <TouchableOpacity onPress={toggleDropdown}>
      <Spacer height={hp(2)} />
      <View style={styles.mainContainer}>
        <View style={styles.secondContainer}>
          <Icon size={20} name={isSelected ? 'downcircleo' : 'rightcircleo'} />
          <View style={styles.innerView}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
            </View>
          </View>
        </View>
        <Animated.View style={{height: dropdownHeight, overflow: 'hidden'}}>
          <View style={styles.subTitileContainer}>
            <Text style={styles.subTitileText}>{item?.description}</Text>
          </View>
        </Animated.View>
        <View style={styles.lineView} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(NotificationItem);

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    minHeight: hp(7),
    justifyContent: 'center',
  },
  subTitileText: {},
  secondContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
    flex: 1,
    alignItems: 'center',
  },
  subTitileContainer: {
    paddingTop: hp(2),
    marginLeft: wp('11%'),
  },
  innerView: {
    flex: 1,
    paddingLeft: hp(1),
    justifyContent: 'space-between',
  },
  titleText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline2'),
      'Medium',
      Colors.black,
    ),
    fontWeight: '700',
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
