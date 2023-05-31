import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {wp, hp} from '../utility/responsive/ScreenResponsive';

type Props = {};

const GaLoadingIndicator = (props: Props) => {
  return (
    <View>
      <View style={styles.screen}>
        <Image
          style={{width: wp('100%'), height: hp('80%')}}
          source={require('../assets/videos/ChannelPaisaLoading.gif')}
        />
      </View>
    </View>
  );
};

export default GaLoadingIndicator;

const styles = StyleSheet.create({
  screen: {},
});
