import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Spacer from '../layout/Spacer';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';

interface RadioButtonProps {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = props => {
  const isSelected = props.isSelected;
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.button}>
      <View style={styles.container}>
        <View style={isSelected == true ? styles.active : styles.inactive}>
          {isSelected == true && <View style={styles.dot} />}
        </View>
        <Spacer width={wp(2)} />
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: hp(3),
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginEnd: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  active: {
    width: wp(4.5),
    aspectRatio: 1,
    borderRadius: wp(4.5) / 2,
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: wp(0.5),
  },
  inactive: {
    width: wp(4.5),
    aspectRatio: 1,
    borderRadius: wp(4.5) / 2,
    borderColor: Colors.darkBlack,
    borderWidth: 1,
  },
  dot: {
    backgroundColor: Colors.primary,
    flex: 1,
    borderRadius: wp(4.5) / 2,
  },
  title: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4') + 1,
      'Medium',
      Colors.black,
    ),
  },
});
