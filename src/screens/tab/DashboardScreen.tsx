import React, {useCallback} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PriorityNotificationList from '../../components/app/dashboard/PriorityNotificationList';
import SuggestionList from '../../components/app/dashboard/SuggestionList';
import WalletOverView from '../../components/app/dashboard/WalletOverView';
import Carousel from '../../components/carousel/Carousel';
import ImageView from '../../components/image/ImageView';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import {SliderImagesResponse} from '../../models/interfaces/SliderImagesResponse';
import {
  WalletSummary,
  WalletSummaryResponse,
} from '../../models/interfaces/WalletSummary';
import {BottomTabScreenProps} from '../../navigation/navigator/BottomTabNavigator';
import {RootState, store} from '../../store/Store';
import OrganisationList from '../../components/app/offers/OrganisationList';

import {
  fetchClients,
  fetchSliderImages,
  fetchWalletSummary,
} from '../../store/thunks/ApiThunks';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Animated, {log} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import Spacer from '../../components/layout/Spacer';
import Snackbar from 'react-native-snackbar';
import {ClientListParams} from '../../domain/usages/FetchClientsList';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';
import {FlatList} from 'react-native-gesture-handler';
import DepartmentItem from '../../components/app/offers/DepartmentItem';
import {Convert} from '../../utility/converter/Convert';
import RootNavigation from '../../navigation/RootNavigation';
import DashboardOrganisations from '../../components/drawer/dashboard/DashboardOrganisations';

const DashboardScreen: React.FC<
  BottomTabScreenProps<'DashboardScreen'>
> = props => {
  const [organizations, setOrganizations] = React.useState<ClientEntity[]>([]);
  const [loadingOrganisations, setLoadingOrganisations] = React.useState(true);

  const [images, setImages] = React.useState<string[]>();
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const [refreshDashboard, setRefreshDashboard] = React.useState(false);
  const [walletSummaryLoading, setWalletSummaryLoading] = React.useState(false);
  const [walletSummary, setWalletSummary] = React.useState<WalletSummary>(
    {} as WalletSummary,
  );

  const fetchImages = async () => {
    setLoading(true);
    let imagesUrl: string[] = [];

    const data: SliderImagesResponse = await store
      .dispatch(fetchSliderImages())
      .unwrap();

    const sliderImages = data.slider_images;

    sliderImages?.forEach(val => {
      imagesUrl.push(val.url);
    });

    setImages(imagesUrl);
    setLoading(false);
  };
  const getWalletSummary = React.useCallback(async () => {
    setWalletSummaryLoading(true);
    const data: WalletSummaryResponse = await store
      .dispatch(fetchWalletSummary())
      .unwrap();
    setWalletSummary(data.wallet_summary);
    setWalletSummaryLoading(false);
  }, []);

  const notificatios = [
    AppLocalizedStrings.dashboard.kycpending,
    AppLocalizedStrings.dashboard.targetachi,
  ];

  const suggestionData = [
    AppLocalizedStrings.dashboard.youproductx,
    AppLocalizedStrings.dashboard.youproductx,
  ];

  const getClients = useCallback(async () => {
    setLoadingOrganisations(true);
    let params = {} as ClientListParams.params;
    const data = await store.dispatch(fetchClients(params)).unwrap();
    if (data.success) {
      setOrganizations(data.clients.data);
    } else {
      Snackbar.show({
        text: data?.errors
          ? data?.errors?.message
          : AppLocalizedStrings.somethingWrong,
        backgroundColor: Colors.red,
        textColor: Colors.white,
      });
    }
    setLoadingOrganisations(false);
  }, []);

  const renderItem = useCallback((item: string) => {
    return <ImageView style={styles.banner} source={item} />;
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefreshDashboard(prev => !prev);
    }, 2000);
  }, []);

  React.useEffect(() => {
    fetchImages();
    getWalletSummary();
    getClients();
  }, [refreshDashboard]);

  React.useEffect(() => {}, [images, walletSummary]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      style={styles.screen}>
      {loading ? (
        <Animated.View>
          <SkeletonPlaceholder speed={500} borderRadius={4}>
            <SkeletonPlaceholder.Item width={wp('90%')} height={hp('30%')} />
          </SkeletonPlaceholder>
        </Animated.View>
      ) : images?.length === 0 ? (
        <View
          style={{
            borderRadius: Style.kBorderRadius,
            borderWidth: 1,
            borderColor: 'orange',
            padding: 20,
          }}>
          <Image
            style={{bottom: hp('1%')}}
            source={require('../../assets/images/NoOffersArt.png')}
          />
          <Text
            style={{
              fontSize: 16,
              marginTop: hp('3%'),
              textAlign: 'center',
              color: 'gray',
              fontWeight: '500',
            }}>
            No Offers Found
          </Text>
        </View>
      ) : (
        <Carousel
          autoplay={true}
          autoplayLoop={true}
          autoplayDelay={4}
          items={images && images}
          noImages={images?.length === 0}
          renderItem={renderItem}
        />
      )}
      {/*
      //Todo: Will be implemented next release
       <PriorityNotificationList items={notificatios} /> */}
      {/* <OfferOverView /> */}
      <Spacer height={hp('2%')} />
      <WalletOverView
        loading={walletSummaryLoading}
        walletSummary={walletSummary}
      />
      {/* 
      //Todo: Will be implemented next release
      <SuggestionList items={suggestionData} /> */}
      <Text style={{fontWeight: '500'}}>All Organisations</Text>
      <Spacer height={hp(2)} />
      <View style={{paddingHorizontal: wp(2)}}>
        {organizations && (
          <DashboardOrganisations organizations={organizations} />
        )}
        <Spacer height={hp(5)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 15,
    paddingTop: hp(1),
  },
  seprator: {width: wp('20%')},

  banner: {
    height: 260,
    alignSelf: 'center',
    resizeMode: 'cover',
    width: '100%',
    borderRadius: Style.kBorderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
});

export default DashboardScreen;