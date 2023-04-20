import {View} from 'react-native';
import React from 'react';
import PriortyNotificationItem from './PriortyNotificationItem';
import DashboardSectionHeader from './DashboardSectionHeader';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';

interface PriorityNotificationListProps {
  items: string[];
}
const PriorityNotificationList = (props: PriorityNotificationListProps) => {
  const {items} = props;
  return (
    <View>
      <Spacer height={hp('3')} />
      <DashboardSectionHeader
        headerTitle={AppLocalizedStrings.dashboard.prioritynoti}
        title={AppLocalizedStrings.dashboard.viewall}
        iconName={'rightarrow'}
      />
      {items?.map((item, index) => (
        <PriortyNotificationItem key={index} title={item} />
      ))}
    </View>
  );
};
export default PriorityNotificationList;
