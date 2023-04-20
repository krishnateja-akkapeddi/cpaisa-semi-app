import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import React, {useMemo, useState} from 'react';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Spacer from '../../layout/Spacer';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import {getListStatusInfo} from '../../../models/enum/InvoiceProductStatus';
import {InvoiceItemEntity} from '../../../models/interfaces/InvoiceDetailResponse';
import {InvoiceStatus} from '../../../models/enum/InvoiceStatus';
import AdaptiveButton from '../../button/AdaptiveButton';
import PopupContainer from '../../popup/PopupContainer';
import {TouchableHighlight} from 'react-native';

interface InvoiceDetailViewProps {
  item: InvoiceItemEntity;
}

const InvoiceDetailView: React.FC<InvoiceDetailViewProps> = props => {
  const {item} = props;
  const [openReason, setOpenReason] = useState(false);
  const statusInfo = getListStatusInfo(
    item.status === InvoiceStatus.PENDING
      ? 0
      : item.status === InvoiceStatus.APPROVED
      ? 1
      : item.status === InvoiceStatus.REJECTED
      ? 2
      : 3,
  );

  const ViewStyle: ViewStyle[] = useMemo(
    () => [styles.mainView, {backgroundColor: statusInfo.color}],
    [item.status],
  );
  return (
    <TouchableHighlight
      style={{
        borderTopRightRadius: 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        borderTopLeftRadius: 10,
      }}
      onPress={() => {
        item.status === InvoiceStatus.REJECTED && setOpenReason(true);
      }}>
      <View style={ViewStyle}>
        <View style={styles.secondView}>
          <View style={{...styles.nameView}}>
            <Text style={{...styles.valueText}}>{item.product_name}</Text>
          </View>
          <Text style={{...styles.valueText}}>{item.points}</Text>
          <Text
            style={{
              ...styles.valueText,

              textAlign: 'right',
              width: wp('25%'),
            }}>
            {item.quantity}
          </Text>
          {/* <AdaptiveButton
          buttonStyle={{position: 'absolute', left: wp('79%')}}
          iconSize={wp('4.5%')}
          type="text"
          icon="info"
          iconColor={Colors.black}
          onPress={() => {
            setOpenReason(true);
          }}
        /> */}
          {openReason && (
            <PopupContainer
              onDismiss={() => {
                setOpenReason(false);
              }}
              title="Reason"
              showDismiss
              showLine={false}>
              <Text style={styles.reason}>{item.rejection_reason}</Text>
            </PopupContainer>
          )}
        </View>

        {/* {item.rejection_reason != '' && (
        <Text style={styles.reason}>{item.rejection_reason}</Text>
      )} */}
      </View>
    </TouchableHighlight>
  );
};

export default InvoiceDetailView;

const styles = StyleSheet.create({
  mainView: {
    textAlign: 'center',
    paddingHorizontal: 7,
    backgroundColor: 'pink',
    borderRadius: 10,
    paddingVertical: hp('1%'),
    paddingRight: wp(4),
  },
  secondView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameView: {
    flex: 1,
  },
  valueText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
  },
  reason: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline6'),
    color: Colors.black,
  },
});
