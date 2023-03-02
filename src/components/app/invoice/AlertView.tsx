import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SVGIcon from '../../../utility/svg/SVGIcon';
import Spacer from '../../layout/Spacer';
import AlertData from '../../../mock/AlertData.json';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import Fonts from '../../../theme/Fonts';
import InvoiceAlertList from './InvoiceAlertList';

const AlertView = () => {
  const [data, setdata] = useState(AlertData);
  const [isVisible, setIsVisible] = useState(false);
  const visibleHandler = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <TouchableOpacity
        style={styles.alertRowContainer}
        onPress={visibleHandler}>
        <>
          <SVGIcon name="alert" size={19} />
          <Spacer width={wp('2%')} />
          <Text style={styles.alertText}>{data.length} New Alert</Text>
        </>
        <TouchableOpacity>
          {isVisible && (
            <SVGIcon name="toparrow" size={14} color={Colors.black} />
          )}
          {!isVisible && (
            <SVGIcon name="down_arrow" size={14} color={Colors.black} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
      {isVisible && <InvoiceAlertList />}
    </>
  );
};

export default AlertView;

const styles = StyleSheet.create({
  alertRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    fontSize: Fonts.getFontSize('headline4'),
    color: Colors.primary,
    fontFamily: Fonts.getFontFamily('Bold'),
    flex: 1,
  },
});
