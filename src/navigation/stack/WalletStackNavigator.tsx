import React from 'react';
import * as NavigationTheme from '../../theme/NavigationTheme';
import {RouteParamList} from '../navigator/types';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigator/DrawerNavigator';
import {AppLocalizedStrings} from '../../localization/Localization';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import WalletScreen from '../../screens/wallet/WalletScreen';

export type WalletStackParamList = {
  WalletScreen: RouteParamList;
};

export type WalletStackScreenProps<T extends keyof WalletStackParamList> =
  CompositeScreenProps<
    StackScreenProps<WalletStackParamList, T>,
    DrawerScreenProps<DrawerParamList>
  >;

const Stack = createStackNavigator<WalletStackParamList>();

const WalletStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={props => {
        return NavigationTheme.stackOptions({
          navOptions: props,
        });
      }}>
      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{title: AppLocalizedStrings.wallet.name}}
      />
    </Stack.Navigator>
  );
};

export default WalletStackNavigator;
