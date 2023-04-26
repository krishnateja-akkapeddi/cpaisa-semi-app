import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  ActionSheetIOS,
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
import ImageCropPicker from 'react-native-image-crop-picker';
import {Dialog, ALERT_TYPE} from 'react-native-alert-notification';
import {appSlice} from '../../store/slices/AppSlice';
import {PermissionManager} from '../../utility/permissions/PermissionManager';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import VectorIcon from '../../components/button/VectorIcon';
import GaTextIcon from '../../components/GaTextIcon';
import {PermissionType} from '../../utility/permissions/PermissionsList';
import {pickMessageFromErrors} from '../../utility/ErrorPicker';
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
  const data = useSelector<RootState, AuthResult>(state => {
    return state?.auth?.authResult;
  });
  const channel_partner = data?.data?.channel_partner;
  const [hasInvoice, setHasInvoce] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<any>();
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
    !fromUpload && showActionSheet();
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

      const result = await store.dispatch(uploadInvoice(formData)).unwrap();
      console.log('RESULT_RASIK', result);

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
      console.log('DSJF', err);
    }

    setUploadingInvoice(false);
  };

  const deleteImage = () => {
    setUploadedFileInfo(null);
  };

  const uploadDocumentHandler = async (id?: number) => {
    await PermissionManager.checkPermissions(PermissionType.MEDIA).then(
      async response => {
        if (response === false) {
          await PermissionManager.getPermission(PermissionType.MEDIA);
        }
      },
    );
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
    console.log('FROM_IDEs', id === 0);

    if (id === 0 || id === 1) {
      try {
        const result =
          id === 0
            ? await ImageCropPicker.openCamera({
                cropping: true,
                enableRotationGesture: false,
                showCropGuidelines: true,
              }).then(async croppedResult => {
                return croppedResult;
              })
            : await ImageCropPicker.openPicker({
                cropping: true,
                enableRotationGesture: false,
                showCropGuidelines: true,
              }).then(async imageResult => {
                return imageResult;
              });

        setUploadedFile(result);

        const invoiceData: any = {};
        invoiceData.docName = result?.filename ?? 'Invoice';
        invoiceData.mime = result?.mime;
        invoiceData.status = ReviewStatus?.Pending;
        invoiceData.url = result?.path ?? '';
        setUploadedFileInfo(invoiceData);

        if (invoiceState.state == UploadState.idle) {
          timer.current = setInterval(() => {
            setInvoiceState(updateState());
          }, 50);
        }
      } catch (err) {
        console.log(err);
        PermissionManager.getPermission(PermissionType.CAMERA);
      }
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['📷 Camera', '📁 Gallery'],
          title: 'Select',
        },
        async selected => {
          try {
            const result =
              selected === 0
                ? await ImageCropPicker.openCamera({
                    cropping: true,
                    enableRotationGesture: false,
                    showCropGuidelines: true,
                  }).then(async cropResult => {
                    return cropResult;
                  })
                : await ImageCropPicker.openPicker({
                    cropping: true,
                    enableRotationGesture: false,
                    showCropGuidelines: true,
                  }).then(async invResult => {
                    return invResult;
                  });

            setUploadedFile(result);

            const invoiceData: any = {};
            invoiceData.docName = result?.filename ?? 'Invoice';
            invoiceData.mime = result?.mime;
            invoiceData.status = ReviewStatus?.Pending;
            invoiceData.url = result?.path ?? '';
            setUploadedFileInfo(invoiceData);

            if (invoiceState.state === UploadState.idle) {
              timer.current = setInterval(() => {
                setInvoiceState(updateState());
              }, 50);
            }
          } catch (err) {
            const permission = await PermissionManager.checkPermissions(
              PermissionType.MEDIA,
            );

            console.log('UPLOAD_FILE', err);
          }
        },
      );
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

            <UploadDocument
              title={AppLocalizedStrings.auth.attachFile}
              subTitle={AppLocalizedStrings.auth.choosePaymentReceipts}
              percentage={invoiceState.progress}
              isUploading={invoiceState.state == UploadState.uploading}
              onPress={
                Platform.OS === 'ios' ? uploadDocumentHandler : showActionSheet
              }
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
            onPress={() => {
              onUploadHandler(true);
            }}
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
