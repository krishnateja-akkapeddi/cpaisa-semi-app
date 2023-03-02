import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ImageView from './image/ImageView';
import Fonts from '../theme/Fonts';
import Colors from '../theme/Colors';
import {hp, wp} from '../utility/responsive/ScreenResponsive';
import Spacer from './layout/Spacer';
import SubscriptionSuccessPopup from './popup/SubscriptionSuccessPopup';
import RootNavigation from './/../navigation/RootNavigation';

interface ListProps {
  name: string;
}

const SubscriptionList: React.FC<ListProps> = props => {
  const [showPopup, setShowPopup] = useState(false);

  const onDismissHandler = () => {
    setShowPopup(val => !val);
  };

  const onSubscribeHandler = () => {
    setShowPopup(val => !val);
  };

  return (
    <View style={styles.listView}>
      <View style={styles.listRow}>
        <ImageView
          source={require('../assets/images/pfizer.png')}
          style={styles.listImageStyle}
        />
        <Spacer width={wp('4%')} />
        <Text style={styles.otherText}>{props.name}</Text>
      </View>
      <View style={styles.rightListRow}>
        <TouchableOpacity
          onPress={onSubscribeHandler}
          style={styles.buttonView}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
        <Spacer width={wp('4%')} />
        <TouchableOpacity
          onPress={() => {
            RootNavigation.navigate('SubscriptionDetailScreen');
          }}>
          <Text style={styles.detailText}>View details</Text>
        </TouchableOpacity>
      </View>
      {showPopup && <SubscriptionSuccessPopup onDismiss={onDismissHandler} />}
    </View>
  );
};

export default SubscriptionList;

const styles = StyleSheet.create({
  otherText: {
    fontSize: Fonts.getFontSize('headline5'),
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 10,
  },
  listImageStyle: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
  },
  listRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightListRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonView: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
  },
  buttonText: {
    fontSize: Fonts.getFontSize('headline6'),
    fontFamily: Fonts.medium,
    color: Colors.primary,
  },
  detailText: {
    fontSize: Fonts.getFontSize('headline6'),
    fontFamily: Fonts.regular,
    color: Colors.primary,
  },
});
