import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import OrganisationList from '../offers/OrganisationList';
import SubscribeCard from '../../SubscribeCard';
import Spacer from '../../layout/Spacer';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import OrganisationJson from '../../../mock/Organisation.json';
import RootNavigation from '../../../navigation/RootNavigation';

const kOrganisations = [
  {name: AppLocalizedStrings.viewAll, url: ''},
  ...OrganisationJson,
];

const MySubscription = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([0]);
  const onPressMoreInfoHandler = () => {
    RootNavigation.navigate('OrganisationDetails');
  };

  const onPressUploadHandler = () => {
    RootNavigation.navigate('InvoiceUploadScreen');
  };

  return (
    <>
      <View style={styles.flatlistContainer}>
        <OrganisationList
          selectedIds={selectedIds}
          horizontal={true}
          showAll={true}
          data={kOrganisations}
          onSelect={ids => setSelectedIds(ids)}
        />
      </View>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <SubscribeCard
          leftTitle={AppLocalizedStrings.subscription.moreInfo}
          rightTitle={AppLocalizedStrings.subscription.upload}
          onPressLeft={onPressMoreInfoHandler}
          onPressRight={onPressUploadHandler}
        />
        <Spacer height={hp('3%')} />
        <SubscribeCard
          leftTitle={AppLocalizedStrings.subscription.moreInfo}
          rightTitle={AppLocalizedStrings.subscription.upload}
          onPressLeft={onPressMoreInfoHandler}
          onPressRight={onPressUploadHandler}
        />
        <Spacer height={hp('3%')} />
      </ScrollView>
    </>
  );
};

export default MySubscription;

const styles = StyleSheet.create({
  flatlistContainer: {
    marginTop: hp('0.5%'),
    marginBottom: hp('1.5%'),
  },
});
