import {View, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Fonts from '../../theme/Fonts';
import {AppLocalizedStrings} from '../../localization/Localization';
import SegmentBar from '../../components/app/SegmentBar';
import MySubscription from '../../components/app/Subscription/MySubscription';
import NewSubscription from '../../components/app/Subscription/NewSubscription';

const SubscriptionScreen = () => {
  const segmentBarItems = [
    AppLocalizedStrings.subscription.mySubscription,
    AppLocalizedStrings.subscription.newSubscription,
  ];
  const onValueChange = (index: number) => {
    setMode(index);
  };
  const [mode, setMode] = useState(0);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.mainContainer}>
        <View style={styles.selectorView}>
          <SegmentBar
            selectedIndex={mode}
            items={segmentBarItems}
            onValueChange={onValueChange}
            itemSpacing={wp('6%')}
          />
        </View>
        {mode == 0 ? <MySubscription /> : <NewSubscription />}
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: hp('2%'),
  },
  selectorView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  statusText: {
    fontSize: Fonts.getFontSize('headline5'),
    fontFamily: Fonts.bold,
    color: Colors.black,
    marginTop: hp('1.5%'),
  },
});
