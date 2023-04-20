import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import WebView from 'react-native-webview';
import {HomeStackScreenProps} from '../../navigation/stack/HomeStackNavigator';

const WebViewComponent = (props: {url: string}) => {
  return (
    <WebView
      androidHardwareAccelerationDisabled={true}
      geolocationEnabled={true}
      source={{uri: props.url}}
    />
  );
};

const CouponScreen: React.FC<HomeStackScreenProps<'CouponScreen'>> = props => {
  const {
    route: {
      params: {goRupiLink},
    },
  } = props;

  useEffect(() => {}, [goRupiLink]);

  return <WebViewComponent url={goRupiLink} />;
};

export default CouponScreen;

const styles = StyleSheet.create({});
