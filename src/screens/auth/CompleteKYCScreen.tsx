import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {hp} from '../../utility/responsive/ScreenResponsive';
import AuthBaseScreen from './AuthBaseScreen';
import Validator from '../../utility/validation/Validator';
import RootNavigation from '../../navigation/RootNavigation';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';
import RegistrationSuccessPopup from '../../components/popup/RegistrationSuccessPopup';
import {AuthStackScreenProps} from '../../navigation/stack/AuthStackNavigator';
import GaInputField from '../../components/GaInputField';
import Spacer from '../../components/layout/Spacer';

const CompleteKYCScreen: React.FC<
  AuthStackScreenProps<'CompleteKYCScreen'>
> = props => {
  const infoFromAdditionalDetails = props?.route?.params;
  const [licenseNo, setLicenseNo] = useState<null | string>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const onContinueHandler = async () => {
    licenseNo &&
      RootNavigation.navigate('EnterAdditionalDetails', {
        ...infoFromAdditionalDetails,
        dl_no: licenseNo,
      });
    // setShowSuccessPopup(true);
  };

  const goToHomeHandler = () => {
    licenseNo &&
      RootNavigation.navigate('ChooseOrganisationScreen', {
        ...infoFromAdditionalDetails,
        dl_no: licenseNo,
      });
    // setTimeout(async () => {
    //   await SharedPreference.shared.setItem(kSharedKeys.userDetails, '');
    //   RootNavigation.replace('Drawer');
    // }, 200);
  };

  return (
    <AuthBaseScreen
      title={AppLocalizedStrings.auth.enterDLNo}
      iconName="complete_kyc">
      <GaInputField
        value={licenseNo ?? ''}
        onChangeText={setLicenseNo}
        label={AppLocalizedStrings.auth.enterLicenseNumber}
        placeholder={AppLocalizedStrings.auth.enterLicenseNumber}
      />
      <Spacer height={hp(4)} />
      <AdaptiveButton
        isDisable={!licenseNo}
        title={AppLocalizedStrings.continue}
        onPress={onContinueHandler}
        buttonStyle={styles.btnContinue}
      />
      {showSuccessPopup && (
        <RegistrationSuccessPopup
          goToDashboard={goToHomeHandler.bind(this, true)}
        />
      )}
    </AuthBaseScreen>
  );
};

export default CompleteKYCScreen;

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
    justifyContent: 'flex-end',
  },
});
