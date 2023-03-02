import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import NotificationItem from '../../components/app/notification/NotificationItem';
import SegmentBar from '../../components/app/SegmentBar';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import NotificationData from '../../mock/NotificationData.json';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';

export interface Notification {
  title: string;
}

enum ProfileMode {
  Personal,
  Business,
}
const NotificationScreen = () => {
  const segmentBarItems = [
    AppLocalizedStrings.notification.All,
    AppLocalizedStrings.notification.Invoices,
    AppLocalizedStrings.notification.Wallet,
    AppLocalizedStrings.notification.MyGoal,
  ];
  const [mode, setMode] = useState(ProfileMode.Personal);
  const [items, setItems] = useState(NotificationData);

  const onValueChange = (index: number) => {
    setMode(index);
  };

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<Notification>) => {
      return (
        <NotificationItem
          isLast={index == items.length - 1}
          title={item.title}
        />
      );
    },
    [],
  );

  const keyExtractor = useCallback((item: Notification, index: number) => {
    return index.toString();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <SegmentBar
        showLine={true}
        itemSpacing={wp(7)}
        containerStyle={styles.bar}
        selectedIndex={mode}
        items={segmentBarItems}
        onValueChange={onValueChange}
        activeTextStyle={styles.activeTextStyle}
        inActiveTextStyle={styles.inActiveTextStyle}
      />

      <View style={styles.topContainer}>
        <FlatList
          data={items}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </SafeAreaView>
  );
};
export default NotificationScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    marginTop: hp(2),
  },
  itemSeparatorStyle: {
    height: hp('2.5%'),
  },
  details: {
    marginVertical: hp(3),
  },
  bar: {
    marginTop: hp(1.5),
    marginHorizontal: hp(3),
  },
  activeTextStyle: {
    ...Style.getTextStyle(Fonts.getFontSize('headline3'), 'Bold', Colors.black),
  },
  inActiveTextStyle: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Bold',
      Colors.lightGrey,
    ),
  },
});
