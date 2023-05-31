import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {hp, wp} from '../utility/responsive/ScreenResponsive';
import Colors from '../theme/Colors';

type Props = {
  children: React.ReactNode;
};

const imageUri = require('../assets/images/EnterDetailsArt.png');
const {width, height} = Dimensions.get('window');
const GaPinchableImage = (props: Props) => {
  const scale = useSharedValue(0);
  const focalX = useSharedValue(1);
  const focalY = useSharedValue(1);

  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const pinchGestureHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
        // focalX.value = event.focalX;
        // focalY.value = event.focalY;
      },
    });

  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
      ],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
      {props.children}
    </PinchGestureHandler>
  );
};

export default GaPinchableImage;

const styles = StyleSheet.create({
  container: {},
  image: {width: wp(100), height: hp(20)},
});
