import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import {RewardTransactionEntity} from '../../../models/interfaces/RewardRequestResponse';

type Props = {
  item: RewardTransactionEntity;
};

const TaxtInfo = ({item}: Props) => {
  return (
    <View
      style={{
        width: wp(50),
        backgroundColor: Colors.lightGrey,
        borderRadius: 10,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(4),
      }}>
      <View
        style={{
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: 30,
          borderRightWidth: 30,
          borderBottomWidth: 30,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: Colors.lightGrey,
          position: 'absolute',
          right: wp(2),
          bottom: hp(11.5),
        }}>
        <Text style={styles.taxTitle}>hi</Text>
      </View>
      <View style={{...styles.taxInfoContainer, marginTop: 0}}>
        <View>
          <Text style={styles.taxTitle}>Tax Percent:</Text>
        </View>
        <View>
          <Text style={{fontWeight: 'bold'}}>{item.tax_percentage}%</Text>
        </View>
      </View>
      <View style={styles.taxInfoContainer}>
        <View>
          <Text style={styles.taxTitle}>Tax Amount:</Text>
        </View>
        <View>
          <Text style={{fontWeight: 'bold'}}>{item.tax_amount}</Text>
        </View>
      </View>
      <View style={styles.taxInfoContainer}>
        <View>
          <Text style={styles.taxTitle}>Raised Points:</Text>
        </View>
        <View>
          <Text style={{fontWeight: 'bold'}}>{item.points}</Text>
        </View>
      </View>
      <View style={styles.taxInfoContainer}>
        <View>
          <Text style={styles.taxTitle}>Net Amount:</Text>
        </View>
        <View>
          <Text style={{fontWeight: 'bold'}}>{item.net_amount}</Text>
        </View>
      </View>
    </View>
  );
};

export default TaxtInfo;

const styles = StyleSheet.create({
  taxInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  taxTitle: {
    textAlign: 'right',
  },
});
