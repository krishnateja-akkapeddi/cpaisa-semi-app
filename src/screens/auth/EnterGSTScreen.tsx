import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AuthBaseScreen from './AuthBaseScreen';
import Validator from '../../utility/validation/Validator';
import RootNavigation from '../../navigation/RootNavigation';

enum State {
  GST,
  PAN,
}

const EnterGSTScreen = () => {
  const [state, setState] = useState<State>(State.GST);
  const [GSTNo, setGSTNo] = useState('22AABCU9603R1ZX');

  const onContinueHandler = () => {
    RootNavigation.navigate('EnterDetailsScreen');
  };

  const onStateChange = () => {
    setState(state == State.GST ? State.PAN : State.GST);
  };

  const isValidData = (): boolean => {
    if (state == State.GST) {
      return Validator.isValidGSTNumber(GSTNo);
    }
    return Validator.isValidPanNumber(GSTNo);
  };

  return (
    <AuthBaseScreen
      title={
        state == State.GST
          ? AppLocalizedStrings.auth.enterGSTDetails
          : AppLocalizedStrings.auth.enterPANDetails
      }
      iconName="enter_gst_number">
      <AdaptiveTextInput
        autoCapitalize="characters"
        value={GSTNo}
        onChangeText={setGSTNo}
        placeholder={
          state == State.GST
            ? AppLocalizedStrings.auth.enterGSTNumber
            : AppLocalizedStrings.auth.enterPANNumber
        }
        style={styles.input}
      />
      <AdaptiveButton
        isDisable={!isValidData()}
        title={AppLocalizedStrings.continue}
        onPress={onContinueHandler}
        buttonStyle={styles.btnContinue}
      />
      <View style={styles.viewBottom}>
        <AdaptiveButton
          buttonStyle={styles.btnGST}
          textStyle={styles.btnGSTText}
          type="text"
          title={
            state == State.GST
              ? AppLocalizedStrings.auth.dontHaveGST
              : AppLocalizedStrings.auth.dontHavePAN
          }
          onPress={onStateChange}
        />
      </View>
    </AuthBaseScreen>
  );
};

export default EnterGSTScreen;

const styles = StyleSheet.create({
  input: {
    marginBottom: hp('2.5%'),
    textTransform: 'uppercase',
  },
  btnContinue: {
    width: '100%',
  },
  btnGST: {
    height: hp(2.5),
    borderRadius: hp(2.5) / 2,
    borderColor: Colors.black,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(3),
  },
  btnGSTText: {
    ...Style.getTextStyle(12, 'Regular', Colors.darkBlack),
  },
  viewBottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
