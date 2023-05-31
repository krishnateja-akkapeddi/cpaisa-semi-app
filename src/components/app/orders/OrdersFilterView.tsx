import {View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import AdaptiveButton from '../../button/AdaptiveButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Style from '../../../constants/Style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spacer from '../../layout/Spacer';
import {PlatformType} from '../../../utility/permissions/PermissionsList';
interface OrdersFilterViewProps {
  onFilterHandler: () => void;
  filterChecked?: boolean;
  filterCount: number;
}
const OrdersFilterView = (props: OrdersFilterViewProps) => {
  return (
    <View style={styles.filterMainContainer}>
      <Text style={styles.invoiceListText}>Orders List</Text>
      <View style={styles.filterContainer}>
        <AdaptiveButton
          type="text"
          isReverse
          title={AppLocalizedStrings.filter.filter}
          icon="filter"
          iconSize={hp('2.3')}
          iconColor={Colors.primary}
          buttonStyle={styles.btnFilter}
          textStyle={styles.btnFilterText}
          onPress={props.onFilterHandler}
        />
        {props.filterCount !== 0 && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>{props.filterCount} </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default OrdersFilterView;

const styles = StyleSheet.create({
  filterMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
    paddingRight: wp('3%'),
  },
  invoiceListText: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline4'),
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnFilter: {paddingHorizontal: 0, height: 'auto'},
  btnFilterText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Medium',
      Colors.black,
    ),
    paddingEnd: wp(4),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp('40%'),
  },
  filterBadge: {
    position: 'absolute',
    top: wp('-1%'),
    right: wp('-2%'),
    backgroundColor: Colors.red,
    borderRadius: wp('100%'),
    minWidth: 20,
    height: 20,
    textAlign: 'center',
    zIndex: 1,
    paddingTop: 1,
    paddingLeft: Platform.OS === PlatformType.ANDROID ? wp(1) : wp(0),
    paddingBottom: wp(1),
  },
  filterBadgeText: {
    color: Colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
});
