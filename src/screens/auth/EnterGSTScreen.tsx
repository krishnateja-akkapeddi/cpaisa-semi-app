import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import AdaptiveTextInput from '../../components/input/AdaptiveTextInput';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AuthBaseScreen from './AuthBaseScreen';
import Validator from '../../utility/validation/Validator';
import RootNavigation from '../../navigation/RootNavigation';
import Spacer from '../../components/layout/Spacer';
import Icon from 'react-native-vector-icons/AntDesign';
import {IdenitifcationType} from '../../models/enum/IdentificationType';
import {store} from '../../store/Store';
import {PanDetails} from '../../models/interfaces/PanVerificationResponse';
import {
  GstAddress,
  GstDetails,
} from '../../models/interfaces/GstVerifiedResponse';
import {
  fetchIdentityFromGst,
  fetchIdentityFromPan,
} from '../../store/thunks/ApiThunks';
import getLocation from '../../utility/custom-hooks/GetLocation';
import {openPopup, setOpenQrCode} from '../../store/slices/AppSlice';
import {AuthStackScreenProps} from '../../navigation/stack/AuthStackNavigator';
import {ChannelPartnerType} from '../../models/enum/ChannelPartnerType';
import GaInputField from '../../components/GaInputField';
import {pickMessageFromErrors} from '../../utility/ErrorPicker';
import {PermissionManager} from '../../utility/permissions/PermissionManager';
import {
  PermissionType,
  PlatformType,
} from '../../utility/permissions/PermissionsList';
import {requestManualPermission} from '../../utility/permissions/PermissionWorkers';
import {Convert} from '../../utility/converter/Convert';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {duration} from 'moment';
import AppLoader from '../../components/indicator/AppLoader';

const EnterGSTScreen: React.FC<
  AuthStackScreenProps<'EnterGSTScreen'>
> = props => {
  const [state, setState] = useState<IdenitifcationType>(
    IdenitifcationType.GST,
  );

  const infoFromUserType = props.route.params;

  const [GSTNo, setGSTNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationInfoLoading, setLocationInfoLoading] = useState(false);
  // const onStateChange = () => {
  //   setState(
  //     state == IdenitifcationType.GST
  //       ? IdenitifcationType.PAN
  //       : IdenitifcationType.GST,
  //   );
  //   setGSTNo('');
  // };

  const progress = useDerivedValue(() => {
    return locationInfoLoading
      ? withTiming(1, {duration: 3000})
      : withTiming(0, {duration: 3000});
  }, [locationInfoLoading]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.primary, Colors.lightGreen],
    );
    return {backgroundColor};
  }, []);

  const isValidData = (): boolean => {
    if (state == IdenitifcationType.GST) {
      return Validator.isValidGSTNumber(GSTNo);
    }
    return Validator.isValidPanNumber(GSTNo);
  };

  async function getIdentity() {
    if (state === IdenitifcationType.GST) {
      const data = await store
        .dispatch(
          fetchIdentityFromGst({
            identityType: IdenitifcationType.GST,
            value: GSTNo,
          }),
        )
        .unwrap();
      if (data.success) {
        onContinueHandler({gstInfo: data.gst_details});
      } else {
        store.dispatch(
          openPopup({
            message: data.errors
              ? pickMessageFromErrors(data.errors)
              : AppLocalizedStrings.somethingWrong,
            title: 'GST Validation',
            type: 'error',
          }),
        );
      }
    } else {
      const data = await store
        .dispatch(
          fetchIdentityFromPan({
            identityType: IdenitifcationType.PAN,
            value: GSTNo,
          }),
        )
        .unwrap();
      if (data.success) {
        onContinueHandler({panInfo: data.pan_details});
      } else {
        if (data.errors) {
          store.dispatch(
            openPopup({
              message: pickMessageFromErrors(data.errors),
              title: 'Pan Validation',
              type: 'error',
            }),
          );
        }
      }
    }
  }

  async function onContinueHandler({
    gstInfo,
    panInfo,
  }: {
    gstInfo?: GstDetails | null;
    panInfo?: PanDetails | null;
  }) {
    const locationPermission = await PermissionManager?.checkPermissions(
      PermissionType.LOCATION,
    );

    if (locationPermission) {
      if (Platform.OS === PlatformType.ANDROID) {
        const data = await PermissionManager.locationEnabler();
        if (!data) {
          store.dispatch(
            openPopup({
              title: 'Location Permission',
              message:
                'You must enable the location to continue with the registration',
              type: 'plain',
            }),
          );
        }
      }

      setLocationInfoLoading(true);
      const locationInfo = await getLocation();
      setLocationInfoLoading(false);
      if (locationInfo) {
        if (state === IdenitifcationType.GST) {
          RootNavigation.navigate('EnterDetailsScreen', {
            ...infoFromUserType,
            firm_name: Convert.toTitleCase(gstInfo?.business.tradeName),
            gst_no: gstInfo?.gstNumber,
            isLogin: false,
            fromGst: true,
            address: {
              lat: locationInfo.latitude.toString(),
              long: locationInfo.longitude.toString(),
              line: gstInfo?.addresses[0].line ?? '',
              pincode: gstInfo?.addresses[0].pincode ?? '',
            },
          });
        } else {
          RootNavigation.navigate('EnterDetailsScreen', {
            ...infoFromUserType,
            pan_no: panInfo?.panNumber,
            isLogin: false,
            address: {
              lat: locationInfo.latitude.toString(),
              long: locationInfo.longitude.toString(),
              line: '',
              pincode: '',
            },
          });
        }
        setLocationInfoLoading(false);
      } else {
        requestManualPermission(PermissionType.LOCATION);
      }
    } else {
      PermissionManager.getPermission(PermissionType.LOCATION);
    }
  }

  useEffect(() => {
    if (infoFromUserType.type === ChannelPartnerType.SEMI) {
      setState(IdenitifcationType.GST);
    } else {
      setState(IdenitifcationType.PAN);
    }
  }, [infoFromUserType]);

  return (
    <AuthBaseScreen
      title={
        state == IdenitifcationType.GST
          ? AppLocalizedStrings.auth.enterGSTDetails
          : AppLocalizedStrings.auth.enterPANDetails
      }
      iconName="enter_gst_number">
      {!isValidData() && (
        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon color={Colors.red} name="infocirlceo" />
          <Spacer width={wp(1)} />
          <View>
            <Text style={{textAlign: 'left', color: Colors.red}}>
              {state === IdenitifcationType.GST
                ? AppLocalizedStrings.validGst
                : AppLocalizedStrings.validPan}
            </Text>
          </View>
          <Spacer height={hp(4)} />
        </View>
      )}
      <GaInputField
        autoCapitalize
        label={
          state == IdenitifcationType.GST
            ? AppLocalizedStrings.auth.enterGSTNumber
            : AppLocalizedStrings.auth.enterPANNumber
        }
        value={GSTNo}
        onChangeText={setGSTNo}
        placeholder={
          state == IdenitifcationType.GST
            ? AppLocalizedStrings.auth.enterGSTNumber
            : AppLocalizedStrings.auth.enterPANNumber
        }
      />
      <Spacer height={hp('3%')} />
      <Animated.View style={[rStyle, {borderRadius: 10}]}>
        <AdaptiveButton
          loading={loading}
          isDisable={
            (state === IdenitifcationType.GST
              ? !Validator.isValidGSTNumber(GSTNo)
              : !Validator.isValidPanNumber(GSTNo)) || locationInfoLoading
          }
          title={
            locationInfoLoading ? (
              <AppLoader type="none" loading />
            ) : (
              AppLocalizedStrings.continue
            )
          }
          onPress={async () => {
            setLoading(true);
            await getIdentity();
            setLoading(false);
          }}
          buttonStyle={{
            ...styles.btnContinue,
            backgroundColor: Colors.transparent,
            // locationInfoLoading
            //   ? Colors.transparent
            //   : Colors.primary,
          }}
        />
      </Animated.View>
      {/* <View style={styles.viewBottom}>
        <AdaptiveButton
          buttonStyle={styles.btnGST}
          textStyle={styles.btnGSTText}
          type="text"
          title={
            state == IdenitifcationType.GST
              ? AppLocalizedStrings.auth.dontHaveGST
              : AppLocalizedStrings.auth.dontHavePAN
          }
          onPress={onStateChange}
        />
      </View> */}
    </AuthBaseScreen>
  );
};

export default EnterGSTScreen;

const styles = StyleSheet.create({
  input: {
    marginBottom: hp('2.5%'),
    textTransform: 'uppercase',
  },
  btnContinue: {
    width: '100%',
  },
  btnGST: {
    height: hp(2.5),
    borderRadius: hp(2.5) / 2,
    borderColor: Colors.black,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(3),
  },
  btnGSTText: {
    ...Style.getTextStyle(12, 'Regular', Colors.darkBlack),
  },
  viewBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: hp('5%'),
  },
});
