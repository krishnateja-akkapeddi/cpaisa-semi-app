import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import PopupContainer from './popup/PopupContainer';
import {RootState, store} from '../store/Store';
import {
  AppSliceState,
  appSlice,
  closePoup,
  resetState,
} from '../store/slices/AppSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../theme/Colors';
import {hp, wp} from '../utility/responsive/ScreenResponsive';
import AdaptiveButton from './button/AdaptiveButton';
import Spacer from './layout/Spacer';
import SharedPreference, {kSharedKeys} from '../storage/SharedPreference';
import RootNavigation from '../navigation/RootNavigation';

export enum PopupFunctions {
  LOGOUT = 'logout',
}

const GaNotification = () => {
  const {popup} = useSelector<RootState, AppSliceState>(state => state.app);

  useEffect(() => {}, [popup]);

  return (
    <View>
      {popup.visible && (
        <PopupContainer
          showHeader={popup.showHeader}
          onOutsidePress={() => {
            popup.closeOnOutsideClick && store.dispatch(closePoup());
            popup.onOutSideClick && popup.onOutSideClick();
          }}
          animationType="fade"
          showDismiss={popup.showDismiss}
          onDismiss={() => {
            store.dispatch(closePoup());
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
                  color={Colors.yellow}
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
                store.dispatch(closePoup());
                popup.onSubmit && popup.onSubmit();
                if (popup.popupFunction) {
                  switch (popup.popupFunction) {
                    case PopupFunctions.LOGOUT:
                      console.log('THis is rthe dpasje');
                  }
                }
              }}
              type="light"
              buttonStyle={{width: wp('70%')}}
              title={popup.buttonText ?? 'Done'}></AdaptiveButton>
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
