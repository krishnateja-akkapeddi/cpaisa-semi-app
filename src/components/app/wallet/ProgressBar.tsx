import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {memo, useMemo} from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import StepIndicator from 'react-native-step-indicator';

const customStyles = {
  stepIndicatorSize: 10,
  currentStepIndicatorSize: 10,
  separatorStrokeWidth: 2,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: Colors.primary,
  stepStrokeUnFinishedColor: Colors.primary,
  separatorFinishedColor: Colors.primary,
  stepStrokeCurrentColor: Colors.primary,
  stepIndicatorFinishedColor: Colors.primary,
  stepIndicatorUnFinishedColor: Colors.white,
  separatorUnFinishedColor: Colors.border,
};

interface ProgressBarProps {
  items: {title: string; date: string}[];
  completedSteps?: number;
  style?: ViewStyle;
}
const ProgressBar = (props: ProgressBarProps) => {
  const {style, completedSteps = 0, items} = props;
  const mainStyle: ViewStyle[] = useMemo(
    () => [styles.main, style ?? {}],
    [style],
  );
  const labels = useMemo(() => items.map(item => item.title), [items]);
  const renderLabel = ({
    position,
    label,
  }: {
    position: number;
    stepStatus: string;
    label: string;
    currentPosition: number;
  }) => {
    const isActive = position <= completedSteps;
    const color = isActive == true ? Colors.primary : Colors.grey;
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.lblDate}>{items[position].date}</Text>
        <Text style={[styles.lblStatus, {color}]}>{label}</Text>
      </View>
    );
  };

  return (
    <View style={mainStyle}>
      <StepIndicator
        stepCount={items.length}
        customStyles={customStyles}
        currentPosition={completedSteps}
        labels={labels}
        renderStepIndicator={() => undefined}
        renderLabel={renderLabel}
      />
    </View>
  );
};

export default memo(ProgressBar);

const styles = StyleSheet.create({
  main: {width: '100%', paddingHorizontal: 20},
  //   track: {
  //     flexGrow: 1,
  //     height: hp(0.3),
  //     backgroundColor: Colors.border,
  //     alignItems: 'center',
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //   },
  //   dotContainer: {},
  //   dot: {
  //     height: wp(2),
  //     aspectRatio: 1,
  //     backgroundColor: Colors.white,
  //     borderRadius: wp(2) / 2,
  //     borderWidth: 1,
  //     borderColor: Colors.primary,
  //   },
  //   labelContainer: {
  //     alignItems: 'center',
  //   },
  infoContainer: {
    marginTop: hp(0.2),
    paddingHorizontal: wp(0.3),
    alignItems: 'center',
  },
  lblDate: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline6'),
      'Regular',
      Colors.grey,
    ),
  },
  lblStatus: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline6'),
      'Medium',
      Colors.primary,
    ),
    textAlign: 'center',
  },
});
