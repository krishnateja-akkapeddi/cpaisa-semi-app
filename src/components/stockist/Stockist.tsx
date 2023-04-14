import {StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FetchAuthorizedStockistsParams} from '../../domain/usages/FetchAuthorizedStockists';
import {getStockistsListParams} from '../../screens/stockist/StockistScreen';
import {store} from '../../store/Store';
import {fetchAuthorizedStockists} from '../../store/thunks/ApiThunks';
import {StockistEntity} from '../../models/interfaces/AuthorizedStockistsResponse';
import {FlatList} from 'react-native-gesture-handler';
import StockistList from '../app/StockistList';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Spacer from '../layout/Spacer';
import {ClientEntity} from '../../models/interfaces/ClientsListResponse';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AppLocalizedStrings} from '../../localization/Localization';
import GaCaughtUp from '../GaCaughtUp';

type Props = {organisation: ClientEntity};

const Stockist = (props: Props) => {
  const [expandIndex, setExpandIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [stockists, setStockists] = useState<StockistEntity[]>([]);
  const [isNextPageThere, setIsNextPageThere] = useState(true);
  const [loadingStockists, setLoadingStockists] = useState(false);

  const dropDownHandler = (index: number) => {
    setExpandIndex(index == expandIndex ? -1 : index);
  };

  const getStockistsList = useCallback(
    async (
      params: getStockistsListParams,
      page?: number,
      scrolled?: boolean,
    ) => {
      setLoadingStockists(true);
      const {fromResetFilter} = params;
      var stockistParams = {
        length: 10,
      } as FetchAuthorizedStockistsParams.params;

      if (params.client_code) {
        params.client_code !== '-1'
          ? (stockistParams.client_code = params.client_code)
          : delete stockistParams.client_code;
      }
      if (scrolled) {
        if (page === 1) {
          page = 2;
          setCurrentPage(prev => prev + 1);
        }
      }

      const result = await store
        .dispatch(
          fetchAuthorizedStockists({
            page: page ? page : 1,
            params: {
              ...stockistParams,
              client_code: props.organisation.short_code,
            },
          }),
        )
        .unwrap();
      console.log('STOCSIID', result);

      if (result.success) {
        // await debounce(2000);
        if (scrolled) {
          setIsNextPageThere(result.stockists.has_next_page);

          setStockists(oldData => [...oldData, ...result.stockists.data]);
        } else {
          setStockists(result.stockists.data);
        }
      }

      setLoadingStockists(false);
    },

    [currentPage],
  );

  useEffect(() => {
    getStockistsList({}, 1, false);
  }, []);
  return (
    <View style={{paddingHorizontal: wp('5%'), height: hp('75%')}}>
      <Spacer height={hp(3)} />
      <FlatList
        ListFooterComponent={
          <View>
            {loadingStockists ? (
              [1, 2, 3, 4, 5, 6].map((val, ind) => {
                return (
                  <View key={ind.toString()}>
                    <Spacer height={hp('3%')} />
                    <SkeletonPlaceholder borderRadius={10}>
                      <SkeletonPlaceholder.Item
                        width={wp('90%')}
                        height={hp('6.5%')}
                      />
                    </SkeletonPlaceholder>
                  </View>
                );
              })
            ) : !isNextPageThere ? (
              <GaCaughtUp message={AppLocalizedStrings.caughtUp} />
            ) : (
              <View />
            )}
          </View>
        }
        onEndReached={() => {
          setCurrentPage(prev => prev + 1);
          isNextPageThere &&
            getStockistsList({}, currentPage, true).then(() => {});
        }}
        renderItem={({item, index}) => (
          <>
            <StockistList
              organisations={item.organizations}
              name={item.firm_name}
              //Todo: Update it
              // image={item}
              isVisible={expandIndex == index}
              onPress={() => dropDownHandler(index)}
            />
            <Spacer height={hp(2)} />
          </>
        )}
        data={stockists}
      />
    </View>
  );
};

export default Stockist;

const styles = StyleSheet.create({});
