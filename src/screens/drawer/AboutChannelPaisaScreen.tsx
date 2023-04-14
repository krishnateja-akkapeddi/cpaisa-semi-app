import {StyleSheet, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import AppLoader from '../../components/indicator/AppLoader';

const AboutChannelPaisaScreen = () => {
  const aboutUrl = 'https://goapptiv.com/landing/channel-paisa/index.html';
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
