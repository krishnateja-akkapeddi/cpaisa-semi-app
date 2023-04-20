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

interface SubscriptionSuccessPopupProps {
  onDismiss: () => void;
}

const SubscriptionSuccessPopup: React.FC<
  SubscriptionSuccessPopupProps
> = props => {
  const {onDismiss} = props;

  return (
    <PopupContainer title={''} showDismiss={true} onDismiss={onDismiss}>
      <View style={styles.container}>
        <SVGIcon size={wp(10)} name="checkmark_circle" />
        <Text style={styles.successful}>
          {AppLocalizedStrings.subscription.successSubscription}
        </Text>
        <Spacer height={hp(1)} />
        <Text style={styles.info}>
          {AppLocalizedStrings.subscription.successSubscriptionInfo}
        </Text>
      </View>
    </PopupContainer>
  );
};

export default SubscriptionSuccessPopup;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  lblContainer: {flexDirection: 'row', marginTop: hp(0.5)},
  successful: {
    ...Style.getTextStyle(Fonts.getFontSize('headline2'), 'Bold', Colors.black),
    marginTop: hp(2),
    marginBottom: hp(0.1),
  },
  info: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.black,
    ),
    textAlign: 'center',
  },
});
