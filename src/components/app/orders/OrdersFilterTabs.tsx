import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import {OrderStatus} from '../../../models/enum/OrderStatusEnum';

type Props = {
  onTabChange: Function;
  selectedOrderStatus: string;
};

const props = {} as Props;

export type OrderStatusFilterType = {label: string; value: OrderStatus};

const OrdersFilterTabs: React.FC<Props> = ({
  onTabChange,
  selectedOrderStatus,
}) => {
  const orderStatus = [
    {label: 'New', value: OrderStatus.ON_HOLD},
    {label: 'Accepted', value: OrderStatus.CREATED},
    {label: 'Dispatched', value: OrderStatus.DISPATCHED},
    {label: 'Rejected', value: OrderStatus.REJECTED},
  ];
  return (
    <View>
      <View style={{...styles.container, alignSelf: 'flex-start'}}>
        {orderStatus.map((val, ind) => {
          const isSelected = val.value === selectedOrderStatus;

          return (
            <View style={{marginLeft: ind !== 0 ? 10 : 0, width: wp('21%')}}>
              <TouchableOpacity
                onPress={() => {
                  onTabChange(val);
                }}>
                <View
                  style={{
                    // width: wp('25%'),
                    paddingLeft: wp('3%'),
                    paddingRight: wp('3%'),
                    paddingTop: wp('3.5%'),
                    paddingBottom: wp('3.5%'),
                    borderWidth: 0.5,
                    borderRadius: 10,
                    borderColor: Colors.primary,
                    backgroundColor: isSelected ? Colors.primary : Colors.white,
                  }}>
                  <Text
                    style={{
                      color: isSelected ? Colors.white : Colors.primary,
                      fontSize: 11,
                      fontWeight: '500',
                      textAlign: 'center',
                    }}>
                    {val.label}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default OrdersFilterTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
