import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppLocalizedStrings} from '../../../localization/Localization';
import SVGIcon from '../../../utility/svg/SVGIcon';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';

const TargetAchiveView = () => {
  return (
    <View>
      <View style={styles.innerView}>
        <View style={[styles.priortyView]}>
          <SVGIcon name={'staryellow'} size={28} />
          <Text style={styles.innertext}>
            {AppLocalizedStrings.dashboard.targetachi}
          </Text>
        </View>
        <View style={[styles.leftVieMaign]}>
          <SVGIcon name={'rightarrow'} color={Colors.black} size={15} />
        </View>
      </View>
    </View>
  );
};
export default TargetAchiveView;

const styles = StyleSheet.create({
  innerView: {
    flexDirection: 'row',
    backgroundColor: Colors.lightYellow,
    height: wp('10%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priortyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  rightView: {
    marginHorizontal: 15,
  },
  leftVieMaign: {
    marginHorizontal: 15,
  },
  innertext: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.black,
    ),
    marginHorizontal: 15,
  },
});
