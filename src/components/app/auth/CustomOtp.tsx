import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  setOTP: Function;
  otp: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onComplete,
  otp,
  setOTP,
}) => {
  const inputRefs = useRef<TextInput[]>([]);

  const handleInputFocus = (index: number) => {
    if (index > 0 && otp.length < index) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputChange = (value: string, index: number) => {
    const newOTP = otp.split('');
    newOTP[index] = value;

    setOTP(newOTP.join(''));

    if (value !== '') {
      if (index === length - 1) {
        onComplete(newOTP.join(''));
      } else {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleInputKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < length; i++) {
      inputs.push(
        <TextInput
          key={i}
          style={styles.input}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={value => handleInputChange(value, i)}
          onKeyPress={(e: any) => handleInputKeyPress(e, i)}
          onFocus={() => handleInputFocus(i)}
          ref={ref => (inputRefs.current[i] = ref!)}
          value={otp[i] || ''}
        />,
      );
    }
    return inputs;
  };
  useEffect(() => {
    if (otp === '') {
      inputRefs.current[0]?.focus();
    }
  }, [otp]);

  return <View style={styles.container}>{renderInputs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: wp(13),
    height: hp(6),
    borderColor: Colors.primary,

    borderWidth: 1,
    borderRadius: wp(2),

    marginHorizontal: wp(3),
    textAlign: 'center',
    fontSize: wp(5),
  },
});

export default OTPInput;
