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

export type OrganisationStackParamList = {
  OrganisationsScreen: RouteParamList;
  BrandsScreen: RouteParamList;
};

export type OrganisationStackScreenProps<
  T extends keyof OrganisationStackParamList,
> = CompositeScreenProps<
  StackScreenProps<OrganisationStackParamList, T>,
  DrawerScreenProps<DrawerParamList>
>;

const Stack = createStackNavigator<OrganisationStackParamList>();

const OrganisationStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={props => {
        return NavigationTheme.stackOptions({
          navOptions: props,
        });
      }}>
      <Stack.Screen
        name="OrganisationsScreen"
        component={OrganisationScreen}
        options={{title: AppLocalizedStrings.Organisations.name}}
      />
      <Stack.Screen
        name="BrandsScreen"
        component={OrganisationScreen}
        options={{title: AppLocalizedStrings.Organisations.name}}
      />
    </Stack.Navigator>
  );
};

export default OrganisationStackNavigator;
