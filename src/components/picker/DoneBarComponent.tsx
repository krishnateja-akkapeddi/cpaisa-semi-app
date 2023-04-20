import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AdaptiveButton from '../button/AdaptiveButton';
import Style from '../../constants/Style';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import {wp} from '../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../localization/Localization';

interface DoneBarComponentProps {
  onDonePress: () => void;
}

const DoneBarComponent = (props: DoneBarComponentProps) => {
  return (
    <View style={styles.container}>
      <AdaptiveButton
        type="text"
        textStyle={styles.btnDoneText}
        buttonStyle={styles.btnDone}
        title={AppLocalizedStrings.done}
        onPress={props.onDonePress}
      />
    </View>
  );
};

export default DoneBarComponent;

const styles = StyleSheet.create({
  container: {backgroundColor: '#F0F1F2'},
  btnDone: {
    width: 'auto',
    alignSelf: 'flex-end',
    paddingHorizontal: wp(5),
  },
  btnDoneText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline2'),
      'Medium',
      Colors.darkBlack,
    ),
  },
});
