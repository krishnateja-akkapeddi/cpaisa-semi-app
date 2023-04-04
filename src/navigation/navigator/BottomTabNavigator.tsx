import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as NavigationTheme from '../../theme/NavigationTheme';
import {RouteParamList} from './types';
import CustomTabBar, {TabbarProps} from '../../components/tabbar/CustomTabBar';
import Fonts from '../../theme/Fonts';
import DashboardScreen from '../../screens/tab/DashboardScreen';
import OffersScreen from '../../screens/tab/OffersScreen';
import UploadScreen from '../../screens/tab/UploadScreen';
import InvoiceScreen from '../../screens/tab/InvoiceScreen';
import WalletScreen from '../../screens/wallet/WalletScreen';
import {AppLocalizedStrings} from '../../localization/Localization';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps as BTSP} from '@react-navigation/bottom-tabs';
import {HomeStackParamList} from '../stack/HomeStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

export type BottomTabParamList = {
  DashboardScreen: RouteParamList;
  OffersScreen: RouteParamList;
  InvoiceScreen: RouteParamList & {fromInvoiceUpload: Function};
  UploadScreen: RouteParamList;
  WalletScreen: RouteParamList;
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BTSP<BottomTabParamList, T>,
    StackScreenProps<HomeStackParamList>
  >;

export const getTabHeaderTitle = (routeName: keyof BottomTabParamList) => {
  switch (routeName) {
    case 'DashboardScreen':
      return AppLocalizedStrings.tab.dashboard;
    case 'OffersScreen':
      return AppLocalizedStrings.tab.offers;
    case 'InvoiceScreen':
      return AppLocalizedStrings.tab.invoice;
    case 'WalletScreen':
      return AppLocalizedStrings.tab.wallet;
    default:
      return AppLocalizedStrings.tab.dashboard;
  }
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={NavigationTheme.tabOptions}
      tabBar={props => <CustomTabBar {...(props as TabbarProps)} />}>
      <Tab.Screen name="DashboardScreen" component={DashboardScreen} />
      <Tab.Screen
        name="OffersScreen"
        component={OffersScreen}
        options={{title: AppLocalizedStrings.tab.offers}}
      />
      <Tab.Screen name="UploadScreen" component={UploadScreen} />
      <Tab.Screen
        name="InvoiceScreen"
        component={InvoiceScreen}
        options={{title: AppLocalizedStrings.tab.invoice}}
      />
      <Tab.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{title: AppLocalizedStrings.tab.wallet}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    color: '#292929',
    fontSize: Fonts.getFontSize('headline5'),
  },
  iconStyle: {
    marginRight: 0,
    padding: 0,
    paddingLeft: 5,
  },
});

export default BottomTabNavigator;
