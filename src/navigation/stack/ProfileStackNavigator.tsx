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

export type ProfileStackParamList = {
  ProfileScreen: RouteParamList;
  NotificationScreen: RouteParamList;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    StackScreenProps<ProfileStackParamList, T>,
    DrawerScreenProps<DrawerParamList>
  >;

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={props => {
        return NavigationTheme.stackOptions({
          navOptions: props,
        });
      }}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: AppLocalizedStrings.profile.profile}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{title: AppLocalizedStrings.notification.notification}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
