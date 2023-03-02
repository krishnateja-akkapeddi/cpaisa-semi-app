import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import WalletTransaction from '../../../mock/WalletTransiction.json';
import CouponCard from '../../../components/app/wallet/CouponCard';

interface CouponCodeProps {}

const CouponCodeList: React.FC<CouponCodeProps> = props => {
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
            <CouponCard
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

export default CouponCodeList;

const styles = StyleSheet.create({
  details: {
    marginVertical: hp(2),
  },

  itemSeparatorStyle: {
    height: hp('1.8%'),
  },
});
