import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import AppLoader from '../../components/indicator/AppLoader';
import RootNavigation from '../../navigation/RootNavigation';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';
import {authSlice} from '../../store/slices/AuthSlice';

const WelcomeScreen = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      setLoading(false);
      const rawUserDetails: any = await SharedPreference.shared.getItem(
        kSharedKeys.userDetails,
      );

      const userDetails = await JSON.parse(rawUserDetails);
      if (!userDetails) {
        RootNavigation.replace('LoginScreen');
        return;
      } else {
        console.log('CODE_USER', userDetails);
        dispatch(authSlice.actions.storeAuthResult(userDetails));
        RootNavigation.replace('Drawer');
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.screen}>
      <AppLoader loading={loading} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
