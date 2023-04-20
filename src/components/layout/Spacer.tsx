import React, {useMemo} from 'react';
import {View, ViewStyle} from 'react-native';

interface SpacerProps {
  style?: ViewStyle;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
}

const Spacer: React.FC<SpacerProps> = props => {
  const style: ViewStyle = useMemo(() => {
    return {
      width: props.width,
      height: props.height,
      backgroundColor: props.backgroundColor,
    };
  }, [props.width, props.height, props.backgroundColor]);

  return <View style={props.style ?? style} />;
};

export default Spacer;
