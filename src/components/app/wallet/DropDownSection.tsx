import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {wp, hp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';

const DropDownSection = () => {
  return (
    <View style={[styles.containerStyl]}>
      <View style={[styles.viewContentStyl]}>
        <Text style={[styles.textStyl]}>Division Option 1</Text>
      </View>
      <View style={[styles.viewContentStyl]}>
        <Image
          resizeMode="cover"
          source={require('../../assets/images/dropdown.png')}
          style={[styles.dropIconStyle]}
        />
      </View>
    </View>
  );
};

export default DropDownSection;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    shadowOffset: {width: 0, height: 1},
  },
  searchbarContainer: {
    marginHorizontal: hp('2%'),
  },
  logo: {
    width: wp('8%'),
    height: hp('8%'),
  },
  flatlistContainer: {
    marginTop: hp('3%'),
    marginBottom: hp('1.5%'),
    marginLeft: hp('2%'),
  },
  bottomContainer: {
    flex: 1,
    marginHorizontal: hp('2%'),
    paddingVertical: hp('2%'),
  },
  searchBarView: {
    marginBottom: hp('2.0%'),
  },
  itemSeparatorStyle: {
    height: hp('2.5%'),
  },
  containerStyl: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    height: hp('5%'),
    marginTop: hp('1.0%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropIconStyle: {
    height: hp('1.3%'),
    width: hp('1.4%'),
  },
  viewContentStyl: {
    justifyContent: 'center',
    marginLeft: wp('3.0%'),
    marginRight: wp('3.0'),
  },
  textStyl: {
    textAlign: 'left',
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.grey,
    ),
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletTouch: {
    flexDirection: 'row',
    height: wp('13%'),
    width: wp('44.5%'),
    borderRadius: 10,
    backgroundColor: Colors.black,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  redeemNow: {
    height: wp('13%'),
    width: wp('45%'),
    borderRadius: Style.kBorderRadius,
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wallettext: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.white,
    ),
    width: wp('20%'),
    alignSelf: 'center',
  },
  walletRate: {
    ...Style.getTextStyle(Fonts.getFontSize('headline3'), 'Bold', Colors.black),
  },
  walletRedeem: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Bold',
      Colors.primary,
    ),
  },
  walletMainCard: {
    flexDirection: 'column',
    marginTop: hp('2%'),
  },
  textSelectDivision: {
    color: 'darkgray',
  },
  textSelectTitel: {
    ...Style.getTextStyle(Fonts.getFontSize('headline3'), 'Bold', Colors.black),
  },
});
