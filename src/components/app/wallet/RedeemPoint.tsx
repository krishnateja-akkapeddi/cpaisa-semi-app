import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import OrganisationList from '../../../components/app/offers/OrganisationList';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import Style from '../../../constants/Style';
import Spacer from '../../../components/layout/Spacer';
import AdaptiveButton from '../../../components/button/AdaptiveButton';
import CompanyCard from '../../../mock/CompanyCard.json';
import Fonts from '../../../theme/Fonts';

const kOrganisations = [...CompanyCard];

interface RedeemProps {
  onDismiss: () => void;
  onCompanySelect: (headTitle: string) => void;
}

const RedeemPoint: React.FC<RedeemProps> = props => {
  const {onCompanySelect, onDismiss} = props;
  const [selectedIds, setSelectedIds] = useState<number[]>([0]);
  const onContinueHandler = () => {
    onCompanySelect('Pfizer');
  };

  return (
    <View style={[styles.mainCardStyle]}>
      <View style={[styles.cardViewTop]}>
        <Text style={[styles.textRedeemPointTitel]}>
          {AppLocalizedStrings.wallet.redeemPoints}
        </Text>
        <AdaptiveButton
          title={AppLocalizedStrings.wallet.dismissX}
          type="text"
          buttonStyle={styles.backBtn}
          textStyle={styles.textRedeemTitel}
          onPress={onDismiss}
        />
      </View>
      <Spacer height={hp(1.8)} />
      <View style={[styles.middelLineStyle]}></View>
      <Spacer height={hp(1.8)} />
      <Text style={[styles.textRedeemTitel]}>
        {AppLocalizedStrings.wallet.selectCompany}
      </Text>
      <Spacer height={hp(1.8)} />
      <OrganisationList
        showsHorizontalScrollIndicator={true}
        isRounded={false}
        selectedIds={selectedIds}
        horizontal={true}
        showAll={false}
        data={kOrganisations}
        onSelect={ids => setSelectedIds(ids)}
      />
      <Spacer height={hp(1.8)} />
      <AdaptiveButton
        type="dark"
        title={AppLocalizedStrings.continue}
        onPress={onContinueHandler}
      />
    </View>
  );
};

export default RedeemPoint;

const styles = StyleSheet.create({
  backBtn: {
    height: 'auto',
  },

  middelLineStyle: {
    backgroundColor: Colors.grey,
    height: 0.5,
  },
  mainCardStyle: {
    borderColor: Colors.black,
    borderRadius: Style.kBorderRadius,
    borderWidth: 1,
    padding: hp(1.8),
    marginBottom: hp(2.5),
  },
  cardViewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRedeemPointTitel: {
    ...Style.getTextStyle(Fonts.getFontSize('headline4'), 'Bold', Colors.black),
  },
  textRedeemTitel: {
    ...Style.getTextStyle(Fonts.getFontSize('headline4'), 'Bold', Colors.black),
  },
});
