import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';
import Style from '../../constants/Style';
import SVGIcon from '../../utility/svg/SVGIcon';
import Colors from '../../theme/Colors';
import {hp} from '../../utility/responsive/ScreenResponsive';
import Fonts from '../../theme/Fonts';
import {AppLocalizedStrings} from '../../localization/Localization';

interface UploadDocumentPorps {
  percentage?: number;
  isUploading: boolean;
  title: string;
  subTitle: string;
  onPress: () => void;
}

const UploadDocument: React.FC<UploadDocumentPorps> = props => {
  const container: ViewStyle = useMemo(() => {
    let style = styles.container;
    return {
      ...style,
      ...{
        borderStyle: props.isUploading ? 'solid' : 'dashed',
        borderColor: props.isUploading ? Colors.green : '#00000033',
      },
    };
  }, [props.isUploading]);

  const progressBar: ViewStyle = useMemo(() => {
    let style = styles.progressBar;
    return {
      ...style,
      ...{
        width: `${props.percentage ?? 0}%`,
      },
    };
  }, [props.percentage]);

  return (
    <Pressable onPress={props.onPress} style={container}>
      <View style={styles.subContainer}>
        <SVGIcon name="letter_box" color={Colors.darkBlack} />
        <Text style={styles.title}>{props.title}</Text>
        <Text
          style={
            props.isUploading ? styles.subTitlteUploading : styles.subTitlte
          }>
          {props.isUploading
            ? AppLocalizedStrings.auth.uploadingFile
            : props.subTitle}
        </Text>
      </View>
      {props.isUploading && <View style={progressBar} />}
    </Pressable>
  );
};

export default UploadDocument;

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    borderWidth: 1,
    borderRadius: Style.kBorderRadius / 2,
  },
  subContainer: {
    alignItems: 'center',
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('2%'),
  },
  title: {
    marginTop: hp('1.5%'),
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Medium',
      Colors.black,
    ),
  },
  subTitlte: {
    marginTop: hp('0.5%'),
    ...Style.getTextStyle(Fonts.getFontSize('headline5'), 'Regular', '#8D8D8D'),
  },
  subTitlteUploading: {
    marginTop: hp('0.5%'),
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.green,
    ),
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.green,
    borderRadius: 2,
  },
});
