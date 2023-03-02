import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {hp, wp} from '../utility/responsive/ScreenResponsive';

const FreshdeskWidget = () => {
  return (
    <View style={styles.container}>
      <WebView
        scalesPageToFit={true}
        onMessage={event => {
          console.log(event);
        }}
        source={{
          uri: 'https://channelpaisa.freshdesk.com/widgets/feedback_widget/new?show_subject_input=1',
        }}
        style={styles.webView}
        javaScriptEnabled={true}
        onError={(error: any) => console.error(`WebView error: ${error}`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    width: wp('190%'),
    flex: 1,
  },
});

export default FreshdeskWidget;
