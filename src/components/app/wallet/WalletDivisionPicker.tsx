import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';
import {Picker, PickerItem} from 'react-native-woodpicker';
import Style from '../../../constants/Style';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {Filter} from '../../../models/enum/Filter';
import Fonts from '../../../theme/Fonts';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {
  WalletSummary,
  WalletSummaryEntity,
} from '../../../models/interfaces/WalletSummary';
import {getRewardRequestListArgs} from '../../../screens/wallet/WalletScreen';
import {CouponPartnerEntity} from '../../../models/interfaces/ReemPartnersResponse';
import {ClientEntity} from '../../../models/interfaces/ClientsListResponse';
import Icon from 'react-native-vector-icons/AntDesign';

export type WalletDivisionPickerProps = {
  walletSummaries: PickerItem[];
  selectedWallet: WalletSummaryEntity;
  setSelectedWallet: React.Dispatch<
    React.SetStateAction<WalletSummaryEntity | null | undefined>
  >;
  walletSummary: WalletSummary;
  resetFilterState: () => void;
  getRewardRequestList: (
    params: getRewardRequestListArgs,
    page?: number,
    scrolled?: boolean,
  ) => Promise<void>;
  setCouponPartners: React.Dispatch<
    React.SetStateAction<CouponPartnerEntity[]>
  >;
  setRewardRequestListParams: Function;
  organizations: ClientEntity[];
  selectedIds: number[];
};

const WalletDivisionPicker: React.FC<WalletDivisionPickerProps> = ({
  walletSummaries,
  selectedWallet,
  setSelectedWallet,
  walletSummary,
  resetFilterState,
  getRewardRequestList,
  setCouponPartners,
  setRewardRequestListParams,
  organizations,
  selectedIds,
}) => {
  return (
    <View>
      <Icon
        name="caretdown"
        style={{
          position: 'absolute',
          zIndex: 10,
          top: hp('2%'),
          left: wp('83%'),
        }}
      />
      <Picker
        item={walletSummaries?.find(val => {
          return val?.value === selectedWallet?.division_code;
        })}
        onItemChange={val => {
          if (val.label === Filter.SELECT_ALL) {
            setSelectedWallet({
              display_name: Filter.SELECT_ALL,
              division_name: Filter.SELECT_ALL,
              division_code: Filter.SELECT_ALL,
              team_id: -1,
              organization_code: Filter.SELECT_ALL,
              organization_id: -1,
              organization_name: Filter.SELECT_ALL,
              redeemable_points:
                walletSummary.total_redeemable_points.toString(),
              pending_points: walletSummary.total_pending_points.toString(),
              redeemed_points: walletSummary.total_redeemed_points,
              total_redeemed_points:
                walletSummary?.total_redeemed_points ??
                AppLocalizedStrings.noData,
            });
            resetFilterState();
            getRewardRequestList({
              client_id: organizations[selectedIds[0]].id,
              paramsPage: 1,
              organization_id: -1,
            });
            getRewardRequestList(
              {
                organization_id: -1,
              },
              1,
              false,
            );
            setCouponPartners([]);
          } else {
            const findItem = walletSummary?.wallet_summaries?.find(
              (item, ind) => {
                return item?.division_code === val?.value;
              },
            );
            setSelectedWallet(findItem);
            resetFilterState();
            setRewardRequestListParams((prev: any) => {
              return {
                ...prev,
                organization_id: findItem?.organization_id,
              };
            });
            getRewardRequestList(
              {
                organization_id: findItem?.organization_id,
              },
              1,
              false,
            );
          }
        }}
        style={styles.picker}
        items={walletSummaries}
      />
    </View>
  );
};

export default WalletDivisionPicker;

const styles = StyleSheet.create({
  pickerText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  picker: {
    height: hp(5),
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: wp(3),
    borderRadius: Style.kBorderRadius,
    marginBottom: hp(2),
  },
});
