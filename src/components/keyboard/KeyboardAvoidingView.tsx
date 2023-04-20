import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type KeyboardAvoidingViewProps = {
  children: React.ReactNode;
  style: ViewStyle;
};
const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = props => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={props.style}
      enableAutomaticScroll={true}
      enableOnAndroid
      extraScrollHeight={20}
      style={styles.screen}
      extraHeight={10}>
      {props.children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoidingView;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
