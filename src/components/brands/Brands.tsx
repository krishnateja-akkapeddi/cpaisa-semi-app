import {Image, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../theme/Colors';
import Spacer from '../layout/Spacer';
import PriceChipView from '../app/wallet/PriceChipView';
import {BrandOfferEntity} from '../../models/interfaces/BrandOffersResponse';
import {store} from '../../store/Store';
import {
  fetchBrandOffers,
  fetchInvoiceSummary,
  fetchWalletSummary,
} from '../../store/thunks/ApiThunks';
import {FetchBrandOffersParams} from '../../domain/usages/FetchBrandOffers';
import {Convert} from '../../utility/converter/Convert';
import {FlatList} from 'react-native-gesture-handler';
import {AppLocalizedStrings} from '../../localization/Localization';
import {OfferEntity} from '../../models/interfaces/OffersResponse';
import RootNavigation from '../../navigation/RootNavigation';
import SubscribeCard from '../SubscribeCard';
import {styles as offerOverviewStyles} from '../app/dashboard/OfferOverView';
import {dialCall} from '../../utility/linking/Linking';
import {WalletSummary} from '../../models/interfaces/WalletSummary';
import {FetchWalletSummaryParams} from '../../domain/usages/FetchWalletSummary';
import {InvoiceOverview} from '../../models/interfaces/InvoiceSummaryResponse';
import AppLoader from '../indicator/AppLoader';
import GaCaughtUp from '../GaCaughtUp';

type Props = {organization: ClientEntity};

const Brands: React.FC<Props> = ({organization}) => {
  const [loadingBrandOffers, setLoadingBrandOffers] = useState(true);
  const [brandOffers, setBrandOffers] = useState<BrandOfferEntity[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(10);
  const [invoiceSummary, setInvoiceSummary] = useState<InvoiceOverview>();

  const isNextPageAvailable = () => currentPage !== lastPage + 1;

  const renderItem = (offer: BrandOfferEntity) => {
    const onPressRightHandler = () => {
      dialCall(offer.representative_details.mobile);
    };

    const onPressUploadHandler = () => {
      RootNavigation.navigate('InvoiceUploadScreen');
    };

    return (
      <SubscribeCard
        offer={offer}
        leftTitle={AppLocalizedStrings.subscription.upload}
        rightTitle="2,345"
        rightIcon="call"
        leftBtnStyle={styles.leftBtnView}
        rightBtnStyle={styles.rightBtnView}
        leftBtnTextStyle={styles.leftBtnText}
        rightBtnTextStyle={styles.rightBtnText}
        onPressLeft={onPressUploadHandler}
        onPressRight={onPressRightHandler}
      />
    );
  };

  const getBrandOffers = async (fromScroll?: boolean) => {
    const brandOfferParams = {
      month_year: Convert.dateFormatter(null, 'YYYY-MM', new Date()),
      client_id: organization.id,
      with_contact_person: 1,
      length: 10,
    } as FetchBrandOffersParams.params;

    setLoadingBrandOffers(true);
    const data = await store
      .dispatch(
        fetchBrandOffers({
          page: currentPage,
          params: brandOfferParams,
        }),
      )
      .unwrap();
    setCurrentPage(prev => prev + 1);
    setLastPage(data.offers.last_page);
    setLastPage(data.offers.last_page);
    if (fromScroll) {
      setBrandOffers(prev => {
        return [...prev, ...data.offers.data];
      });
    } else {
      setBrandOffers(data.offers.data);
    }
    setLoadingBrandOffers(false);
  };

  const getInvoiceSummary = async () => {
    const data = await store
      .dispatch(
        fetchInvoiceSummary({
          client_id: organization.id,
          start_date: Convert.dateFormatter(null, 'YYYY-MM', new Date()),
          end_date: Convert.dateFormatter(null, 'YYYY-MM', new Date()),
        }),
      )
      .unwrap();
    setInvoiceSummary(data.invoice_overview);
  };

  useEffect(() => {
    setBrandOffers([]);
    setCurrentPage(1);
    setLastPage(10);
    getBrandOffers();
    getInvoiceSummary();
  }, [organization]);

  return (
    <View style={styles.brandsContainer}>
      <View style={{paddingHorizontal: wp(1)}}>
        <View>
          <FlatList
            onEndReached={info => {
              info.distanceFromEnd < 10;
              if (isNextPageAvailable()) {
                getBrandOffers(true);
              } else {
                return null;
              }
            }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => {
              return (
                <View>
                  <Spacer height={hp(5)} />
                  {isNextPageAvailable() ? (
                    <AppLoader type="none" loading={loadingBrandOffers} />
                  ) : (
                    <View>
                      {brandOffers.length > 0 ? (
                        <GaCaughtUp message={"You're all set"} />
                      ) : (
                        <View style={{marginTop: hp(5)}}>
                          <Image
                            style={{bottom: hp('1%')}}
                            source={require('../../assets/images/NoOffersArt.png')}
                          />
                          <Text
                            style={{
                              fontSize: wp(4),
                              marginTop: hp('3%'),
                              textAlign: 'center',
                              color: 'gray',
                              fontWeight: '500',
                            }}>
                            No Offers Found
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              );
            }}
            ListHeaderComponent={() => {
              return (
                <View>
                  <View style={{...styles.orgInfoContainer, ...styles.flexBox}}>
                    <View>
                      <Icon
                        size={wp(7)}
                        color={Colors.lightOrange}
                        name="infocirlce"
                      />
                    </View>
                    <Spacer width={wp(2)} />
                    <View>
                      <Text>
                        {organization.description ??
                          'No description available at the moment'}
                      </Text>
                    </View>
                  </View>
                  <Spacer height={hp(3)} />
                  <Text style={{fontWeight: '500'}}>Summary</Text>
                  <Spacer height={hp(2)} />

                  <View style={{...styles.flexBox, ...styles.summaryContainer}}>
                    <View>
                      <PriceChipView
                        title={'Total Invoices Uploaded'}
                        titleNumberLine={2}
                        backGroundColor={Colors.lightOrange}
                        onPress={function (): void {
                          throw new Error('Function not implemented.');
                        }}
                        price={200}
                      />
                    </View>
                    <Spacer width={wp(3)} />
                    <View>
                      <PriceChipView
                        title={'Total Invoices Uploaded'}
                        titleNumberLine={2}
                        backGroundColor={'#E5E5E5'}
                        price={
                          invoiceSummary?.overall_invoice_status.total_invoices
                        }
                        onPress={function (): void {
                          throw new Error('Function not implemented.');
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            }}
            ItemSeparatorComponent={() => <Spacer height={hp(2)} />}
            data={brandOffers}
            renderItem={f => {
              return renderItem(f.item);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Brands;

const styles = StyleSheet.create({
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
  brandsContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    height: hp('78%'),
  },
  flexBox: {
    display: 'flex',
  },
  summaryContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  ...offerOverviewStyles,
});
