import React, {useEffect} from 'react';
import * as NavigationTheme from '../../theme/NavigationTheme';
import BottomTabNavigator, {
  BottomTabParamList,
  getTabHeaderTitle,
} from '../navigator/BottomTabNavigator';
import {
  InvoiceDetailScreenParams,
  RootAllMixedParamList,
  RouteParamList,
} from '../navigator/types';
import {
  CompositeScreenProps,
  getFocusedRouteNameFromRoute,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigator/DrawerNavigator';
import LocationPermissionScreen from '../../screens/location/LocationPermissionScreen';
import ContactRepScreen from '../../screens/ContactRepScreen';
import {AppLocalizedStrings} from '../../localization/Localization';
import NotificationScreen from '../../screens/notification/NotificationScreen';
import InvoiceUploadScreen from '../../screens/invoice/InvoiceUploadScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import InvoiceDetailScreen from '../../screens/invoice/InvoiceDetailScreen';
import AboutChannelPaisaScreen from '../../screens/drawer/AboutChannelPaisaScreen';
import CouponScreen from '../../screens/wallet/CouponScreen';
import HelpScreen from '../../screens/invoice/HelpScreen';
import ContactSupportScreen from '../../screens/invoice/ContactSupportScreen';
import SingleOrderScreen from '../../screens/order/SingleOrderScreen';
import {OrderEntity} from '../../models/interfaces/OrdersListResponse';
import {
  OrderServiceEntity,
  OrderServiceItemEntity,
} from '../../models/interfaces/OrderServiceResponse';
import SingleOrderServiceScreen from '../../screens/order/SingleOrderServiceScreen';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';
import BrandsScreen from '../../screens/organisations/BrandsScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/Store';
import {AppSliceState} from '../../store/slices/AppSlice';
import {OrderStatus} from '../../models/enum/OrderStatusEnum';
import RootNavigation from '../RootNavigation';

export type HomeStackParamList = {
  TabStack: NavigatorScreenParams<BottomTabParamList>;
  LocationPermissionScreen: RouteParamList & {fromQrCodeHeader?: boolean};
  ContactRepScreen: RouteParamList;
  NotificationScreen: RouteParamList;
  InvoiceUploadScreen: RouteParamList;
  InvoiceDetailScreen: InvoiceDetailScreenParams;
  AboutUs: RouteParamList;
  CouponScreen: RouteParamList & {goRupiLink: string};
  SingleOrderServiceScreen: RouteParamList & {
    orderServiceInfo: OrderServiceItemEntity;
  };
  SingleOrderScreen: RouteParamList & {
    orderInfo: OrderEntity;
    orderStatus: OrderStatus;
  };
  Help: RouteParamList;
  OrdersScreen: RouteParamList & {referenceId?: string};
  BrandsScreen: RouteParamList & {organisation: ClientEntity};
  ContactSupport: RouteParamList;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    StackScreenProps<HomeStackParamList, T>,
    DrawerScreenProps<DrawerParamList>
  >;

const getHeaderTitle = (
  route: RouteProp<HomeStackParamList, keyof HomeStackParamList>,
): string | undefined => {
  const routeName = route.name as keyof RootAllMixedParamList;
  switch (routeName) {
    case 'TabStack':
      const focusedRoute = getFocusedRouteNameFromRoute(
        route,
      ) as keyof BottomTabParamList;
      return getTabHeaderTitle(focusedRoute);
    default:
      return routeName;
  }
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = ({navigation}: any) => {
  const {routeNames} = useSelector<RootState, AppSliceState>(state => {
    return state.app;
  });

  return (
    <Stack.Navigator
      screenOptions={props => {
        return {
          ...NavigationTheme.stackOptions({
            navOptions: props,
          }),
          title: getHeaderTitle(props.route),

          // headerStyleInterpolator: forSlideRight,
        };
      }}>
      <Stack.Screen name="TabStack" component={BottomTabNavigator} />
      <Stack.Screen
        name="LocationPermissionScreen"
        component={LocationPermissionScreen}
        options={{
          title: '',
          headerTransparent: true,
          // presentation: 'fullScreenModal',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="ContactRepScreen"
        component={ContactRepScreen}
        options={{title: AppLocalizedStrings.contactRep.contactRep}}
      />

      <Stack.Screen
        name="BrandsScreen"
        component={BrandsScreen}
        options={{title: routeNames.BrandsScreen}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{title: AppLocalizedStrings.notification.notification}}
      />
      <Stack.Screen
        name="InvoiceUploadScreen"
        component={InvoiceUploadScreen}
        options={{
          title: AppLocalizedStrings.invoice.invoiceUpload,
        }}
      />
      <Stack.Screen
        name="InvoiceDetailScreen"
        component={InvoiceDetailScreen}
        options={{
          title: AppLocalizedStrings.tab.invoice,
        }}
      />

      <Stack.Screen
        name="SingleOrderScreen"
        options={{title: 'Order Details'}}
        component={SingleOrderScreen}
      />
      <Stack.Screen
        name="SingleOrderServiceScreen"
        component={SingleOrderServiceScreen}
        options={{title: 'Order Details'}}
      />
      <Stack.Screen name="AboutUs" component={AboutChannelPaisaScreen} />
      <Stack.Screen name="CouponScreen" component={CouponScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
