import React, {useMemo} from 'react';
import {StyleSheet, View, Text, ViewStyle} from 'react-native';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import AdaptiveButton from '../../button/AdaptiveButton';
interface DashboardSectionHeaderProps {
  style?: ViewStyle;
  headerTitle: string;
  title?: string;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  onPress?: () => void;
}
const DashboardSectionHeader: React.FC<DashboardSectionHeaderProps> = props => {
  const {
    style,
    headerTitle,
    title,
    iconName,
    iconSize = wp(2.5),
    iconColor,
    onPress,
  } = props;

  const mainStyle = useMemo(() => [styles.main, style], [style]);
  return (
    <View style={mainStyle}>
      <Text style={styles.headerTitle}>{headerTitle}</Text>
      <AdaptiveButton
        type="text"
        isReverse
        title={title}
        iconColor={iconColor}
        iconSize={iconSize}
        icon={iconName}
        buttonStyle={styles.btn}
        textStyle={styles.btnText}
        onPress={onPress}
      />
    </View>
  );
};
export default DashboardSectionHeader;
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(3),
    alignItems: 'center',
  },
  headerTitle: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Medium',
      Colors.placeholder,
    ),
  },
  btn: {
    height: 'auto',
  },
  btnText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.primary,
    ),
  },
});
