import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useMemo, useState} from 'react';
import ImageView from '../../image/ImageView';
import AdaptiveButton from '../../button/AdaptiveButton';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import InvoiceUploadItem from '../../../models/interfaces/InvoiceUploadItem';
import ReviewStatus, {
  getReviewStatusInfo,
} from '../../../models/enum/ReviewStatus';
import RootNavigation from '../../../navigation/RootNavigation';
import GaImageEditor from '../../GaImageEditor';

interface InvoiceUploadListItemProps {
  width: number;
  item: InvoiceUploadItem;
  deleteImage: Function;
  setUploadedFileInfo: React.Dispatch<
    React.SetStateAction<InvoiceUploadItem | null | undefined>
  >;
}

const InvoiceUploadListItem = (props: InvoiceUploadListItemProps) => {
  const {width, item, setUploadedFileInfo} = props;
  const containerStyles = useMemo(
    () => [styles.container, {width: wp(58)}],
    [width],
  );

  const statusInfo = getReviewStatusInfo(item.status);

  const tagViewStyle: ViewStyle[] = useMemo(
    () => [styles.tagView, {backgroundColor: statusInfo.color}],
    [item.status],
  );

  const showDownload =
    item.status === ReviewStatus.Approved ||
    item.status === ReviewStatus.Pending;
  const showReload = item.status !== ReviewStatus.Approved;
  const showDelete = item.status === ReviewStatus.Rejected;

  return (
    <View style={containerStyles}>
      <Image
        source={{uri: item.url}}
        style={{
          width: wp(70),
          height: hp(50),
          resizeMode: 'contain',
        }}
      />

      <View style={styles.btnContainer}>
        {!showDownload && (
          <AdaptiveButton
            type="text"
            icon="download"
            buttonStyle={styles.btn}
          />
        )}
        {!showReload && (
          <AdaptiveButton type="text" icon="reload" buttonStyle={styles.btn} />
        )}
        {!showDelete && (
          <AdaptiveButton
            type="text"
            icon="delete"
            onPress={() => {
              props.deleteImage();
              RootNavigation.navigate('InvoiceUploadScreen');
            }}
            buttonStyle={styles.btn}
          />
        )}
      </View>
      <Text numberOfLines={1} style={styles.docName}>
        {item.docName}
      </Text>

      {/* <View style={tagViewStyle}>
        <Text style={styles.tagText}>{statusInfo.title}</Text>
      </View> */}
    </View>
  );
};

export default InvoiceUploadListItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 1,
    marginLeft: wp(15),
  },
  image: {
    resizeMode: 'contain',
    // width: wp('70%'),
    // height: wp('75%'),
    // resizeMode: 'contain',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: hp(0.8),
    marginBottom: hp(0.5),
  },
  btn: {
    height: 'auto',
    padding: wp(1.5),
    margin: 2,
  },
  docName: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline6'),
      'Regular',
      Colors.grey,
    ),
    marginBottom: hp(0.6),
  },
  fileName: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Medium',
      Colors.darkBlack,
    ),
    marginBottom: hp(1),
  },
  tagView: {
    paddingVertical: wp(0.5),
    paddingHorizontal: wp(4),
    borderRadius: 3,
    minWidth: '75%',
    alignItems: 'center',
  },
  tagText: {
    ...Style.getTextStyle(Fonts.getFontSize('headline6'), 'Bold', Colors.white),
  },
});
