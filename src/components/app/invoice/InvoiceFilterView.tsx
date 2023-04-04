import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import AdaptiveButton from '../../button/AdaptiveButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Style from '../../../constants/Style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spacer from '../../layout/Spacer';
interface InvoiceFilterViewProps {
  onFilterHandler: () => void;
  filterChecked?: boolean;
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
          title={
            <View style={styles.container}>
              <View>
                <Text style={{fontSize: hp('1.5'), color: Colors.black}}>
                  Filter
                </Text>
              </View>
              <Spacer width={wp('2')} />
              <View>
                {!props.filterChecked ? (
                  <Icon
                    size={hp('2.5')}
                    color={Colors.primary}
                    name="filter-check"
                  />
                ) : (
                  <Icon
                    size={hp('2.5')}
                    color={Colors.primary}
                    name="filter-outline"
                  />
                )}
              </View>
            </View>
          }
          // icon="filter"
          // iconSize={hp('2.3')}
          // iconColor={Colors.primary}
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp('40%'),
  },
});
