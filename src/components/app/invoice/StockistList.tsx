import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import OrganisationStockist from '../../../mock/OrganisationStockist.json';
import OrgStockistView from './StockistView';
import Spacer from '../../layout/Spacer';
import {hp} from '../../../utility/responsive/ScreenResponsive';

const OrgStockistList = () => {
  const [data] = useState(OrganisationStockist);
  return (
    <View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Spacer height={hp('3%')} />}
        renderItem={({item}) => (
          <OrgStockistView name={item.name} url={item.url} />
        )}
      />
    </View>
  );
};

export default OrgStockistList;
