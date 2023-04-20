import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AdaptiveButton from '../../button/AdaptiveButton';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Spacer from '../../layout/Spacer';
import AppLoader from '../../indicator/AppLoader';
import Colors from '../../../theme/Colors';

interface FilterActionViewProps {
  onApply: () => void;
  onClear: () => void;
  applyLoading: boolean;
  resetFilterLoading: boolean;
  onApplyDisabled: boolean;
  resetDisabled?: boolean;
}
const FilterActionView: React.FC<FilterActionViewProps> = props => {
  return (
    <View style={styles.btnContainer}>
      <AdaptiveButton
        isDisable={props.resetDisabled}
        buttonStyle={styles.btnApplyFilter}
        type="light"
        title={
          !props.resetFilterLoading ? (
            AppLocalizedStrings.filter.clearAllFilter
          ) : (
            <AppLoader
              type="view"
              loading={
                props.resetFilterLoading ? props.resetFilterLoading : false
              }
            />
          )
        }
        onPress={props.onClear}
      />
      <Spacer width={wp(3)} />
      <AdaptiveButton
        isDisable={props.onApplyDisabled}
        buttonStyle={styles.btnApplyFilter}
        title={
          !props.applyLoading ? (
            AppLocalizedStrings.filter.applyFilters
          ) : (
            <AppLoader
              color={Colors.white}
              type="view"
              loading={props.applyLoading ? props.applyLoading : false}
            />
          )
        }
        onPress={props.onApply}
      />
    </View>
  );
};

export default FilterActionView;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
  },
  btnApplyFilter: {
    flex: 1,
    paddingHorizontal: 0,
    height: hp('5%'),
  },
});
