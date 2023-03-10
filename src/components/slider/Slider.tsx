import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {useState, useMemo, useCallback} from 'react';
import {Slider as RangeSlider} from '@miblanchard/react-native-slider';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';

interface SliderProps {
  showValue?: boolean;
  thumbText?: string;
  disabled?: boolean;
  value: number | number[];
  min?: number;
  max?: number;
  step?: number;
  trackStyle?: ViewStyle;
  thumbStyle?: ViewStyle;
  style?: ViewStyle;
  textStyle?: TextStyle;
  handleSlideComplete?: any;
}

const Slider: React.FC<SliderProps> = props => {
  const {
    thumbText,
    min = 0,
    max = 100,
    step = 1,
    disabled,
    trackStyle,
    thumbStyle,
    style,
    textStyle,
    showValue = false,
    handleSlideComplete,
  } = props;

  const [notchWidth, setNotchWidth] = useState([0, 0]);

  const trackViewStyle = useMemo(() => {
    return {...styles.trackStyle, ...trackStyle};
  }, [trackStyle]);

  const thumbViewStyle = useMemo(() => {
    return {...styles.thumbStyle, ...thumbStyle};
  }, [thumbStyle]);

  const valueTextStyle = useMemo(() => {
    return {...styles.valueText, ...textStyle};
  }, [textStyle]);
  const [value, setValue] = useState<number | number[]>(props.value);

  const renderAboveThumbComponent = useCallback(
    (index: number) => {
      let thumbWidth = +(thumbViewStyle?.width?.toString() ?? '0');
      thumbWidth = !isNaN(thumbWidth) ? thumbWidth : 20;
      let text = '';
      if (thumbText != null && thumbText.length > 0) {
        text = thumbText;
      } else if (Array.isArray(value)) {
        text = value[index].toString();
      } else {
        text = value.toString();
      }
      return (
        <View
          style={[
            styles.thumbAbove,
            {left: -(notchWidth[index] - thumbWidth) / 2},
          ]}
          onLayout={e => {
            let currentValue = [...notchWidth];
            if (e.nativeEvent.layout.width != currentValue[index]) {
              currentValue[index] = e.nativeEvent.layout.width;
              setNotchWidth(currentValue);
            }
          }}>
          <Text>{text}</Text>
        </View>
      );
    },
    [thumbViewStyle, value, thumbText, notchWidth],
  );

  return (
    <View style={styles.container}>
      <RangeSlider
        disabled={disabled}
        containerStyle={props.style ?? styles.slider}
        value={value}
        step={step}
        minimumValue={min}
        maximumValue={max}
        thumbTintColor={Colors.primary}
        maximumTrackTintColor={Colors.placeholder}
        trackStyle={trackViewStyle}
        thumbStyle={thumbViewStyle}
        minimumTrackTintColor={Colors.primary}
        onValueChange={setValue}
        onSlidingComplete={handleSlideComplete}
        renderAboveThumbComponent={renderAboveThumbComponent}
      />
      {showValue && (
        <View style={styles.horizontalContainer}>
          <Text style={valueTextStyle}>{min}</Text>
          <Text style={valueTextStyle}>{max}</Text>
        </View>
      )}
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {flexDirection: 'column', flex: 1},
  slider: {flex: 1, height: 'auto'},
  trackStyle: {
    height: wp(1),
  },
  thumbStyle: {
    height: wp(2.7),
    width: wp(2.7),
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  valueText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Bold',
      Colors.primary,
    ),
  },
  thumbAbove: {
    top: 56,
  },
});
