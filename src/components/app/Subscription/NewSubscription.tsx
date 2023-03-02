import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import ImageView from '../../image/ImageView';
import Spacer from '../../layout/Spacer';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import SVGIcon from '../../../utility/svg/SVGIcon';
import SubscriptionList from '../../SubscriptionList';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import SubscribeData from '../../../mock/Subscribe.json';
import ProgressBar from '../wallet/ProgressBar';
import Carousel from '../../carousel/Carousel';

const NewSubscription = () => {
  const [data, setData] = useState(SubscribeData);
  const barItems: {title: string; date: string}[] = [
    {title: 'Request Raised', date: '12 Apr 21'},
    {title: 'Pending Approval', date: '13 Apr 21'},
    {title: 'Approved/Rejected', date: '-'},
  ];
  const renderItem = useCallback((item: string) => {
    return (
      <View>
        <View style={styles.row}>
          <ImageView
            style={styles.imageStyle}
            source={require('../../../assets/images/pfizer.png')}
          />
          <Spacer width={wp('4%')} />
          <View style={styles.textContainer}>
            <Text style={styles.brandText}>Pfizer</Text>
          </View>
          <TouchableOpacity style={styles.subscribeButtonContainer}>
            <Text style={styles.subscribeButton}>Unsubscribe</Text>
          </TouchableOpacity>
        </View>
        <ProgressBar
          items={barItems}
          completedSteps={1}
          style={{paddingHorizontal: 0, width: '100%'}}
        />
        <View style={styles.contentView}>
          <SVGIcon name="info" size={hp('2%')} color={Colors.primary} />
          <Text style={styles.contentText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad.
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text style={styles.statusText}>My Subscription Status</Text>
      <Carousel items={['1', '2', '3']} renderItem={renderItem} />

      <View style={styles.titleView}>
        <Text style={styles.otherText}>Other New Subscriptions</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: hp('2%')}} />}
          renderItem={({item}) => <SubscriptionList name={item.name} />}
        />
      </View>
    </View>
  );
};

export default NewSubscription;

const styles = StyleSheet.create({
  statusText: {
    fontSize: Fonts.getFontSize('headline5'),
    fontFamily: Fonts.bold,
    color: Colors.black,
    marginTop: hp('1.5%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  imageStyle: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    resizeMode: 'cover',
  },
  brandText: {
    fontSize: Fonts.getFontSize('headline5'),
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  textContainer: {
    flex: 1,
  },
  subscribeButtonContainer: {
    backgroundColor: Colors.primary,
    padding: wp('1.7%'),
    borderRadius: 5,
  },
  subscribeButton: {
    fontSize: Fonts.getFontSize('headline6'),
    fontFamily: Fonts.medium,
    color: Colors.white,
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  contentText: {
    fontSize: Fonts.getFontSize('headline6'),
    fontFamily: Fonts.regular,
    color: Colors.black,
    paddingLeft: wp('3%'),
    flex: 1,
  },
  sliderDotProgress: {
    width: 6,
    height: 6,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.primary,
  },
  sliderEmptyDotProgress: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: '#F7DFC4',
  },
  otherText: {
    fontSize: Fonts.getFontSize('headline5'),
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  titleView: {
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  sliderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
