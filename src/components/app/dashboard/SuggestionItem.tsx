import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';
import Fonts from '../../../theme/Fonts';
import Style from '../../../constants/Style';

interface SuggestionItemProps {
  title: string;
}
const SuggestionItem = (props: SuggestionItemProps) => {
  return (
    <View>
      <Spacer height={hp(1)} />
      <View style={styles.textView}>
        <Text style={styles.innerText}>{props.title}</Text>
      </View>
    </View>
  );
};
export default SuggestionItem;

const styles = StyleSheet.create({
  innerText: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.primary,
    ),
    marginHorizontal: 15,
    marginVertical: 8,
  },
  textView: {
    height: wp('10%'),
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: Colors.lightGrey,
  },
});
