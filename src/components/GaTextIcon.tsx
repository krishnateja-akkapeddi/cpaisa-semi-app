import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../theme/Colors';
import Fonts from '../theme/Fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  item: {
    marginRight: 10,
  },
});

type Props = {
  icon: React.ReactNode;
  text: string;
  textColor?: string;
};

const FlexboxScreen: React.FC<Props> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>{props.icon}</View>
      <View style={styles.item}>
        <Text
          style={{
            color: props.textColor ?? Colors.primary,
            fontSize: Fonts.getFontSize('headline2'),
          }}>
          {props.text}
        </Text>
      </View>
    </View>
  );
};

export default FlexboxScreen;
