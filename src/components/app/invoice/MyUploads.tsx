import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {createRef, useState} from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import InvoiceUploadListItemProps from './InvoiceUploadListItem';
import InvoiceUploadJson from '../../../mock/InvoiceUpload.json';
import InvoiceUploadItem from '../../../models/interfaces/InvoiceUploadItem';
import moment from 'moment';

export type Props = {
  uploadedInvoice: InvoiceUploadItem;
  deleteImage: Function;
};

const MyUploads: React.FC<Props> = ({uploadedInvoice, deleteImage}) => {
  const items = InvoiceUploadJson;
  const [width, setWidth] = useState(0);
  const fe: any = createRef();

  const renderItem = ({item}: ListRenderItemInfo<InvoiceUploadItem>) => {
    return (
      <InvoiceUploadListItemProps
        deleteImage={deleteImage}
        item={item}
        // width={width / 3}
        width={200}
      />
    );
  };

  return (
    <View style={styles.main}>
      <Text style={styles.myUploads}>
        {AppLocalizedStrings.invoice.myUploads}
      </Text>

      <View style={styles.container}>
        <View style={styles.upperView}>
          <View style={styles.row}>
            <Text style={styles.uploadedOn}>
              {AppLocalizedStrings.invoice.uploadOn}
            </Text>
            <Text style={styles.date}>{moment().format('MMM DD YYYY')}</Text>
          </View>
          {/* <AdaptiveButton
            type="light"
            title={'＋' + AppLocalizedStrings.invoice.addPages}
            buttonStyle={styles.btnAddPages}
            textStyle={styles.btnAddPagesTxt}
          /> */}
        </View>

        <FlatList
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
          onLayout={e => setWidth(e.nativeEvent.layout.width)}
          horizontal
          data={[uploadedInvoice]}
          // data={items}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default MyUploads;

const styles = StyleSheet.create({
  main: {
    marginVertical: hp(4),
  },
  container: {
    borderRadius: Style.kBorderRadius,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: wp(4),
    paddingVertical: wp(3),
    marginVertical: hp(2),
  },
  myUploads: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline1'),
      'Bold',
      Colors.darkBlack,
    ),
  },
  upperView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(3),
  },
  uploadedOn: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.grey,
    ),
    marginEnd: 6,
  },
  date: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Bold',
      Colors.darkBlack,
    ),
  },
  row: {
    flexDirection: 'row',
  },
  btnAddPages: {
    height: hp(3.2),
    borderRadius: hp(4) / 2,
    paddingHorizontal: wp(3),
  },
  btnAddPagesTxt: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Bold',
      Colors.primary,
    ),
  },
});
