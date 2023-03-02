import {
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import RadioButton from '../../button/RadioButton';
import Spacer from '../../layout/Spacer';
import {hp} from '../../../utility/responsive/ScreenResponsive';

interface RadioListProps {
  multi?: boolean;
  numOfColumn?: number;
  styles?: ViewStyle;
  data: string[];
  onValueChange?: (arg0: number[]) => void;
  selectedIds?: number[];
}

const RadioList: React.FC<RadioListProps> = props => {
  const numOfColumn = props.numOfColumn ?? 2;
  const multi = props.multi ?? false;
  const [selectedIds, setSelectedIds] = useState<number[]>(
    props.selectedIds ?? [],
  );

  useEffect(() => {
    setSelectedIds(props.selectedIds ?? []);
  }, [props.selectedIds]);

  const onRadioPress = (index: number) => {
    let ids = [...selectedIds];
    const preIndex = ids.indexOf(index);
    if (preIndex == -1) {
      if (!multi) ids = [];
      ids.push(index);
    } else {
      ids = ids.filter(e => e != index);
    }
    setSelectedIds(ids);
    props.onValueChange?.(ids);
  };

  const renderItem = ({item, index}: ListRenderItemInfo<string>) => {
    return (
      <RadioButton
        title={item}
        isSelected={selectedIds.indexOf(index) != -1}
        onSelect={onRadioPress.bind(this, index)}
      />
    );
  };
  return (
    <View style={props.styles}>
      <FlatList
        numColumns={numOfColumn}
        data={props.data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Spacer height={hp(0.8)} />}
      />
    </View>
  );
};

export default RadioList;

const styles = StyleSheet.create({});
