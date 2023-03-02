import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';
import {BottomTabDescriptorMap} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {NavigationHelpers, TabNavigationState} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import {AppLocalizedStrings} from '../../localization/Localization';
import {BottomTabParamList} from '../../navigation/navigator/BottomTabNavigator';
import RootNavigation from '../../navigation/RootNavigation';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import SVGIcon from '../../utility/svg/SVGIcon';
import Spacer from '../layout/Spacer';

export type TabbarProps = {
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<
    BottomTabParamList,
    BottomTabNavigationEventMap
  >;
  state: TabNavigationState<BottomTabParamList>;
};

interface TabItem {
  icon: string;
  title: string;
}

const kTabItems: TabItem[] = [
  {
    title: AppLocalizedStrings.tab.dashboard,
    icon: 'dashboard',
  },
  {
    title: AppLocalizedStrings.tab.offers,
    icon: 'offers',
  },
  {
    title: '',
    icon: 'upload',
  },
  {
    title: AppLocalizedStrings.tab.invoice,
    icon: 'invoice',
  },
  {
    title: AppLocalizedStrings.tab.wallet,
    icon: 'wallet',
  },
];

const CustomTabBar = ({state, descriptors, navigation}: TabbarProps) => {
  const tempRoutes = state.routes;
  return (
    <View style={styles.main}>
      <SafeAreaView>
        <View style={styles.container}>
          {tempRoutes.map((route, index) => {
            const isCenter = index == Math.floor(tempRoutes.length / 2);
            const {options} = descriptors[route.key];
            // const label =
            //   options.title !== undefined ? options.title : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              if (isCenter) {
                RootNavigation.navigate('InvoiceUploadScreen');
              } else {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  navigation.navigate(route.name);
                }
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            const color = isCenter
              ? Colors.white
              : isFocused
              ? Colors.primary
              : Colors.placeholder;

            return (
              <View key={`${index}`} style={styles.btnContainer}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={isCenter ? styles.btnCenter : styles.btn}>
                  <View
                    style={
                      isCenter
                        ? styles.btnContentContainerCenter
                        : styles.btnContentContainer
                    }>
                    <SVGIcon
                      name={kTabItems[index].icon}
                      size={isCenter ? 30 : 25}
                      color={color}
                    />
                    {!isCenter && (
                      <>
                        <Spacer style={styles.box} />
                        <Text
                          style={{
                            color: color,
                            fontSize: Fonts.getFontSize('headline7'),
                            fontFamily: Fonts.regular,
                          }}>
                          {kTabItems[index].title}
                        </Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.lightGrey,
  },
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: Platform.select({android: 5, ios: 0}),
  },
  btnContainer: {
    flex: 1,
    height: '100%',
    alignContent: 'flex-end',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnCenter: {
    top: -66 / 2,
    left: 0,
    right: 0,
    // right: '20%',
    // left: '20%',
    position: 'absolute',
    flex: 1,
    borderRadius: 25,
    alignItems: 'center',
  },
  btnContentContainer: {
    alignItems: 'center',
  },
  btnContentContainerCenter: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 66 / 2,
    padding: 18,
  },
  box: {
    height: 2,
  },
});

export default CustomTabBar;
