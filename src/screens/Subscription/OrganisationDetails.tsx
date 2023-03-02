import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import SVGIcon from '../../utility/svg/SVGIcon';
import Fonts from '../../theme/Fonts';
import {AppLocalizedStrings} from '../../localization/Localization';
import TermsCondition from '../../components/app/TermsCondition';
import OrgStockistList from '../../components/app/invoice/StockistList';
import BrandsView from '../../components/app/BrandsView';
import Spacer from '../../components/layout/Spacer';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import Style from '../../constants/Style';

const OrganisationDetails = () => {
  const [mode, setMode] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const segmentBarItems = [
    AppLocalizedStrings.subscription.Brands,
    AppLocalizedStrings.subscription.Stockist,
  ];

  const onValueChange = (index: number) => {
    setMode(index);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.astraText}>Astrazeneca</Text>
            <Text style={styles.addessText}>
              Govind Mirta Road, Ambika Palace, Patna, Bihar, India - 800004
            </Text>
          </View>
          <View style={styles.iconBox}>
            <SVGIcon name="support" size={16} />
          </View>
          <Text style={styles.supportText}>Support</Text>
        </View>
        <View style={styles.segmentContainer}>
          {segmentBarItems?.map((item, index) => {
            const isActive = index == mode;
            return (
              <AdaptiveButton
                key={index}
                buttonStyle={isActive ? styles.btnActive : styles.btn}
                textStyle={isActive ? styles.btnTextActive : styles.btnText}
                type="text"
                title={item}
                onPress={onValueChange.bind(this, index)}
              />
            );
          })}
        </View>
        <Spacer height={hp('2%')} />
        {mode == 0 ? <BrandsView /> : <OrgStockistList />}
        <View>
          <TermsCondition
            isVisible={isVisible}
            onPress={() => setIsVisible(!isVisible)}
          />
        </View>
        <Spacer height={hp('6%')} />
        <View style={styles.buttonContainer}>
          <AdaptiveButton
            title="Contact MR"
            buttonStyle={styles.mrButtom}
            textStyle={styles.buttonText}
          />
          <Spacer width={wp('5%')} />
          <AdaptiveButton title="Order Now" buttonStyle={styles.orderButton} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrganisationDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    marginHorizontal: hp('2%'),
    marginTop: hp('1.5%'),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  astraText: {
    fontSize: Fonts.getFontSize('headline4'),
    color: '#474747',
    fontFamily: Fonts.getFontFamily('Regular'),
  },
  addessText: {
    fontSize: Fonts.getFontSize('headline6'),
    color: '#474747',
    fontFamily: Fonts.getFontFamily('Regular'),
  },
  iconBox: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: hp('1%'),
    paddingRight: wp('2%'),
  },
  supportText: {
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.primary,
    fontFamily: Fonts.getFontFamily('Bold'),
    marginTop: hp('1%'),
  },
  segmentContainer: {
    marginVertical: hp(2),
    flexDirection: 'row',
    marginHorizontal: hp(5),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mrButtom: {
    flex: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  buttonText: {
    color: Colors.primary,
  },
  orderButton: {
    flex: 1,
  },
  btnActive: {
    height: 'auto',
    borderColor: Colors.black,
    borderBottomWidth: 2,
    flex: 1,
  },
  btnTextActive: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4') + 1,
      'Bold',
      Colors.black,
    ),
  },
  btn: {
    height: 'auto',
    flex: 1,
  },
  btnText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.placeholder,
    ),
  },
});
