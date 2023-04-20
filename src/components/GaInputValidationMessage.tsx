import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {wp, hp} from '../utility/responsive/ScreenResponsive';
import Spacer from './layout/Spacer';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../theme/Colors';

type Props = {message: string; canShow?: boolean};

const GaInputValidationMessage = (props: Props) => {
  return (
    <>
      {!props.canShow && (
        <View style={styles.container}>
          <Icon color={Colors.red} name="infocirlceo" />
          <Spacer width={wp(1)} />
          <View>
            <Text style={{textAlign: 'left', color: Colors.red}}>
              {props.message}
            </Text>
          </View>
          <Spacer height={hp(4)} />
        </View>
      )}
    </>
  );
};

export default GaInputValidationMessage;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
