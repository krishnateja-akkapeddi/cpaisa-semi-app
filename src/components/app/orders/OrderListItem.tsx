import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';
import ImageView from '../../image/ImageView';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import SVGIcon from '../../../utility/svg/SVGIcon';
import {getReviewStatusInfo} from '../../../models/enum/ReviewStatus';
import RootNavigation from '../../../navigation/RootNavigation';
import {InvoiceListEntity} from '../../../models/interfaces/InvoiceListResponse';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {InvoiceStatus} from '../../../models/enum/InvoiceStatus';
import Icon from 'react-native-vector-icons/AntDesign';
import {Convert} from '../../../utility/converter/Convert';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {OrderStatus} from '../../../models/enum/OrderStatusEnum';
import {OrderEntity} from '../../../models/interfaces/OrdersListResponse';

import AdaptiveButton from '../../button/AdaptiveButton';

interface InvoiceProps {
  item: OrderEntity;
}

const OrderListItem: React.FC<InvoiceProps> = props => {
  const {item} = props;
  return (
    <TouchableOpacity
      style={{
        ...styles.mainContainer,
      }}>
      <View style={styles.minOrderContainer}>
        <View
          style={{
            ...styles.minOrangeView,
            backgroundColor:
              item?.order_status &&
              (item?.order_status === OrderStatus.PENDING
                ? Colors.grey
                : item?.order_status === OrderStatus.DISPATCHED
                ? Colors.green
                : Colors.red),
          }}>
          <Text style={styles.minOrderText}>
            {item?.order_status && Convert.capitalize(item?.order_status)}
          </Text>
        </View>
      </View>
      <View style={styles.listMainContainer}>
        <Text style={{paddingLeft: wp('3%')}}>#{item.id}</Text>

        <View style={styles.rowContainer}>
          <View style={styles.imageContainer}>
            {/* <ImageView
              source={require('../../../assets/images/InvoiceArt.png')}
              style={styles.imageStyle}
            /> */}
            {/* <Icon name="calculator" size={60}></Icon> */}
          </View>
          <View style={styles.leftContainer}>
            <Spacer style={{height: hp('0.5%')}} />
            <View style={styles.middleContainer}>
              <View style={styles.commonView}>
                <Text style={styles.commonStyle}>
                  {item.creator_name
                    ? item.creator_name
                    : AppLocalizedStrings.na}
                </Text>
                <Spacer height={hp(1)} />
                <Text style={{color: Colors.black}}>
                  Shop:
                  {item.delivery_address
                    ? ' ' +
                      item.delivery_address.city +
                      ', ' +
                      item.delivery_address.pin_code
                    : AppLocalizedStrings.na}
                </Text>
                <Text style={{color: Colors.black}}>
                  Contact:
                  {item.mobile ? ' ' + item.mobile : AppLocalizedStrings.na}
                </Text>
              </View>
              <Spacer style={{width: wp('2%')}} />

              <View style={styles.leftSection}>
                <TouchableOpacity
                  onPress={() => {
                    if (item.order_status === OrderStatus.ON_HOLD) {
                      RootNavigation.navigate('SingleOrderScreen', {
                        orderInfo: item,
                        isLogin: true,
                      });
                    } else {
                      return;
                    }
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.primary,
                      paddingTop: wp(2),
                      paddingBottom: wp(2),
                      paddingLeft: wp(3),
                      paddingRight: wp(3),

                      borderRadius: hp(2),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: Fonts.getFontSize('headline3'),
                      }}>
                      {item.order_status === OrderStatus.ON_HOLD
                        ? 'View More'
                        : 'Dispatch'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => {}} style={styles.starMark}>
        <Spacer height={hp('1%')} />
        <Text style={{color: Colors.darkBlack, fontWeight: '600'}}>
          {Convert.dateFormatter(null, 'DD, MMM yyyy', item.order_date)}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default memo(OrderListItem);

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
    position: 'relative',
  },
  listMainContainer: {
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 11,
  },
  imageStyle: {
    width: 90,
    height: 120,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleStyle: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline5'),
    color: '#7F7F7F',
    marginVertical: hp('0.5'),
  },
  commonStyle: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline4'),
    color: '#474747',
    backgroundColor: 'white',
  },
  commonView: {
    // flex: 1,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  summeryText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    marginLeft: wp('2%'),
    flex: 1,
  },
  minOrangeView: {
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.2%'),
  },
  minOrderText: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.white,
  },
  minOrderContainer: {
    flexDirection: 'row',
  },
  statusView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.white,
    backgroundColor: '#FF5577',
    paddingHorizontal: hp('1.5%'),
  },
  statusTextSecond: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.white,
    backgroundColor: '#F89E1B',
    paddingHorizontal: hp('1.5%'),
  },
  hexCodeText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    marginBottom: hp('0.6%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  informationContainer: {
    flex: 1,
    backgroundColor: '#F7DFC4',
    borderBottomLeftRadius: 10,
  },
  supportContainer: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    borderBottomRightRadius: 10,
  },
  informationTextStyle: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    textAlign: 'center',
    paddingVertical: hp('1%'),
  },
  supportTextStyle: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.primary,
    textAlign: 'center',
    paddingVertical: hp('1%'),
  },
  summeryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  leftContainer: {
    flex: 1,
    marginLeft: wp('3%'),
    justifyContent: 'center',
  },
  starMark: {
    position: 'absolute',
    zIndex: 10,
    top: -1,
    right: 15,
  },
});
