import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {Convert} from '../../../utility/converter/Convert';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DepartmentItem from '../../app/offers/DepartmentItem';
import Spacer from '../../layout/Spacer';
import {ClientEntity} from '../../../models/interfaces/ClientsListResponse';
import RootNavigation from '../../../navigation/RootNavigation';

type Props = {organizations: ClientEntity[]};

const DashboardOrganisations: React.FC<Props> = ({organizations}) => {
  const renderItem = useCallback(
    ({index, item}: ListRenderItemInfo<ClientEntity>) => {
      return (
        <View
          key={index.toString()}
          style={{
            marginLeft: index % 3 !== 0 ? wp('12%') : 0,
          }}>
          <DepartmentItem
            isRounded={false}
            image={item.logo_link}
            isViewAll={false}
            name={Convert.capitalize(item.short_code)}
            isActive={false}
            onPress={function () {
              RootNavigation.navigate('BrandsScreen', {
                organisation: item,
                isLogin: true,
              });
            }}
          />
        </View>
      );
    },
    [],
  );
  return (
    <FlatList
      ItemSeparatorComponent={() => <Spacer height={hp(2)} />}
      columnWrapperStyle={{
        justifyContent: 'flex-start',
      }}
      data={organizations}
      numColumns={3}
      renderItem={renderItem}
    />
  );
};

export default DashboardOrganisations;

const styles = StyleSheet.create({});
