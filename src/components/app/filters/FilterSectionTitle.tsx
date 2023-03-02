import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';

interface FilterSectionTitleProps {
  title: string;
}

const FilterSectionTitle: React.FC<FilterSectionTitleProps> = props => {
  return (
    <View>
      <Text style={styles.amountRange}>{props.title}</Text>
    </View>
  );
};

export default FilterSectionTitle;

const styles = StyleSheet.create({
  amountRange: {
    ...Style.getTextStyle(Fonts.getFontSize('headline4'), 'Bold', Colors.black),
  },
});
