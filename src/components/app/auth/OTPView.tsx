import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import OTPInput from './CustomOtp';

interface OTPViewProps {
  onSelect: (arg0: string) => void;
  code: string;
  clearInput?: boolean;
  onComplete: Function;
}

const OTPView: React.FC<OTPViewProps> = props => {
  let otpInput: any = React.useRef(null);
  const clearText = () => {
    otpInput.current.clear();
  };
  const [otpText, setOtpText] = useState('');
  const setText = () => {
    otpInput.current.setValue('1234');
  };
  useEffect(() => {}, [props.code, props.clearInput]);
  return (
    <View>
      <OTPInput
        setOTP={props.onSelect}
        otp={props.code}
        length={4}
        onComplete={s => {
          console.log(s);
          props.onComplete(s);
        }}
      />
    </View>
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

const otpStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '60%',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    letterSpacing: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonStyle: {
    marginHorizontal: 20,
  },
});
