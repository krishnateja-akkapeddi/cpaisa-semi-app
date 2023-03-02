import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ImageView from '../../image/ImageView';
import Spacer from '../../layout/Spacer';

interface SubscribeCardProps {
  leftTitle?: string;
  rightTitle?: string;
  leftBtnStyle?: ViewStyle;
  rightBtnStyle?: ViewStyle;
  leftBtnTextStyle?: TextStyle;
  rightBtnTextStyle?: TextStyle;
}

const RedeemPointCard = (props: SubscribeCardProps) => {
  return (
    <View style={styles.bottomContainer}>
      <View style={[styles.mainCardStyle]}>
        <View style={styles.rowCard}>
          <TouchableOpacity style={styles.subCard}>
            <ImageView
              style={styles.subCardImg}
              source={{
                uri: 'https://t4.ftcdn.net/jpg/02/61/01/87/360_F_261018762_f15Hmze7A0oL58Uwe7SrDKNS4fZIjLiF.jpg',
              }}
            />
          </TouchableOpacity>
          <Spacer width={10} />
          <TouchableOpacity style={styles.subCard}>
            <ImageView
              style={styles.subCardImg}
              source={{
                uri: 'https://img.freepik.com/free-vector/special-offer-modern-sale-banner-template_1017-20667.jpg?w=2000',
              }}
            />
          </TouchableOpacity>
        </View>
        <Spacer height={10} />
        <View style={styles.rowCard}>
          <TouchableOpacity style={styles.subCard}>
            <ImageView
              style={styles.subCardImg}
              source={{uri: 'https://picsum.photos/seed/picsum/200/300'}}
            />
          </TouchableOpacity>
          <Spacer width={8} />
          <TouchableOpacity style={styles.subCard}>
            <ImageView
              style={styles.subCardImg}
              source={{uri: 'https://picsum.photos/200/300?grayscale'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RedeemPointCard;

const styles = StyleSheet.create({
  mainCardStyle: {
    height: 275,
    flexDirection: 'column',
    resizeMode: 'cover',
    width: '100%',
  },

  rowCard: {
    flex: 1,
    flexDirection: 'row',
  },

  subCard: {
    borderRadius: 10,
    flex: 1,
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },

  subCardImg: {
    borderRadius: 10,
    flex: 1,
  },

  bottomContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});
