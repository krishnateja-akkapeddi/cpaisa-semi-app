import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {wp} from '../../utility/responsive/ScreenResponsive';
import OrganisationList, {
  Organisation,
} from '../../components/app/offers/OrganisationList';
import OrganisationJson from '../../mock/Organisation.json';
import RootNavigation from '../../navigation/RootNavigation';

const ChooseOrganisationScreen = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const onProceedHandler = () => {
    RootNavigation.navigate('CompleteKYCScreen');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.list}>
        <OrganisationList
          isRounded={false}
          multiSelect={true}
          selectedIds={selectedIds}
          horizontal={false}
          numColumns={3}
          showAll={false}
          data={OrganisationJson as Organisation[]}
          onSelect={ids => setSelectedIds(ids)}
        />
      </View>
      <AdaptiveButton
        isDisable={selectedIds.length == 0}
        buttonStyle={styles.btn}
        title={AppLocalizedStrings.proceed}
        onPress={onProceedHandler}
      />
    </SafeAreaView>
  );
};

export default ChooseOrganisationScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: wp('5%'),
    justifyContent: 'space-between',
  },
  list: {
    flexGrow: 1,
  },
  btn: {},
});
