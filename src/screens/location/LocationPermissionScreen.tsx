import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SVGIcon from '../../utility/svg/SVGIcon';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import RootNavigation from '../../navigation/RootNavigation';
import {PermissionManager} from '../../utility/permissions/PermissionManager';
import {HomeStackScreenProps} from '../../navigation/stack/HomeStackNavigator';
import {useDispatch} from 'react-redux';
import {appSlice, setOpenQrCode} from '../../store/slices/AppSlice';
import {PermissionType} from '../../utility/permissions/PermissionsList';
import Spacer from '../../components/layout/Spacer';
import {store} from '../../store/Store';
import {requestManualPermission} from '../../utility/permissions/PermissionWorkers';

const LocationPermissionScreen: React.FC<
  HomeStackScreenProps<'LocationPermissionScreen'>
> = props => {
  const fromQrCodeHeader = props.route.params.fromQrCodeHeader;

  function onPermissionBlocked() {
    requestManualPermission(PermissionType.LOCATION);
  }

  const onLocationHandler = async () => {
    const isLocationPermissionThere = await PermissionManager.getPermission(
      PermissionType.LOCATION,
    );
    if (isLocationPermissionThere) {
      if (fromQrCodeHeader) {
        store.dispatch(setOpenQrCode(true));
        RootNavigation.navigation.goBack();
      } else {
        // RootNavigation.navigation.goBack();
      }
      return;
    }
    if (!isLocationPermissionThere) {
      // RootNavigation.navigation.goBack();
      const checkPermission = await PermissionManager.checkPermissions(
        PermissionType.LOCATION,
        onPermissionBlocked,
      );
      if (checkPermission) return;
    }

    return;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <SVGIcon name="location" size={wp('50%')} />
        <Text style={styles.locationRequired}>
          {AppLocalizedStrings.location.locationRequired}
        </Text>
        <Text style={styles.locationInfo}>
          {AppLocalizedStrings.location.locationInfo}
        </Text>
      </View>
      <AdaptiveButton
        title={AppLocalizedStrings.allow}
        buttonStyle={styles.btn}
        onPress={onLocationHandler}
      />
      <Spacer height={hp(2)} />
    </SafeAreaView>
  );
};

export default LocationPermissionScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: wp('10%'),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  locationRequired: {
    marginTop: hp('4%'),
    marginBottom: hp('2.5%'),
    ...Style.getTextStyle(
      Fonts.getFontSize('headline1'),
      'Regular',
      Colors.primary,
    ),
  },
  locationInfo: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.darkBlack,
    ),
    textAlign: 'center',
  },
  btn: {
    width: '100%',
  },
});
