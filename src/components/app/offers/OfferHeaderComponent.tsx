import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import OrganisationList from './OrganisationList';
import Spacer from '../../layout/Spacer';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import OrganisationJson from '../../../mock/Organisation.json';
import {ClientEntity} from '../../../models/interfaces/ClientsListResponse';
import {OrganisationSkeletonItem} from '../../SkeletonCards';

type Props = {
  organizations: ClientEntity[];
  onSelect?: ((arg0: number[]) => void) | undefined;
  loading: boolean;
};

const OfferHeaderComponent: React.FC<Props> = ({
  organizations,
  onSelect,
  loading,
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([0]);
  return (
    <>
      <View style={styles.topContainer}>
        {loading ? (
          <View style={styles.flatList}>
            <Spacer height={hp('1%')} />
            <View style={{paddingLeft: wp('5%')}}>
              <OrganisationSkeletonItem />
            </View>
            <Spacer height={hp('3%')} />
          </View>
        ) : (
          <OrganisationList
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
            selectedIds={selectedIds}
            horizontal={true}
            showAll={true}
            data={organizations}
            onSelect={onSelect}
          />
        )}
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
    marginTop: hp(0),
    marginHorizontal: hp(2),
  },
  flatList: {
    marginTop: hp(0),
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
