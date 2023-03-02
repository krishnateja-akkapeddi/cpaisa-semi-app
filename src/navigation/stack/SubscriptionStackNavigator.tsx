import React from 'react';
import * as NavigationTheme from '../../theme/NavigationTheme';
import {RouteParamList} from '../navigator/types';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigator/DrawerNavigator';
import {AppLocalizedStrings} from '../../localization/Localization';
import NotificationScreen from '../../screens/notification/NotificationScreen';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import InvoiceUploadScreen from '../../screens/invoice/InvoiceUploadScreen';
import OrganisationDetails from '../../screens/Subscription/OrganisationDetails';
import SubscriptionDetailScreen from '../../screens/Subscription/SubscriptionDetailScreen';
import SubscriptionScreen from '../../screens/Subscription/SubscriptionScreen';

export type SubscriptionStackParamList = {
  SubscriptionScreen: RouteParamList;
  NotificationScreen: RouteParamList;
  OrganisationDetails: RouteParamList;
  InvoiceUploadScreen: RouteParamList;
  SubscriptionDetailScreen: RouteParamList;
};

export type SubscriptionStackScreenProps<
  T extends keyof SubscriptionStackParamList,
> = CompositeScreenProps<
  StackScreenProps<SubscriptionStackParamList, T>,
  DrawerScreenProps<DrawerParamList>
>;

const Stack = createStackNavigator<SubscriptionStackParamList>();

const SubscriptionStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={props => {
        return NavigationTheme.stackOptions({
          navOptions: props,
        });
      }}>
      <Stack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
        options={{
          title: AppLocalizedStrings.subscription.subscribe,
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{title: AppLocalizedStrings.notification.notification}}
      />
      <Stack.Screen
        name="OrganisationDetails"
        component={OrganisationDetails}
        options={{title: AppLocalizedStrings.subscription.organisationDetails}}
      />
      <Stack.Screen
        name="InvoiceUploadScreen"
        component={InvoiceUploadScreen}
        options={{
          title: AppLocalizedStrings.invoice.invoiceUpload,
        }}
      />
      <Stack.Screen
        name="SubscriptionDetailScreen"
        component={SubscriptionDetailScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default SubscriptionStackNavigator;
