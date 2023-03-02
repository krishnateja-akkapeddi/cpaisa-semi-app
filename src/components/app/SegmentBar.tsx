import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AdaptiveButton from '../button/AdaptiveButton';
import Spacer from '../layout/Spacer';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

interface SegmentBarProps {
  showLine?: boolean;
  selectedIndex?: number;
  items: string[];
  activeStyle?: ViewStyle;
  activeTextStyle?: TextStyle;
  inActiveStyle?: ViewStyle;
  inActiveTextStyle?: TextStyle;
  itemSpacing?: number;
  containerStyle?: ViewStyle;
  onValueChange?: (arg0: number) => void;
}

const SegmentBar: React.FC<SegmentBarProps> = props => {
  const {
    showLine = false,
    items,
    onValueChange,
    containerStyle,
    itemSpacing = wp(3),
    activeTextStyle,
    activeStyle,
    inActiveTextStyle,
    inActiveStyle,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(props.selectedIndex ?? 0);
  }, [props.selectedIndex]);

  const onItemPress = (index: number) => {
    setSelectedIndex(index);
    onValueChange?.(index);
  };

  const buttonActiveStyle: ViewStyle = useMemo(() => {
    return {...styles.btnActive, ...activeStyle};
  }, [activeStyle]);
  const buttonInActiveStyle: ViewStyle = useMemo(() => {
    return {...styles.btn, ...inActiveStyle};
  }, [inActiveStyle]);

  const buttonActiveTextStyle: TextStyle = useMemo(() => {
    return {...styles.btnTextActive, ...activeTextStyle};
  }, [activeTextStyle]);
  const buttonInActiveTextStyle: TextStyle = useMemo(() => {
    return {...styles.btnText, ...inActiveStyle};
  }, [inActiveTextStyle]);

  const renderItem = ({item, index}: ListRenderItemInfo<string>) => {
    const isActive = selectedIndex == index;
    const isFirst = index == 0;
    return (
      <View style={styles.itemContainer}>
        <AdaptiveButton
          buttonStyle={
            isActive == true ? buttonActiveStyle : buttonInActiveStyle
          }
          textStyle={
            isActive == true ? buttonActiveTextStyle : buttonInActiveTextStyle
          }
          type="text"
          title={item}
          onPress={onItemPress.bind(this, index)}
        />
        {isFirst && showLine && <View style={styles.lineView}></View>}
      </View>
    );
  };

  return (
    <View style={[containerStyle, {flexDirection: 'row'}]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        horizontal
        style={styles.list}
        data={items}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Spacer width={itemSpacing} />}
      />
    </View>
  );
};

export default memo(SegmentBar);

const styles = StyleSheet.create({
  list: {
    height: hp(3),
  },
  btn: {
    height: 'auto',
  },
  btnText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.placeholder,
    ),
  },
  btnActive: {
    height: 'auto',
    borderColor: Colors.black,
    borderBottomWidth: 2,
  },
  btnTextActive: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4') + 1,
      'Bold',
      Colors.black,
    ),
  },
  lineView: {
    height: '60%',
    width: 1.5,
    backgroundColor: Colors.black,
    marginStart: wp(7),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
