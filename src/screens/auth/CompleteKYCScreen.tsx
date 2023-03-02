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

const CompleteKYCScreen = () => {
  const [licenseNo, setLicenseNo] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const onContinueHandler = async () => {
    setShowSuccessPopup(true);
  };

  const goToHomeHandler = () => {
    setShowSuccessPopup(false);
    setTimeout(async () => {
      await SharedPreference.shared.setItem(kSharedKeys.userDetails, '');
      RootNavigation.replace('Drawer');
    }, 200);
  };

  return (
    <AuthBaseScreen
      title={AppLocalizedStrings.auth.enterDLNo}
      iconName="complete_kyc">
      <AdaptiveTextInput
        autoCapitalize="characters"
        value={licenseNo}
        onChangeText={setLicenseNo}
        placeholder={AppLocalizedStrings.auth.enterLicenseNumber}
        style={styles.input}
      />
      <AdaptiveButton
        isDisable={!Validator.isValidLicenseNo(licenseNo)}
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
