import React from 'react';
import * as NavigationTheme from '../../theme/NavigationTheme';
import {RouteParamList} from '../navigator/types';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigator/DrawerNavigator';
import {AppLocalizedStrings} from '../../localization/Localization';
import NotificationScreen from '../../screens/notification/NotificationScreen';
import StockistScreen from '../../screens/stockist/StockistScreen';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';

export type StockistStackParamList = {
  StockistScreen: RouteParamList;
  NotificationScreen: RouteParamList;
};

export type StockistStackScreenProps<T extends keyof StockistStackParamList> =
  CompositeScreenProps<
    StackScreenProps<StockistStackParamList, T>,
    DrawerScreenProps<DrawerParamList>
  >;

const Stack = createStackNavigator<StockistStackParamList>();

const StockistStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={props => {
        return NavigationTheme.stackOptions({
          navOptions: props,
        });
      }}>
      <Stack.Screen
        name="StockistScreen"
        component={StockistScreen}
        options={{
          title: AppLocalizedStrings.stockist.stockist,
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{title: AppLocalizedStrings.notification.notification}}
      />
    </Stack.Navigator>
  );
};

export default StockistStackNavigator;
