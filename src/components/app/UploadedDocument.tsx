import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import Style from '../../constants/Style';
import ImageView from '../image/ImageView';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import Spacer from '../layout/Spacer';
import AdaptiveButton from '../button/AdaptiveButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import moment from 'moment';

interface UploadedDocumentProps {}

const UploadedDocument: React.FC<UploadedDocumentProps> = props => {
  const downloadHandler = () => {};
  const reloadHandler = () => {};
  const deleteHandler = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.imageContainer}>
            <ImageView
              source="https://picsum.photos/seed/picsum/200/300"
              style={styles.image}
            />
          </View>
          <View style={styles.nameView}>
            <Text style={styles.title}>Banner</Text>
            <Spacer height={hp('0.5%')} />
            <Text style={styles.imageName}>File Name.jpg</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.uploadOn}>
            {AppLocalizedStrings.auth.uploadedOn}
          </Text>
          <Spacer height={hp('0.6%')} />
          <Text style={styles.date}>
            {moment(new Date()).format(Style.DDMMMYYYY)}
          </Text>
          <Spacer height={hp('0.8%')} />
          <View style={styles.btnContainer}>
            <AdaptiveButton
              iconSize={wp('4.5%')}
              buttonStyle={styles.btn}
              type="text"
              icon="download"
              onPress={downloadHandler}
            />
            <Spacer width={hp('1.5%')} />
            <AdaptiveButton
              iconSize={wp('4.5%')}
              buttonStyle={styles.btn}
              type="text"
              icon="reload"
              onPress={reloadHandler}
            />
            <Spacer width={hp('1.5%')} />
            <AdaptiveButton
              iconSize={wp('4.5%')}
              buttonStyle={styles.btn}
              type="text"
              icon="delete"
              onPress={deleteHandler}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UploadedDocument;

const styles = StyleSheet.create({
  container: {
    borderRadius: Style.kBorderRadius,
    borderWidth: 1,
    borderColor: '#D9D9D950',
  },
  subContainer: {
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: Colors.white,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 3,
    elevation: 5,
    shadowOpacity: 0.4,
  },
  image: {
    // width: wp('15%'),
    // aspectRatio: 39 / 50,
    height: wp('15%') * (50 / 39),
    width: wp('15%'),
  },
  nameView: {
    marginLeft: hp('2.5%'),
  },
  title: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.grey,
    ),
  },
  imageName: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Bold',
      Colors.darkBlack,
    ),
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  uploadOn: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.grey,
    ),
  },
  date: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Bold',
      Colors.darkBlack,
    ),
  },
  btnContainer: {
    flexDirection: 'row',
  },
  btn: {
    height: 'auto',
  },
});
