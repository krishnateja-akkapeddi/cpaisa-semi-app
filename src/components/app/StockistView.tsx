import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Spacer from '../layout/Spacer';
import OrganiastionList from './OrganiastionList';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/Store';

const StockistView = () => {
  const [ind, setInd] = useState();
  const {
    app: {openQrCode, isQrCodeExpired, qrExpiry, qrCodeData},
  } = useSelector<RootState, RootState>(state => state);
  console.log('STOCK_VIEW', qrExpiry);

  return (
    <View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Spacer height={hp('3%')} />}
        renderItem={({item, index}) => (
          <OrganiastionList
            uri={item.url}
            name={item.name}
            text={item.text}
            data={item.data}
            onPress={() => setInd(index)}
            isShow={index == ind}
          />
        )}
      />
    </View>
  );
};

export default StockistView;

const styles = StyleSheet.create({});
