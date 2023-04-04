import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import PriceChipView from './PriceChipView';
import Spacer from '../../layout/Spacer';
import AdaptiveButton from '../../button/AdaptiveButton';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import {WalletSummaryEntity} from '../../../models/interfaces/WalletSummary';
import {PriceChipSkeleton} from '../../SkeletonCards';
import {Filter} from '../../../models/enum/Filter';

interface WalletPointsViewProps {
  onPress: () => void;
  selectedWallet: WalletSummaryEntity | undefined;
  walletSummaryLoading?: boolean;
}

const WalletPointsView: React.FC<WalletPointsViewProps> = props => {
  const {onPress, selectedWallet, walletSummaryLoading} = props;

  useEffect(() => {
    console.log('FROM_WALLET_POINTS', selectedWallet);
  }, [selectedWallet]);

  return (
    <View style={styles.mainCardStyle}>
      <View style={styles.viewStyle}>
        {walletSummaryLoading ? (
          <PriceChipSkeleton />
        ) : (
          <PriceChipView
            title={AppLocalizedStrings.wallet.pointRecive}
            titleNumberLine={2}
            price={selectedWallet?.redeemed_points}
            backGroundColor={Colors.lightGreen}
            onPress={() => {
              console.log('SuccesFull');
            }}
          />
        )}
        <Spacer width={wp(2.5)} />
        {walletSummaryLoading ? (
          <PriceChipSkeleton />
        ) : (
          <PriceChipView
            title={AppLocalizedStrings.wallet.pendingPoint}
            titleNumberLine={2}
            price={selectedWallet?.pending_points}
            backGroundColor={Colors.lightPink}
            onPress={() => {
              console.log('SuccesFull');
            }}
          />
        )}
      </View>
      <Spacer height={hp(1)} />
      <View style={[styles.viewStyle]}>
        {walletSummaryLoading ? (
          <PriceChipSkeleton />
        ) : (
          <PriceChipView
            title={AppLocalizedStrings.wallet.redeemablePoints}
            titleNumberLine={2}
            price={parseFloat(selectedWallet?.redeemable_points ?? '').toFixed(
              2,
            )}
            backGroundColor={Colors.lightYellow}
            onPress={() => {
              console.log('SuccesFull');
            }}
          />
        )}
        <Spacer width={wp(2.5)} />
        {walletSummaryLoading ? (
          <PriceChipSkeleton />
        ) : (
          <AdaptiveButton
            isDisable={
              parseFloat(selectedWallet?.redeemable_points ?? '0.0') === 0.0 ||
              selectedWallet?.display_name === Filter.SELECT_ALL
            }
            buttonStyle={styles.btn}
            type="light"
            title={AppLocalizedStrings.wallet.redeemNow}
            onPress={onPress}
          />
        )}
      </View>
    </View>
  );
};

export default WalletPointsView;

const styles = StyleSheet.create({
  textSelectTitel: {
    ...Style.getTextStyle(Fonts.getFontSize('headline3'), 'Bold', Colors.black),
  },
  viewStyle: {
    flexDirection: 'row',
  },
  mainCardStyle: {
    flexDirection: 'column',
  },
  btn: {
    height: wp(13),
    flex: 1,
    paddingHorizontal: 0,
  },
});
