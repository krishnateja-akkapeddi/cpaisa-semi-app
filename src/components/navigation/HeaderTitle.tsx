import {Platform, StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import {wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

export const HeaderTitleStyle: TextStyle = {
  color: Colors.black,
  fontSize: Fonts.getFontSize('headline2'),
  fontFamily: Fonts.bold,
  fontWeight: undefined,
};

interface HeaderTitleProps {
  children: string;
  tintColor?: string | undefined;
}

const HeaderTitle: React.FC<HeaderTitleProps> = props => {
  return (
    <View
      style={{
        marginHorizontal: wp(5),
        justifyContent: 'center',
        height: Platform.OS == 'android' ? 56 : 44,
      }}>
      <Text style={HeaderTitleStyle}>{props.children}</Text>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({});
