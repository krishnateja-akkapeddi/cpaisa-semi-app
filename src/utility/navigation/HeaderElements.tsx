import React, {ReactNode} from 'react';
import {RootAllMixedParamList} from '../../navigation/navigator/types';
import HeaderRightView from '../../components/app/header/HeaderRightView';
import NavigationOptionProps from '../../models/interfaces/NavigationOptionProps';
import RootNavigation from '../../navigation/RootNavigation';
import {DrawerActions} from '@react-navigation/native';
import Colors from '../../theme/Colors';
import {wp} from '../responsive/ScreenResponsive';
import {StyleSheet, Text, View} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';

const isHeaderVisible = (routeName: string): boolean => {
  const name = routeName as keyof RootAllMixedParamList;
  switch (name) {
    case 'LoginScreen':
      return false;
    case 'LocationPermissionScreen':
    default:
      return true;
  }
};

const getHeaderRight = (
  routeName: string,
  canGoBack?: boolean,
): ReactNode | undefined => {
  const name = routeName as keyof RootAllMixedParamList;
  switch (name) {
    case 'SplashScreen':
    case 'LoginScreen':
    case 'MobileScreen':
    case 'EnterOTPScreen':
    case 'EnterGSTScreen':
    case 'EnterDetailsScreen':
    case 'DocumentUploadScreen':
    case 'ChooseOrganisationScreen':
    case 'CompleteKYCScreen':
    case 'LocationPermissionScreen':
      return (
        <HeaderRightView
          showOffers={false}
          showHelp={false}
          showQRCode={false}
          showBell={false}
        />
      );
    case 'NotificationScreen':
      return undefined;
    case 'CouponScreen':
      return (
        <HeaderRightView
          showOffers={false}
          showHelp={false}
          showQRCode={false}
          showBell={false}
        />
      );
    case 'DashboardScreen':
      return (
        <HeaderRightView showOffers={false} showHelp={true} showQRCode={true} />
      );
    case 'InvoiceDetailScreen':
      return (
        <HeaderRightView
          showOffers={false}
          showHelp={true}
          showQRCode={false}
          showBell={false}
        />
      );

    case 'ProfileScreen':
      return <HeaderRightView showQRCode={false} showOffers={true} />;
    case 'LoginHelpScreen':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );
    case 'AboutUs':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );

    case 'SingleOrderScreen':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );
    case 'SingleOrderServiceScreen':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );

    case 'ChooseUserTypeScreen':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );
    case 'BrandsScreen':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );
    case 'ContactSupport':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );

    case 'EnterAdditionalDetails':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );

    case 'WalletScreen':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );
    case 'InvoiceUploadScreen':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );
    case 'AuthStack':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );
    case 'OffersScreen':
      return (
        <HeaderRightView
          showBell={false}
          showQRCode={false}
          showOffers={false}
          showHelp={false}
        />
      );

    default:
      return <HeaderRightView showQRCode={true} />;
  }
};

const getHeaderLeft = (
  canGoBack: boolean,
  navigation: NavigationOptionProps,
  backIconColor: string | undefined,
  routeName: string,
): ReactNode | undefined => {
  const showHeader = isHeaderVisible(routeName);
  if (showHeader == false) {
    return undefined;
  }
  return canGoBack ? (
    <AdaptiveButton
      type="text"
      buttonStyle={styles.headerLeftButton}
      icon="arrow_back"
      iconSize={wp('6%')}
      iconColor={backIconColor ?? Colors.darkBlack}
      onPress={() => navigation.navigation && navigation.navigation.goBack()}
    />
  ) : (
    <AdaptiveButton
      type="text"
      buttonStyle={styles.headerLeftButton}
      icon="menu"
      iconColor={Colors.black}
      iconSize={wp('7%')}
      onPress={() =>
        RootNavigation.navigation.dispatch(DrawerActions.openDrawer())
      }
    />
  );
};

export default {getHeaderLeft, getHeaderRight};

const styles = StyleSheet.create({
  headerLeftButton: {
    paddingHorizontal: 0,
    height: 'auto',
  },
});
