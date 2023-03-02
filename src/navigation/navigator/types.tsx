import {RootStackParamList} from './AppNavigator';
import {AuthStackParamList} from '../stack/AuthStackNavigator';
import {DrawerParamList} from './DrawerNavigator';
import {HomeStackParamList} from '../stack/HomeStackNavigator';
import {BottomTabParamList} from './BottomTabNavigator';
import {ProfileStackParamList} from '../stack/ProfileStackNavigator';
import {SubscriptionStackParamList} from '../stack/SubscriptionStackNavigator';
import {StockistStackParamList} from '../stack/StockistStackNavigator';
import {InvoiceListEntity} from '../../models/interfaces/InvoiceListResponse';

export type InvoiceDetailScreenParams = {
  invoiceItem: InvoiceListEntity;
};

export type RootAllMixedParamList = RootStackParamList &
  HomeStackParamList &
  ProfileStackParamList &
  StockistStackParamList &
  SubscriptionStackParamList &
  AuthStackParamList &
  BottomTabParamList &
  DrawerParamList;

export type RouteParamList = {isLogin: boolean} | undefined;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootAllMixedParamList {}
  }
}
