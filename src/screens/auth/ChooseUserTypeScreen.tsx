import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AuthBaseScreen from './AuthBaseScreen';
import {store} from '../../store/Store';
import {fetchChannelPartnerTypes} from '../../store/thunks/ApiThunks';
import {ChannelPartnerTypeEntity} from '../../models/interfaces/ChannelPartnerTypeResponse';
import RadioButton from '../../components/button/RadioButton';
import Spacer from '../../components/layout/Spacer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Animated from 'react-native-reanimated';
import RootNavigation from '../../navigation/RootNavigation';
import {AuthStackScreenProps} from '../../navigation/stack/AuthStackNavigator';
import {openPopup} from '../../store/slices/AppSlice';

const ChooseUserTypeScreen: React.FC<
  AuthStackScreenProps<'ChooseUserTypeScreen'>
> = props => {
  const [loading, setLoading] = useState(false);
  const [channelPartnerTypes, setChannelPartnerTypes] = useState<
    ChannelPartnerTypeEntity[]
  >([]);
  const [selectedChannelPartnerTypes, setSelectedChannelPartnerTypes] =
    useState<ChannelPartnerTypeEntity>();

  const getChannelPartnerTypes = async () => {
    setLoading(true);
    const data = await store.dispatch(fetchChannelPartnerTypes()).unwrap();
    setChannelPartnerTypes(data.channel_partner_types);
    setLoading(false);
  };

  useEffect(() => {
    getChannelPartnerTypes();
  }, []);

  console.log('FROM_DUEhr', props.route.params.registerMobile);

  async function onContinueHandler() {
    if (
      selectedChannelPartnerTypes?.display_name &&
      props.route.params.registerMobile
    ) {
      RootNavigation.navigate('EnterGSTScreen', {
        type: selectedChannelPartnerTypes?.display_name,
        mobile: props.route.params.registerMobile,
        isLogin: false,
      });
    } else {
      store.dispatch(
        openPopup({
          message: AppLocalizedStrings.somethingWrong,
          title: 'Registration',
          type: 'danger',
        }),
      );
    }
  }

  return (
    <AuthBaseScreen
      title={AppLocalizedStrings.auth.chooseUserType}
      iconName="enter_gst_number">
      <View style={styles.optionContainer}>
        {!loading ? (
          channelPartnerTypes
            ?.map(val => {
              return val.name;
            })
            .map((val, ind) => {
              return (
                <RadioButton
                  titleStyles={{fontSize: wp(4), fontWeight: '500'}}
                  title={val}
                  isSelected={
                    selectedChannelPartnerTypes?.id ===
                    channelPartnerTypes[ind].id
                  }
                  onSelect={() => {
                    setSelectedChannelPartnerTypes(channelPartnerTypes[ind]);
                  }}
                />
              );
            })
        ) : (
          <Animated.View style={styles.optionContainer}>
            {[1, 2].map((val, ind) => {
              return (
                <View>
                  <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item width={wp(20)} height={hp(2)} />
                  </SkeletonPlaceholder>
                  <Spacer height={hp(5)} />
                </View>
              );
            })}
          </Animated.View>
        )}
      </View>

      <Spacer height={hp(9)} />
      <AdaptiveButton
        loading={loading}
        isDisable={loading || !selectedChannelPartnerTypes}
        title={AppLocalizedStrings.continue}
        onPress={onContinueHandler}
        buttonStyle={styles.btnContinue}
      />
    </AuthBaseScreen>
  );
};

export default ChooseUserTypeScreen;

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
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: hp(5),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginStart: wp(3),
  },
});
