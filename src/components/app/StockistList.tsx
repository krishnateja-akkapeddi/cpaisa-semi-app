import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import ImageView from '../image/ImageView';
import SVGIcon from '../../utility/svg/SVGIcon';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {useMemo} from 'react';

interface StockistProps {
  image: String;
  name: String;
  isVisible: Boolean;
  onPress: () => void;
}

const StockistList: React.FC<StockistProps> = props => {
  const iconStyle: ViewStyle = useMemo(() => {
    return {
      transform: [{rotate: props.isVisible == true ? '0deg' : '180deg'}],
    };
  }, [props.isVisible]);

  return (
    <View style={styles.mainView}>
      <View style={styles.listContainer}>
        <View style={styles.rowContainer}>
          <ImageView source={`${props.image}`} style={styles.imageStyle} />
          <Text style={styles.textStyle}>{props.name}</Text>
        </View>
        <TouchableOpacity style={styles.btnArrow} onPress={props.onPress}>
          <SVGIcon
            style={iconStyle}
            name="toparrow"
            size={hp('1.3%')}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
      {props.isVisible && (
        <View>
          <View style={styles.whiteLine} />
          <TouchableOpacity style={styles.commonStyle}>
            <ImageView
              source={`${props.image}`}
              style={styles.secondaryImageStyle}
            />
            <Text style={styles.companyText}>Biocon</Text>
          </TouchableOpacity>
          <View style={styles.whiteLine} />
          <TouchableOpacity style={styles.commonStyle}>
            <ImageView
              source={`${props.image}`}
              style={styles.secondaryImageStyle}
            />
            <Text style={styles.companyText}>Cipla</Text>
          </TouchableOpacity>
          <View style={styles.whiteLine} />
          <TouchableOpacity style={styles.commonStyle}>
            <ImageView
              source={`${props.image}`}
              style={styles.secondaryImageStyle}
            />
            <Text style={styles.companyText}>Pfizer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default StockistList;

const styles = StyleSheet.create({
  mainView: {
    borderColor: '#F3F3F3',
    borderWidth: 1,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    width: wp(14),
    aspectRatio: 1,
    borderRadius: wp(14) / 2,
  },
  secondaryImageStyle: {
    width: wp(10),
    marginRight: wp(7),
    aspectRatio: 1,
    borderRadius: wp(10) / 2,
  },
  textStyle: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline3'),
    color: Colors.black,
    paddingLeft: wp('5%'),
  },
  whiteLine: {
    borderTopWidth: 2,
    borderColor: 'white',
    marginVertical: hp('1%'),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  commonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('13%'),
    marginVertical: hp('1%'),
  },
  btnArrow: {
    padding: 10,
  },
  companyText: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
  },
});
