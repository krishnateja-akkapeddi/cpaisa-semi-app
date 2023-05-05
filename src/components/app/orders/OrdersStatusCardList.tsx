import {View, StyleSheet, ListRenderItem} from 'react-native';
import React, {useEffect} from 'react';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {
  OverallInvoiceStatus,
  MonthlyInvoiceStatusEntity,
} from '../../../models/interfaces/InvoiceSummaryResponse';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import OrderCard from './OrdersCard';
import {OrderSummaryResponse} from '../../../models/interfaces/OrderSummaryResponse';
import {OrderStatusEntity} from '../../../models/interfaces/OrderServiceResponse';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Convert} from '../../../utility/converter/Convert';
import {OrderStatus} from '../../../models/enum/OrderStatusEnum';
import Colors from '../../../theme/Colors';
import {Text} from 'react-native-svg';
import AppLoader from '../../indicator/AppLoader';
import Animated from 'react-native-reanimated';
import Spacer from '../../layout/Spacer';
import OrderSummary from './OrderSummary';

type Props = {
  loading?: boolean;
  ordersMonthlyStatus: OrderStatusEntity[] | undefined;
};
const OrdersStatusCardList: React.FC<Props> = ({
  ordersMonthlyStatus,
  loading,
}) => {
  const [reorderedSummaries, setReorderedSummaries] =
    React.useState<OrderStatusEntity[]>();

  useEffect(() => {
    let arr: any[] = [
      OrderStatus.CREATED,
      OrderStatus.DISPATCHED,
      OrderStatus.DELIVERED,
      OrderStatus.REJECTED,
    ];
    ordersMonthlyStatus?.forEach((val, ind) => {
      const indexFound = arr.findIndex(stval => stval === val.status);
      arr[indexFound] = val;
    });

    let con: OrderStatusEntity[] | undefined = arr;
    setReorderedSummaries(con);
  }, [ordersMonthlyStatus]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          // data={ordersMonthlyStatus?.filter(val => {
          //   return val.status !== OrderStatus.ACCEPTED;
          // })}
          data={reorderedSummaries}
          renderItem={({item, index}) => {
            return (
              <View key={index.toString()}>
                <OrderCard
                  status={Convert.toTitleCase(
                    item.status === OrderStatus.ACCEPTED
                      ? 'Not yet Dispatched'
                      : item.status,
                  )}
                  totalInvoice={item.order_count}
                  invoiceText={'Orders'}
                  rupees={
                    item.total_amount
                      ? Convert.convertToRupeesFormat(item.total_amount)
                      : AppLocalizedStrings.na
                  }
                  rewardPointText={'Approx. Amt.'}
                  buttonStyle={{
                    backgroundColor:
                      item.status === OrderStatus.CREATED
                        ? Colors.blue
                        : item.status === OrderStatus.DISPATCHED
                        ? Colors.primary
                        : item.status === OrderStatus.REJECTED
                        ? Colors.red
                        : item.status === OrderStatus.DELIVERED
                        ? '#88BF88'
                        : Colors.white,
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default OrdersStatusCardList;

const styles = StyleSheet.create({
  cardlistContainer: {
    marginTop: hp('2%'),
  },
  container: {
    alignItems: 'center', // ignore this - we'll come back to it
    justifyContent: 'center', // ignore this - we'll come back to it
    flexDirection: 'row',
    flex: 1,
    overflow: 'scroll',
  },
});
