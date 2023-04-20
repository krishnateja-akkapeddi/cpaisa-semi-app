import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import {AuthResult} from '../models/interfaces/AuthResponse';
import {RootState} from '../store/Store';
import AppLoader from './indicator/AppLoader';

const FreshdeskWidget = () => {
  const selected = useSelector<RootState, AuthResult>(
    state => state.auth.authResult,
  );
  const [loading, setLoading] = React.useState(true);

  const channel_partner = selected?.data?.channel_partner;
  const user = selected?.data?.user;
  return (
    <View style={styles.container}>
      <WebView
        onLoad={() => setLoading(false)}
        scalesPageToFit={true}
        onMessage={event => {
          console.log(event);
        }}
        source={{
          uri: `https://channelpaisa.com/supports?auth-token=${user?.auth_token}&full-name=super&user-id=${user?.id}&role=CHANNEL_PARTNER&email=${user?.email_id}`,
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
