import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AuthBaseScreen from './AuthBaseScreen';
import Validator from '../../utility/validation/Validator';
import RootNavigation from '../../navigation/RootNavigation';
import {AuthStackScreenProps} from '../../navigation/stack/AuthStackNavigator';
import GaInputValidationMessage from '../../components/GaInputValidationMessage';
import {store} from '../../store/Store';
import {setRegistrationInfo} from '../../store/slices/AuthSlice';
import {Convert} from '../../utility/converter/Convert';
import GaInputField from '../../components/GaInputField';
import Spacer from '../../components/layout/Spacer';
import {add} from 'lodash';

const EnterDetailsScreen: React.FC<
  AuthStackScreenProps<'EnterDetailsScreen'>
> = props => {
  console.log('AUTH_PRIR', props.route.params);

  const infoFromIdentity = props?.route?.params;

  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  const onContinueHandler = () => {
    store.dispatch(
      setRegistrationInfo({
        firm_name: shopName,
        address: {
          line: address,
          pincode: pincode,
          lat: infoFromIdentity.address?.lat ?? '',
          long: infoFromIdentity.address?.long ?? '',
        },
      }),
    );
    RootNavigation.navigate('CompleteKYCScreen', {
      ...infoFromIdentity,
      firm_name: shopName,
      address: {
        line: address,
        pincode: pincode,
        lat: infoFromIdentity.address?.lat ?? '',
        long: infoFromIdentity.address?.long ?? '',
      },
    });
  };

  const isValidData = (): boolean => {
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

  useEffect(() => {
    if (infoFromIdentity?.address) {
      setAddress(`${infoFromIdentity?.address.line}`);
    }
    if (infoFromIdentity?.firm_name) {
      setShopName(infoFromIdentity.firm_name);
    }
    if (infoFromIdentity?.address?.pincode) {
      setPincode(infoFromIdentity.address.pincode);
    }
  }, [infoFromIdentity]);

  const isValidPincode = () => {
    return Validator.isValidPincode(pincode);
  };

  return (
    <AuthBaseScreen
      title={
        !infoFromIdentity?.firm_name
          ? 'Enter your details'
          : AppLocalizedStrings.auth.confirmYourDetails
      }
      iconName="enter_details">
      <GaInputField
        customTextStyle={{marginTop: hp(1.5)}}
        customInputStyle={{
          height: infoFromIdentity?.firm_name
            ? hp(
                `${
                  infoFromIdentity?.firm_name?.length < 40
                    ? hp(0.8)
                    : infoFromIdentity?.firm_name?.length / hp(0.8)
                }%`,
              )
            : hp(7),
        }}
        isNotEditable={!!infoFromIdentity?.firm_name}
        value={
          infoFromIdentity.firm_name ? Convert.toTitleCase(shopName) : shopName
        }
        multiline
        onChangeText={setShopName}
        placeholder={AppLocalizedStrings.auth.enterShopName}
        label={'Firm Name'}
      />

      <Spacer height={hp(3)} />

      {infoFromIdentity.address && infoFromIdentity.address.line.length > 0 ? (
        <GaInputField
          customTextStyle={{marginTop: hp(1)}}
          customInputStyle={{
            height: infoFromIdentity?.address?.line
              ? hp(
                  `${
                    infoFromIdentity?.address?.line?.length < 40
                      ? hp(0.7)
                      : infoFromIdentity?.address?.line?.length / hp(0.6)
                  }%`,
                )
              : hp(7),
          }}
          isNotEditable={!!infoFromIdentity?.address?.line}
          value={
            infoFromIdentity.address
              ? address
                  .split(',')
                  .map(val => ' ' + Convert.capitalize(val))
                  .join()
              : address
          }
          multiline
          onChangeText={setAddress}
          placeholder={AppLocalizedStrings.auth.enterAddress}
          label={'Address'}
        />
      ) : (
        <GaInputField
          value={address}
          onChangeText={setAddress}
          label="Enter Address"
          placeholder="Enter address"
        />
      )}
      <Spacer height={hp(2)} />
      {pincode.length > 1 && (
        <GaInputValidationMessage
          message={AppLocalizedStrings.validPin}
          canShow={isValidPincode()}
        />
      )}
      <Spacer height={hp(1)} />
      <GaInputField
        keyboardType="decimal-pad"
        isNotEditable={!!infoFromIdentity?.address?.pincode}
        value={pincode}
        onChangeText={setPincode}
        placeholder={AppLocalizedStrings.auth.enterPincode}
        label={'Pincode'}
      />
      <Spacer height={hp(2)} />
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
  ownerPickerStyles: {
    height: hp(5),
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: wp(6),
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
