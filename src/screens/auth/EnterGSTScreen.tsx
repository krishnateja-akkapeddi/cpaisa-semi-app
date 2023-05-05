import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
import {openPopup} from '../../store/slices/AppSlice';
import {AuthStackScreenProps} from '../../navigation/stack/AuthStackNavigator';
import {ChannelPartnerType} from '../../models/enum/ChannelPartnerType';
import GaInputField from '../../components/GaInputField';
import {pickMessageFromErrors} from '../../utility/ErrorPicker';
import {PermissionManager} from '../../utility/permissions/PermissionManager';
import {PermissionType} from '../../utility/permissions/PermissionsList';
import {requestManualPermission} from '../../utility/permissions/PermissionWorkers';

const EnterGSTScreen: React.FC<
  AuthStackScreenProps<'EnterGSTScreen'>
> = props => {
  const [state, setState] = useState<IdenitifcationType>(
    IdenitifcationType.GST,
  );

  const infoFromUserType = props.route.params;

  const [GSTNo, setGSTNo] = useState('22AABCU9603R1ZX');
  const [loading, setLoading] = useState(false);

  // const onStateChange = () => {
  //   setState(
  //     state == IdenitifcationType.GST
  //       ? IdenitifcationType.PAN
  //       : IdenitifcationType.GST,
  //   );
  //   setGSTNo('');
  // };

  const isValidData = (): boolean => {
    if (state == IdenitifcationType.GST) {
      return Validator.isValidGSTNumber(GSTNo);
    }
    return Validator.isValidPanNumber(GSTNo);
  };

  async function getIdentity() {
    setLoading(true);
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
        setLoading(false);

        return data.gst_details;
      } else {
        store.dispatch(
          openPopup({
            message:
              data.errors?.gst_number ?? AppLocalizedStrings.somethingWrong,
            title: 'GST Validation',
            type: 'error',
          }),
        );
        setLoading(false);
        return;
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
        setLoading(false);

        return data.pan_details;
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
        setLoading(false);

        return;
      }
    }
  }

  async function onContinueHandler<T extends GstDetails & PanDetails>(params: {
    gstInfo?: T;
    panInfo?: T;
  }) {
    const {gstInfo, panInfo} = params;
    if (gstInfo?.name && panInfo?.name) {
      return null;
    }

    const locationInfo = await getLocation();

    if (locationInfo) {
      if (state === IdenitifcationType.GST) {
        if (gstInfo) {
          RootNavigation.navigate('EnterDetailsScreen', {
            ...infoFromUserType,
            firm_name: gstInfo?.business.legalName,
            gst_no: gstInfo?.gstNumber,
            isLogin: false,
            fromGst: true,
            pan_no: gstInfo.panNumber,
            address: {
              lat: locationInfo.latitude.toString(),
              long: locationInfo.longitude.toString(),
              line: gstInfo?.addresses[0].line,
              pincode: gstInfo.addresses[0].pincode,
            },
          });
        }
      } else if (panInfo) {
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
      } else {
        return;
      }
    } else {
      requestManualPermission(PermissionType.LOCATION);
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
      <AdaptiveButton
        loading={loading}
        isDisable={
          state === IdenitifcationType.GST
            ? !Validator.isValidGSTNumber(GSTNo)
            : !Validator.isValidPanNumber(GSTNo)
        }
        title={AppLocalizedStrings.continue}
        onPress={() => {
          getIdentity().then((data: any) => {
            if (state === IdenitifcationType.GST) {
              onContinueHandler<GstDetails & PanDetails>({gstInfo: data});
            } else {
              onContinueHandler<GstDetails & PanDetails>({panInfo: data});
            }
          });
        }}
        buttonStyle={styles.btnContinue}
      />
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
