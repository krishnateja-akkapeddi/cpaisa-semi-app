import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Spacer from '../layout/Spacer';
import OrganiastionList from './OrganiastionList';
import OrganisationList from '../../mock/OrganisationList.json';

const StockistView = () => {
  const [data] = useState(OrganisationList);
  const [ind, setInd] = useState();

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
            onPress={() => setInd(index)}
            isShow={index == ind}
          />
        )}
      />
    </View>
  );
};

export default StockistView;

const styles = StyleSheet.create({});
