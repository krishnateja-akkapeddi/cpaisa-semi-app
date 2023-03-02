import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import RadioList from './RadioList';
import FilterSectionTitle from './FilterSectionTitle';
import Spacer from '../../layout/Spacer';
import {hp} from '../../../utility/responsive/ScreenResponsive';

interface RadioViewProps {
  title: string;
  multi?: boolean;
  data: string[];
  style?: ViewStyle;
  selectedIds?: number[];
  onValueChange?: (arg0: number[]) => void;
}

const RadioView: React.FC<RadioViewProps> = props => {
  return (
    <View style={props.style}>
      <FilterSectionTitle title={props.title} />
      <Spacer height={hp(0.9)} />
      <RadioList
        multi={props.multi}
        selectedIds={props.selectedIds}
        onValueChange={props.onValueChange}
        data={props.data}
      />
    </View>
  );
};

export default RadioView;

const styles = StyleSheet.create({});
