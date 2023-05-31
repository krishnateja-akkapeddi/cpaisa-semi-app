import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
  Image,
  Text,
  Touchable,
  RefreshControl,
} from 'react-native';
import NotificationItem from '../../components/app/notification/NotificationItem';
import AppLoader from '../../components/indicator/AppLoader';
import Spacer from '../../components/layout/Spacer';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import NotificationData from '../../mock/NotificationData.json';
import {NotificationEntity} from '../../models/interfaces/NotificationsResponse';
import {store} from '../../store/Store';
import {fetchNotifications} from '../../store/thunks/ApiThunks';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {debounce} from '../../utility/debounce';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import ImageView from '../../components/image/ImageView';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SVGIcon from '../../utility/svg/SVGIcon';
import AdaptiveButton from '../../components/button/AdaptiveButton';

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
  const [notificationListLoading, setNotificationListLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const [mode, setMode] = useState(ProfileMode.Personal);
  const [items, setItems] = useState(NotificationData);
  const [notificationsList, setNotificationsList] = useState<
    NotificationEntity[]
  >([]);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationEntity | null>();

  const [lastPage, setLastPage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onValueChange = (index: number) => {
    setMode(index);
  };

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<NotificationEntity>) => {
      return (
        <NotificationItem item={item} isLast={index == items.length - 1} />
      );
    },
    [],
  );

  const getNotifications = useCallback(
    async (page: number, scrolled?: boolean) => {
      setNotificationListLoading(true);

      const result = await store
        .dispatch(fetchNotifications({page: page}))
        .unwrap();

      if (result.success) {
        setCurrentPage(prev => prev + 1);
        setLastPage(result.last_page);
        if (scrolled) {
          setNotificationsList(oldData => [
            ...oldData,
            ...result.notifications,
          ]);
        } else {
          setNotificationsList(result.notifications);
        }
      }
      setNotificationListLoading(false);
    },

    [currentPage],
  );

  const keyExtractor = useCallback((item: Notification, index: number) => {
    return index.toString();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setNotificationsList([]);
    setCurrentPage(1);
    setLastPage(null);
    await getNotifications(1, false);
    setRefreshing(false);
  };

  const hasMore = () => {
    return lastPage ? currentPage < lastPage : false;
  };

  useEffect(() => {
    getNotifications(1, false);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      {/* <SegmentBar
        showLine={true}
        itemSpacing={wp(7)}
        containerStyle={styles.bar}
        selectedIndex={mode}
        items={segmentBarItems}
        onValueChange={onValueChange}
        activeTextStyle={styles.activeTextStyle}
        inActiveTextStyle={styles.inActiveTextStyle}
      /> */}

      <View style={styles.topContainer}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={() => {
            !notificationListLoading &&
              hasMore() &&
              getNotifications(currentPage, true).then(() => {});
          }}
          ListFooterComponent={
            <View>
              {notificationListLoading ? (
                <View style={{alignContent: 'center'}}>
                  <Spacer height={hp(3)} />
                  <AppLoader type="none" loading />
                </View>
              ) : notificationsList.length > 0 ? (
                <></>
              ) : (
                <View>
                  <View style={{alignContent: 'center', alignItems: 'center'}}>
                    <SVGIcon
                      name="no_notifications_scale_1x"
                      size={wp('55%')}
                    />
                    <Spacer height={hp(3)} />

                    <Text style={{fontWeight: 'bold'}}>
                      No Notifications Found
                    </Text>
                    <Spacer height={hp(10)} />
                  </View>
                </View>
              )}
            </View>
          }
          data={notificationsList}
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
  noNotificationsArt: {
    width: hp('45%'),
    resizeMode: 'contain',
    height: hp('50%'),
    marginTop: hp(1),
  },
});
