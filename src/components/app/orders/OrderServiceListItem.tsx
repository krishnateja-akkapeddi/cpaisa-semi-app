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
import {
  OrderServiceItemEntity,
  OrderStatusEntity,
} from '../../../models/interfaces/OrderServiceResponse';

interface InvoiceProps {
  item: OrderServiceItemEntity;
  orderServiceStatusInfo: OrderStatusEntity[];
}

const OrderServiceListItem: React.FC<InvoiceProps> = props => {
  const {item, orderServiceStatusInfo} = props;
  const orderStatus = orderServiceStatusInfo[0];

  return (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.navigate('SingleOrderServiceScreen', {
          orderServiceInfo: item,
          isLogin: true,
        });
      }}
      style={{
        ...styles.mainContainer,
      }}>
      {/* <View style={styles.minOrderContainer}>
        <View
          style={{
            ...styles.minOrangeView,
            backgroundColor:
              orderStatus?.status === OrderStatus.CREATED
                ? Colors.grey
                : Colors.darkBlack,
          }}>
          <Text style={styles.minOrderText}>
            {orderStatus?.status && Convert.capitalize(orderStatus?.status)}
          </Text>
        </View>
      </View> */}
      <View style={styles.listMainContainer}>
        <Text>#{`${item.order_id}-${item.sub_order_id}`}</Text>
        <View style={styles.rowContainer}>
          <View style={styles.leftContainer}>
            <Spacer style={{height: hp('2%')}} />
            <View style={styles.middleContainer}>
              <View style={styles.commonView}>
                <Text style={styles.commonStyle}>
                  <Text style={{color: Colors.grey}}>Supplier: </Text>{' '}
                  {item.suppliers
                    ? Convert.toTitleCase(item.suppliers[0].name)
                    : AppLocalizedStrings.na}
                </Text>
                <Spacer height={hp(1)} />
                <Text style={{color: Colors.black, fontWeight: 'bold'}}>
                  <Text style={{color: Colors.grey, fontWeight: 'bold'}}>
                    Place:{' '}
                  </Text>{' '}
                  {item.address
                    ? ' ' +
                      Convert.capitalize(item.address.city) +
                      ', ' +
                      item.address.pin_code
                    : AppLocalizedStrings.na}
                </Text>
                <Spacer height={hp(1)} />
              </View>
              <Spacer style={{width: wp('2%')}} />

              <View style={styles.leftSection}>
                <Spacer height={hp(4)} />
                <TouchableOpacity
                  onPress={() => {
                    RootNavigation.navigate('SingleOrderServiceScreen', {
                      orderServiceInfo: item,
                      isLogin: true,
                    });
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
                      View More
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.starMark}>
        <Spacer height={hp('1%')} />
        <Text style={{color: Colors.darkBlack, fontWeight: '600'}}>
          {Convert.dateFormatter(null, 'DD, MMM yyyy', item.order_date)}
        </Text>
        <Spacer height={hp(2)} />
        <Text
          style={{
            paddingRight: wp(1),
            fontWeight: '500',
            color: Colors.grey,
            fontSize: Fonts.getFontSize('headline6'),
            textAlign: 'right',
          }}>
          Approx amt
        </Text>
        <Text style={{paddingLeft: wp('3%'), fontWeight: '500'}}>
          {Convert.convertToRupeesFormat(item.total_amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(OrderServiceListItem);

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
    paddingHorizontal: 1,
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
    width: wp('50%'),
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
    justifyContent: 'center',
  },
  starMark: {
    position: 'absolute',
    zIndex: 10,
    top: -1,
    right: 15,
  },
});
