import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AdaptiveButton from '../../button/AdaptiveButton';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import Picker, {DropDownItem} from '../../picker/Picker';
import {PickerItem} from 'react-native-woodpicker';
import {FetchInvoiceListParams} from '../../../domain/usages/FetchInvoiceList';

interface QuarterViewProps {
  multi?: boolean;
  style?: ViewStyle;
  selectedIds?: number[];
  data: string[];
  params?: any;
  onValueChange: (arg0: number[]) => void;
  selectedYear?: PickerItem;
  yearData: DropDownItem[];
  onYearChange?: any;
}

const QuarterView: React.FC<QuarterViewProps> = props => {
  const multi = props.multi ?? false;
  const [selectedIds, setSelectedIds] = useState<number[]>(
    props.selectedIds ?? [],
  );

  useEffect(() => {
    setSelectedIds(props.selectedIds ?? []);
  }, [props.selectedIds]);

  const onQuarterPressHandler = (index: number) => {
    let ids = [...selectedIds];
    const preIndex = ids.indexOf(index);
    if (preIndex == -1) {
      if (!multi) ids = [];
      ids.push(index);
    } else {
      ids = ids.filter(e => e != index);
    }
    setSelectedIds(ids);
    props.onValueChange(ids);
  };

  const renderItem = ({item, index}: ListRenderItemInfo<string>) => {
    const isActive = selectedIds.indexOf(index) != -1;
    return (
      <>
        {index !== 0 && (
          <AdaptiveButton
            // isDisable={true}
            type={isActive == true ? 'dark' : 'light'}
            buttonStyle={
              isActive == true ? styles.btnActive : styles.btnInactive
            }
            textStyle={
              isActive == true ? styles.btnTextActive : styles.btnTextInactive
            }
            title={item}
            onPress={onQuarterPressHandler.bind(this, index)}
          />
        )}
      </>
    );
  };

  return (
    <View style={props.style}>
      <View style={styles.container}>
        <FlatList
          alwaysBounceHorizontal={false}
          horizontal
          data={props.data}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Spacer width={wp(1)} />}
        />

        <Picker
          placeholder="Select Year"
          mode="dropdown"
          item={props.selectedYear}
          textStyle={styles.textInput}
          style={styles.picker}
          items={props.yearData}
          onItemChange={props.onYearChange}
        />
      </View>
    </View>
  );
};

export default QuarterView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  btnActive: {
    height: hp(3.5),
    paddingHorizontal: wp(3),
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  btnTextActive: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.white,
    ),
  },
  btnInactive: {
    height: hp(3.5),
    paddingHorizontal: wp(3),
    borderColor: Colors.darkBlack,
  },
  btnTextInactive: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  picker: {
    height: hp(3.5),
    paddingHorizontal: wp(3),
    borderColor: Colors.darkBlack,
    borderRadius: Style.kBorderRadius,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  textInput: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.darkBlack,
    ),
  },
});
