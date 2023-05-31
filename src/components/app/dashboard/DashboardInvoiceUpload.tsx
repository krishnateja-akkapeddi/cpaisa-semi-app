import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import AdaptiveButton from '../../button/AdaptiveButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Spacer from '../../layout/Spacer';
import Colors from '../../../theme/Colors';
import RootNavigation from '../../../navigation/RootNavigation';

type Props = {};

const DashboardInvoiceUpload = (props: Props) => {
  return (
    <View style={styles.uploadInvoiceContianer}>
      <View style={{width: wp('50%')}}>
        <Text style={{color: Colors.black}}>
          Upload your current month invoice to earn the points
        </Text>
      </View>
      <View>
        <AdaptiveButton
          onPress={() => {
            RootNavigation.navigate('InvoiceUploadScreen');
          }}
          buttonStyle={{
            width: wp('31%'),

            marginHorizontal: 1,
          }}
          textStyle={{fontSize: wp(3)}}
          title={'Upload Invoice'}
        />
      </View>
    </View>
  );
};

export default DashboardInvoiceUpload;

const styles = StyleSheet.create({
  uploadInvoiceContianer: {
    borderRadius: wp(3),
    padding: wp(4),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8A92E1A',
    justifyContent: 'space-between',
  },
});
