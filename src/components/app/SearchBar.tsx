import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Fonts from '../../theme/Fonts';
import Style from '../../constants/Style';
import Colors from '../../theme/Colors';
import SVGIcon from '../../utility/svg/SVGIcon';
import {wp} from '../../utility/responsive/ScreenResponsive';
import Icon from 'react-native-vector-icons/AntDesign';
import {AppLocalizedStrings} from '../../localization/Localization';

type SearchButtonType = 'small' | 'large';
interface SearchBarPorps {
  placeholder: string;
  shadow?: boolean;
  type?: SearchButtonType;
  onChange?: (e: string) => void;
  value?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const SearchBar: React.FC<SearchBarPorps> = props => {
  const {placeholder, shadow, type} = props;
  const [searchText, setSearchText] = useState('');

  const onPress = () => {
    // RootNavigation.navigate('InvoiceUploadScreen');
  };

  return (
    <View style={styles.textInputContainer}>
      <SVGIcon name="search" color={Colors.darkBlack} size={wp('4%')} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#CCC"
        style={styles.textInputStyle}
        onChangeText={props.onChange}
        value={props.value}
      />
      <View style={type == 'small' ? null : styles.bottomView}>
        <TouchableOpacity
          onPressIn={onPress}
          style={styles.touchableStyle}
          onPress={props.onPress}>
          {type == 'small' ? null : (
            <Text style={styles.buttonTextStyle}>
              {AppLocalizedStrings.search.search}
            </Text>
          )}
          <Icon name="arrowright" color="#fff" size={wp('3%')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  touchableStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: '105%',
  },
  textInputContainer: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    backgroundColor: Colors.white,
    shadowRadius: 4,
    paddingLeft: 15,
    height: Style.kTextInputHeight,
    borderRightWidth: 0,
    elevation: 15,
  },
  textInputStyle: {
    paddingLeft: 15,
    flex: 1,
    color: Colors.black,
  },
  buttonTextStyle: {
    fontFamily: Fonts.regular,
    color: '#ffff',
    marginRight: 13,
  },
  bottomView: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
