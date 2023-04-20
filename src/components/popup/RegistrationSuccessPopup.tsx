import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PopupContainer from './PopupContainer';
import {AppLocalizedStrings} from '../../localization/Localization';
import SVGIcon from '../../utility/svg/SVGIcon';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import Spacer from '../layout/Spacer';
import AdaptiveButton from '../button/AdaptiveButton';

interface RegistrationSuccessPopupProps {
  goToDashboard: () => void;
}

const RegistrationSuccessPopup: React.FC<
  RegistrationSuccessPopupProps
> = props => {
  const {goToDashboard} = props;

  return (
    <PopupContainer showHeader={false} title={''} showDismiss={false}>
      <View style={styles.container}>
        <SVGIcon size={wp(10)} name="checkmark_circle" />
        <Text style={styles.successful}>
          {AppLocalizedStrings.auth.registrationSuccess}
        </Text>
        <Spacer height={hp(1)} />
        <Text style={styles.info}>
          Dear Mr. Rakesh Mishra, You have successfully registered on
          ChannelPaisa
        </Text>
        <AdaptiveButton
          buttonStyle={styles.button}
          type="light"
          title={AppLocalizedStrings.goToDashboard}
          onPress={goToDashboard}
        />
      </View>
    </PopupContainer>
  );
};

export default RegistrationSuccessPopup;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  lblContainer: {flexDirection: 'row', marginTop: hp(0.5)},
  successful: {
    ...Style.getTextStyle(Fonts.getFontSize('headline2'), 'Bold', Colors.black),
    marginTop: hp(2),
    marginBottom: hp(0.4),
  },
  info: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.black,
    ),
    textAlign: 'center',
  },
  button: {
    marginTop: hp(4),
    width: '100%',
  },
});
