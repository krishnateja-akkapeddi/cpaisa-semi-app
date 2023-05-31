import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import AppLoader from '../../components/indicator/AppLoader';

const FreshdeskWidget = () => {
  const [loading, setLoading] = React.useState(true);

  return (
    <View style={styles.container}>
      <WebView
        onLoad={() => setLoading(false)}
        scalesPageToFit={true}
        onMessage={event => {}}
        source={{
          uri: `https://api.channelpaisa.com/privacy_policy`,
        }}
        style={styles.webView}
        javaScriptEnabled={true}
        onError={(error: any) => console.error(`WebView error: ${error}`)}
      />
      {loading && <AppLoader loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default FreshdeskWidget;
