import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';
import DashboardSectionHeader from './DashboardSectionHeader';
import SuggestionItem from './SuggestionItem';
import Colors from '../../../theme/Colors';

interface SuggestionItemProps {
  items: string[];
}
const SuggestionList = (props: SuggestionItemProps) => {
  const {items} = props;
  return (
    <View>
      <Spacer height={hp('2.5')} />
      <DashboardSectionHeader
        headerTitle={AppLocalizedStrings.dashboard.suggestions}
        iconName={'toparrow'}
        iconColor={Colors.black}
      />
      {items.map((item, index) => (
        <SuggestionItem key={index} title={item} />
      ))}
      <Spacer height={hp('2.5')} />
    </View>
  );
};

export default SuggestionList;

const styles = StyleSheet.create({});
