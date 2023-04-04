import React from 'react';
import * as NavigationTheme from '../../theme/NavigationTheme';
import {RouteParamList} from '../navigator/types';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigator/DrawerNavigator';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import {AppLocalizedStrings} from '../../localization/Localization';
import NotificationScreen from '../../screens/notification/NotificationScreen';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import OrganisationScreen from '../../screens/organisations/OrganisationScreen';

export type OrdersStackParamList = {
  OrdersScreen: RouteParamList;
  SingleOrderScreen: RouteParamList;
};

export type OrganisationStackScreenProps<T extends keyof OrdersStackParamList> =
  CompositeScreenProps<
    StackScreenProps<OrdersStackParamList, T>,
    DrawerScreenProps<DrawerParamList>
  >;

const Stack = createStackNavigator<OrdersStackParamList>();

const OrganisationStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={props => {
        return NavigationTheme.stackOptions({
          navOptions: props,
        });
      }}>
      <Stack.Screen
        name="OrdersScreen"
        component={OrganisationScreen}
        options={{title: AppLocalizedStrings.Organisations.name}}
      />
      <Stack.Screen
        name="SingleOrderScreen"
        component={OrganisationScreen}
        options={{title: AppLocalizedStrings.Organisations.name}}
      />
    </Stack.Navigator>
  );
};

export default OrganisationStackNavigator;
