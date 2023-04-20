import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import SVGIcon from '../../utility/svg/SVGIcon';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Fonts from '../../theme/Fonts';

interface TermsProps {
  onPress: () => void;
  isVisible: Boolean;
}

const TermsCondition: React.FC<TermsProps> = props => {
  return (
    <>
      <TouchableOpacity style={styles.termsView} onPress={props.onPress}>
        <Text style={styles.termsText}>Terms & Conditions</Text>
        <SVGIcon
          name="down_arrow"
          color={Colors.black}
          size={wp('3%')}
          style={{
            transform: [{rotate: props.isVisible != true ? '0deg' : '180deg'}],
          }}
        />
      </TouchableOpacity>
      {props.isVisible && (
        <Text style={styles.termsAndCondition}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt. eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum
        </Text>
      )}
    </>
  );
};

export default TermsCondition;

const styles = StyleSheet.create({
  termsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('1%'),
  },
  termsText: {
    fontSize: Fonts.getFontSize('headline4'),
    color: Colors.black,
    fontFamily: Fonts.getFontFamily('Bold'),
  },
  termsAndCondition: {
    fontSize: Fonts.getFontSize('headline6'),
    color: Colors.black,
    fontFamily: Fonts.getFontFamily('Regular'),
  },
});
