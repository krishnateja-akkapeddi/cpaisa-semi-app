import {StyleSheet} from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';

interface OTPViewProps {
  onSelect?: (arg0: string) => void;
}

const OTPView: React.FC<OTPViewProps> = props => {
  return (
    <OTPInputView
      style={styles.otpView}
      pinCount={4}
      // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
      onCodeChanged={props.onSelect}
      autoFocusOnLoad={false}
      codeInputFieldStyle={styles.underlineStyleBase}
      codeInputHighlightStyle={styles.underlineStyleHighLighted}
      onCodeFilled={props.onSelect}
    />
  );
};

export default OTPView;

const styles = StyleSheet.create({
  otpView: {width: '100%', height: 60},
  underlineStyleBase: {
    height: wp('13%'),
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Style.kBorderRadius,
    ...Style.getTextStyle(
      Fonts.getFontSize('headline1'),
      Style.kTextInputFontFamily,
      Colors.primary,
    ),
  },
  underlineStyleHighLighted: {
    borderColor: Colors.primary,
  },
});
