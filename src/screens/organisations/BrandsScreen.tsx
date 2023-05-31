import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import Colors from '../../theme/Colors';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Brands from '../../components/brands/Brands';
import Stockist from '../../components/stockist/Stockist';
import {InvoiceOverview} from '../../models/interfaces/InvoiceSummaryResponse';
import {store} from '../../store/Store';
import {
  fetchInvoiceSummary,
  fetchWalletSummary,
} from '../../store/thunks/ApiThunks';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {Convert} from '../../utility/converter/Convert';
import Icon from 'react-native-vector-icons/AntDesign';
import PriceChipView from '../../components/app/wallet/PriceChipView';
import Spacer from '../../components/layout/Spacer';
import {HomeStackScreenProps} from '../../navigation/stack/HomeStackNavigator';
import {setRouteName} from '../../store/slices/AppSlice';
import {Filter} from '../../models/enum/Filter';
import {WalletSummary} from '../../models/interfaces/WalletSummary';
import {AppLocalizedStrings} from '../../localization/Localization';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import GaNoInternetFound from '../../components/GaNoInternetFound';

const TABS = [
  {id: 1, label: 'Brands'},
  {id: 2, label: 'Stockist'},
];

const {width, height} = Dimensions.get('window');

const BrandsScreen: React.FC<HomeStackScreenProps<'BrandsScreen'>> = props => {
  const organisation = props?.route.params.organisation;
  const [invoiceSummary, setInvoiceSummary] = useState<InvoiceOverview>();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [loadingBrandOffers, setLoadingBrandOffers] = useState(true);
  const [areOffersThere, setAreOffersThere] = useState(false);
  const animatedTabPosition = useSharedValue(wp('-20%'));

  const [walletSummary, setWalletSummary] = React.useState<WalletSummary>();
  const [walletSummaryLoading, setWalletSummaryLoading] = useState(true);

  const position = useSharedValue(wp(0));

  const getWalletSummary = React.useCallback(async () => {
    setWalletSummaryLoading(true);

    const data = await store
      .dispatch(fetchWalletSummary({client_id: organisation.id}))
      .unwrap();

    setWalletSummary(data.wallet_summary);
    setWalletSummaryLoading(false);
  }, []);

  const getInvoiceSummary = async () => {
    const data = await store
      .dispatch(
        fetchInvoiceSummary({
          client_id: organisation.id,
          start_date: Convert.dateFormatter(null, 'YYYY-MM', new Date()),
          end_date: Convert.dateFormatter(null, 'YYYY-MM', new Date()),
        }),
      )
      .unwrap();
    setInvoiceSummary(data.invoice_overview);
  };

  const boxAnimation = (value: number) => {
    'worklet';
    return wp(value);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {transform: [{translateX: animatedTabPosition.value}]};
  }, []);

  const handleTabPress = useCallback((tabId: number) => {
    animatedTabPosition.value = withTiming(
      tabId === 1 ? wp('-20%') : wp('20%'),
    );
    position.value = withTiming(tabId === 1 ? wp(0) : wp(-95));
    setActiveTab(tabId);
  }, []);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {translateX: number; translateTabX: number}
  >({
    onStart: (e, context) => {
      context.translateX = position.value;
      context.translateTabX = animatedTabPosition.value;
    },

    onActive: (e, context) => {
      position.value = e.translationX + context.translateX;
      animatedTabPosition.value = -e.translationX / 3 + context.translateTabX;
    },

    onEnd: (e, context) => {
      console.log(e.translationX);

      if (activeTab === 1 && position.value <= 0) {
        position.value = withTiming(-width + 20);
        animatedTabPosition.value = withTiming(80);
        runOnJS(setActiveTab)(2);
      } else if (activeTab === 2 && position.value > -width + 20) {
        position.value = withTiming(0);
        animatedTabPosition.value = withTiming(-80);
        runOnJS(setActiveTab)(1);
      } else if (activeTab === 1 && position.value > 0) {
        position.value = withTiming(0);
        animatedTabPosition.value = withTiming(-80);
        runOnJS(setActiveTab)(1);
      } else if (activeTab === 2 && position.value < -width + 20) {
        position.value = withTiming(-width + 20);
        animatedTabPosition.value = withTiming(80);
        runOnJS(setActiveTab)(2);
      }
    },
  });
  const rStyles = useAnimatedStyle(() => {
    return {transform: [{translateX: position.value}]};
  });

  useEffect(() => {
    getInvoiceSummary();
    getWalletSummary();
  }, []);

  useEffect(() => {
    store.dispatch(setRouteName(Convert.toTitleCase(organisation.short_code)));
  }, []);

  return (
    <View>
      <GaNoInternetFound>
        <View style={styles.brandsContainer}>
          {/* <View style={{...styles.orgInfoContainer, ...styles.flexBox}}>
          <View>
            <Icon size={wp(7)} color={Colors.lightOrange} name="infocirlce" />
          </View>
          <Spacer width={wp(2)} />
          <View>
            <Text style={{width: wp('80%')}}>
              {organisation.description ??
                'No description available at the moment'}
            </Text>
          </View>
        </View> */}
          {/* <Spacer height={hp(3)} /> */}
          <Text style={{fontWeight: '500'}}>Summary</Text>
          <Spacer height={hp(2)} />

          <View style={{...styles.flexBox, ...styles.summaryContainer}}>
            <View>
              <PriceChipView
                loading={walletSummaryLoading}
                title={'Total Invoices Uploaded'}
                titleNumberLine={2}
                backGroundColor={Colors.lightOrange}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
                price={invoiceSummary?.overall_invoice_status.total_invoices}
              />
            </View>
            <Spacer width={wp(3)} />
            <View>
              <PriceChipView
                loading={walletSummaryLoading}
                title={'Total Points Earned'}
                titleNumberLine={2}
                backGroundColor={'#E5E5E5'}
                price={
                  walletSummary?.total_redeemable_points &&
                  walletSummary?.total_redeemed_points
                    ? walletSummary?.total_redeemable_points +
                      walletSummary?.total_redeemed_points
                    : 0
                }
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </View>
          </View>
        </View>
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
                  // styles.tabLabel,
                  activeTab === tab.id && styles.activeTabLabel,
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
          <Animated.View style={[styles.indicator, animatedStyles]} />
        </View>
        {/* {activeTab === 1 ? (
          <Brands organization={organisation} />
        ) : (
          <Stockist organisation={organisation} />
        )} */}
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[
              rStyles,
              {
                display: 'flex',
                flexDirection: 'row',
              },
            ]}>
            <View>
              <Brands
                setAreOffersThere={setAreOffersThere}
                loadingBrandOffers={loadingBrandOffers}
                setLoadingBrandOffers={setLoadingBrandOffers}
                organization={organisation}
              />
            </View>
            <View>
              <Stockist
                areOffersThere={areOffersThere}
                organisation={organisation}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GaNoInternetFound>
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
  summaryContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  orgInfoContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    borderWidth: 3,
    padding: wp(2),
  },
  flexBox: {
    display: 'flex',
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
  brandsContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
});

export default BrandsScreen;
