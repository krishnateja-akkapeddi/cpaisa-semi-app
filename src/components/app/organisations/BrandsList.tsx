import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text>{AppLocalizedStrings.Organisations.brands}</Text>
  </View>
);
const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text>{AppLocalizedStrings.Organisations.stockists}</Text>
  </View>
);

const TabScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <TouchableOpacity onPress={() => setSelectedIndex(0)}>
          <View style={[styles.tab, selectedIndex === 0 && styles.tabActive]}>
            <Text
              style={[styles.label, selectedIndex === 0 && styles.labelActive]}>
              {AppLocalizedStrings.Organisations.brands}
            </Text>
          </View>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity onPress={() => setSelectedIndex(1)}>
          <View style={[styles.tab, selectedIndex === 1 && styles.tabActive]}>
            <Text
              style={[styles.label, selectedIndex === 1 && styles.labelActive]}>
              {AppLocalizedStrings.Organisations.stockists}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {selectedIndex === 0 && <HomeScreen />}
      {selectedIndex === 1 && <SettingsScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  tabbar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tab: {
    width: wp('35%'),

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
    marginRight: 1,
  },
  tabActive: {
    // backgroundColor: '#ffeb3b',
    borderBottomWidth: 3,
    borderBottomColor: Colors.darkBlack,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ddd',
  },
  labelActive: {
    color: '#333',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabScreen;
