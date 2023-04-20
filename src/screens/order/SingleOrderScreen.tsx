import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';

import {BottomTabParamList} from '../../navigation/navigator/BottomTabNavigator';
import {HomeStackScreenProps} from '../../navigation/stack/HomeStackNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import Fonts from '../../theme/Fonts';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Spacer from '../../components/layout/Spacer';
import Icon from 'react-native-vector-icons/AntDesign';
import {Convert} from '../../utility/converter/Convert';
import {DeliveryAddress} from '../../models/interfaces/OrdersListResponse';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import {ScrollView} from 'react-native-gesture-handler';
import {ChangeOrderStatusParams} from '../../domain/usages/ChnageOrderStatus';
import {store} from '../../store/Store';
import {changeOrderStatus} from '../../store/thunks/ApiThunks';
import {useDispatch} from 'react-redux';
import {openPopup} from '../../store/slices/AppSlice';
import RootNavigation from '../../navigation/RootNavigation';
import {OrderStatus} from '../../models/enum/OrderStatusEnum';
import AppLoader from '../../components/indicator/AppLoader';
import {AppLocalizedStrings} from '../../localization/Localization';

const SingleOrderScreen: React.FC<
  HomeStackScreenProps<'SingleOrderScreen'>
> = props => {
  const order = props?.route?.params?.orderInfo;
  const [updatingOrderStatus, setUpdatingOrderStatus] = useState(false);
  const dispatch = useDispatch();

  const updateOrderStatus = async (params: ChangeOrderStatusParams.params) => {
    setUpdatingOrderStatus(true);
    const data = await store.dispatch(changeOrderStatus(params)).unwrap();
    if (data.success) {
      dispatch(
        openPopup({
          title: 'Order',
          type: 'success',
          message: data.message,
          onSubmit: () => {
            RootNavigation.navigate('OrdersScreen', {
              referenceId: order.reference_number,
              isLogin: true,
            });
          },
        }),
      );
    } else {
      dispatch(
        openPopup({
          title: 'Order',
          type: 'error',
          message: 'Request failed',
          onSubmit: () => {
            // RootNavigation.navigate('OrdersScreen');
          },
        }),
      );
      setUpdatingOrderStatus(false);
      return;
    }
    setUpdatingOrderStatus(false);
  };

  return (
    <View style={styles.singleOrderContainer}>
      {updatingOrderStatus && <AppLoader loading />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{overflow: 'scroll', height: hp('72%')}}>
        <View>
          <View style={{...styles.bottomLine, marginTop: hp(-1)}} />
          <Spacer height={hp(2)} />
          <Text style={styles.heading}>Creator Name</Text>
          <Spacer height={hp(1)} />
          <Text style={{paddingLeft: wp(1)}}>{order.creator_name}</Text>
        </View>
        <View style={styles.bottomLine} />
        <Spacer height={hp(3)} />
        <View>
          <Text style={styles.heading}>Delivery Address</Text>
          <Spacer height={hp(1)} />
          <View style={{paddingLeft: wp(1)}}>
            {Object.keys(order.delivery_address)
              .filter(val => {
                return val !== 'lat' && val !== 'long';
              })
              .map(val => {
                const value =
                  order.delivery_address[val as keyof DeliveryAddress];
                if (value)
                  return (
                    <Text>
                      <Text>{Convert.capitalize(val)}:</Text>
                      <Text style={{color: Colors.black, fontWeight: '700'}}>
                        {'  '}
                        {value}
                      </Text>
                      <Spacer height={hp(2)} />
                    </Text>
                  );
              })}
          </View>
        </View>
        <Spacer height={hp(1)} />
        <View style={styles.bottomLine} />
        <Spacer height={hp(2)} />
        <View style={styles.header}>
          <Text style={styles.heading}>Order Details</Text>
          <Text style={styles.rightHeader}>
            Order number{'  '}
            <Text style={{fontWeight: 'bold'}}>#{order?.id}</Text>
          </Text>
        </View>
        <Spacer height={hp(3)} />
        {order.ordered_organizations.map((org, parentInd) => {
          return (
            <View style={{borderRadius: 10}} key={parentInd.toString()}>
              <Text
                style={{
                  padding: wp(2),
                  backgroundColor: '#F7DFC4',
                  color: Colors.black,
                  fontWeight: 'bold',
                }}>
                {org.organization_code}
              </Text>
              <Spacer height={hp(1)} />
              {org.ordered_items.map((orderedItem, ind) => {
                return (
                  <View key={ind.toString()} style={{padding: wp(2)}}>
                    <View style={styles.header}>
                      <View style={{width: wp('60%')}}>
                        <Text style={styles.subOrderText}>
                          {orderedItem.product_name}
                          <Text style={{color: Colors.green}}></Text>
                        </Text>
                        {/* <Spacer height={hp(1)} /> */}
                      </View>
                      <View>
                        <Text
                          style={{...styles.subOrderText, textAlign: 'right'}}>
                          <Text style={{color: Colors.grey}}>
                            {Convert.capitalize(orderedItem.uom)}
                          </Text>{' '}
                          X {orderedItem.quantity}
                        </Text>

                        {/* <Text
                          style={{color: Colors.primary, fontWeight: '500'}}>
                          <Icon
                            style={{fontWeight: 'bold'}}
                            size={wp(3)}
                            name="infocirlceo"
                          />
                          {'  '}46 + 4 FREE
                        </Text> */}
                      </View>
                    </View>
                    {ind !== org.ordered_items.length - 1 && (
                      <View>
                        <View style={styles.bottomLine} />
                      </View>
                    )}
                  </View>
                );
              })}
              <Spacer height={hp(2)} />

              <View style={{paddingLeft: wp(1)}}>
                <Text style={styles.creatorInfo}>Selected Suppliers</Text>
                <View style={styles.bottomLine} />
                <Spacer height={hp(2)} />
                <View style={{paddingHorizontal: wp(2)}}>
                  {order.ordered_organizations.map(val => {
                    return val.selected_suppliers.map(val => {
                      return (
                        <View>
                          <View
                            style={{
                              ...styles.header,
                              alignContent: 'flex-start',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <View style={styles.priority}>
                              <Text style={{color: Colors.white}}>
                                {val.priority}
                              </Text>
                            </View>
                            <Spacer width={wp(5)} />
                            <Text
                              style={{color: Colors.black, fontWeight: '700'}}>
                              {Convert.capitalize(val.name)}
                            </Text>
                          </View>
                          <Spacer height={hp(2)} />
                        </View>
                      );
                    });
                  })}
                </View>
              </View>
              <Spacer height={hp(2)} />
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          ...styles.header,
          justifyContent: 'space-evenly',
          position: 'absolute',
          bottom: hp('-7%'),
        }}>
        <AdaptiveButton
          onPress={() => {
            Alert.alert('Are you sure you want to accept the order', '', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () =>
                  updateOrderStatus({
                    stauts: OrderStatus.ACCEPTED,
                    uuid: order.reference_number,
                  }),
              },
            ]);
          }}
          buttonStyle={{width: wp('40%')}}
          title="Accept"
        />
        <Spacer width={wp(10)} />
        <AdaptiveButton
          onPress={() => {
            Alert.alert('Are you sure you want to reject the order', '', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () =>
                  updateOrderStatus({
                    stauts: OrderStatus.REJECTED,
                    uuid: order.reference_number,
                  }),
              },
            ]);
          }}
          textStyle={{color: 'red'}}
          type="text"
          buttonStyle={{
            width: wp('40%'),
            borderColor: Colors.red,
            borderWidth: 1,
            borderRadius: 10,
          }}
          title="Reject"
        />
      </View>
    </View>
  );
};

export default SingleOrderScreen;

const styles = StyleSheet.create({
  creatorInfo: {
    fontSize: Fonts.getFontSize('headline3'),
    fontWeight: '700',
    color: Colors.black,
  },
  priority: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
  heading: {
    fontSize: Fonts.getFontSize('headline2'),
    fontWeight: '700',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightHeader: {
    color: Colors.grey,
    fontWeight: '400',
    fontSize: wp(3),
    paddingRight: wp(1),
  },
  singleOrderContainer: {
    marginHorizontal: wp(5),
    marginVertical: wp(5),
  },

  bottomLine: {
    height: 1,
    backgroundColor: '#E5E5E5',
    width: '100%',
    marginTop: hp('2%'),
  },
  subOrderContainer: {},
  subOrderText: {
    fontWeight: '700',
  },
});
