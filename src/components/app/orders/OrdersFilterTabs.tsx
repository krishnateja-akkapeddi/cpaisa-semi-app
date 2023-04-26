import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import {OrderStatus} from '../../../models/enum/OrderStatusEnum';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

type Props = {
  onTabChange: Function;
  selectedOrderStatus: string;
};

export type OrderStatusFilterType = {label: string; value: OrderStatus};

const OrdersFilterTabs: React.FC<Props> = ({
  onTabChange,
  selectedOrderStatus,
}) => {
  const animatedBackgroundView = useSharedValue(0);
  const animH = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animatedBackgroundView.value,
        },
        {translateY: animH.value},
      ],
    };
  }, []);

  const orderStatus = [
    {label: 'New', value: OrderStatus.ON_HOLD},
    {label: 'Accepted', value: OrderStatus.CREATED},
    {label: 'Dispatched', value: OrderStatus.DISPATCHED},
    {label: 'Rejected', value: OrderStatus.REJECTED},
    {label: 'Denied', value: OrderStatus.DENIED},
  ];

  const verticalBounce = () => {
    animH.value = withSequence(
      withTiming(hp(3), {
        duration: 90,
        easing: Easing.inOut(Easing.ease),
      }),
      withSpring(hp('0%')),
    );
  };

  useEffect(() => {
    if (selectedOrderStatus === OrderStatus.ON_HOLD) {
      animatedBackgroundView.value = withTiming(wp('0%'));
      verticalBounce();
    } else if (selectedOrderStatus === OrderStatus.CREATED) {
      animatedBackgroundView.value = withTiming(wp('25%'));
      verticalBounce();
    } else if (selectedOrderStatus === OrderStatus.DISPATCHED) {
      animatedBackgroundView.value = withTiming(wp('50%'));
      verticalBounce();
    } else if (selectedOrderStatus === OrderStatus.REJECTED) {
      animatedBackgroundView.value = withTiming(wp('75%'));
      verticalBounce();
    } else if (selectedOrderStatus === OrderStatus.DENIED) {
      animatedBackgroundView.value = withTiming(wp('100%'));
      verticalBounce();
    }
  }, [selectedOrderStatus]);

  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{height: hp('6.5%')}}>
        <Animated.View
          style={[
            {
              width: wp('22%'),
              height: Platform.OS === 'android' ? hp(6.5) : hp(5),
              backgroundColor: Colors.primary,
              position: 'absolute',
              borderRadius: 10,
            },
            animatedStyles,
          ]}
        />

        {orderStatus.map((val, ind) => {
          const isSelected = val.value === selectedOrderStatus;

          return (
            <View
              style={{
                width: wp('22%'),
                marginLeft: ind !== 0 ? wp('3%') : wp(0),
              }}>
              <TouchableOpacity
                onPress={() => {
                  onTabChange(val);
                }}>
                <View
                  style={{
                    // width: wp('25%'),
                    paddingLeft: wp('3%'),
                    paddingRight: wp('3%'),
                    paddingTop: wp('3.5%'),
                    paddingBottom: wp('3.5%'),
                    borderWidth: 0.5,
                    borderRadius: 10,
                    borderColor: Colors.primary,
                  }}>
                  <Text
                    style={{
                      color: isSelected ? Colors.white : Colors.primary,
                      fontSize: 11,
                      fontWeight: '500',
                      textAlign: 'center',
                    }}>
                    {val.label}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default OrdersFilterTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
