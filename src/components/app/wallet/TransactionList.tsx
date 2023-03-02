import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import TransactionCard from '../../../components/app/wallet/TransactionCard';
import WalletTransaction from '../../../mock/WalletTransiction.json';

interface TransactionListProps {}

const TransactionList: React.FC<TransactionListProps> = props => {
  const [tab, setTab] = useState(WalletTransaction);

  return (
    <View style={styles.details}>
      <FlatList
        data={tab}
        CellRendererComponent={({children}) => children}
        removeClippedSubviews={false}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparatorStyle} />
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TransactionCard
              name={item.name}
              couponCode={item.couponCode}
              date={item.date}
              transationId={item.transationId}
              price={item.price}
            />
          );
        }}
      />
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  details: {
    marginVertical: hp(2),
  },

  itemSeparatorStyle: {
    height: hp('1.8%'),
  },
});
