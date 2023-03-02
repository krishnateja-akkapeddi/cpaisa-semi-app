import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../theme/Colors';
import {hp} from '../utility/responsive/ScreenResponsive';

interface GaCaughtUpProps {
  message: string;
}

const GaCaughtUp: React.FC<GaCaughtUpProps> = ({message}) => {
  return (
    <View style={{marginVertical: 25}}>
      <Icon
        style={{textAlign: 'center', marginBottom: 10}}
        name="checkcircleo"
        size={30}
        color={Colors.green}></Icon>
      <View style={styles.container}>
        <View style={styles.line} />
        <Text style={styles.message}>{message}</Text>
        <View style={styles.line} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(5),
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#aaa',
    marginHorizontal: 10,
  },
  message: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#aaa',
  },
});

export default GaCaughtUp;
