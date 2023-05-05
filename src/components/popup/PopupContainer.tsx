import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import OutsidePressHandler, {EventProvider} from 'react-native-outside-press';

import Style from '../../constants/Style';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Spacer from '../layout/Spacer';

interface PopupContainerProps {
  children: React.ReactNode;
  showDismiss?: boolean;
  showLine?: boolean;
  title?: string;
  showHeader?: boolean;
  onDismiss?: () => void;
  animationType?: 'fade' | 'slide';
  onOutsidePress?: () => void; // Change the type to function with no arguments
  type?: 'error' | 'success';
}

const PopupContainer: React.FC<PopupContainerProps> = props => {
  const {
    showHeader = true,
    showLine = true,
    showDismiss,
    children,
    title,
    onDismiss,
    animationType = 'fade',
    type,
  } = props;
  return (
    <EventProvider style={{flex: 1}}>
      <Modal
        transparent
        animationType={animationType}
        onRequestClose={() => {}}>
        <View style={styles.container}>
          <OutsidePressHandler
            onOutsidePress={() => {
              props.onOutsidePress && props.onOutsidePress();
            }}
            disabled={false}>
            <View style={styles.subContainer}>
              <View>
                <View>
                  {showHeader && (
                    <View style={styles.header}>
                      <Text style={styles.headerTitle}>{title}</Text>
                      {showDismiss && (
                        <TouchableOpacity onPress={onDismiss}>
                          <Text style={styles.dimiss}>
                            {AppLocalizedStrings.dimiss}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                  {showLine && showHeader && <View style={styles.lineView} />}
                  {showLine && <Spacer height={kPadding} />}
                  <View style={styles.contentContainer}>{children}</View>
                </View>
              </View>
            </View>
          </OutsidePressHandler>
        </View>
      </Modal>
    </EventProvider>
  );
};

export default PopupContainer;

const kPadding = wp('5%');
const kScreenPadding = wp('8%');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000070',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: kScreenPadding,
    paddingBottom: kScreenPadding,
    width: wp(100),
    height: hp(100),
  },
  subContainer: {
    width: wp(90),
    backgroundColor: Colors.white,
    borderRadius: Style.kBorderRadius,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexDirection: 'row',
    marginTop: -5,
    padding: kPadding,
    paddingBottom: 0,
  },
  headerTitle: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline3'),
      'Bold',
      Colors.darkBlack,
    ),
  },
  dimiss: {
    ...Style.getTextStyle(
      Fonts.getFontSize('headline5'),
      'Regular',
      Colors.darkBlack,
    ),
  },
  lineView: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightPurple,
  },
  contentContainer: {
    paddingHorizontal: kPadding,
    paddingBottom: kPadding,
  },
});
