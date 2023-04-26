import messaging from '@react-native-firebase/messaging';
import SharedPreference from '../storage/SharedPreference';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function getFcmToken() {
  // let fcmToken = SharedPreference.shared.getItem('fcmToken');
  // if (!fcmToken) {
  //   try {

  //   } catch (err) {
  //     console.log('ERROR_IND', err);
  //   }
  // } else {

  // }
  const existingFcmToken = await SharedPreference.shared.getFcmToken();
  if (existingFcmToken) {
    console.log(existingFcmToken);
  } else {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      SharedPreference.shared.setFcmToken(fcmToken);
    } else {
      console.log('UNABLE_TO_FETCH_TOKEN');
    }
  }
}

export const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('NOTIF_OPENED_THE_APP', remoteMessage.notification);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remoteMessage => {
    console.log('FORE_GROUND_MESFG', remoteMessage);
  });
};
