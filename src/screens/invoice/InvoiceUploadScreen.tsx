import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  ActionSheetIOS,
  Modal,
  Image,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import MyUploads from '../../components/app/invoice/MyUploads';
import UploadDocument from '../../components/app/UploadDocument';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AuthBaseScreen from '../auth/AuthBaseScreen';
import InvoiceUploadItem from '../../models/interfaces/InvoiceUploadItem';
import ReviewStatus from '../../models/enum/ReviewStatus';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, store} from '../../store/Store';
import {AuthResult} from '../../models/interfaces/AuthResponse';
import {uploadInvoice} from '../../store/thunks/ApiThunks';
import RootNavigation from '../../navigation/RootNavigation';
import AppLoader from '../../components/indicator/AppLoader';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {Dialog, ALERT_TYPE} from 'react-native-alert-notification';
import {appSlice} from '../../store/slices/AppSlice';
import {PermissionManager} from '../../utility/permissions/PermissionManager';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import VectorIcon from '../../components/button/VectorIcon';
import GaTextIcon from '../../components/GaTextIcon';
import {PermissionType} from '../../utility/permissions/PermissionsList';
import {pickMessageFromErrors} from '../../utility/ErrorPicker';
import CropView from '../../components/GaImageEditor';
import GaDocumentScannerAndroid from '../../components/GaDocumentScannerAndroid';
import GaDocumentScannerIos from '../../components/GaDocumentScannerIos';
import {formToJSON} from 'axios';
import {ImageType} from '../../models/enum/ImageType';
interface FileInfo {
  state: UploadState;
  progress: number;
}
enum UploadState {
  idle,
  uploading,
  finished,
}
const formData = new FormData();
const InvoiceUploadScreen = () => {
  const data = useSelector<RootState, AuthResult>(state => {
    return state?.auth?.authResult;
  });
  const [editorSource, setEditorSource] = useState<null | 'gallery' | 'camera'>(
    null,
  );
  const channel_partner = data?.data?.channel_partner;
  const [hasInvoice, setHasInvoce] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [uploadingInvoice, setUploadingInvoice] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] =
    useState<InvoiceUploadItem | null>();

  const timer = useRef<NodeJS.Timeout>();

  const actionSheetRef: any = React.createRef();

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };
  const [invoiceState, setInvoiceState] = useState<FileInfo>({
    state: UploadState.idle,
    progress: 0.0,
  });
  const dispatch = useDispatch();

  const onUploadHandler = async (fromUpload?: boolean) => {
    try {
      setUploadingInvoice(true);

      formData.append('image', {
        uri: uploadedFileInfo?.url,
        type: uploadedFileInfo?.mime,
        name: uploadedFileInfo?.docName,
      });

      formData.append('channel_partner_id', channel_partner.id);
      const result = await store.dispatch(uploadInvoice(formData)).unwrap();

      console.log('RESULT_RASIK', formData);

      if (result.success) {
        dispatch(
          appSlice.actions.openPopup({
            message: AppLocalizedStrings.invoice.uploaded,
            title: AppLocalizedStrings.invoice.invoiceUpload,
            type: 'success',
            onSubmit: () => {
              RootNavigation.navigation.navigate('InvoiceScreen', {
                isLogin: true,
                fromInvoiceUpload: (getInvoiceList: Function) => {
                  return getInvoiceList({}, 1, false);
                },
              });
            },
          }),
        );
      } else if (result.errors) {
        dispatch(
          appSlice.actions.openPopup({
            message: pickMessageFromErrors(result?.errors ?? {}),
            title: AppLocalizedStrings.invoice.invoiceUpload,
            type: 'error',
          }),
        );
      }
    } catch (err) {
      console.log('CODE_OGIR', err);
    }

    setUploadingInvoice(false);
  };

  const deleteImage = () => {
    setUploadedFileInfo(null);
    setEditorSource(null);
  };

  function setImageInfo(imageUrl: string) {
    const invoiceData: any = {};
    invoiceData.docName = 'Invoice_' + new Date().getTime();
    invoiceData.mime = ImageType.JPG;
    invoiceData.status = ReviewStatus?.Pending;
    invoiceData.url = imageUrl;
    setUploadedFileInfo(invoiceData);
    setHasInvoce(true);
  }

  const uploadDocumentHandler = async (id?: number) => {
    if (id === 1) {
      await PermissionManager.checkPermissions(PermissionType.MEDIA).then(
        async response => {
          if (response === false) {
            await PermissionManager.getPermission(PermissionType.MEDIA);
          }
        },
      );
    } else if (id === 0) {
      await PermissionManager.checkPermissions(PermissionType.CAMERA).then(
        async res => {
          console.log('RES_RR', res);

          if (res === false) {
            const result = await PermissionManager.getPermission(
              PermissionType.CAMERA,
            );
            console.log('REQ_PERM', result);
          }
        },
      );
    }

    if (id === 0 || id === 1) {
      id === 0 ? setEditorSource('camera') : setEditorSource('gallery');
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['📷 Camera', '📁 Gallery', 'Cancel'],
          title: 'Select',
          cancelButtonIndex: 2,
          destructiveButtonIndex: 2,
        },

        async selected => {
          if (selected === 2) return;

          selected === 0
            ? setEditorSource('camera')
            : setEditorSource('gallery');
        },
      );
    }
  };

  console.log('UID', uploadedFileInfo);

  useEffect(() => {}, [channel_partner, uploadedFile, uploadedFileInfo]);

  return (
    <SafeAreaView style={styles.screen}>
      {/* <CropView /> */}
      {editorSource &&
        (Platform.OS === 'android' ? (
          <GaDocumentScannerAndroid
            setImageUri={uri => {
              setImageInfo(uri);
            }}
            source={editorSource}
          />
        ) : (
          <GaDocumentScannerIos
            setImageUri={uri => {
              setImageInfo(uri);
            }}
            source={editorSource}
          />
        ))}
      {uploadingInvoice && (
        <Modal>
          <Image
            style={{width: wp('100%'), height: hp('100%')}}
            source={require('../../assets/videos/Channel_Paisa_Loading.gif')}
          />
        </Modal>
      )}
      <AuthBaseScreen
        iconName={hasInvoice ? null : 'invoice_upload'}
        title={''}>
        <View style={styles.fileView}>
          <View>
            <ActionSheet
              tintColor={Colors.primary}
              ref={actionSheetRef}
              options={[
                <GaTextIcon
                  text="Camera"
                  icon={
                    <VectorIcon
                      color={Colors.primary}
                      type="FontAwesome5"
                      name="camera"
                      size={Fonts.getFontSize('headline2')}
                    />
                  }
                />,
                <GaTextIcon
                  text="Gallery"
                  icon={
                    <VectorIcon
                      color={Colors.primary}
                      type="FontAwesome5"
                      name="images"
                      size={Fonts.getFontSize('headline2')}
                    />
                  }
                />,
                <GaTextIcon
                  text="Cancel"
                  textColor={Colors.red}
                  icon={
                    <VectorIcon
                      color={Colors.red}
                      type="Ionicons"
                      name="close"
                      size={Fonts.getFontSize('headline1')}
                    />
                  }
                />,
              ]}
              cancelButtonIndex={2}
              onPress={(id: any) => {
                uploadDocumentHandler(id);
              }}
            />

            {!uploadedFileInfo && (
              <UploadDocument
                title={AppLocalizedStrings.auth.attachFile}
                subTitle={AppLocalizedStrings.auth.choosePaymentReceipts}
                percentage={invoiceState.progress}
                isUploading={invoiceState.state == UploadState.uploading}
                onPress={
                  Platform.OS === 'ios'
                    ? uploadDocumentHandler
                    : showActionSheet
                }
              />
            )}

            {hasInvoice && uploadedFileInfo && (
              <MyUploads
                deleteImage={deleteImage}
                uploadedInvoice={uploadedFileInfo}
                setUploadedFileInfo={setUploadedFileInfo}
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
            onPress={() => {
              onUploadHandler(true);
            }}
            isDisable={!uploadedFileInfo || uploadingInvoice}
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
