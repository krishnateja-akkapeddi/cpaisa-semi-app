import React, {useState} from 'react';
import {Dimensions, StyleSheet, Switch, Text, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const Colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    background: '#F8F8F8',
    circle: '#FFF',
    text: '#1E1E1E',
  },
};

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256, 0, 256, 0.2)',
  false: 'rgba(0,0,0,0.1)',
};

type Theme = 'light' | 'dark';

type AnimatedBackgroundProps = {
  children: React.ReactNode;
  startColor: string;
  endColor: string;
  triggerChange: boolean;
};

export function AnimatedBackground(props: AnimatedBackgroundProps) {
  const {children, endColor, startColor, triggerChange} = props;

  // const progress = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return triggerChange ? withTiming(1) : withTiming(0);
  }, [triggerChange]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [startColor, endColor],
    );

    return {backgroundColor};
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    );

    return {backgroundColor};
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    );

    return {color};
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>{children}</Animated.View>
  );
}

const SIZE = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE / 2,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  text: {
    fontSize: 70,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 14,
    marginBottom: 35,
  },
});
