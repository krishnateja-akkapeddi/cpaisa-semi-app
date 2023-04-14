import React, {useMemo, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Animated} from 'react-native';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Brands from '../../components/brands/Brands';
import Stockist from '../../components/stockist/Stockist';
import {ScrollView} from 'react-native-gesture-handler';
import {HomeStackScreenProps} from '../../navigation/stack/HomeStackNavigator';
import {OrganisationStackScreenProps} from '../../navigation/stack/OrganisationStackNavigator';

const TABS = [
  {id: 1, label: 'Brands'},
  {id: 2, label: 'Stockist'},
];

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const BrandsScreen: React.FC<
  OrganisationStackScreenProps<'BrandsScreen'>
> = props => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [indicatorPosition, setIndicatorPosition] = useState(
    new Animated.Value(0),
  );
  console.log('BRANDS_SJCd', props.route.params);

  const handleTabPress = (tabId: number) => {
    setActiveTab(tabId);

    Animated.timing(indicatorPosition, {
      toValue: tabId === TABS[0].id ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const getIndicatorPosition = () => {
    return {
      left: indicatorPosition.interpolate({
        inputRange: [0, 1],
        outputRange: ['6%', '56%'],
      }),
    };
  };

  console.log('BRADNDS', props.route.params.organisation);

  return (
    <View>
      <View style={styles.container}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(tab.id)}>
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
        <AnimatedTouchableOpacity
          style={[styles.indicator, getIndicatorPosition()]}
        />
      </View>
      {activeTab === 1 ? (
        <Brands organization={props.route.params.organisation} />
      ) : (
        <Stockist organisation={props.route.params.organisation} />

        // <ScrollView style={{height: hp('75%')}}>
        // </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: 60,
    marginHorizontal: wp(10),
  },
  tabButton: {
    width: wp(29),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  activeTabButton: {
    width: wp(29),
  },
  tabLabel: {
    color: Colors.grey,
  },
  activeTabLabel: {
    color: Colors.darkBlack,
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: wp('30%'),
    backgroundColor: Colors.darkBlack,
    borderBottomWidth: 3,
  },
});

export default BrandsScreen;
