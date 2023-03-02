import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ContactRep} from '../../../screens/ContactRepScreen';
import Style from '../../../constants/Style';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import ImageView from '../../image/ImageView';
import AdaptiveButton from '../../button/AdaptiveButton';

interface ContactRepItemProps {
  item: ContactRep;
}

const ContactRepItem: React.FC<ContactRepItemProps> = props => {
  const item = props.item;

  const onCallHandler = () => {};

  return (
    <View style={styles.main}>
      <ImageView style={styles.image} source={item.url} />
      <View style={styles.userDetail}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.organisation}>{item.organisation}</Text>
      </View>
      <AdaptiveButton
        type="text"
        icon="call_fill"
        iconSize={wp('5%')}
        onPress={onCallHandler}
      />
    </View>
  );
};

export default ContactRepItem;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    marginBottom: hp('0.3%'),
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Medium',
      Colors.black,
    ),
  },
  organisation: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline4'),
      'Regular',
      Colors.placeholder,
    ),
  },
  image: {
    width: wp('12%'),
    aspectRatio: 1,
    marginEnd: wp('5%'),
  },
  userDetail: {
    flex: 1,
    alignItems: 'flex-start',
  },
});
