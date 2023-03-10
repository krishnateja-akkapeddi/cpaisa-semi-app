import React, {memo, ReactNode, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../theme/Colors';
import Spacer from '../layout/Spacer';
import SVGIcon from '../../utility/svg/SVGIcon';

type ButtonType = 'dark' | 'light' | 'text';

interface AdaptiveButtonProps {
  isReverse?: boolean;
  isDisable?: boolean;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  type?: ButtonType;
  title?: string | ReactNode;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

interface ButtonStyle {
  textStyle: TextStyle;
  buttonStyle: ViewStyle;
}

const AdaptiveButton: React.FC<AdaptiveButtonProps> = props => {
  const {
    type = 'dark',
    isReverse = false,
    buttonStyle,
    textStyle,
    isDisable = false,
    icon,
    iconColor,
    title,
    iconSize = 15,
    onPress,
  } = props;

  const btnStyle: ButtonStyle = useMemo(() => {
    let style: ButtonStyle = {
      textStyle: {},
      buttonStyle: {},
    };
    switch (type) {
      case 'light':
        style.buttonStyle = {...styles.btnLight, ...(buttonStyle ?? {})};
        style.textStyle = {...styles.textLight, ...(textStyle ?? {})};
        break;
      case 'text':
        style.buttonStyle = {...styles.btnText, ...(buttonStyle ?? {})};
        style.textStyle = {...styles.textText, ...(textStyle ?? {})};
        break;
      default:
        style.buttonStyle = {...styles.btnDark, ...(buttonStyle ?? {})};
        style.textStyle = {...styles.textDark, ...(textStyle ?? {})};
        break;
    }
    style.buttonStyle.opacity = isDisable ? 0.5 : 1;
    return style;
  }, [type, buttonStyle, textStyle, isDisable]);

  return (
    <TouchableOpacity
      style={btnStyle.buttonStyle}
      onPress={!isDisable ? onPress : undefined}>
      <View
        style={isReverse == true ? styles.containerReverse : styles.container}>
        {icon && (
          <SVGIcon
            name={icon}
            color={
              iconColor ??
              (title != null ? btnStyle.textStyle.color?.toString() : undefined)
            }
            size={iconSize}
          />
        )}
        {icon != null && title != null && <Spacer style={styles.spacer} />}
        <Text style={btnStyle.textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(AdaptiveButton);

const styles = StyleSheet.create({
  btnText: {
    backgroundColor: Colors.transparent,
    height: Style.kButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLight: {
    backgroundColor: Colors.transparent,
    height: Style.kButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: Style.kBorderRadius,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  btnDark: {
    backgroundColor: Colors.primary,
    height: Style.kButtonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: Style.kBorderRadius,
  },
  textLight: {
    ...Style.getTextStyle(
      Style.kButtonFontSize,
      Style.kButtonFontFamily,
      Colors.primary,
    ),
  },
  textText: {
    ...Style.getTextStyle(
      Style.kButtonFontSize,
      Style.kButtonFontFamily,
      Colors.black,
    ),
  },
  textDark: {
    ...Style.getTextStyle(
      Style.kButtonFontSize,
      Style.kButtonFontFamily,
      Colors.white,
    ),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerReverse: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  icon: {},
  spacer: {
    width: 5,
  },
});
