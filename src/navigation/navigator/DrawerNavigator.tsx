import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import * as NavigationTheme from '../../theme/NavigationTheme';
import HomeStackNavigator, {
  HomeStackParamList,
} from '../stack/HomeStackNavigator';
import CustomDrawer from '../../components/drawer/CustomDrawer';
import NavigationOptionProps from '../../models/interfaces/NavigationOptionProps';
import Colors from '../../theme/Colors';
import {StyleSheet, Text} from 'react-native';
import Fonts from '../../theme/Fonts';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {RootStackParamList} from './AppNavigator';
import ProfileStackNavigator, {
  ProfileStackParamList,
} from '../stack/ProfileStackNavigator';
import SVGIcon from '../../utility/svg/SVGIcon';
import {AppLocalizedStrings} from '../../localization/Localization';
import SubscriptionStackNavigator, {
  SubscriptionStackParamList,
} from '../stack/SubscriptionStackNavigator';
import StockistStackNavigator, {
  StockistStackParamList,
} from '../stack/StockistStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import OrganisationStackNavigator, {
  OrganisationStackParamList,
} from '../stack/OrganisationStackNavigator';
import WalletScreen from '../../screens/wallet/WalletScreen';
import WalletStackNavigator, {
  WalletStackParamList,
} from '../stack/WalletStackNavigator';
import GaNoInternetFound from '../../components/GaNoInternetFound';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {wp} from '../../utility/responsive/ScreenResponsive';
import RootNavigation from '../RootNavigation';

export type DrawerParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  SubscriptionStack: NavigatorScreenParams<SubscriptionStackParamList>;
  StockistStack: NavigatorScreenParams<StockistStackParamList>;
  OrganisationsStack: NavigatorScreenParams<OrganisationStackParamList>;
  WalletStack: NavigatorScreenParams<WalletStackParamList>;
};

export type DrawerStackScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    StackScreenProps<RootStackParamList>
  >;
interface DrawerOptionProps {
  props?: NavigationOptionProps;
  icon: string;
  label?: string;
  activeColor?: string;
  inactiveColor?: string;
  size?: number;
}

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return <CustomDrawer {...props} />;
      }}
      screenOptions={NavigationTheme.drawerOptions}>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={props =>
          DrawerOptions({
            label: 'Home',
            icon: 'home',
            props: props,
          })
        }></Drawer.Screen>
      <Drawer.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={props =>
          DrawerOptions({
            label: AppLocalizedStrings.profile.profile,
            icon: 'profile',
            props: props,
          })
        }
      />
      <Drawer.Screen
        name="StockistStack"
        component={StockistStackNavigator}
        options={props =>
          DrawerOptions({
            label: AppLocalizedStrings.stockist.authrisedStockist,
            icon: 'bag',
            props: props,
          })
        }
      />
      <Drawer.Screen
        name="OrganisationsStack"
        component={OrganisationStackNavigator}
        options={props =>
          DrawerOptions({
            label: AppLocalizedStrings.Organisations.name,
            icon: 'subscription',
            props: props,
          })
        }
      />

      <Drawer.Screen
        name="WalletStack"
        component={WalletStackNavigator}
        options={props =>
          DrawerOptions({
            label: AppLocalizedStrings.wallet.name,
            icon: 'wallet',
            props: props,
          })
        }
      />

      {
        //Todo: Will be implemented in the next release
      }
      {/* <Drawer.Screen
        name="SubscriptionStack"
        component={SubscriptionStackNavigator}
        options={props =>
          DrawerOptions({
            label: AppLocalizedStrings.subscription.subscription,
            icon: 'subscription',
            props: props,
          })
        }
      /> */}
    </Drawer.Navigator>
  );
};

const DrawerOptions = (props: DrawerOptionProps): DrawerNavigationOptions => {
  const label = props.label ?? '';
  const iconName = props.icon;
  const size = props.size ?? 22;

  return {
    drawerIcon: ({focused}) => (
      <SVGIcon name={iconName} size={size} color={Colors.primary} />
    ),
    drawerLabel: () => <Text style={styles.drawerLabel}>{label}</Text>,
  };
};

const styles = StyleSheet.create({
  drawerLabel: {
    paddingLeft: 0,
    marginLeft: -18,
    fontSize: Fonts.getFontSize('headline2'),
    fontFamily: Fonts.regular,
    color: Colors.darkBlack,
  },
  drawerIcon: {
    marginLeft: 0,
  },
});

export default DrawerNavigator;
