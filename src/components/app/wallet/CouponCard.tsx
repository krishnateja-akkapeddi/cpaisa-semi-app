import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Style from '../../../constants/Style';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {InvoiceStatus} from '../../../models/enum/InvoiceStatus';
import {RewardTransactionEntity} from '../../../models/interfaces/RewardRequestResponse';
import RootNavigation from '../../../navigation/RootNavigation';
import Colors from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';
import {Convert} from '../../../utility/converter/Convert';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';
import ProgressBar from './ProgressBar';

interface CouponCardProps {
  item: RewardTransactionEntity;
}

const CouponCard: React.FC<CouponCardProps> = props => {
  const {item} = props;
  console.log('COUP_ITEM', item);

  const [isVisible, setisVisible] = useState(true);

  const onViewCouponHandler = () => {
    RootNavigation.navigate('CouponScreen', {
      isLogin: true,
      goRupiLink: item.gorupi_link ? item.gorupi_link : '',
    });
  };

  useEffect(() => {}, [item]);

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          marginBottom: hp(2),
        }}>
        <View style={styles.transactionName}>
          <Text style={styles.transactionText}>{item.organization_name}</Text>
        </View>
        {/* <View style={styles.transactionName}>
          <Text style={styles.transactionText}>{item.tax_amount}</Text>
        </View>
        <View style={styles.transactionName}>
          <Text style={styles.transactionText}>{item.tax_percentage}</Text>
        </View> */}
        <View style={styles.nameStyle}>
          <Text style={styles.titleText}></Text>
          <Text style={[styles.priceText]}>{item.points}</Text>
        </View>
      </View>
      <View style={styles.subContainer}>
        <Spacer height={15} />
        <ProgressBar
          items={[
            {
              title: 'Request Raised',
              date: item.request_raised_on
                ? Convert.dateFormatter(
                    null,
                    'DD, MMM yyyy',
                    item.request_raised_on,
                  )
                : AppLocalizedStrings.na,
            },
            {
              title: 'Coupon Generated',
              date: item?.generated_on
                ? Convert.dateFormatter(
                    null,
                    'DD, MMM yyyy',
                    item?.generated_on,
                  )
                : AppLocalizedStrings.na,
            },
            // {title: 'Coupon Processed', date: AppLocalizedStrings.na},
          ]}
          completedSteps={item.generated_on ? 1 : 0}
          style={styles.bar}
        />
        <Spacer height={15} />
        <View style={styles.bottomCard}>
          <View style={styles.viewRedeemReq}>
            <Text style={styles.txtRedeemReq}>
              {AppLocalizedStrings.wallet.redeemRequestNo}
            </Text>
            <Text style={styles.requestNumbr}>{item.reward_request_no}</Text>
          </View>
          {item.status !== InvoiceStatus.PENDING && (
            <TouchableOpacity
              onPress={onViewCouponHandler}
              disabled={!item.gorupi_link}
              style={styles.couponBtn}>
              <Text style={styles.couponTxt}>
                {AppLocalizedStrings.wallet.viewCoupon}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bottomLine} />
      </View>
    </View>
  );
};

export default CouponCard;

const styles = StyleSheet.create({
  nameStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottomCard: {
    flexDirection: 'row',
    flex: 1,
  },
  viewRedeemReq: {
    flex: 1,
    flexDirection: 'column',
  },
  txtRedeemReq: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.grey,
    ),
  },

  couponBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('40%'),
    height: 36,
    backgroundColor: '#F89E1B',
    borderRadius: 18,
  },

  couponTxt: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.white,
    ),
    fontWeight: '700',
  },

  requestNumbr: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.grey,
    ),
    marginTop: 4,
  },

  bottomLine: {
    height: 1,
    backgroundColor: '#7F7F7F',
    width: '100%',
    marginTop: hp('2%'),
  },

  mainContainer: {
    zIndex: 1,
    borderRadius: 10,
    position: 'relative',
  },

  subContainer: {
    flexDirection: 'column',
  },

  transactionName: {
    borderRadius: 5,
    backgroundColor: '#F89E1B',
    alignSelf: 'flex-start',
    marginTop: hp('1.5%'),
  },

  transactionText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.white,
    ),
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 8,
    marginRight: 8,
  },
  priceText: {
    marginTop: hp('0.9'),
    marginLeft: 1,
    color: '#F89E1B',
    fontWeight: '600',
  },
  titleText: {
    marginTop: hp('0.9'),
    marginLeft: 1,
    color: Colors.black,
    fontWeight: '600',
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  selectorView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  flatlistContainer: {
    marginTop: hp('0.5%'),
    marginBottom: hp('1.5%'),
  },
  statusText: {
    fontSize: Fonts.getFontSize('headline5'),
    fontFamily: Fonts.bold,
    color: Colors.black,
    marginTop: hp('1.5%'),
  },
  brandText: {
    fontSize: Fonts.getFontSize('headline5'),
    fontFamily: Fonts.bold,
    color: Colors.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  imageStyle: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  subscribeButtonContainer: {
    backgroundColor: '#FF9600',
    padding: wp('1.7%'),
    borderRadius: 5,
  },
  subscribeButton: {
    fontSize: Fonts.getFontSize('headline5'),
    fontFamily: Fonts.medium,
    color: Colors.white,
  },
  dotProgress: {
    width: 10,
    height: 10,
    borderRadius: 10,
    borderColor: '#FF9600',
    borderWidth: 1,
    backgroundColor: '#FF9600',
  },
  sliderDotProgress: {
    width: 6,
    height: 6,
    borderRadius: 10,
    borderColor: '#FF9600',
    borderWidth: 1,
    backgroundColor: '#FF9600',
  },
  sliderEmptyDotProgress: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: '#F7DFC4',
  },
  dotEmptyBox: {
    width: 10,
    height: 10,
    borderRadius: 10,
    borderColor: '#FF9600',
    borderWidth: 1,
  },
  orangeLine: {
    flex: 1,
    borderTopWidth: 2,
    borderColor: '#FF9600',
  },
  greyLine: {
    flex: 1,
    borderTopWidth: 2,
    borderColor: '#E5E5E5',
  },
  dateText: {
    fontSize: Fonts.getFontSize('headline6'),
    fontFamily: Fonts.regular,
    color: '#7F7F7F',
    marginVertical: hp('0.3%'),
  },
  processContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  statusTypeText: {
    fontSize: Fonts.getFontSize('headline6'),
    fontFamily: Fonts.bold,
    color: '#FF9600',
  },
  underProcessText: {
    fontSize: Fonts.getFontSize('headline6'),
    fontFamily: Fonts.bold,
    color: '#7F7F7F',
  },
  leftView: {
    flex: 1,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  rightView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('3%'),
  },
  sliderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: Fonts.getFontSize('headline6'),
    fontFamily: Fonts.regular,
    color: Colors.black,
    paddingLeft: wp('3%'),
    flex: 1,
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
  bar: {paddingHorizontal: 0},
});
