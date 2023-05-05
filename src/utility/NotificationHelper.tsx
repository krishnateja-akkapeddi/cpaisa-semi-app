import messaging from '@react-native-firebase/messaging';
import SharedPreference from '../storage/SharedPreference';
import DeviceInfo from 'react-native-device-info';
import {Alert, Linking, Platform} from 'react-native';
import {SaveDeviceInfo} from '../domain/usages/SaveDeviceInfo';
import {saveDeviceInfoWorker} from '../store/workers/ApiWorkers';
import {PERMISSIONS, check, request} from 'react-native-permissions';

export class NotificationHelper {
  static _instance: NotificationHelper;
  private fcmToken: string | null = null;
  private static os: string = Platform.OS;
  private readonly device: string = '';
  private readonly appVersion: string = '';
  constructor() {
    this.askPermissions();

    this.appVersion = DeviceInfo.getVersion();
    this.device = DeviceInfo.getModel();

    if (this.fcmToken)
      messaging().onTokenRefresh(token => {
        console.log('NEW_TOKEN_GENERATED_FROM_TOKEN_REFRESH:', {
          token: token,
          os: NotificationHelper.os,
          device: this.device,
          app_version: this.appVersion,
        });
        if (token) {
          this.fcmToken = token;
          SharedPreference.shared.setFcmToken(this.fcmToken);
        } else {
          console.log('NO_NEW_TOKEN_GENERATED');
        }
      });
  }
  async getFcmTokenFromLocal(): Promise<string> {
    const token = await SharedPreference.shared.getFcmToken();
    return token;
  }

  getDeviceInfo(): {
    os: string;
    device: string;
    app_version: string;
  } {
    return {
      os: NotificationHelper.os,
      device: this.device,
      app_version: this.appVersion,
    };
  }

  getFcmToken() {
    return this.fcmToken;
  }

  async askPermissions() {
    if (Platform.OS === 'android') {
      const requestPermission = await check(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      );
      if (requestPermission === 'denied') {
        const anotherRequestPermission = await request(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );
        if (anotherRequestPermission === 'denied') {
          Alert.alert(
            `Notification Permission Required`,
            `This app needs notifications permission to send you imporatnat alerts about your invoices`,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Settings',
                onPress: () => {
                  Linking.openSettings();
                  return false;
                },
              },
            ],
          );
        }
      }
    }
    const askPerm1 = await messaging().requestPermission();
    const askPerm = await messaging().registerDeviceForRemoteMessages();
    const authStatus = await messaging().requestPermission();
  }

  async requestFcmToken() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    const newToken = await messaging().getToken();
    this.fcmToken = newToken;
    await SharedPreference.shared.setFcmToken(this.fcmToken);
    await saveDeviceInfoWorker.save({
      token: this.fcmToken,
      os: NotificationHelper.os,
      device: this.device,
      app_version: this.appVersion,
    });
  }
}

export const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('NOTIF_OPENED_THE_APP', remoteMessage.notification);
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
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

export const notificationHelper = new NotificationHelper();
