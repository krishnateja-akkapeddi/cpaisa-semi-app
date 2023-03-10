import React, {useCallback} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import OfferOverView from '../../components/app/dashboard/OfferOverView';
import PriorityNotificationList from '../../components/app/dashboard/PriorityNotificationList';
import SuggestionList from '../../components/app/dashboard/SuggestionList';
import WalletOverView from '../../components/app/dashboard/WalletOverView';
import Carousel from '../../components/carousel/Carousel';
import ImageView from '../../components/image/ImageView';
import AppLoader from '../../components/indicator/AppLoader';
import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import {SliderImagesResponse} from '../../models/interfaces/SliderImagesResponse';
import {
  WalletSummary,
  WalletSummaryResponse,
} from '../../models/interfaces/WalletSummary';
import {BottomTabScreenProps} from '../../navigation/navigator/BottomTabNavigator';
import {RootState, store} from '../../store/Store';
import {
  fetchSliderImages,
  fetchWalletSummary,
} from '../../store/thunks/ApiThunks';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Animated from 'react-native-reanimated';
import GaRefresh from '../../components/GaRefresh';
import {useSelector} from 'react-redux';
import {AppSliceState} from '../../store/slices/AppSlice';

const DashboardScreen: React.FC<
  BottomTabScreenProps<'DashboardScreen'>
> = () => {
  const [images, setImages] = React.useState<string[]>();
  const [loading, setLoading] = React.useState(true);
  const [walletSummaryLoading, setWalletSummaryLoading] = React.useState(false);
  const [walletSummary, setWalletSummary] = React.useState<WalletSummary>(
    {} as WalletSummary,
  );
  const {refresh} = useSelector<RootState, AppSliceState>(state => {
    return state.app;
  });

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

  const renderItem = useCallback((item: string) => {
    return <ImageView style={styles.banner} source={item} />;
  }, []);

  React.useEffect(() => {
    fetchImages();
    getWalletSummary();
  }, [refresh]);

  React.useEffect(() => {}, [images, walletSummary]);

  return (
    <GaRefresh>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
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

        <PriorityNotificationList items={notificatios} />
        <OfferOverView />
        <WalletOverView
          loading={walletSummaryLoading}
          walletSummary={walletSummary}
        />
        <SuggestionList items={suggestionData} />
      </ScrollView>
    </GaRefresh>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 15,
    paddingTop: hp(1),
  },
  banner: {
    height: 250,
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
