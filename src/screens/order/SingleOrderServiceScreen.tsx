import {StyleSheet, Text, View, Alert, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import StepIndicator from 'react-native-step-indicator';
import {HomeStackScreenProps} from '../../navigation/stack/HomeStackNavigator';
import Fonts from '../../theme/Fonts';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Spacer from '../../components/layout/Spacer';
import {Convert} from '../../utility/converter/Convert';
import {DeliveryAddress} from '../../models/interfaces/OrdersListResponse';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import GaBottomModal from '../../components/GaBottomModal';
import ProgressBar from '../../components/app/wallet/ProgressBar';
import {OrderLogEntity} from '../../models/interfaces/OrderStatusResponse';
import {store} from '../../store/Store';
import {trackOrder} from '../../store/thunks/ApiThunks';
import {FetchOrderStatusParams} from '../../domain/usages/FetchOrderStatus';
import Icon from 'react-native-vector-icons/AntDesign';
import Animated from 'react-native-reanimated';
import {OrderStatus} from '../../models/enum/OrderStatusEnum';
import {AppLocalizedStrings} from '../../localization/Localization';

const SingleOrderServiceScreen: React.FC<
  HomeStackScreenProps<'SingleOrderServiceScreen'>
> = props => {
  const order = props?.route?.params?.orderServiceInfo;
  const [updatingOrderStatus, setUpdatingOrderStatus] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [orderLog, setOrderLog] =
    useState<[{date: string; title: string; comment: string}]>();
  const dispatch = useDispatch();

  const customStyles = {
    stepIndicatorSize: wp(10),
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: Colors.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: Colors.white,
    stepStrokeUnFinishedColor: Colors.white,
    separatorFinishedColor: Colors.primary,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: Colors.white,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: Colors.white,
    stepIndicatorLabelFinishedColor: Colors.white,
    stepIndicatorLabelUnFinishedColor: Colors.white,
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
  };

  const checkOrderStatus = async (params: FetchOrderStatusParams.params) => {
    setUpdatingOrderStatus(true);
    const data = await store.dispatch(trackOrder(params)).unwrap();
    if (data.success) {
      let convertedOrderData: [any] = [{}];
      for (let i = 0; i < data.order_logs.length; i++) {
        const orderStatusLog = data.order_logs[i];
        convertedOrderData.push({
          date:
            orderStatusLog.status !== OrderStatus.PENDING
              ? Convert.dateFormatter(
                  null,
                  'DD MMM yyyy, HH:mm',
                  orderStatusLog.updated_at,
                )
              : AppLocalizedStrings.na,
          title: orderStatusLog.status,
          comment: orderStatusLog.comments,
        });
      }
      convertedOrderData.shift();
      setOrderLog(convertedOrderData);
      setUpdatingOrderStatus(false);
    } else {
      return;
    }
    setShowOrderStatus(true);
  };

  return (
    <View style={styles.singleOrderContainer}>
      {orderLog && showOrderStatus && (
        <GaBottomModal
          visible={true}
          onClose={() => {
            setShowOrderStatus(false);
          }}>
          <Animated.View
            style={{
              height:
                orderLog.length > 2
                  ? hp(Platform.OS === 'android' ? '60%' : '50%')
                  : hp(Platform.OS === 'android' ? '40%' : '30%'),
            }}>
            <StepIndicator
              customStyles={customStyles}
              renderStepIndicator={val => {
                const currentTitle = orderLog[val.position].title;
                if (currentTitle === OrderStatus.CREATED) {
                  return (
                    <Icon
                      name="checkcircle"
                      color={Colors.green}
                      size={wp(6)}
                    />
                  );
                } else if (currentTitle === OrderStatus.REJECTED) {
                  return (
                    <Icon color={Colors.red} size={wp(6)} name="closecircle" />
                  );
                } else {
                  return (
                    <Icon
                      color={Colors.yellow}
                      size={wp(6)}
                      name="infocirlce"
                    />
                  );
                }
              }}
              direction="vertical"
              labels={orderLog?.map(val => val.title)}
              stepCount={orderLog?.length}
              currentPosition={-1}
              renderLabel={item => {
                const fineOne = orderLog?.find(val => val.title === item.label);
                return (
                  <View
                    style={{
                      display: 'flex',
                      alignContent: 'flex-start',
                      width: wp(50),
                    }}>
                    <View>
                      <Text style={{fontWeight: '700'}}>
                        {Convert.capitalize(fineOne?.title ?? '')}
                      </Text>
                    </View>
                    <View>
                      <Text>{fineOne?.date}</Text>
                    </View>
                    <Spacer height={4} />
                    <View>
                      <Text style={{color: Colors.grey}}>
                        {fineOne?.comment}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </Animated.View>
        </GaBottomModal>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{overflow: 'scroll', height: hp('72%')}}>
        <View>
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
            {Object.keys(order.address)
              .filter(val => {
                return val !== 'lat' && val !== 'long';
              })
              .map(val => {
                const value = order.address[val as keyof DeliveryAddress];
                if (value)
                  return (
                    <Text>
                      <Text>{Convert.capitalize(val)}:</Text>
                      <Text style={{color: Colors.black, fontWeight: '700'}}>
                        {'  '}
                        {Convert.capitalize(value.toString())}
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
            <Text style={{fontWeight: 'bold'}}>#{order?.order_id}</Text>
          </Text>
        </View>
        <Spacer height={hp(3)} />
        {order.items.map((item, parentInd) => {
          return (
            <View style={{borderRadius: 10}} key={parentInd.toString()}>
              <Text
                style={{
                  padding: wp(2),
                  backgroundColor: '#F7DFC4',
                  color: Colors.black,
                  fontWeight: 'bold',
                }}>
                {item.organization_code}
              </Text>
              <Spacer height={hp(1)} />

              <View key={parentInd.toString()} style={{padding: wp(2)}}>
                <View style={styles.header}>
                  <View style={{width: wp('60%')}}>
                    <Text style={styles.subOrderText}>
                      {item.product_name}
                      <Text style={{color: Colors.green}}></Text>
                    </Text>
                    {/* <Spacer height={hp(1)} /> */}
                  </View>
                  <View>
                    <Text style={{...styles.subOrderText, textAlign: 'right'}}>
                      <Text style={{color: Colors.grey}}>
                        {Convert.capitalize(item.uom)}
                      </Text>
                      {'  '}X {item.quantity}
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
                {parentInd !== order.items.length - 1 && (
                  <View>
                    <View style={styles.bottomLine} />
                  </View>
                )}
              </View>
              <View>
                <Spacer height={hp(2)} />
                <View style={{paddingLeft: wp(1)}}>
                  <Text style={styles.creatorInfo}>Selected Suppliers</Text>
                  <View style={styles.bottomLine} />
                  <Spacer height={hp(2)} />
                  <View style={{paddingHorizontal: wp(2)}}>
                    {order.suppliers.map(val => {
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
                    })}
                  </View>
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
          justifyContent: 'center',
          position: 'absolute',
          bottom: hp('-7%'),
        }}>
        <AdaptiveButton
          onPress={() =>
            checkOrderStatus({
              orderId: order.order_id,
              subOrderId: order.sub_order_id,
            })
          }
          buttonStyle={{width: wp('88%')}}
          title="Track Order"
        />
      </View>
    </View>
  );
};

export default SingleOrderServiceScreen;

const styles = StyleSheet.create({
  creatorInfo: {
    fontSize: Fonts.getFontSize('headline3'),
    fontWeight: '700',
    color: Colors.black,
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
  priority: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
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
