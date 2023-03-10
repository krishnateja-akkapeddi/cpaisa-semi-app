import {Platform, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useMemo, useState} from 'react';
import ProfileTextInput from './ProfileTextInput';
import Spacer from '../../layout/Spacer';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {ChannelPartner} from '../../../models/interfaces/AuthResponse';

interface BusinessDetailsViewProps {
  style?: ViewStyle;
  channelPartner: ChannelPartner;
}

const kSpacing = Platform.OS == 'android' ? hp(2.5) : hp(2.5);
const BusinessDetailsView: React.FC<BusinessDetailsViewProps> = ({
  style,
  channelPartner,
}) => {
  const [businessName, setBusinessName] = useState('Vijay Medi Corp.');
  const [mobileNo, setMobileNo] = useState('+91-9898 965 965');
  const [DLNo, setDLNo] = useState('ABCDS60000D');
  const [PAN, setPAN] = useState('HUPJA5951K');
  const [GST, setGST] = useState('18AABCU9603R1ZM');

  const styleContainer = useMemo(() => [styles.container, style], [style]);
  return (
    <View style={styleContainer}>
      <ProfileTextInput
        isEditable={false}
        title={AppLocalizedStrings.profile.businessName}
        value={channelPartner?.firm_name}
        onChangeText={setBusinessName}
      />
      <Spacer height={kSpacing} />
      <ProfileTextInput
        isEditable={false}
        title={AppLocalizedStrings.profile.mobileNo}
        value={channelPartner?.firm_contact}
        onChangeText={setMobileNo}
      />
      <Spacer height={kSpacing} />
      <ProfileTextInput
        isEditable={false}
        title={AppLocalizedStrings?.profile?.dlNo}
        value={channelPartner?.dl_no}
        onChangeText={setDLNo}
      />
      <Spacer height={kSpacing} />
      <ProfileTextInput
        isEditable={false}
        title={AppLocalizedStrings.profile.panNo}
        value={channelPartner?.pan_no}
        onChangeText={setPAN}
      />
      <Spacer height={kSpacing} />
      <ProfileTextInput
        isEditable={false}
        title={AppLocalizedStrings.profile.gstNo}
        value={channelPartner?.gst_no}
        onChangeText={setGST}
      />
    </View>
  );
};

export default BusinessDetailsView;

const styles = StyleSheet.create({
  container: {},
});
