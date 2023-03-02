import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import AdaptiveButton from '../../button/AdaptiveButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Style from '../../../constants/Style';
interface InvoiceFilterViewProps {
  onFilterHandler: () => void;
}
const InvoiceFilterView = (props: InvoiceFilterViewProps) => {
  return (
    <View style={styles.filterMainContainer}>
      <Text style={styles.invoiceListText}>
        {AppLocalizedStrings.invoice.invoiceList}
      </Text>
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
      </View>
    </View>
  );
};

export default InvoiceFilterView;

const styles = StyleSheet.create({
  filterMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  invoiceListText: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.getFontSize('headline4'),
    color: '#B2B2B2',
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
});
