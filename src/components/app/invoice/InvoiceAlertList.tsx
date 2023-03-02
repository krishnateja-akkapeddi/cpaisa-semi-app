import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVGIcon from '../../../utility/svg/SVGIcon';
import Spacer from '../../layout/Spacer';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import AlertData from '../../../mock/AlertData.json';

const InvoiceAlertList = () => {
  const [data, setdata] = useState(AlertData);
  return (
    <View>
      <Spacer height={hp('2%')} />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparatorStyle} />
        )}
        renderItem={({item}) => (
          <View style={styles.renderView}>
            <SVGIcon name="alert" size={19} />
            <Spacer width={wp('2%')} />
            <Text style={styles.textStyle}>{item.text}</Text>
          </View>
        )}
      />
      <Spacer height={hp('2%')} />
    </View>
  );
};

export default InvoiceAlertList;

const styles = StyleSheet.create({
  itemSeparatorStyle: {
    borderTopWidth: 1,
    borderColor: '#D9D9D9',
    marginVertical: hp('1.5%'),
  },
  renderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: Fonts.getFontSize('headline6'),
    color: Colors.black,
    fontFamily: Fonts.getFontFamily('Regular'),
  },
});
