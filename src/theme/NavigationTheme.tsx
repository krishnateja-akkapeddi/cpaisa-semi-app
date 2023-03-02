import {Platform, StyleSheet} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {DrawerNavigationOptions} from '@react-navigation/drawer';
import {DefaultTheme} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import Colors from './Colors';
import Fonts from './Fonts';
import NavigationOptionProps from '../models/interfaces/NavigationOptionProps';
import {HeaderTitleStyle} from '../components/navigation/HeaderTitle';
import HeaderElements from '../utility/navigation/HeaderElements';
import {wp} from '../utility/responsive/ScreenResponsive';
interface StackOptionProps {
  navOptions: NavigationOptionProps;
  backIconColor?: string;
}

export const stackOptions = ({
  navOptions,
  backIconColor,
}: StackOptionProps): StackNavigationOptions => {
  const routeName = navOptions?.route?.name;
  return {
    // header: (props: StackHeaderProps) => (
    //   <Header backIconColor={backIconColor} navigation={props} />
    // ),
    headerLeftContainerStyle: styles.leftContainer,
    headerRightContainerStyle: styles.rightContainer,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: Colors.white,
    },
    headerTitleStyle: HeaderTitleStyle,
    headerTintColor: Colors.black,
    headerBackTitleVisible: false,
    headerTitleAlign: 'left',
    headerRight: props =>
      HeaderElements.getHeaderRight(
        routeName ? routeName : '',
        props.canGoBack ?? false,
      ),
    headerLeft: props =>
      HeaderElements.getHeaderLeft(
        props.canGoBack == true,
        navOptions,
        backIconColor,
        routeName ? routeName : '',
      ),
    // headerTitle: props => <HeaderTitle {...props} />,
  };
};

export const tabOptions = ({
  route,
  navigation,
}: NavigationOptionProps): BottomTabNavigationOptions => {
  return {
    headerShown: false,
    tabBarStyle: {
      borderTopWidth: 0,
    },
    headerTitleAlign: Platform.OS == 'android' ? 'left' : 'center',
    headerStyle: {
      backgroundColor: Colors.white,
      shadowColor: Colors.transparent,
    },
    headerTitleStyle: HeaderTitleStyle,
    headerTintColor: Colors.black,
  };
};

export const drawerOptions = ({
  route,
  navigation,
}: NavigationOptionProps): DrawerNavigationOptions => {
  return {
    headerStyle: {backgroundColor: Colors.white},
    headerTitleStyle: HeaderTitleStyle,
    headerTintColor: Colors.white,
    // headerTitleAlign: 'left',
    drawerType: 'front',
    headerShown: false,
    drawerItemStyle: {
      marginHorizontal: -6,
      marginVertical: -5,
    },
    drawerActiveBackgroundColor: Colors.transparent,
    drawerInactiveBackgroundColor: Colors.transparent,
  };
};

const styles = StyleSheet.create({
  tabBarLabel: {
    color: '#292929',
    fontSize: Fonts.getFontSize('headline5'),
  },
  leftContainer: {paddingLeft: wp(4)},
  rightContainer: {paddingRight: wp(4)},
});

export const ExtendedTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
    primary: Colors.white,
    card: Colors.white,
  },
};
