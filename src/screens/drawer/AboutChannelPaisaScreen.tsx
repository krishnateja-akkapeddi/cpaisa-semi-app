import {StyleSheet} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const AboutChannelPaisaScreen = () => {
  const aboutUrl = 'https://goapptiv.com/#channelpaisa';
  return (
    <WebView
      scalesPageToFit={true}
      onMessage={event => {
        console.log(event);
      }}
      source={{
        uri: aboutUrl,
      }}
      javaScriptEnabled={true}
      onError={(error: any) => console.error(`WebView error: ${error}`)}
    />
  );
};

export default AboutChannelPaisaScreen;

const styles = StyleSheet.create({});
