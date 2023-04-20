import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage, {
  ImageStyle,
  ResizeMode,
  Priority,
  Source,
} from 'react-native-fast-image';
interface ImageViewProps {
  source: Source | string;
  style?: ImageStyle;
  resizeMode?: ResizeMode;
  priority?: Priority;
}

const ImageView: React.FC<ImageViewProps> = props => {
  return (
    <FastImage
      defaultSource={require('../../assets/images/placeholder.jpeg')}
      style={props.style}
      source={
        typeof props.source == 'string'
          ? {
              uri: props.source,
              priority: props.priority ?? FastImage.priority.high,
            }
          : props.source
      }
      resizeMode={props.resizeMode ?? FastImage.resizeMode.cover}
    />
  );
};

export default ImageView;

const styles = StyleSheet.create({});
