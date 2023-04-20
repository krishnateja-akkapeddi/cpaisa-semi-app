import {View, StyleSheet, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../theme/Colors';
import {hp} from '../../utility/responsive/ScreenResponsive';
import Spacer from '../../components/layout/Spacer';
import {FlatList} from 'react-native-gesture-handler';
import InvoiceDetailView from '../../components/app/invoice/InvoiceDetailView';
import InvoiceDetailHeader from '../../components/app/invoice/InvoiceDetailHeader';
import InvoiceDetailFooter from '../../components/app/invoice/InvoiceDetailFooter';
import {HomeStackScreenProps} from '../../navigation/stack/HomeStackNavigator';
import {InvoiceDetail} from '../../models/interfaces/InvoiceDetailResponse';
import {store} from '../../store/Store';
import {fetchInvoiceDetail} from '../../store/thunks/ApiThunks';

const InvoiceDetailScreen: React.FC<
  HomeStackScreenProps<'InvoiceDetailScreen'>
> = props => {
  const invoiceItem = props?.route?.params?.invoiceItem;
  const [loading, setLoading] = React.useState(false);
  const [invoiceDetail, setInvoiceDetail] = useState({} as InvoiceDetail);

  const getInvoiceDetails = async () => {
    setLoading(true);
    const data = await store
      .dispatch(fetchInvoiceDetail(invoiceItem.id.toString()))
      .unwrap();
    setInvoiceDetail(data.invoice_details);
    setLoading(false);
  };

  const listHeaderView = () => {
    return <InvoiceDetailHeader loading={loading} invoice={invoiceDetail} />;
  };

  const footerComponent = () => {
    return <InvoiceDetailFooter loading={loading} invoice={invoiceDetail} />;
  };

  useEffect(() => {
    getInvoiceDetails();
  }, []);

  useEffect(() => {}, [invoiceDetail]);
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.mainContainer}>
        <FlatList
          data={invoiceDetail.invoice_items}
          ItemSeparatorComponent={() => <Spacer height={hp('1%')} />}
          ListHeaderComponent={listHeaderView}
          ListFooterComponent={footerComponent}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <InvoiceDetailView item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default InvoiceDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    marginHorizontal: hp('2%'),
    marginTop: hp('1.5%'),
  },
});
