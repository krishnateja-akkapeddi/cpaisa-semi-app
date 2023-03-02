import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PopupContainer from './PopupContainer';
import {AppLocalizedStrings} from '../../localization/Localization';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import AdaptiveButton from '../button/AdaptiveButton';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Spacer from '../layout/Spacer';
import VectorIcon from '../button/VectorIcon';
import {TextInput} from 'react-native-gesture-handler';

interface OfferCalculatorPopupProps {
  onDismiss: () => void;
}
const OfferCalculatorPopup = (props: OfferCalculatorPopupProps) => {
  const [points, setPoints] = useState('1');

  const {onDismiss} = props;
  return (
    <PopupContainer
      showDismiss={true}
      title={AppLocalizedStrings.offer.calculatePoints}
      onDismiss={onDismiss}>
      <View style={styles.container}>
        <Text style={styles.lblQuantity}>
          {AppLocalizedStrings.offer.enterQuantity}
        </Text>
        <View style={styles.countContainer}>
          <VectorIcon
            style={styles.btn}
            size={20}
            color={Colors.white}
            type="Foundation"
            name="minus"
            onPress={() => {
              setPoints(val => (parseInt(val) - 1).toString());
            }}
          />
          <Spacer width={wp('4%')} />
          <View style={styles.input}>
            <TextInput
              onChangeText={e => {
                setPoints(e);
              }}
              keyboardType="decimal-pad"
              value={points.toString()}
              style={styles.point}></TextInput>
          </View>
          <Spacer width={wp('4%')} />
          <VectorIcon
            style={styles.btn}
            size={20}
            color={Colors.white}
            type="Foundation"
            name="plus"
            onPress={() => {
              setPoints(val => (parseInt(val) + 1).toString());
            }}
          />
        </View>
        <Text style={styles.lblPoints}>
          {AppLocalizedStrings.offer.pointsPerUnit}
          <Text
            style={[
              styles.lblPoints,
              {fontFamily: Fonts.getFontFamily('Bold')},
            ]}>
            0.25
          </Text>
        </Text>
        <View style={styles.lineView} />
        <Text style={styles.lblTotal}>{AppLocalizedStrings.offer.total}</Text>
        <Text style={styles.lblTotalPoints}>{'125\nPoints'}</Text>
      </View>
    </PopupContainer>
  );
};

export default OfferCalculatorPopup;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  lblQuantity: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  countContainer: {
    flexDirection: 'row',
    marginVertical: hp('2%'),
    alignItems: 'center',
  },
  btn: {
    height: wp('10%'),
    aspectRatio: 1,
    borderRadius: wp('10%') / 2,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: wp(35),
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: wp('4%'),
    borderRadius: Style.kBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lblPoints: {
    ...Style.getTextStyle(Fonts.getFontSize('headline3'), 'Regular', '#525252'),
  },
  lineView: {
    height: 1,
    width: '55%',
    backgroundColor: Colors.lightPurple,
    marginVertical: hp('3.5%'),
  },
  lblTotal: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  lblTotalPoints: {
    ...Style.getTextStyle(Fonts.getFontSize('headline2'), 'Bold', '#525252'),
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  point: {
    ...Style.getTextStyle(30, 'Medium', Colors.darkBlack),
  },
});
