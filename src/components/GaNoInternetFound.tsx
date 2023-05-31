import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {hp, wp} from '../utility/responsive/ScreenResponsive';
import SVGIcon from '../utility/svg/SVGIcon';
import AdaptiveButton from './button/AdaptiveButton';
import Spacer from './layout/Spacer';
import InternetManager from '../network/InternetManager';
import {RootState, store} from '../store/Store';
import {apiSlice} from '../store/slices/ApiSlice';
import {useSelector} from 'react-redux';
import {ApiSliceState} from '../models/interfaces/ApiStoreInterface';
import Colors from '../theme/Colors';

type Props = {};

const updateInternetStatus = async () => {
  const result = await InternetManager.shared.manualCheck();
  store.dispatch(apiSlice.actions.setIsInternetAvailable(result));
};

const GaNoInternetFound = (props: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  const {internetAvailable} = useSelector<RootState, ApiSliceState>(state => {
    return state.api;
  });

  return (
    <View>
      {internetAvailable ? (
        <View style={props?.style ?? {}}>{props.children}</View>
      ) : (
        <View style={{alignContent: 'center', alignItems: 'center'}}>
          <Spacer height={hp(20)} />
          <SVGIcon name="no_internet" size={wp('65%')} />
          <Spacer height={hp(9)} />
          <Text style={{fontWeight: 'bold', color: Colors.darkBlack}}>
            No Internet
          </Text>
          <Spacer height={hp(3)} />

          <AdaptiveButton
            onPress={() => {
              updateInternetStatus();
            }}
            type="text"
            buttonStyle={{
              borderWidth: 1,
              paddingHorizontal: wp(4),
              borderRadius: wp(2),
              borderColor: Colors.primary,
              marginVertical: hp(1),
              // width: wp('35%'),
            }}
            textStyle={{color: Colors.primary, fontSize: wp(3)}}
            title={'Load Again'}
          />
          <Spacer height={hp(10)} />
        </View>
      )}
    </View>
  );
};

export default GaNoInternetFound;

const styles = StyleSheet.create({});
