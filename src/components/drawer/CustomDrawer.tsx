import React, {useMemo, useState} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import Spacer from '../layout/Spacer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AdaptiveButton from '../button/AdaptiveButton';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Style from '../../constants/Style';
import SVGIcon from '../../utility/svg/SVGIcon';
import SharedPreference, {kSharedKeys} from '../../storage/SharedPreference';
import {AppLocalizedStrings} from '../../localization/Localization';
import QRCodePopup from '../popup/QRCodePopup';
import RootNavigation from '../../navigation/RootNavigation';
import {RootAllMixedParamList} from '../../navigation/navigator/types';
import {AuthResult, Data} from '../../models/interfaces/AuthResponse';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/Store';
interface BottomViewProps {
  title: string;
  icon: string;
}

const BOTTOM_VIEW: BottomViewProps[] = [
  {title: AppLocalizedStrings.drawer.termsConditions, icon: 'terms_conditions'},
  {title: AppLocalizedStrings.drawer.aboutChannelPaisa, icon: 'info'},
  {title: AppLocalizedStrings.drawer.logout, icon: 'logout'},
];

const kPaddingHorizontal = wp('4%');

const CustomDrawer: React.FC<DrawerContentComponentProps> = props => {
  const userData: Data = useSelector<RootState, Data>(
    state => state.auth.userInfo,
  );

  const insets = useSafeAreaInsets();

  const bottomViewStyle: ViewStyle = useMemo(() => {
    return {
      marginBottom: Math.max(insets.bottom, 10),
      paddingHorizontal: kPaddingHorizontal,
      width: '100%',
    };
  }, [insets]);

  const headerViewStyle: ViewStyle = useMemo(() => {
    return {
      height: hp('14%') + insets.top / 2,
      backgroundColor: Colors.primary,
      alignItems: 'flex-end',
      marginBottom: hp(7),
      paddingTop: insets.top,
    };
  }, [insets]);

  const bottomActionHandler = async (index: number) => {
    switch (index) {
      case 0:
        navigateTo('TermsConditionsScreen');
        break;
      case 1:
        navigateTo('AboutChannelPaisaScreen');
        break;
      default:
        logoutHandler();
        break;
    }
  };

  const navigateTo = (screeName: keyof RootAllMixedParamList) => {
    props.navigation.closeDrawer();
    setTimeout(() => {
      RootNavigation.navigate(screeName);
    }, 300);
  };

  const logoutHandler = () => {
    Alert.alert('', AppLocalizedStrings.alert.logout, [
      {
        text: AppLocalizedStrings.no,
        style: 'cancel',
      },

      {
        style: 'destructive',
        text: AppLocalizedStrings.yes,
        onPress: async () => {
          props.navigation.closeDrawer();
          await SharedPreference.shared.removeItem(kSharedKeys.userDetails);
          props.navigation.reset({
            index: 0,
            routes: [{name: 'AuthStack', params: {screen: 'LoginScreen'}}],
          });
        },
      },
    ]);
  };

  React.useEffect(() => {
    console.log('CODE_DRAWER', userData);
  }, [userData]);
  return (
    <View style={styles.screen}>
      <DrawerContentScrollView
        contentContainerStyle={styles.drawerContainerStyle}>
        <View style={headerViewStyle}>
          <AdaptiveButton
            buttonStyle={styles.icon}
            icon="cross"
            iconSize={wp('3.5%')}
            onPress={() => props.navigation.closeDrawer()}
          />
          <Image
            style={styles.profilePic}
            source={{uri: 'https://picsum.photos/seed/picsum/200/300'}}
          />
        </View>
        <View style={styles.profileInfo}>
          <View>
            <Text style={styles.userName}>{userData?.user?.full_name}</Text>
            <Spacer height={5} />
            <Text style={styles.userInfo}>
              {userData?.channel_partner?.address.line +
                ', ' +
                userData?.channel_partner?.address.state.name}
            </Text>
          </View>
          {/* <TouchableOpacity onPress={onQRCodeHandler}>
            <SVGIcon color={Colors.darkBlack} name="qrcode" size={hp('5%')} />
          </TouchableOpacity> */}
        </View>
        <Spacer style={styles.lineView} />
        <View style={styles.itemList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Spacer style={styles.lineView} />
      <View style={bottomViewStyle}>
        {BOTTOM_VIEW.map((item, index) => {
          return (
            <AdaptiveButton
              key={index}
              type="light"
              icon={item.icon}
              iconSize={wp(3.8)}
              title={item.title}
              textStyle={styles.btnText}
              buttonStyle={styles.btn}
              onPress={bottomActionHandler.bind(this, index)}
            />
          );
        })}
      </View>
      {/* {showQR && <QRCodePopup onDismiss={() => setShowQR(false)} />} */}
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.drawerBG,
  },
  btn: {
    height: 25,
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    marginBottom: 5,
    borderWidth: 0,
  },
  btnText: {
    marginLeft: 5,
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.grey,
    ),
  },
  drawerContainerStyle: {
    paddingTop: 0,
  },
  profilePic: {
    height: wp(18),
    aspectRatio: 1,
    borderRadius: wp(18) / 2,
    position: 'absolute',
    left: wp('4%'),
    bottom: -wp(18) / 2,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: kPaddingHorizontal,
    marginBottom: hp('2.5%'),
    alignItems: 'center',
  },
  lineView: {
    flexShrink: 1,
    height: 1,
    backgroundColor: Colors.white,
    marginHorizontal: kPaddingHorizontal,
    marginBottom: hp('2.5%'),
  },
  itemList: {
    paddingHorizontal: kPaddingHorizontal,
  },
  userName: {
    ...Style.getTextStyle(Fonts.getFontSize('headline2'), 'Bold', Colors.black),
  },
  userInfo: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.black,
    ),
  },
  icon: {
    paddingHorizontal: 10,
    height: 'auto',
    paddingVertical: 8,
    marginRight: wp('2%'),
  },
});
