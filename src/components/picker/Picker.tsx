import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {PickerInstance, PickerItem} from 'react-native-woodpicker';
import {Picker as WoodPicker} from 'react-native-woodpicker';
import Colors from '../../theme/Colors';
import Fonts, {FontType} from '../../theme/Fonts';
import {AppLocalizedStrings} from '../../localization/Localization';
import SVGIcon from '../../utility/svg/SVGIcon';
import Spacer from '../layout/Spacer';
import {wp} from '../../utility/responsive/ScreenResponsive';
import DoneBarComponent from './DoneBarComponent';
import {Appearance} from 'react-native';
import {colors} from 'react-native-swiper-flatlist/src/themes';

export interface DropDownItem {
  value: any;
  label: string;
  color?: string;
  fontFamily?: string;
}

interface PickerProps {
  item?: DropDownItem | undefined;
  items: DropDownItem[];
  showArrow?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
  placeholder?: string;
  mode?: 'dropdown' | 'dialog';
  itemColor?: string;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  doneButtonLabel?: string;
  itemFontFamily?: FontType;
  onItemChange: (item: PickerItem, index: number) => void;
}

const Picker: React.FC<PickerProps> = props => {
  const {
    iconName = 'down_arrow',
    iconSize = 10,
    iconColor = Colors.darkBlack,
    showArrow = true,
    mode = 'dialog',
    itemFontFamily = 'Bold',
    itemColor = Colors.darkBlack,
    placeholder,
    doneButtonLabel = AppLocalizedStrings.done,
    textStyle,
    items,
  } = props;

  const pickerRef = useRef<PickerInstance | null>();

  const [pickedData, setPickedData] = useState<PickerItem | undefined>(
    props.item as PickerItem,
  );

  useEffect(() => {
    setPickedData(props.item as PickerItem);
  }, [props.item]);

  const styleContainer = useMemo(
    () => [styles.container, props.style],
    [props.style],
  );

  const onDonePress = () => {
    pickerRef.current?.close();
  };
  return (
    <View style={styleContainer}>
      <WoodPicker
        ref={ref => (pickerRef.current = ref)}
        mode={mode}
        containerStyle={styles.pickerContainer}
        doneButtonLabel={doneButtonLabel}
        textInputStyle={textStyle}
        item={pickedData}
        items={items as PickerItem[]}
        onItemChange={props.onItemChange}
        placeholder={placeholder}
        isNullable={false}
        itemColor={Colors.black}
        itemFontFamily={Fonts.getFontFamily(itemFontFamily)}
        DoneBarComponent={() => <DoneBarComponent onDonePress={onDonePress} />}
        // backdropAnimation={{opacity: 0, duration: 0, delay: 0}}
      />
      {showArrow == true && <Spacer width={wp(1)} />}
      {showArrow == true && (
        <SVGIcon name={iconName} size={iconSize} color={iconColor} />
      )}
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    flexGrow: 1,
  },
});
