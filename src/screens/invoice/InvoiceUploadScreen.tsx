import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import MyUploads from '../../components/app/invoice/MyUploads';
import UploadDocument from '../../components/app/UploadDocument';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AuthBaseScreen from '../auth/AuthBaseScreen';

import InvoiceUploadItem from '../../models/interfaces/InvoiceUploadItem';
import ReviewStatus from '../../models/enum/ReviewStatus';

import {useSelector} from 'react-redux';
import {RootState, store} from '../../store/Store';
import {Data} from '../../models/interfaces/AuthResponse';
import {uploadInvoice} from '../../store/thunks/ApiThunks';
import RootNavigation from '../../navigation/RootNavigation';
import AppLoader from '../../components/indicator/AppLoader';
import ImageCropPicker, {Image, Video} from 'react-native-image-crop-picker';
import {
  Dialog,
  ALERT_TYPE,
  AlertNotificationRoot,
} from 'react-native-alert-notification';
interface FileInfo {
  state: UploadState;
  progress: number;
}
enum UploadState {
  idle,
  uploading,
  finished,
}
const InvoiceUploadScreen = () => {
  const {channel_partner} = useSelector<RootState, Data>(state => {
    return state.auth.userInfo;
  });
  const [hasInvoice, setHasInvoce] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [uploadingInvoice, setUploadingInvoice] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] =
    useState<InvoiceUploadItem | null>();
  const timer = useRef<NodeJS.Timeout>();

  const [invoiceState, setInvoiceState] = useState<FileInfo>({
    state: UploadState.idle,
    progress: 0.0,
  });

  const onUploadHandler = async () => {
    try {
      setUploadingInvoice(true);
      const formData = new FormData();
      delete uploadedFile.cropRect;

      formData.append('image', {
        uri: uploadedFileInfo?.url,
        type: uploadedFileInfo?.mime,
        name: uploadedFileInfo?.docName?.split('/').pop(),
      });
      formData.append('channel_partner_id', channel_partner.id);
      try {
        const result = await store.dispatch(uploadInvoice(formData)).unwrap();
        if (result.success) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: AppLocalizedStrings.invoice.uploaded,
            button: 'close',
            onHide: () => {
              RootNavigation.navigate('DashboardScreen');
            },
          });
        }
        if (result.errors) {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody:
              result.errors.image ??
              result.errors.invoice ??
              AppLocalizedStrings.invoice.notUploaded,
            button: 'close',
          });
        }
      } catch (err) {
        console.log('ERR', err);
      }
    } catch (err) {
      console.log('DSJF', err);
    }

    setUploadingInvoice(false);
  };

  const deleteImage = () => {
    setUploadedFileInfo(null);
  };

  const uploadDocumentHandler = async () => {
    const result = await ImageCropPicker.openPicker({
      cropping: true,
      enableRotationGesture: false,
    }).then(result => result);

    setUploadedFile(result);
    const data: any = {};
    data.docName = result?.filename ?? 'Invoice';
    data.mime = result?.mime;
    data.status = ReviewStatus?.Pending;
    data.url = result?.path ?? '';
    setUploadedFileInfo(data);

    if (invoiceState.state == UploadState.idle) {
      timer.current = setInterval(() => {
        setInvoiceState(updateState());
      }, 50);
    }
  };

  console.log('UID', uploadedFileInfo);

  const updateState = (): FileInfo => {
    let newState = invoiceState;
    const newProgress = newState.progress + 1;
    const newUploadState =
      newProgress == 100 ? UploadState.finished : UploadState.uploading;
    newState.progress = newProgress;
    newState.state = newUploadState;
    if (newUploadState == UploadState.finished) {
      clearInterval(timer.current);
      setHasInvoce(true);
    }
    return {...newState};
  };

  useEffect(() => {}, [channel_partner, uploadedFile, uploadedFileInfo]);

  return (
    <SafeAreaView style={styles.screen}>
      <AuthBaseScreen
        iconName={hasInvoice ? null : 'invoice_upload'}
        title={''}>
        <View style={styles.fileView}>
          <View>
            <UploadDocument
              title={AppLocalizedStrings.auth.attachFile}
              subTitle={AppLocalizedStrings.auth.choosePaymentReceipts}
              percentage={invoiceState.progress}
              isUploading={invoiceState.state == UploadState.uploading}
              onPress={uploadDocumentHandler}
            />
            {hasInvoice && uploadedFileInfo && (
              <MyUploads
                deleteImage={deleteImage}
                uploadedInvoice={uploadedFileInfo}
              />
            )}
          </View>
          <AdaptiveButton
            title={
              uploadingInvoice ? (
                <AppLoader type="none" loading={true} />
              ) : (
                AppLocalizedStrings.auth.upload
              )
            }
            onPress={onUploadHandler}
            isDisable={
              !(invoiceState.state == UploadState.finished) || uploadingInvoice
            }
            buttonStyle={styles.uploadBtn}
          />
        </View>
      </AuthBaseScreen>
    </SafeAreaView>
  );
};
export default InvoiceUploadScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  fileView: {
    width: wp('90%'),
    borderRadius: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  uploadBtn: {
    marginBottom: hp(5),
  },
});
