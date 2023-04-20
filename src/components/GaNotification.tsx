import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import PopupContainer from './popup/PopupContainer';
import {RootState} from '../store/Store';
import {appSlice, AppSliceState} from '../store/slices/AppSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../theme/Colors';
import {hp, wp} from '../utility/responsive/ScreenResponsive';
import AdaptiveButton from './button/AdaptiveButton';
import Spacer from './layout/Spacer';

const GaNotification = () => {
  const {popup} = useSelector<RootState, AppSliceState>(state => state.app);

  const dispatch = useDispatch();

  useEffect(() => {}, [popup]);

  return (
    <View>
      {popup.visible && (
        <PopupContainer
          showHeader={popup.showHeader}
          onOutsidePress={() => {
            dispatch(appSlice.actions.closePoup());
          }}
          animationType="fade"
          showDismiss={popup.showDismiss}
          onDismiss={() => {
            dispatch(appSlice.actions.closePoup());
          }}
          title={popup.title}>
          <View style={styles.popupContainer}>
            {popup.type === 'success' ? (
              <Image
                source={require('../assets/images/SuccessIcon.png')}></Image>
            ) : popup.type === 'plain' ? (
              <>
                <Icon
                  size={wp('20%')}
                  name="exclamationcircleo"
                  color={Colors.lightYellow}
                />
              </>
            ) : (
              <>
                <Icon size={wp('20%')} name="closecircle" color={Colors.red} />
                <Spacer height={20} />
              </>
            )}
            <Text style={styles.contentTitle}>{popup.message}</Text>
            {popup.description && (
              <Text style={styles.contentDescription}>{popup.description}</Text>
            )}
            <Spacer height={hp('5%')} />
            <AdaptiveButton
              onPress={() => {
                dispatch(appSlice.actions.closePoup());
                popup.onSubmit && popup.onSubmit();
              }}
              type="light"
              buttonStyle={{width: wp('70%')}}
              title="Done"></AdaptiveButton>
          </View>
        </PopupContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    alignItems: 'center',
    // justifyContent: 'center',
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    color: Colors.black,
  },
  contentDescription: {
    fontSize: 16,
    marginTop: 20,
    color: Colors.black,
  },
});

export default GaNotification;
