import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ImageView from '../../image/ImageView';
import SVGIcon from '../../../utility/svg/SVGIcon';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';

interface StockistProps {
  name: string;
  url: string;
}

const OrgStockistView: React.FC<StockistProps> = props => {
  return (
    <View style={styles.screen}>
      <ImageView style={styles.imageStyle} source={{uri: props.url}} />
      <View style={styles.nameView}>
        <Text style={styles.nameStyle}>{props.name}</Text>
      </View>
    </View>
  );
};

export default OrgStockistView;

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameView: {
    flex: 1,
    paddingLeft: wp('5%'),
  },
  nameStyle: {
    fontSize: Fonts.getFontSize('headline3'),
    color: Colors.black,
    fontFamily: Fonts.getFontFamily('Medium'),
  },
});
