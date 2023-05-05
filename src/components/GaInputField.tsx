import React from 'react';
import {
  KeyboardType,
  StyleSheet,
  TextStyle,
  Touchable,
  View,
} from 'react-native';
import {TextInput} from 'react-native-element-textinput';
import Colors from '../theme/Colors';
import {hp, wp} from '../utility/responsive/ScreenResponsive';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AdaptiveButton from './button/AdaptiveButton';

type Props = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: Function;
  keyboardType?: KeyboardType;
  isNotEditable?: boolean;
  multiline?: boolean;
  customInputStyle?: TextStyle;
  customTextStyle?: TextStyle;
  labelStyle?: TextStyle;
  isVerified?: boolean;
  showVerificationStatus?: boolean;
  onIconPresss?: Function;
};

const GaInputField: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  label,
  keyboardType,
  isNotEditable,
  multiline,
  customInputStyle,
  customTextStyle,
  labelStyle,
  showVerificationStatus = false,
  isVerified,
  onIconPresss,
}) => {
  return (
    <TextInput
      multiline={multiline}
      renderRightIcon={() => {
        return (
          <View>
            {isVerified ? (
              <Icon name="check-circle" size={20} color={Colors.green} />
            ) : (
              // <TouchableOpacity onPress={() => onIconPresss && onIconPresss()}>
              //   <Icon
              //     size={20}
              //     color={Colors.yellow}
              //     name="information-outline"
              //   />
              // </TouchableOpacity>
              <AdaptiveButton
                onPress={() => onIconPresss && onIconPresss()}
                buttonStyle={{
                  width: wp('20%'),
                  height: hp(4),
                  marginHorizontal: 1,
                  backgroundColor: Colors.red,
                }}
                textStyle={{fontSize: wp(3)}}
                title={'Verify'}
              />
            )}
          </View>
        );
      }}
      returnKeyType="done"
      showIcon={showVerificationStatus}
      editable={!isNotEditable}
      value={value}
      keyboardType={keyboardType}
      style={{...styles.input, ...customInputStyle}}
      inputStyle={{...styles.inputStyle, ...customTextStyle}}
      labelStyle={{...styles.labelStyle, ...labelStyle}}
      placeholderStyle={styles.placeholderStyle}
      textErrorStyle={styles.textErrorStyle}
      label={label}
      placeholder={placeholder}
      placeholderTextColor={Colors.grey}
      focusColor={Colors.primary}
      onChangeText={text => {
        onChangeText(text);
      }}
    />
  );
};

export default GaInputField;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    minHeight: hp('2%'),
    maxHeight: hp('20%'),
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
  },
  inputStyle: {fontSize: 16},
  labelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
  },
  placeholderStyle: {fontSize: 16, color: Colors.grey},
  textErrorStyle: {fontSize: 16},
});
