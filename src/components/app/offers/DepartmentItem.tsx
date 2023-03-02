import React, {useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import SVGIcon from '../../../utility/svg/SVGIcon';
import ImageView from '../../image/ImageView';
import Style from '../../../constants/Style';

interface DepartmentItemProps {
  isRounded?: boolean;
  style?: ViewStyle | undefined;
  isViewAll: boolean;
  name: string;
  image: string;
  isActive: boolean;
  onPress: () => void;
}

const DepartmentItem: React.FC<DepartmentItemProps> = props => {
  const isRounded = props.isRounded ?? true;
  const isActive = props.isActive ?? false;
  const borderColor = isActive == true ? Colors.primary : '#EAEAF4';
  const borderRadius = isRounded == true ? 200 : Style.kBorderRadius;

  const inputContainer = useMemo(
    () => [
      styles.inputContainer,
      {
        borderColor: borderColor,
        borderRadius: borderRadius,
      },
    ],
    [borderColor, borderRadius],
  );

  const imageContainer = useMemo(
    () => [styles.imageContainer, {borderRadius: borderRadius}],
    [borderRadius],
  );

  return (
    <TouchableOpacity
      style={props.style ?? styles.container}
      onPress={props.onPress}>
      <View style={inputContainer}>
        <View style={imageContainer}>
          {props.isViewAll ? (
            <SVGIcon name="eye" size={hp('3%')} color={Colors.black} />
          ) : (
            <ImageView style={styles.logo} source={props.image} />
          )}
        </View>
      </View>
      <Text style={props.isViewAll ? styles.titleViewAll : styles.title}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default DepartmentItem;

const styles = StyleSheet.create({
  container: {
    width: hp('10%'),
  },
  inputContainer: {
    width: '100%',
    padding: 3,
    borderWidth: 2,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#000',
    textAlign: 'center',
    marginVertical: hp('1%'),
    fontSize: hp(1.7),
    fontFamily: Fonts.regular,
  },
  titleViewAll: {
    color: '#000',
    textAlign: 'center',
    marginVertical: hp(1),
    fontSize: hp(1.7),
    fontFamily: Fonts.bold,
  },
});
