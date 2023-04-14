import React, {useState} from 'react';
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

const EnterGSTScreen = () => {
  const [state, setState] = useState<IdenitifcationType>(
    IdenitifcationType.GST,
  );
  const [GSTNo, setGSTNo] = useState('22AABCU9603R1ZX');
  const [PANNo, setNo] = useState('22AABCU9603R1ZX');
  const [panInfo, setPanInfo] = useState<PanDetails>();
  const [gstInfo, setGstInfo] = useState<GstDetails>();
  const onStateChange = () => {
    setState(
      state == IdenitifcationType.GST
        ? IdenitifcationType.PAN
        : IdenitifcationType.GST,
    );
  };

  const isValidData = (): boolean => {
    if (state == IdenitifcationType.GST) {
      return Validator.isValidGSTNumber(GSTNo);
    }
    return Validator.isValidPanNumber(GSTNo);
  };

  const getIdentity = async () => {
    if (state === IdenitifcationType.GST) {
      const data = await store
        .dispatch(
          fetchIdentityFromGst({
            identityType: IdenitifcationType.GST,
            value: GSTNo,
          }),
        )
        .unwrap();
      setGstInfo(data.gst_details);
    } else {
      const data = await store
        .dispatch(
          fetchIdentityFromPan({
            identityType: IdenitifcationType.PAN,
            value: GSTNo,
          }),
        )
        .unwrap();
      setPanInfo(data.pan_details);
    }
  };

  const onContinueHandler = async () => {
    RootNavigation.navigate('EnterDetailsScreen');
    // const locationInfo = await getLocation();
    // if (locationInfo && gstInfo) {
    //   RootNavigation.navigate('EnterDetailsScreen', {
    //     firm_name: gstInfo?.business.legalName,
    //     mobileNumber: '920519570',
    //     gst_no: gstInfo?.gstNumber,
    //     isLogin: false,
    //     address: {
    //       lat: locationInfo.latitude.toString(),
    //       long: locationInfo.longitude.toString(),
    //       line: gstInfo?.addresses[0].line,
    //       pincode: gstInfo.addresses[0].pincode,
    //     },
    //   });
    // }
  };

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
      <AdaptiveTextInput
        autoCapitalize="characters"
        value={GSTNo}
        onChangeText={setGSTNo}
        placeholder={
          state == IdenitifcationType.GST
            ? AppLocalizedStrings.auth.enterGSTNumber
            : AppLocalizedStrings.auth.enterPANNumber
        }
        style={styles.input}
      />
      <AdaptiveButton
        isDisable={!isValidData()}
        title={AppLocalizedStrings.continue}
        onPress={onContinueHandler}
        buttonStyle={styles.btnContinue}
      />
      <View style={styles.viewBottom}>
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
      </View>
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
