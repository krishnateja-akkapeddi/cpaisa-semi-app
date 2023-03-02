import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {hp} from '../../utility/responsive/ScreenResponsive';
import AuthBaseScreen from './AuthBaseScreen';
import Validator from '../../utility/validation/Validator';
import RootNavigation from '../../navigation/RootNavigation';

const EnterDetailsScreen = () => {
  const [ownerName, setOwerName] = useState('Sandeep Suthar');
  const [shopName, setShopName] = useState('D Mart Plaza');
  const [address, setAddress] = useState('Mansarovar, Jaipur');
  const [pincode, setPincode] = useState('335002');

  const onContinueHandler = () => {
    RootNavigation.navigate('DocumentUploadScreen');
  };

  const isValidData = (): boolean => {
    const isValidName = Validator.isValidName(ownerName);
    if (isValidName == false) {
      return false;
    }
    const isValidShopName = Validator.isValidShopName(shopName);
    if (isValidShopName == false) {
      return false;
    }
    const isValidAddress = Validator.isValidAddress(address);
    if (isValidAddress == false) {
      return false;
    }
    const isValidPincode = Validator.isValidPincode(pincode);
    if (isValidPincode == false) {
      return false;
    }
    return true;
  };

  const onGSTHandler = () => {};

  return (
    <AuthBaseScreen
      title={AppLocalizedStrings.auth.confirmYourDetails}
      iconName="enter_details">
      <AdaptiveTextInput
        value={ownerName}
        onChangeText={setOwerName}
        placeholder={AppLocalizedStrings.auth.enterOwnerName}
        style={styles.input}
      />
      <AdaptiveTextInput
        value={shopName}
        onChangeText={setShopName}
        placeholder={AppLocalizedStrings.auth.enterShopName}
        style={styles.input}
      />
      <AdaptiveTextInput
        value={address}
        onChangeText={setAddress}
        placeholder={AppLocalizedStrings.auth.enterAddress}
        style={styles.input}
      />
      <AdaptiveTextInput
        value={pincode}
        onChangeText={setPincode}
        placeholder={AppLocalizedStrings.auth.enterPincode}
        style={styles.input}
      />
      <View style={styles.viewBottom}>
        <AdaptiveButton
          isDisable={!isValidData()}
          title={AppLocalizedStrings.continue}
          onPress={onContinueHandler}
          buttonStyle={styles.btnContinue}
        />
      </View>
    </AuthBaseScreen>
  );
};

export default EnterDetailsScreen;

const styles = StyleSheet.create({
  input: {
    marginBottom: hp('2.5%'),
  },
  btnContinue: {
    width: '100%',
  },
  btnGST: {
    ...Style.getTextStyle(12, 'Regular', Colors.darkBlack),
  },
  viewBottom: {
    flex: 1,
    width: '100%',
    // justifyContent: 'flex-end',
    marginTop: hp('2%'),
    marginBottom: hp('5%'),
  },
});
