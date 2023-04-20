import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  Platform,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';
import {hp, wp} from '../utility/responsive/ScreenResponsive';
import Spacer from './layout/Spacer';

interface InvoiceProps {}

export const InvoiceSkeletonItem: React.FC<InvoiceProps> = props => {
  return (
    <View
      style={{
        ...styles.mainContainer,
      }}>
      <View style={styles.minOrderContainer}>
        <View
          style={{
            ...styles.minOrangeView,
          }}></View>
      </View>
      <View style={styles.listMainContainer}>
        <View style={styles.rowContainer}>
          <Animated.View style={styles.imageContainer}>
            <SkeletonPlaceholder speed={900} borderRadius={4}>
              <SkeletonPlaceholder.Item width={wp('20%')} height={hp('11%')} />
            </SkeletonPlaceholder>
          </Animated.View>
          <View style={styles.leftContainer}>
            <Spacer style={{height: hp('0.5%')}} />
            <View style={styles.middleContainer}>
              <View style={styles.commonView}>
                <View style={{paddingBottom: hp('1%')}}>
                  <SkeletonPlaceholder speed={900} borderRadius={4}>
                    <SkeletonPlaceholder.Item
                      width={wp('30%')}
                      height={hp('2%')}
                    />
                  </SkeletonPlaceholder>
                </View>
                <View style={styles.commonStyle}>
                  <SkeletonPlaceholder speed={900} borderRadius={4}>
                    <SkeletonPlaceholder.Item
                      width={wp('20%')}
                      height={hp('2%')}
                    />
                  </SkeletonPlaceholder>
                </View>
              </View>
              <Spacer style={{width: wp('2%')}} />

              <View style={styles.leftSection}>
                <View style={styles.commonStyle}></View>
                <Spacer style={{width: hp('5%')}} />

                <View style={styles.titleStyle}>
                  <View style={styles.commonStyle}>
                    <SkeletonPlaceholder speed={900} borderRadius={4}>
                      <SkeletonPlaceholder.Item
                        width={wp('20%')}
                        height={hp('2%')}
                      />
                    </SkeletonPlaceholder>
                  </View>
                </View>
                <Text style={styles.commonStyle}></Text>
              </View>
            </View>
            <Spacer style={{height: hp('2%')}} />
            <View style={styles.middleContainer}>
              <View style={styles.commonView}>
                <View style={{paddingBottom: hp('1%')}}>
                  <SkeletonPlaceholder speed={900} borderRadius={4}>
                    <SkeletonPlaceholder.Item
                      width={wp('30%')}
                      height={hp('2%')}
                    />
                  </SkeletonPlaceholder>
                </View>
                <View style={styles.commonStyle}>
                  <SkeletonPlaceholder speed={900} borderRadius={4}>
                    <SkeletonPlaceholder.Item
                      width={wp('20%')}
                      height={hp('2%')}
                    />
                  </SkeletonPlaceholder>
                </View>
              </View>
              <Spacer style={{width: wp('2%')}} />
              <View style={styles.leftSection}>
                <View style={styles.commonStyle}>
                  <SkeletonPlaceholder speed={900} borderRadius={4}>
                    <SkeletonPlaceholder.Item
                      width={wp('20%')}
                      height={hp('2%')}
                    />
                  </SkeletonPlaceholder>
                </View>
              </View>
            </View>
            <View style={styles.middleContainer}></View>
          </View>
        </View>
        {/* <View style={styles.summeryContainer}>
            <SVGIcon name="info" size={hp('2%')} color="red" />
            <Text style={styles.summeryText}>{item.}</Text>
          </View> */}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.informationContainer}>
          <View style={styles.commonStyle}>
            <SkeletonPlaceholder speed={900} borderRadius={4}>
              <SkeletonPlaceholder.Item width={wp('40%')} height={hp('5%')} />
            </SkeletonPlaceholder>
          </View>
        </View>

        <View style={styles.supportContainer}>
          <View style={styles.commonStyle}>
            <SkeletonPlaceholder speed={900} borderRadius={4}>
              <SkeletonPlaceholder.Item width={wp('40%')} height={hp('5%')} />
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>
      {/* <TouchableOpacity onPress={() => {}} style={styles.starMark}>
        <SVGIcon name="mark" size={hp('3%')} />
      </TouchableOpacity> */}
    </View>
  );
};
export const DivisionPickerSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        borderRadius={10}
        width={wp('90%')}
        height={hp('5%')}
      />
    </SkeletonPlaceholder>
  );
};

export const PriceChipSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        borderRadius={10}
        width={wp('45%')}
        height={55}
      />
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
    position: 'relative',
  },
  listMainContainer: {
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 11,
  },
  imageStyle: {
    width: 90,
    height: 120,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleStyle: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline6'),
    color: '#7F7F7F',
    marginVertical: hp('0.5'),
  },
  commonStyle: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: '#474747',
    backgroundColor: 'white',
  },
  commonView: {
    flex: 1,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  summeryText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    marginLeft: wp('2%'),
    flex: 1,
  },
  minOrangeView: {
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.2%'),
  },
  minOrderText: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.white,
  },
  minOrderContainer: {
    flexDirection: 'row',
  },
  statusView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline6'),
    color: Colors.white,
    backgroundColor: '#FF5577',
    paddingHorizontal: hp('1.5%'),
  },
  statusTextSecond: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.white,
    backgroundColor: '#F89E1B',
    paddingHorizontal: hp('1.5%'),
  },
  hexCodeText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    marginBottom: hp('0.6%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  informationContainer: {
    flex: 1,
    backgroundColor: '#F7DFC4',
    borderBottomLeftRadius: 10,
    marginLeft: 20,
  },
  supportContainer: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    borderBottomRightRadius: 10,
  },
  informationTextStyle: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    textAlign: 'center',
    paddingVertical: hp('1%'),
  },
  supportTextStyle: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.primary,
    textAlign: 'center',
    paddingVertical: hp('1%'),
  },
  summeryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  leftContainer: {
    flex: 1,
    marginLeft: wp('3%'),
    justifyContent: 'center',
  },
  starMark: {
    position: 'absolute',
    zIndex: 10,
    top: -1,
    right: 15,
  },
});

export const OfferSkeletonItem = () => {
  return (
    <>
      <Animated.View style={offerStyles.itemContainer}>
        <View
          style={{
            ...offerStyles.mainContainer,
            paddingTop: hp('2%'),
            paddingBottom: hp('1%'),
          }}>
          <View style={offerStyles.secondContainer}>
            <SkeletonPlaceholder speed={500} borderRadius={4}>
              <SkeletonPlaceholder.Item width={wp('10%')} height={hp('4%')} />
            </SkeletonPlaceholder>
            <View style={offerStyles.medicineTextContainer}>
              <View style={offerStyles.medicineText}>
                <SkeletonPlaceholder speed={500} borderRadius={4}>
                  <SkeletonPlaceholder.Item
                    width={wp('60%')}
                    height={hp('6%')}
                  />
                </SkeletonPlaceholder>
              </View>
            </View>
            <View>
              <View>
                <SkeletonPlaceholder speed={900} borderRadius={4}>
                  <SkeletonPlaceholder.Item
                    width={wp('10%')}
                    height={hp('3%')}
                  />
                </SkeletonPlaceholder>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </>
  );
};
const offerStyles = StyleSheet.create({
  mainContainer: {
    zIndex: 1,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    position: 'relative',
  },
  itemContainer: {marginHorizontal: hp(2)},

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
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0%'),
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

export const OrganisationSkeletonItem = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{marginTop: 2}}
      horizontal>
      {[1, 2, 3, 4, 4].map(val => {
        return (
          <View style={val !== 1 && {paddingLeft: wp('5%')}}>
            <SkeletonPlaceholder
              key={val.toString()}
              angle={20}
              borderRadius={10}>
              <SkeletonPlaceholder.Item
                borderRadius={50}
                width={Platform.OS === 'ios' ? 90 : 65}
                height={hp(9)}
              />
            </SkeletonPlaceholder>
          </View>
        );
      })}
    </ScrollView>
  );
};

export const OrderSkeletonCard = () => {
  return (
    <View>
      {[1, 2, 3].map(val => {
        return (
          <View>
            {val !== 1 && <Spacer height={hp('2%')} />}

            <View
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: Colors.lightGrey,
              }}
              key={val.toString()}>
              <SkeletonPlaceholder borderRadius={20}>
                <SkeletonPlaceholder.Item
                  width={wp('91%')}
                  height={hp('10%')}
                />
              </SkeletonPlaceholder>
            </View>
          </View>
        );
      })}
    </View>
  );
};
