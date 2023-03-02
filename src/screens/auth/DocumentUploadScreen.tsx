import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {wp, hp} from '../../utility/responsive/ScreenResponsive';
import UploadDocument from '../../components/app/UploadDocument';
import Spacer from '../../components/layout/Spacer';
import {AppLocalizedStrings} from '../../localization/Localization';
import UploadedDocument from '../../components/app/UploadedDocument';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import RootNavigation from '../../navigation/RootNavigation';

enum UploadState {
  idle,
  uploading,
  finished,
}

enum DocumentType {
  banner,
  letterHead,
}

interface FileInfo {
  state: UploadState;
  progress: number;
}

const DocumentUploadScreen = () => {
  const bannerTimer = useRef<NodeJS.Timeout>();
  const letterTimer = useRef<NodeJS.Timeout>();

  const [bannerState, setBannerState] = useState<FileInfo>({
    state: UploadState.idle,
    progress: 0.0,
  });
  const [letterHeadState, setLetterHeadState] = useState<FileInfo>({
    state: UploadState.idle,
    progress: 0.0,
  });

  const uploadDocumentHandler = (type: DocumentType) => {
    if (type == DocumentType.banner) {
      if (bannerState.state == UploadState.idle) {
        bannerTimer.current = setInterval(() => {
          setBannerState(updateState(type));
        }, 50);
      }
    } else {
      letterTimer.current = setInterval(() => {
        setLetterHeadState(updateState(type));
      }, 50);
    }
  };

  const updateState = (type: DocumentType): FileInfo => {
    let newState = type == DocumentType.banner ? bannerState : letterHeadState;
    const newProgress = newState.progress + 1;
    const newUploadState =
      newProgress == 100 ? UploadState.finished : UploadState.uploading;
    newState.progress = newProgress;
    newState.state = newUploadState;
    if (newUploadState == UploadState.finished) {
      if (type == DocumentType.banner) {
        clearInterval(bannerTimer.current);
      } else {
        clearInterval(letterTimer.current);
      }
    }
    return {...newState};
  };

  const onUploadHandler = () => {
    RootNavigation.navigate('ChooseOrganisationScreen');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        {bannerState.state == UploadState.finished ? (
          <UploadedDocument />
        ) : (
          <UploadDocument
            onPress={uploadDocumentHandler.bind(this, DocumentType.banner)}
            title={AppLocalizedStrings.auth.uploadBanner}
            subTitle={AppLocalizedStrings.auth.attachBanner}
            percentage={bannerState.progress}
            isUploading={bannerState.state == UploadState.uploading}
          />
        )}
        <Spacer height={hp('2%')} />
        {letterHeadState.state == UploadState.finished ? (
          <UploadedDocument />
        ) : (
          <UploadDocument
            onPress={uploadDocumentHandler.bind(this, DocumentType.letterHead)}
            title={AppLocalizedStrings.auth.uploadLetterHead}
            subTitle={AppLocalizedStrings.auth.attachLetterHead}
            isUploading={letterHeadState.state == UploadState.uploading}
            percentage={letterHeadState.progress}
          />
        )}
      </View>
      <AdaptiveButton
        isDisable={
          !(
            bannerState.state == UploadState.finished &&
            letterHeadState.state == UploadState.finished
          )
        }
        title={AppLocalizedStrings.auth.upload}
        onPress={onUploadHandler}
      />
    </SafeAreaView>
  );
};

export default DocumentUploadScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: wp('5%'),
  },
  container: {
    flex: 1,
  },
});
