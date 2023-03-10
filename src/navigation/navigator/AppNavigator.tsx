import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import RootNavigation from '../RootNavigation';
import AuthStackNavigator, {
  AuthStackParamList,
} from '../stack/AuthStackNavigator';
import DrawerNavigator, {DrawerParamList} from '../navigator/DrawerNavigator';
import {ExtendedTheme} from '../../theme/NavigationTheme';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';
import {useDispatch} from 'react-redux';
import {authSlice} from '../../store/slices/AuthSlice';
import {setClientHeaders} from '../../store/workers/ApiWorkers';
import {AuthResult, Data} from '../../models/interfaces/AuthResponse';
import {Convert} from '../../utility/converter/Convert';
import GaNotification from '../../components/GaNotification';
import GaRefresh from '../../components/GaRefresh';

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  Drawer: NavigatorScreenParams<DrawerParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

const AppNavigator = () => {
  return (
    <>
      <GaNotification />
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
    </>
  );
};

export default AppNavigator;
