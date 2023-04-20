import {View, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {hp} from '../../utility/responsive/ScreenResponsive';
import Spacer from '../layout/Spacer';
import OrganiastionList from './OrganiastionList';
import OrganisationData from '../../mock/OrganisationData.json';

const BrandsView = () => {
  const [data] = useState(OrganisationData);
  const [ind, setInd] = useState(-1);
  return (
    <View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Spacer height={hp('3%')} />}
        renderItem={({item, index}) => (
          <OrganiastionList
            uri={item.url}
            name={item.name}
            text={item.text}
            data={item.data}
            onPress={() => setInd(index == ind ? -1 : index)}
            isShow={index == ind}
          />
        )}
      />
    </View>
  );
};

export default BrandsView;

const styles = StyleSheet.create({});
