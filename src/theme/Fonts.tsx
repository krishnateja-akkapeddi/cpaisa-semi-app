import {Dimensions, PixelRatio} from 'react-native';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const scale = SCREEN_WIDTH / 430;

export const normalize = (size: number) => {
  const newSize = size * scale;
  return size;
  // return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export type FontType = 'Regular' | 'Medium' | 'Bold' | 'Light';
export type FontSize =
  | 'headline1'
  | 'headline2'
  | 'headline3'
  | 'headline4'
  | 'headline5'
  | 'headline6'
  | 'headline7';

class Fonts {
  private static headline1 = normalize(20);
  private static headline2 = normalize(18);
  private static headline3 = normalize(16);
  private static headline4 = normalize(14);
  private static headline5 = normalize(12);
  private static headline6 = normalize(10);
  private static headline7 = normalize(8);

  static regular: string = 'DMSans-Regular';
  static medium: string = 'DMSans-Medium';
  static bold: string = 'DMSans-Bold';
  static light: string = 'DMSans-Light';

  static getFontFamily(type: FontType): string {
    switch (type) {
      case 'Regular':
        return Fonts.regular;
      case 'Medium':
        return Fonts.medium;
      case 'Bold':
        return Fonts.bold;
      case 'Light':
        return Fonts.light;
    }
  }

  static getFontSize(type: FontSize): number {
    switch (type) {
      case 'headline1':
        return Fonts.headline1;
      case 'headline2':
        return Fonts.headline2;
      case 'headline3':
        return Fonts.headline3;
      case 'headline4':
        return Fonts.headline4;
      case 'headline5':
        return Fonts.headline5;
      case 'headline6':
        return Fonts.headline6;
      case 'headline7':
        return Fonts.headline7;
    }
  }
}
export default Fonts;
