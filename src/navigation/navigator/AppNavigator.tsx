import React, {useCallback, useEffect} from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import RootNavigation from '../RootNavigation';
import RNRestart from 'react-native-restart';
import AuthStackNavigator, {
  AuthStackParamList,
} from '../stack/AuthStackNavigator';
import DrawerNavigator, {DrawerParamList} from '../navigator/DrawerNavigator';
import {ExtendedTheme} from '../../theme/NavigationTheme';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import GaNotification from '../../components/GaNotification';
import {useSelector} from 'react-redux';
import {RootState, store} from '../../store/Store';
import {apiSlice} from '../../store/slices/ApiSlice';
import {ApiSliceState} from '../../models/interfaces/ApiStoreInterface';
import InternetManager from '../../network/InternetManager';
import {useNetInfo} from '@react-native-community/netinfo';
import {Timer, TimerType, timer} from '../../utility/timer/TimerClass';
import QrPopup from '../../components/app/QrPopup';
import {AppState, Image, Text, View} from 'react-native';
import JailMonkey from 'jail-monkey';
import {wp, hp} from '../../utility/responsive/ScreenResponsive';
import Spacer from '../../components/layout/Spacer';
import GaInputValidationMessage from '../../components/GaInputValidationMessage';

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  Drawer: NavigatorScreenParams<DrawerParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

const AppNavigator = () => {
  const [deviceBroken, setDeviceBroken] = React.useState(false);

  const [timerState, setTimer] = React.useState({minutes: 0, seconds: 0});
  const [isAppInBackground, setIsAppInBackground] = React.useState(false);
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(
    appState.current,
  );
  const {
    app: {openQrCode},
  } = useSelector<RootState, RootState>(state => state);

  const {internetAvailable, isApiCalled} = useSelector<
    RootState,
    ApiSliceState
  >(state => {
    return state.api;
  });

  const updateInternetStatus = async () => {
    const result = await InternetManager.shared.manualCheck();
    store.dispatch(apiSlice.actions.setIsInternetAvailable(result));
  };

  const resetTimer = React.useCallback((endPoint: number) => {
    timer.startTimer(endPoint / 100 + 4, (time: TimerType) => {
      setTimer({minutes: time.minutes, seconds: time.seconds});
    });
  }, []);

  const result = useNetInfo();

  useEffect(() => {
    if (JailMonkey.isJailBroken() || JailMonkey.canMockLocation()) {
      setDeviceBroken(true);
    }
    updateInternetStatus();
  }, [isApiCalled]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsAppInBackground(true);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppSApptate', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const qrCodePopup = useCallback(() => {
    return (
      <View style={{position: 'absolute'}}>
        <QrPopup resetTimer={resetTimer} timerState={timerState} />
      </View>
    );
  }, [timerState]);

  useEffect(() => {}, [internetAvailable]);
  useEffect(() => {
    console.log('APPY_FILE', isAppInBackground);

    if (appStateVisible === 'background') {
      console.log('YES_IM_CALLED');

      timer.stopTimer();
      setTimer({minutes: -1, seconds: -1});
    }
  }, [appStateVisible]);

  return (
    <>
      {openQrCode && (
        <QrPopup resetTimer={resetTimer} timerState={timerState} />
      )}
      <GaNotification />
      {!deviceBroken ? (
        <View>
          <Image
            style={{width: wp(99), height: hp(60), marginTop: hp(10)}}
            source={require('../../assets/images/device-broken.png')}
          />
          <Spacer height={hp(10)} />
          <Text style={{fontSize: wp(5), textAlign: 'center'}}>
            Device is Broken
          </Text>
        </View>
      ) : (
        <NavigationContainer
          theme={ExtendedTheme}
          ref={RootNavigation.navigation}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
              // animation: 'none',
            }}>
            <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default AppNavigator;
