import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import RootNavigation from '../../navigation/RootNavigation';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';
import {authSlice} from '../../store/slices/AuthSlice';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';

const WelcomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      setLoading(false);
      const rawUserDetails: any = await SharedPreference.shared.getItem(
        kSharedKeys.userDetails,
      );
      if (rawUserDetails) {
        const userDetails = await JSON.parse(rawUserDetails);
        if (!userDetails) {
          RootNavigation.replace('LoginScreen');
          return;
        } else {
          dispatch(authSlice.actions.storeAuthResult(userDetails));
          RootNavigation.replace('Drawer');
        }
      } else {
        RootNavigation.replace('LoginScreen');
      }
    }, 3000);
  }, []);

  return (
    <View style={styles.screen}>
      <Image
        style={{width: wp('100%'), height: hp('100%')}}
        source={require('../../assets/videos/Channel_Paisa_Splash_Screen.gif')}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
