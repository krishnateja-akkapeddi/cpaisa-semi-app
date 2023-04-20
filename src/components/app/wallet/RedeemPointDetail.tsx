import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListRenderItemInfo,
  FlatList,
} from 'react-native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import Spacer from '../../../components/layout/Spacer';
import AdaptiveButton from '../../../components/button/AdaptiveButton';
import RedeemPointCard from '../../app/wallet/RedeemPointCard';
import Fonts from '../../../theme/Fonts';
import AdaptiveTextInput from '../../input/AdaptiveTextInput';
import RadioList from '../filters/RadioList';
import SwipeButton from 'rn-swipe-button';
import Icon from 'react-native-vector-icons/AntDesign';
import AppLoader from '../../indicator/AppLoader';
import ReedemRequestPopup from '../../popup/ReedemRequestPopup';
import {WalletSummaryEntity} from '../../../models/interfaces/WalletSummary';
import {
  getRewardRequestListArgs,
  WalletMode,
} from '../../../screens/wallet/WalletScreen';
import {CouponPartnerEntity} from '../../../models/interfaces/ReemPartnersResponse';
import {useDispatch} from 'react-redux';
import {appSlice} from '../../../store/slices/AppSlice';
import {ReedemRewardParams} from '../../../domain/usages/ReedemReward';
import Snackbar from 'react-native-snackbar';
import {store} from '../../../store/Store';
import {reedemReward} from '../../../store/thunks/ApiThunks';
import {Filter} from '../../../models/enum/Filter';

interface RedeemDetailProps {
  onDismiss: () => void;
  disabled?: boolean;
  refreshApi: Function;
  onGoToDashboardHandler: (toDashboard?: boolean) => void;
  title: string;
  selectedWallet: WalletSummaryEntity | undefined;
  couponPartners: CouponPartnerEntity[];
  getRewardRequestList: (
    params: getRewardRequestListArgs,
    page?: number,
    scrolled?: boolean,
  ) => Promise<void>;
  setMode: React.Dispatch<React.SetStateAction<WalletMode>>;
}

const RedeemPointDetail: React.FC<RedeemDetailProps> = ({
  onDismiss,
  onGoToDashboardHandler,
  title,
  selectedWallet,
  couponPartners,
  refreshApi,
  setMode,
}) => {
  const [points, setPoints] = useState<string>();
  const [isReedemPartnerSelected, setIsReedemPartnerSelected] = useState(false);
  const [showRedeem, setShowRedeem] = useState(false);
  const [couponType, setCouponType] = useState<CouponPartnerEntity>();
  const dispatch = useDispatch();
  const [swiping, setSwiping] = useState(false);
  const [selectedReedemIds, setSelectedReedemIds] = useState<number>();
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [swipeCompletion, setSwipeCompletion] = useState(false);
  const [active, setActive] = useState(0);

  const renderItem = (item: number) => {
    return <RedeemPointCard />;
  };
  console.log('COUP_POI', points, couponType);

  const handleSwipeCompletion: () => void = async () => {
    setSwipeCompletion(true);
    setRedeemLoading(true);
    const params = {} as ReedemRewardParams.params;

    if (
      selectedWallet?.organization_id &&
      selectedWallet?.team_id &&
      points &&
      couponType
    ) {
      params.organization_id = selectedWallet?.organization_id.toString();
      params.reward_id = couponType?.redeem_partner_id.toString();
      params.team_id = selectedWallet?.team_id.toString();
      params.points = points.toString();
      const data = await store.dispatch(reedemReward(params)).unwrap();
      if (data.success) {
        setShowRedeem(true);
        setSwiping(false);
        setShowRedeem(true);
        // setMode(WalletMode.Transaction);
      } else if (data.errors) {
        setSwiping(false);
        dispatch(
          appSlice.actions.openPopup({
            message: data.errors?.message,
            title: 'Reedem Points',
            type: 'error',
            onDismiss: () => {
              onGoToDashboardHandler.bind(this, false);
            },
            onSubmit: () => {
              onGoToDashboardHandler.bind(this, false);
            },
          }),
        );
      }
      setRedeemLoading(false);

      console.log('REEDEM_PARAMS', params);
    } else {
      Snackbar.show({
        text: 'Please make sure that all the details are selected',
        backgroundColor: Colors.red,
        textColor: Colors.white,
      });
      setRedeemLoading(false);
    }
  };

  const onDone = () => {
    refreshApi();
  };

  useEffect(() => {}, [couponType, points]);
  const renderPoints = ({item, index}: ListRenderItemInfo<number>) => {
    const isActive = item === active;
    return (
      <>
        {index !== 0 && (
          <AdaptiveButton
            // isDisable={true}
            type={isActive ? 'dark' : 'light'}
            buttonStyle={
              isActive == true ? styles.btnActive : styles.btnInactive
            }
            textStyle={
              isActive == true ? styles.btnTextActive : styles.btnTextInactive
            }
            title={'+' + item}
            onPress={() => {
              setActive(item);
              let textItem = item.toString();
              setSelectedReedemIds(item);
              setPoints(prev => {
                if (!prev) {
                  return textItem;
                }
                return (parseInt(prev) + item).toString();
              });
            }}
          />
        )}
      </>
    );
  };

  console.log('COUSP', couponPartners);

  return (
    <View style={[styles.mainCardStyle]}>
      <View style={[styles.cardViewTop]}>
        <AdaptiveButton
          title={title}
          type="text"
          // icon="arrow_back"
          buttonStyle={styles.backBtn}
          textStyle={styles.backBtnText}
          // onPress={onDismiss}
        />
        <AdaptiveButton
          title={AppLocalizedStrings.wallet.dismissX}
          type="text"
          buttonStyle={styles.backBtn}
          textStyle={styles.textRedeemTitel}
          onPress={onDismiss}
        />
      </View>
      <Spacer height={hp(2.8)} />
      <Text>Enter how many points do you want to redeem?</Text>

      <Spacer height={hp(1.8)} />

      <AdaptiveTextInput
        onPress={() => {
          setActive(0);
        }}
        keyboardType="number-pad"
        placeholder="Enter Points"
        onChangeText={setPoints}
        style={{
          textAlign: 'left',
          backgroundColor: Colors.lightGrey,
          borderColor: Colors.lightGrey,
        }}
        value={points}
      />
      <Spacer height={hp(1.8)} />

      <FlatList
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        horizontal
        data={[50, 100, 500, 1000, 1500, 2000]}
        renderItem={renderPoints}
        ItemSeparatorComponent={() => <Spacer width={wp(1)} />}
      />
      <Spacer height={hp(2.8)} />
      <Text>Choose coupon type</Text>
      <Spacer height={hp(1.8)} />
      {selectedWallet?.display_name === Filter.SELECT_ALL ? (
        <Text style={{fontSize: wp('3%'), color: Colors.red}}>
          <Icon color={Colors.red} size={wp('3%')} name="infocirlceo" /> Please
          select the division to choose the coupon
        </Text>
      ) : (
        <RadioList
          onValueChange={selected => {
            setCouponType(couponPartners[selected[0]]);
          }}
          selectedIds={[
            couponPartners?.findIndex((val: CouponPartnerEntity) => {
              return val?.id === couponType?.id;
            }),
          ]}
          numOfColumn={3}
          data={couponPartners?.map(val => {
            return val.redeem_partner.name;
          })}
        />
      )}

      <Spacer height={hp(2.8)} />

      {/* <Carousel items={[1, 2]} renderItem={renderItem} /> */}
      <Spacer height={hp(1.8)} />
      {/* <AdaptiveButton
        type="dark"
        title={AppLocalizedStrings.continue}
        onPress={onRedeem}
      /> */}
      {showRedeem && couponType && (
        <ReedemRequestPopup
          onDone={onDone}
          points={points ?? ''}
          company={selectedWallet?.organization_code ?? ''}
          coupType={couponType?.redeem_partner?.name}
          onDismiss={onGoToDashboardHandler.bind(this, false)}
          goToDashboard={onGoToDashboardHandler.bind(this, true)}
        />
      )}
      {redeemLoading ? (
        <AppLoader loading type="none" />
      ) : (
        <SwipeButton
          disabled={couponType && points ? false : true}
          title={
            !points
              ? 'Please enter the points'
              : !couponType
              ? 'Select the coupon type'
              : 'Swipe to submit'
          }
          onSwipeStart={() => {
            setSwiping(true);
          }}
          onSwipeFail={() => {
            setSwiping(false);
          }}
          onSwipeSuccess={handleSwipeCompletion}
          thumbIconImageSource={
            couponType &&
            points &&
            require('../../../assets/images/SwiperIcon.png')
          }
          containerStyles={{borderRadius: 30}}
          thumbIconBorderColor={
            couponType && points ? Colors.primary : Colors.grey
          }
          thumbIconBackgroundColor={
            couponType && points ? Colors.primary : Colors.grey
          }
          thumbIconStyles={{borderRadius: 30}}
          railFillBackgroundColor={
            couponType && points ? Colors.primary : Colors.grey
          }
          railFillBorderColor={
            couponType && points ? Colors.primary : Colors.grey
          }
          titleStyles={{position: 'absolute', zIndex: 10}}
          titleColor={
            swiping
              ? Colors.white
              : couponType && points
              ? Colors.primary
              : Colors.black
          }
          railBackgroundColor={Colors.white}
          railBorderColor={couponType && points ? Colors.primary : Colors.grey}
        />
      )}
    </View>
  );
};

export default RedeemPointDetail;

const styles = StyleSheet.create({
  backBtn: {
    height: 'auto',
  },

  backBtnText: {
    marginStart: 5,
  },

  middelLineStyle: {
    backgroundColor: Colors.grey,
    height: 0.5,
  },
  mainCardStyle: {
    borderColor: Colors.placeholder,
    borderRadius: Style.kBorderRadius,
    borderWidth: 1,
    padding: hp('1.8'),
    marginBottom: hp('2.5%'),
  },
  cardViewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRedeemPointTitel: {
    ...Style.getTextStyle(Fonts.getFontSize('headline4'), 'Bold', Colors.black),
  },
  textRedeemTitel: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.black,
    ),
  },
  leftBtnView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rightBtnView: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  leftBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  rightBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  btnActive: {
    height: hp(3.5),
    paddingHorizontal: wp(3),
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  btnTextActive: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.white,
    ),
  },
  btnInactive: {
    height: hp(3.5),
    paddingHorizontal: wp(3),
    borderColor: Colors.primary,
  },
  btnTextInactive: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.primary,
    ),
  },
});
