import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ContactRepJson from '../mock/ContactRep.json';
import ContactRepItem from '../components/app/contact/ContactRepItem';
import {hp, wp} from '../utility/responsive/ScreenResponsive';
import Spacer from '../components/layout/Spacer';

export interface ContactRep {
  name: string;
  organisation: string;
  url: string;
}

const ContactRepScreen = () => {
  const renderItem = ({item}: ListRenderItemInfo<ContactRep>) => {
    return <ContactRepItem item={item} />;
  };
  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={ContactRepJson}
        ItemSeparatorComponent={() => <Spacer height={hp('2.5%')} />}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default ContactRepScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    marginHorizontal: wp('5%'),
    marginVertical: hp('2%'),
  },
  listContainer: {},
});
