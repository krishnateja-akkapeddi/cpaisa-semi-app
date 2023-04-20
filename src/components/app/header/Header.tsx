import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {getDefaultHeaderHeight} from '@react-navigation/elements';
import {HeaderTitleStyle} from '../../navigation/HeaderTitle';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import HeaderElements from '../../../utility/navigation/HeaderElements';
import {StackHeaderProps} from '@react-navigation/stack';

interface HeaderProps {
  backIconColor?: string;
  navigation: StackHeaderProps;
}

const Header = (props: HeaderProps) => {
  const {navigation, backIconColor} = props;
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);
  const containerHeight = headerHeight - insets.top;

  const headerStyle = useMemo(
    () => [styles.header, {height: headerHeight}],
    [headerHeight],
  );
  const containerStyle = useMemo(
    () => [styles.content, {height: containerHeight}],
    [containerHeight],
  );

  const routeName = navigation.route.name;
  const canGoBack = navigation.back != undefined;
  return (
    <View style={headerStyle}>
      <View style={containerStyle}>
        <View style={styles.left}>
          {HeaderElements.getHeaderLeft(
            canGoBack,
            navigation,
            backIconColor,
            routeName,
          )}
        </View>
        <View style={styles.title}>
          <Text numberOfLines={1} style={HeaderTitleStyle}>
            {navigation.options.title}
          </Text>
        </View>
        <View style={styles.right}>
          {canGoBack == false
            ? HeaderElements.getHeaderRight(routeName)
            : undefined}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
  },
  content: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  left: {
    marginLeft: wp(5),
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  title: {
    flex: 1,
    marginHorizontal: wp(5),
    justifyContent: 'center',
  },
  right: {
    marginRight: wp(5),
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'orange',
  },
  headerLeftButton: {
    paddingHorizontal: 0,
    height: 'auto',
  },
});
