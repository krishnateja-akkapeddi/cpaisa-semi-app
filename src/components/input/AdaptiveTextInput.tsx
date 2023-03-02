import React, {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextStyle,
  ViewStyle,
  KeyboardType,
} from 'react-native';
import Style from '../../constants/Style';
import Colors from '../../theme/Colors';

interface AdaptiveTextInputProps {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  value?: string;
  style?: TextStyle;
  keyboardType?: KeyboardType;
  placeholderTextColor?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

const AdaptiveTextInput: React.FC<AdaptiveTextInputProps> = props => {
  const style: ViewStyle = useMemo(() => {
    return {...styles.textInput, ...(props.style ?? {})};
  }, [props.style]);

  return (
    <TextInput
      autoCapitalize={props.autoCapitalize}
      value={props.value}
      keyboardType={props.keyboardType ?? 'default'}
      style={style}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor ?? Colors.placeholder}
      onChangeText={props.onChangeText}
    />
  );
};

export default AdaptiveTextInput;

const styles = StyleSheet.create({
  textInput: {
    height: Style.kTextInputHeight,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Style.kBorderRadius,
    width: '100%',
    paddingHorizontal: 10,
    textAlign: 'center',
    ...Style.getTextStyle(
      Style.kTextInputFontSize,
      Style.kTextInputFontFamily,
      Colors.black,
    ),
  },
});
