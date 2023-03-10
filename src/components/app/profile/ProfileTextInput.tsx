import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import AdaptiveButton from '../../button/AdaptiveButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {contactType, modeType} from '../../../domain/usages/UpdateContact';
import AppLoader from '../../indicator/AppLoader';

interface ProfileTextInputProps {
  title?: string;
  placeholder?: string;
  style?: ViewStyle;
  value: string;
  loading?: boolean;
  onChangeText?: (arg0: string) => void;
  handleUpdateContact?: (key: contactType, mode: modeType) => Promise<void>;
  onEditPress?: () => void;
  isEditable?: boolean;
}

const ProfileTextInput: React.FC<ProfileTextInputProps> = props => {
  const {
    placeholder,
    title,
    style,
    value,
    onChangeText,
    isEditable = true,
  } = props;
  const [editable, setEditable] = useState(false);
  const onEdit = useCallback(() => {
    // setEditable(val => !val);
    props.handleUpdateContact &&
      props.handleUpdateContact('mobile_value', 'mobile');
  }, []);

  const styleContainer = useMemo(() => [styles.container, style], [style]);

  return (
    <View style={styleContainer}>
      <View style={styles.upperContainer}>
        <Text style={styles.title}>{title}</Text>
        {props.isEditable && (
          <AdaptiveButton
            buttonStyle={styles.edit}
            textStyle={styles.editText}
            type="text"
            title={
              props.loading ? (
                <AppLoader size="small" type="none" loading={true} />
              ) : editable ? (
                AppLocalizedStrings.save
              ) : (
                AppLocalizedStrings.edit
              )
            }
            onPress={props.onEditPress}
          />
        )}
      </View>
      <TextInput
        value={value}
        editable={editable}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default ProfileTextInput;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  upperContainer: {
    paddingHorizontal: 4,
    marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    // height: Math.min(hp('5%'), 35),
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    paddingBottom: Platform.OS == 'android' ? 7 : 0,
    ...Style.getTextStyle(Fonts.getFontSize('headline5'), 'Bold', Colors.grey),
  },
  title: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.black,
    ),
  },
  edit: {
    height: 'auto',
  },
  editText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.primary,
    ),
  },
});
