import {Image, ImageSourcePropType} from 'react-native';

interface ImageDimensions {
  width: number;
  height: number;
}

export const getImageDimensions = (
  imageSource: string,
): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      imageSource,
      (width: number, height: number) => {
        const imageDimensions: ImageDimensions = {width, height};
        resolve(imageDimensions);
      },
      (error: Error) => {
        reject(error);
      },
    );
  });
};
