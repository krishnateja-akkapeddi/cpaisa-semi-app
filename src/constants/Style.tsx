import {ColorValue, TextStyle} from 'react-native';
import Fonts, {FontType} from '../theme/Fonts';
import {hp} from '../utility/responsive/ScreenResponsive';

class Style {
  constructor() {}
  static kBorderRadius = 10;
  static kButtonHeight = Math.min(hp('6%'), 48);
  static kTextInputHeight = Math.min(hp('6%'), 48);
  static kButtonFontSize = Fonts.getFontSize('headline3');
  static kTextInputFontSize = Fonts.getFontSize('headline3');
  static kButtonFontFamily: FontType = 'Bold';
  static kTextInputFontFamily: FontType = 'Regular';
  static DDMMMYYYY = 'DD MMM, yyyy';

  static getTextStyle(
    fontSize: number,
    fontFamily: FontType,
    color: ColorValue,
  ): TextStyle {
    return {
      fontFamily: Fonts.getFontFamily(fontFamily),
      fontSize: fontSize,
      color: color,
    };
  }
}

export default Style;
