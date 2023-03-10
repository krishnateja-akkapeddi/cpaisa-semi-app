import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListRenderItemInfo,
  FlatList,
} from 'react-native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import Spacer from '../../../components/layout/Spacer';
import AdaptiveButton from '../../../components/button/AdaptiveButton';
import Carousel from '../../carousel/Carousel';
import RedeemPointCard from '../../app/wallet/RedeemPointCard';
import Fonts from '../../../theme/Fonts';
import AdaptiveTextInput from '../../input/AdaptiveTextInput';
import RadioList from '../filters/RadioList';
import SwipeButton from 'rn-swipe-button';
import Icon from 'react-native-vector-icons/AntDesign';
import AppLoader from '../../indicator/AppLoader';

interface RedeemDetailProps {
  onDismiss: () => void;
  onRedeem?: () => void;
  title: string;
  couponType: string;
  setCouponType: React.Dispatch<React.SetStateAction<string>>;
  points: string;
  setPoints: React.Dispatch<React.SetStateAction<string>>;
}

const RedeemPointDetail: React.FC<RedeemDetailProps> = props => {
  const {onDismiss, onRedeem, title} = props;
  const [selectedIds, setSelectedIds] = useState<number>(100);
  const [swiping, setSwiping] = useState(false);
  const [points, setPoints] = useState('100');
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [swipeCompletion, setSwipeCompletion] = useState(false);
  const renderItem = (item: number) => {
    return <RedeemPointCard />;
  };

  const renderPoints = ({item, index}: ListRenderItemInfo<number>) => {
    const isActive = item === selectedIds;
    return (
      <>
        {index !== 0 && (
          <AdaptiveButton
            // isDisable={true}
            type={isActive == true ? 'dark' : 'light'}
            buttonStyle={
              isActive == true ? styles.btnActive : styles.btnInactive
            }
            textStyle={
              isActive == true ? styles.btnTextActive : styles.btnTextInactive
            }
            title={'+' + item}
            onPress={() => {
              setSelectedIds(item);
              setPoints(prev => {
                if (!prev) {
                  return item.toString();
                }
                return (parseInt(prev) + item).toString();
              });
              props.setPoints(prev => {
                if (!prev) {
                  return item.toString();
                }
                return (parseInt(prev) + item).toString();
              });
              console.log('ITEMS_RAJDF', item);
            }}
          />
        )}
      </>
    );
  };

  return (
    <View style={[styles.mainCardStyle]}>
      <View style={[styles.cardViewTop]}>
        <AdaptiveButton
          title={title}
          type="text"
          icon="arrow_back"
          buttonStyle={styles.backBtn}
          textStyle={styles.backBtnText}
          onPress={onDismiss}
        />
        <AdaptiveButton
          title={AppLocalizedStrings.wallet.dismissX}
          type="text"
          buttonStyle={styles.backBtn}
          textStyle={styles.textRedeemTitel}
          onPress={onDismiss}
        />
      </View>
      <Spacer height={hp(2.8)} />
      <Text>Enter how many points do you want to redeem?</Text>

      <Spacer height={hp(1.8)} />

      <AdaptiveTextInput
        keyboardType="decimal-pad"
        placeholder="Enter Points"
        onChangeText={setPoints}
        style={{
          textAlign: 'left',
          backgroundColor: Colors.lightGrey,
          borderColor: Colors.lightGrey,
        }}
        value={points}
      />
      <Spacer height={hp(1.8)} />

      <FlatList
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        horizontal
        data={[50, 100, 500, 1000, 1500, 2000]}
        renderItem={renderPoints}
        ItemSeparatorComponent={() => <Spacer width={wp(1)} />}
      />
      <Spacer height={hp(2.8)} />
      <Text>Choose coupon type</Text>
      <Spacer height={hp(1.8)} />
      <RadioList
        onValueChange={selected => {
          props.setCouponType(['Amazon', 'Flipkart', 'Myntra'][selected[0]]);
        }}
        numOfColumn={3}
        data={['Amazon', 'Flipkart', 'Myntra']}
      />
      <Spacer height={hp(2.8)} />

      {/* <Carousel items={[1, 2]} renderItem={renderItem} /> */}
      <Spacer height={hp(1.8)} />
      {/* <AdaptiveButton
        type="dark"
        title={AppLocalizedStrings.continue}
        onPress={onRedeem}
      /> */}
      {redeemLoading ? (
        <AppLoader loading type="none" />
      ) : (
        <SwipeButton
          onSwipeStart={() => {
            setSwiping(true);
          }}
          onSwipeFail={() => {
            setSwiping(false);
          }}
          onSwipeSuccess={() => {
            setSwipeCompletion(true);
            setRedeemLoading(true);
            onRedeem && onRedeem();
          }}
          thumbIconImageSource={require('../../../assets/images/SwiperIcon.png')}
          containerStyles={{borderRadius: 30}}
          thumbIconBorderColor={Colors.primary}
          thumbIconBackgroundColor={Colors.primary}
          thumbIconStyles={{borderRadius: 30}}
          railFillBackgroundColor={Colors.primary}
          railFillBorderColor={Colors.primary}
          titleStyles={{position: 'absolute', zIndex: 10}}
          titleColor={swiping ? Colors.white : Colors.primary}
          railBackgroundColor={Colors.white}
          railBorderColor={Colors.primary}
        />
      )}
    </View>
  );
};

export default RedeemPointDetail;

const styles = StyleSheet.create({
  backBtn: {
    height: 'auto',
  },

  backBtnText: {
    marginStart: 5,
  },

  middelLineStyle: {
    backgroundColor: Colors.grey,
    height: 0.5,
  },
  mainCardStyle: {
    borderColor: Colors.placeholder,
    borderRadius: Style.kBorderRadius,
    borderWidth: 1,
    padding: hp('1.8'),
    marginBottom: hp('2.5%'),
  },
  cardViewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRedeemPointTitel: {
    ...Style.getTextStyle(Fonts.getFontSize('headline4'), 'Bold', Colors.black),
  },
  textRedeemTitel: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.black,
    ),
  },
  leftBtnView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rightBtnView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  leftBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  rightBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  btnActive: {
    height: hp(3.5),
    paddingHorizontal: wp(3),
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  btnTextActive: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.white,
    ),
  },
  btnInactive: {
    height: hp(3.5),
    paddingHorizontal: wp(3),
    borderColor: Colors.primary,
  },
  btnTextInactive: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.primary,
    ),
  },
});
