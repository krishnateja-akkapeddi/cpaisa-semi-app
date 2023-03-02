import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ImageView from '../image/ImageView';
import SVGIcon from '../../utility/svg/SVGIcon';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Spacer from '../layout/Spacer';
import OfferListComponent from './offers/OfferListComponent';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import OrganiastionArray from '../../models/interfaces/OrganiastionArray';

interface OrganiastionListProps {
  uri: string;
  name: string;
  text: string;
  data: OrganiastionArray[];
  onPress: () => void;
  isShow: boolean;
}

const OrganiastionList: React.FC<OrganiastionListProps> = props => {
  return (
    <View>
      <TouchableOpacity style={styles.listView} onPress={props.onPress}>
        <ImageView style={styles.imageStyle} source={{uri: props.uri}} />
        <View style={styles.textView}>
          <Text style={styles.brandStyle}>{props.name}</Text>
        </View>
        <SVGIcon
          name="down_arrow"
          color={Colors.black}
          size={wp('3%')}
          style={{
            transform: [{rotate: props.isShow != true ? '0deg' : '180deg'}],
          }}
        />
      </TouchableOpacity>
      {props.isShow && (
        <>
          <Text style={styles.summaryStyle}>{props.text}</Text>
          <FlatList
            data={props.data}
            ItemSeparatorComponent={() => <Spacer height={hp('1%')} />}
            renderItem={({item}) => <OfferListComponent item={item} />}
          />
        </>
      )}
    </View>
  );
};

export default OrganiastionList;

const styles = StyleSheet.create({
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textView: {
    flex: 1,
    paddingLeft: wp('4%'),
  },
  brandStyle: {
    fontSize: Fonts.getFontSize('headline4'),
    color: Colors.black,
    fontFamily: Fonts.getFontFamily('Medium'),
  },
  summaryStyle: {
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    fontFamily: Fonts.getFontFamily('Regular'),
    marginBottom: hp(1),
    paddingLeft: wp('16%'),
  },
});
