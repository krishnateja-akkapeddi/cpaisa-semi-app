import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PopupContainer from './PopupContainer';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import AdaptiveButton from '../button/AdaptiveButton';
import Spacer from '../layout/Spacer';
import FilterActionView from '../app/filters/FilterActionView';

const Organisations = [
  'Biocon',
  'Pfizer',
  'Pfizer',
  'Pfizer',
  'Pfizer',
  'Cipla',
];

interface OrganisationFilterPopup {
  onDismiss?: () => void;
  onApply: () => void;
  onClear: () => void;
}

const OrganisationFilterPopup: React.FC<OrganisationFilterPopup> = props => {
  const {onApply, onClear, onDismiss} = props;
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const onSelect = (i: number) => {
    const index = selectedIds.indexOf(i);
    if (index == -1) {
      setSelectedIds([...selectedIds, i]);
    } else {
      setSelectedIds(selectedIds.filter(e => e != i));
    }
  };

  return (
    <PopupContainer
      title={AppLocalizedStrings.filter.filters}
      showDismiss={true}
      showLine={false}
      onDismiss={onDismiss}>
      <View style={styles.main}>
        <Text style={styles.title}>Organisation</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.tagView}>
          {Organisations.map((e, index) => (
            <AdaptiveButton
              key={index}
              type={selectedIds.indexOf(index) == -1 ? 'light' : 'dark'}
              buttonStyle={styles.btnTag}
              title={e}
              onPress={onSelect.bind(this, index)}
            />
          ))}
        </ScrollView>
        <Spacer height={hp(3)} />
        <FilterActionView onApply={onApply} onClear={onClear} />
      </View>
    </PopupContainer>
  );
};

export default OrganisationFilterPopup;

const styles = StyleSheet.create({
  main: {
    paddingTop: hp(1.5),
  },
  title: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  tagView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  btnTag: {
    marginEnd: wp(1),
    marginVertical: hp(0.5),
    paddingHorizontal: 10,
    height: hp(3),
  },
  scrollView: {
    height: hp(20),
  },
});
