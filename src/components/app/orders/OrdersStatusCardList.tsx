import {View, StyleSheet, ListRenderItem} from 'react-native';
import React from 'react';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {
  OverallInvoiceStatus,
  MonthlyInvoiceStatusEntity,
} from '../../../models/interfaces/InvoiceSummaryResponse';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import OrderCard from './OrdersCard';
import {OrderSummaryResponse} from '../../../models/interfaces/OrderSummaryResponse';
import {OrderStatusEntity} from '../../../models/interfaces/OrderServiceResponse';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Convert} from '../../../utility/converter/Convert';
import {OrderStatus} from '../../../models/enum/OrderStatusEnum';
import Colors from '../../../theme/Colors';

type Props = {
  loading?: boolean;
  ordersMonthlyStatus: OrderStatusEntity[] | undefined;
};
const OrdersStatusCardList: React.FC<Props> = ({ordersMonthlyStatus}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          horizontal
          data={ordersMonthlyStatus
            ?.filter(val => {
              return val.status !== OrderStatus.ACCEPTED;
            })
            .sort((a, b) => {
              return a.order_count - b.order_count;
            })}
          renderItem={({item}) => {
            return (
              <OrderCard
                status={Convert.toTitleCase(item.status)}
                totalInvoice={item.order_count}
                invoiceText={'Orders'}
                rupees={Convert.convertToRupeesFormat(item.total_amount)}
                rewardPointText={'Approx Amount'}
                buttonStyle={{
                  backgroundColor:
                    item.status === OrderStatus.CREATED
                      ? Colors.blue
                      : item.status === OrderStatus.DISPATCHED
                      ? Colors.primary
                      : item.status === OrderStatus.REJECTED
                      ? Colors.red
                      : item.status === OrderStatus.DELIVERED
                      ? Colors.green
                      : Colors.black,
                }}
              />
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
    marginTop: hp('2%'),

    alignItems: 'center', // ignore this - we'll come back to it
    justifyContent: 'center', // ignore this - we'll come back to it
    flexDirection: 'row',
    flex: 1,
    overflow: 'scroll',
  },
});
