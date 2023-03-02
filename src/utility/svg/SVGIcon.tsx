import React from 'react';
import ReactIcoMoon from 'react-icomoon';

import icoMoonConfig from './selection.json';
import {Svg, Path} from 'react-native-svg';
import {Button, GestureResponderEvent, ViewStyle} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

interface SVGIconProps {
  name: string;
  size?: number;
  color?: string;
  disableFill?: boolean;
  style?: ViewStyle;
  onPress?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  name,
  size = 30,
  color,
  disableFill = false,
  style,
  onPress,
}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <ReactIcoMoon
        native
        // @ts-ignore
        style={style}
        iconSet={icoMoonConfig}
        SvgComponent={Svg}
        PathComponent={Path}
        icon={name}
        size={size}
        color={color}
        disableFill={color != null}
      />
    </TouchableHighlight>
  );
};

export default SVGIcon;
