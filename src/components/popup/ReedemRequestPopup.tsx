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
import {Convert} from '../../utility/converter/Convert';
interface ReedemRequestPopupProps {
  goToDashboard: () => void;
  onDismiss: () => void;
  company: string;
  coupType: string;
  points: string;
  onDone: Function;
}
const ITEMS = [
  'Company/Department:',
  'Points requested to redeem:',
  'Coupon type:',
];

const ReedemRequestPopup: React.FC<ReedemRequestPopupProps> = props => {
  const {onDismiss, goToDashboard, company, coupType, points, onDone} = props;
  console.log('FROM_PIO', props);

  return (
    <PopupContainer
      title={AppLocalizedStrings.filter.reedemSummary}
      showDismiss={true}
      onDismiss={onDismiss}>
      <View style={styles.container}>
        <SVGIcon size={wp(10)} name="checkmark_circle" />
        <Text style={styles.successful}>
          {AppLocalizedStrings.filter.reedemSuccessful}
        </Text>
        {ITEMS.map((item, index) => {
          return (
            <View key={index} style={styles.lblContainer}>
              <Text style={styles.lblKey}>{item}</Text>
              <Spacer width={wp(2)} />
              <Text style={styles.lblValue}>
                {item.startsWith('Com')
                  ? company
                  : item.startsWith('P')
                  ? points
                  : coupType}
              </Text>
            </View>
          );
        })}
        <Spacer height={hp(1)} />
        <Text style={styles.time}>
          {Convert.dateFormatter(null, 'DD MMM yyyy, HH:mm', new Date())}
        </Text>
        <AdaptiveButton
          buttonStyle={styles.button}
          type="light"
          title={AppLocalizedStrings.done}
          onPress={() => {
            goToDashboard();
            onDone();
          }}
        />
      </View>
    </PopupContainer>
  );
};

export default ReedemRequestPopup;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  lblContainer: {flexDirection: 'row', marginTop: hp(0.5)},
  successful: {
    ...Style.getTextStyle(Fonts.getFontSize('headline3'), 'Bold', Colors.black),
    marginTop: hp(2),
    marginBottom: hp(0.7),
  },
  lblKey: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.black,
    ),
  },
  lblValue: {
    ...Style.getTextStyle(Fonts.getFontSize('headline5'), 'Bold', Colors.black),
  },
  time: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline6'),
      'Regular',
      Colors.grey,
    ),
  },
  button: {
    marginTop: hp(2),
    width: '100%',
  },
});
