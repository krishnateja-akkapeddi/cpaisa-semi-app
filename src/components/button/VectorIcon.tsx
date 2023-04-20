import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import Colors from '../../theme/Colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';

type VectorIconSet =
  | 'AntDesign'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons';

interface VectorIconProps {
  name: string;
  size: number | string;
  type: VectorIconSet;
  color: string;
  iconStyle?: ViewStyle;
  style?: ViewStyle;
  onPress?: () => void;
}

const VectorIcon = (props: VectorIconProps) => {
  let VectorType: any;
  switch (props.type) {
    case 'AntDesign':
      VectorType = AntDesign;
      break;
    case 'FontAwesome':
      VectorType = FontAwesome;
      break;
    case 'Foundation':
      VectorType = Foundation;
      break;
    case 'FontAwesome5':
      VectorType = FontAwesome5;
      break;
    case 'MaterialCommunityIcons':
      VectorType = MaterialCommunityIcons;
      break;
    default:
      VectorType = Ionicons;
      break;
  }
  return (
    <VectorType.Button
      iconStyle={[styles.iconStyle, props.iconStyle ?? {}]}
      style={[styles.icon, props.style ?? {}]}
      underlayColor={Colors.transparent}
      backgroundColor={Colors.transparent}
      color={props.color}
      name={props.name}
      size={typeof props.size == 'number' ? props.size : hp(props.size)}
      onPress={props.onPress}
    />
  );
};

export default VectorIcon;

const styles = StyleSheet.create({
  icon: {
    margin: 0,
    padding: 0,
  },
  iconStyle: {marginRight: 0},
});
