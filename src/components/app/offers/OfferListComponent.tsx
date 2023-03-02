import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import Icon from 'react-native-vector-icons/AntDesign';
import Spacer from '../../layout/Spacer';
import {
  Offers,
  OffersListEntity,
} from '../../../models/interfaces/OffersListResponse';

interface offerItemProps {
  item: OffersListEntity;
}

const OfferListComponent: React.FC<offerItemProps> = props => {
  const [isVisible, setisVisible] = useState(true);
  const {item} = props;
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.minOrderContainer}>
          {item.min_qty !== 0 && (
            <View style={styles.minOrangeView}>
              <Text style={styles.minOrderText}>
                Min Order: {item.min_qty} Units
              </Text>
            </View>
          )}
        </View>
        <View style={styles.secondContainer}>
          <Icon name="medicinebox" size={35} color="#000" />
          <View style={styles.medicineTextContainer}>
            <Text style={styles.medicineText}>{item.name}</Text>
            {/* <Text style={styles.pointText}>{item.pointText}</Text> */}
          </View>
          <View>
            <Text style={styles.percentageText}>{item.value}</Text>
          </View>
          {/* {item.downArrow && (
            <TouchableOpacity
              style={styles.percentageTextContainer}
              onPress={() => console.log('pressed')}>
              <Icon name="down" size={11} color="#000" />
            </TouchableOpacity>
          )} */}
        </View>
      </View>
      {/* {isVisible && item.downArrow && (
        <View style={styles.popUpStyle}>
          <Text style={styles.popUpText}>Order Now</Text>
          <Spacer height={5} />
          <Text style={styles.popUpText}>View Nearest Company Stockists</Text>
        </View>
      )} */}
    </>
  );
};

export default OfferListComponent;

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    position: 'relative',
  },
  minOrderContainer: {
    flexDirection: 'row',
  },
  minOrangeView: {
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.2%'),
  },
  minOrderText: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline6'),
    color: Colors.white,
  },
  secondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
  },
  medicineTextContainer: {
    flex: 1,
    paddingLeft: hp('1.5%'),
  },
  medicineText: {
    fontFamily: Fonts.bold,
    marginVertical: 2,
    color: Colors.black,
  },
  pointText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
  },
  percentageTextContainer: {
    paddingLeft: wp('2.4%'),
  },
  percentageText: {
    color: Colors.black,
  },
  popUpStyle: {
    backgroundColor: Colors.white,
    position: 'absolute',
    zIndex: 1,
    top: 52,
    right: 10,
    padding: hp('1.5%'),
    borderColor: '#E5E5E5',
    borderRadius: 10,
    borderWidth: 1,
  },
  popUpText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
  },
});
