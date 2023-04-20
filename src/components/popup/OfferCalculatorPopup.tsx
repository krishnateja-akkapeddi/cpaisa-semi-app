import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {OffersListEntity} from '../../models/interfaces/OffersListResponse';

interface OfferCalculatorPopupProps {
  onDismiss: () => void;
  selectedOffer: OffersListEntity | undefined;
}
const OfferCalculatorPopup = (props: OfferCalculatorPopupProps) => {
  console.log(props.selectedOffer);

  const [quantity, setQuantity] = useState(
    props.selectedOffer?.min_qty.toString() === '0'
      ? '1'
      : props.selectedOffer?.min_qty.toString() ?? '1',
  );
  const [pointsPerUnit, setPointsPerUnit] = useState<number>();
  useEffect(() => {
    console.log(
      'FROM_CALCI',
      1 * parseInt(props?.selectedOffer?.product_value ?? '10'),
    );

    if (props.selectedOffer) {
      setPointsPerUnit(1 * parseFloat(props?.selectedOffer?.product_value));
    }
  }, [props.selectedOffer]);

  const {onDismiss} = props;
  return (
    <PopupContainer
      onOutsidePress={this}
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
              parseInt(quantity) >= (props.selectedOffer?.min_qty ?? 2) + 1 &&
                parseInt(quantity) !== 1 &&
                setQuantity(val => (parseInt(val) - 1).toString());
            }}
          />
          <Spacer width={wp('4%')} />
          <View style={styles.input}>
            <TextInput
              onChangeText={e => {
                setQuantity(e);
              }}
              keyboardType="decimal-pad"
              value={quantity.toString()}
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
              setQuantity(val => (parseInt(val) + 1).toString());
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
            {pointsPerUnit}
          </Text>
        </Text>
        <View style={styles.lineView} />
        <Text style={styles.lblTotal}>{AppLocalizedStrings.offer.total}</Text>
        {pointsPerUnit && (
          <Text style={styles.lblTotalPoints}>{`${(
            parseInt(quantity) * pointsPerUnit
          ).toFixed(2)}\nPoints`}</Text>
        )}
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
