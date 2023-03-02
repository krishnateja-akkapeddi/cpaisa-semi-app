import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import ImageView from './image/ImageView';
import {hp, wp} from '../utility/responsive/ScreenResponsive';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import AdaptiveButton from './button/AdaptiveButton';
import {OfferEntity} from '../models/interfaces/OffersResponse';
import AppLoader from './indicator/AppLoader';

interface SubscribeCardProps {
  leftTitle: string;
  rightTitle?: string;
  leftBtnStyle?: ViewStyle;
  rightBtnStyle?: ViewStyle;
  leftBtnTextStyle?: TextStyle;
  rightBtnTextStyle?: TextStyle;
  rightIcon?: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  offer: OfferEntity | undefined;
}

const SubscribeCard = (props: SubscribeCardProps) => {
  const {
    leftTitle,
    rightTitle,
    leftBtnStyle,
    rightBtnStyle,
    leftBtnTextStyle,
    rightBtnTextStyle,
    onPressLeft,
    onPressRight,
    rightIcon,
    offer,
  } = props;

  const leftBtnViewStyle = useMemo(() => {
    return {...styles.leftBtnView, ...leftBtnStyle};
  }, [leftBtnStyle]);

  const rightBtnViewStyle = useMemo(() => {
    return {...styles.rightBtnView, ...rightBtnStyle};
  }, [rightBtnStyle]);

  const leftBtnText = useMemo(() => {
    return {...styles.leftBtnText, ...leftBtnTextStyle};
  }, [leftBtnTextStyle]);
  const rightBtnText = useMemo(() => {
    return {...styles.rightBtnText, ...rightBtnTextStyle};
  }, [rightBtnTextStyle]);

  return (
    <View style={styles.bottomContainer}>
      {offer ? (
        <ImageView style={styles.imageStyle} source={offer?.path} />
      ) : (
        <View style={{width: wp('90%'), height: hp('30%')}}>
          <AppLoader type="view" loading={true} />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.offerText}>
          {offer?.acp_in_district} channel partners are subscribed to this offer
          in your district
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {offer?.can_upload_invoice && (
          <AdaptiveButton
            title={leftTitle}
            buttonStyle={leftBtnViewStyle}
            textStyle={leftBtnText}
            onPress={onPressLeft}
          />
        )}

        <AdaptiveButton
          icon={rightIcon}
          title={offer ? offer?.acp_in_district?.toString() : 'Loading...'}
          buttonStyle={rightBtnViewStyle}
          textStyle={rightBtnText}
          onPress={onPressRight}
        />
      </View>
    </View>
  );
};

export default SubscribeCard;

const styles = StyleSheet.create({
  imageStyle: {
    height: 275,
    resizeMode: 'cover',
    width: '100%',
  },
  offerText: {
    fontSize: Fonts.getFontSize('headline6'),
    fontFamily: Fonts.bold,
    color: '#474747',
    textAlign: 'center',
  },
  textContainer: {
    backgroundColor: '#E5E5E5',
    paddingVertical: hp('1%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBtnView: {
    flex: 1,
    backgroundColor: '#F7DFC4',
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  rightBtnView: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  leftBtnText: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    textAlign: 'center',
    paddingVertical: hp('2%'),
  },
  rightBtnText: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.primary,
    textAlign: 'center',
    paddingVertical: hp('2%'),
  },
  bottomContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});
