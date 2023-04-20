import React from 'react';
import MobileScreen from '../../screens/auth/MobileScreen';
import * as NavigationTheme from '../../theme/NavigationTheme';
import SplashScreen from '../../screens/splash/SplashScreen';
import {useAppSelector} from '../../store/Hooks';
import {RouteParamList} from '../navigator/types';
import EnterOTPScreen from '../../screens/auth/EnterOTPScreen';
import Colors from '../../theme/Colors';
import EnterGSTScreen from '../../screens/auth/EnterGSTScreen';
import EnterDetailsScreen from '../../screens/auth/EnterDetailsScreen';
import DocumentUploadScreen from '../../screens/auth/DocumentUploadScreen';
import {AppLocalizedStrings} from '../../localization/Localization';
import ChooseOrganisationScreen from '../../screens/auth/ChooseOrganisationScreen';
import {CompositeScreenProps} from '@react-navigation/native';
import {RootStackParamList} from '../navigator/AppNavigator';
import CompleteKYCScreen from '../../screens/auth/CompleteKYCScreen';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import LoginScreen from '../../screens/auth/LoginScreen';
import TermsConditionsScreen from '../../screens/drawer/TermsConditionsScreen';
import EnterUpdateContactOtpScreen from '../../screens/auth/EnterUpdateContactOtpScreen';
import LoginHelpScreen from '../../screens/auth/LoginHelpScreen';
import {OptionRegisterParams} from '../../domain/usages/RegisterUser';
import EnterAdditionalDetails from '../../screens/auth/EnterAdditionalDetails';
import ChooseUserTypeScreen from '../../screens/auth/ChooseUserTypeScreen';

export type AuthStackParamList = {
  SplashScreen: RouteParamList;
  LoginScreen: RouteParamList & {
    mobileNumber: string;
    forUpdateContact?: boolean;
    contactType: 'whatsapp' | 'mobile';
  };
  MobileScreen: RouteParamList;
  EnterOTPScreen: RouteParamList & {
    mobileNumber: string;
    forUpdateContact?: boolean;
    fromNewContact?: boolean;
    contactType: 'whatsapp' | 'mobile';
  };
  EnterGSTScreen: RouteParamList & OptionRegisterParams;
  EnterDetailsScreen: RouteParamList &
    OptionRegisterParams & {fromGst?: boolean; ownerNames?: string[]};
  EnterAdditionalDetails: RouteParamList & OptionRegisterParams;
  DocumentUploadScreen: RouteParamList;
  ChooseOrganisationScreen: RouteParamList & OptionRegisterParams;
  CompleteKYCScreen: RouteParamList & OptionRegisterParams;
  LoginHelpScreen: RouteParamList;
  ChooseUserTypeScreen: RouteParamList & {registerMobile: string};
  TermsConditionsScreen: RouteParamList;
  EnterUpdateContactOtpScreen: RouteParamList & {
    mobileNumber: string;
    forUpdateContact?: boolean;
    fromNewContact?: boolean;
    contactType: 'whatsapp' | 'mobile';
  };
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AuthStackParamList, T>,
    StackScreenProps<RootStackParamList>
  >;

const Stack = createStackNavigator<AuthStackParamList>();

const getRouteName = (route: keyof AuthStackParamList): string => {
  switch (route) {
    case 'DocumentUploadScreen':
      return AppLocalizedStrings.auth.documentUpload;
    case 'ChooseOrganisationScreen':
      return AppLocalizedStrings.auth.chooseOrganisation;
    default:
      return '';
  }
};

const AuthStackNavigator = () => {
  const isFirstTime = useAppSelector(state => state.app.isFirstTime);
  return (
    <Stack.Navigator
      initialRouteName={isFirstTime ? 'SplashScreen' : 'LoginScreen'}
      screenOptions={props => {
        const routName = getRouteName(props.route.name);
        const color = routName.length != 0 ? Colors.darkBlack : Colors.primary;
        return {
          ...NavigationTheme.stackOptions({
            navOptions: props,
            backIconColor: color,
          }),
          title: routName,
        };
      }}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MobileScreen" component={MobileScreen} />
      <Stack.Screen name="EnterOTPScreen" component={EnterOTPScreen} />
      <Stack.Screen
        name="EnterUpdateContactOtpScreen"
        component={EnterUpdateContactOtpScreen}
      />

      <Stack.Screen name="EnterGSTScreen" component={EnterGSTScreen} />
      <Stack.Screen
        name="ChooseUserTypeScreen"
        component={ChooseUserTypeScreen}
      />

      <Stack.Screen name="EnterDetailsScreen" component={EnterDetailsScreen} />
      <Stack.Screen
        name="EnterAdditionalDetails"
        component={EnterAdditionalDetails}
      />

      <Stack.Screen
        name="DocumentUploadScreen"
        component={DocumentUploadScreen}
      />
      <Stack.Screen
        name="ChooseOrganisationScreen"
        component={ChooseOrganisationScreen}
      />
      <Stack.Screen name="LoginHelpScreen" component={LoginHelpScreen} />
      <Stack.Screen name="CompleteKYCScreen" component={CompleteKYCScreen} />
      <Stack.Screen
        name="TermsConditionsScreen"
        component={TermsConditionsScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
