import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import AdaptiveButton from '../../button/AdaptiveButton';
import Spacer from '../../layout/Spacer';
import DashboardSectionHeader from './DashboardSectionHeader';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import SubscribeCard from '../../SubscribeCard';
import RootNavigation from '../../../navigation/RootNavigation';
import {Generator} from '../../../utility/Generator';
import {
  OfferEntity,
  OffersResponse,
} from '../../../models/interfaces/OffersResponse';
import {FetchOffersParams} from '../../../domain/usages/FetchOffers';
import {Convert} from '../../../utility/converter/Convert';
import {store} from '../../../store/Store';
import {fetchOffers} from '../../../store/thunks/ApiThunks';

interface Props {}
const OfferOverView: React.FC<Props> = props => {
  const [data, setData] = useState<string[]>([]);
  const [offers, setOffers] = useState<OfferEntity[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getOffers = React.useCallback(async (date: string) => {
    let formattedDate;
    if (date) {
      formattedDate = Convert.dateFormatter('MMM YY', 'YYYYMM', date);
    }
    const params: FetchOffersParams.params = {} as FetchOffersParams.params;
    if (formattedDate) {
      params.month_year = parseInt(formattedDate);
    }
    const data: OffersResponse = await store
      .dispatch(fetchOffers(params))
      .unwrap();
    if (data.offers) {
      setOffers(data.offers);
    }
    let imagesUrl: string[] = [];
    data.offers?.map((val, ind) => {
      imagesUrl.push(val.path);
    });
  }, []);

  const createContent = () => {
    return data.map((item, index) => {
      const isActive = index == selectedIndex;
      const bgColor = isActive ? Colors.white : Colors.lightGrey;
      const borderColor = isActive ? Colors.primary : Colors.lightGrey;
      return (
        <AdaptiveButton
          key={index}
          title={item}
          buttonStyle={{
            ...styles.btnDate,
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
          textStyle={styles.btnDateText}
          onPress={() => {
            setSelectedIndex(index);
            getOffers(data[index]);
          }}
        />
      );
    });
  };

  const renderItem = useCallback(
    (offer: OfferEntity) => {
      const onPressPriceHandler = () => {};

      const onPressUploadHandler = () => {
        RootNavigation.navigate('InvoiceUploadScreen');
      };

      return (
        <SubscribeCard
          offer={offer}
          leftTitle={AppLocalizedStrings.subscription.upload}
          rightTitle="2,345"
          rightIcon="channelpaisa_logo"
          leftBtnStyle={styles.leftBtnView}
          rightBtnStyle={styles.rightBtnView}
          leftBtnTextStyle={styles.leftBtnText}
          rightBtnTextStyle={styles.rightBtnText}
          onPressLeft={onPressUploadHandler}
          onPressRight={onPressPriceHandler}
        />
      );
    },
    [offers, selectedIndex],
  );
  useEffect(() => {
    const yearMonthsList = Generator.generateYearMonth(11);
    setData(yearMonthsList);
  }, []);
  useEffect(() => {
    getOffers(data[0]);
  }, [data]);
  useEffect(() => {}, [offers, selectedIndex]);
  return (
    <View>
      <Spacer height={hp(2.5)} />
      <DashboardSectionHeader
        headerTitle={AppLocalizedStrings.dashboard.offerover}
        //Todo: Filter api needs to be provided
        // iconName={'filter'}
        iconSize={wp(4.6)}
      />
      <Spacer height={hp(1)} />
      <ScrollView
        horizontal
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}>
        {createContent()}
      </ScrollView>
      <Spacer height={hp(2.5)} />
      {/* <Carousel items={offers} renderItem={renderItem} /> */}
      <Spacer height={hp(2)} />
    </View>
  );
};
export default OfferOverView;

const styles = StyleSheet.create({
  btnDate: {
    height: hp(4.5),
    borderRadius: hp(1.5),
    paddingHorizontal: wp(4),
    marginRight: wp(1),
    borderWidth: 1,
  },
  btnDateText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline6'),
      'Regular',
      Colors.black,
    ),
  },
  leftBtnView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 'auto',
  },
  rightBtnView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 'auto',
  },
  leftBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  rightBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  banner: {
    height: wp(34),
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
    borderRadius: Style.kBorderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
});
