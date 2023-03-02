import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import SearchBar from '../SearchBar';
import OrganisationList from './OrganisationList';
import Spacer from '../../layout/Spacer';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import OrganisationJson from '../../../mock/Organisation.json';
import {ClientEntity} from '../../../models/interfaces/ClientsListResponse';

const kOrganisations = [
  {name: AppLocalizedStrings.viewAll, url: ''},
  ...OrganisationJson,
];

type Props = {
  organizations: ClientEntity[];
  onSelect?: ((arg0: number[]) => void) | undefined;
};

const OfferHeaderComponent: React.FC<Props> = ({organizations, onSelect}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([0]);
  return (
    <>
      <View style={styles.topContainer}>
        <OrganisationList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          selectedIds={selectedIds}
          horizontal={true}
          showAll={true}
          data={organizations}
          onSelect={onSelect}
        />
      </View>
      <Spacer height={hp('3%')} />
    </>
  );
};

export default OfferHeaderComponent;

const styles = StyleSheet.create({
  topContainer: {
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    shadowOffset: {width: 0, height: 1},
  },
  searchbarContainer: {
    marginTop: hp(2),
    marginHorizontal: hp(2),
  },
  flatList: {
    marginTop: hp(3),
    marginBottom: hp(1.5),
  },
  flatListContent: {
    paddingHorizontal: hp(2),
  },
  searchBarView: {
    marginBottom: hp(2.5),
    paddingHorizontal: hp(2),
  },
});
