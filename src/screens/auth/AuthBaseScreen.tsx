import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import KeyboardAvoidingView from '../../components/keyboard/KeyboardAvoidingView';
import Spacer from '../../components/layout/Spacer';
import Style from '../../constants/Style';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import SVGIcon from '../../utility/svg/SVGIcon';

type AuthBaseScreenProps = {
  children: React.ReactNode;
  title: string;
  iconName?: string | null;
};

const AuthBaseScreen: React.FC<AuthBaseScreenProps> = props => {
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={styles.keyboard}>
        <View style={styles.container}>
          {props.iconName != null && (
            <SVGIcon name={props.iconName} size={hp('30%')} />
          )}
          {props.iconName != null && <Spacer height={hp('1.5%')} />}
          <Text style={styles.lblTitle}>{props.title}</Text>
          {props.children}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthBaseScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  keyboard: {
    alignItems: 'center',
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    width: '70%',
  },
  lblTitle: {
    ...Style.getTextStyle(16, 'Bold', Colors.darkBlack),
    marginBottom: hp('3.5%'),
  },
});
