import React, {useEffect} from 'react';
import {
  NativeModules,
  NativeEventEmitter,
  Button,
  Platform,
} from 'react-native';

const {GoapptivDocumentScanner} = NativeModules;

interface DocumentScannerProps {
  setImageUri: (uri: string) => void;
  source: 'gallery' | 'camera';
}

const GaDocumentScannerAndroid: React.FC<DocumentScannerProps> = ({
  setImageUri,
  source,
}) => {
  console.info(GoapptivDocumentScanner);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(GoapptivDocumentScanner);

    const onDocumentScanSuccess = (result: {result: string[]}) => {
      const editedImagePath = result.result[0];
      setImageUri('file://' + editedImagePath);
    };

    const whileDocumentScannerCropping = (croppingDoc: any) => {
      console.log('CROPPING_DOC_EVENT', croppingDoc[0]);
    };

    const onDocumentScanCancel = () => {
      console.log('Document scan canceled');
    };

    const documentScanSuccessListener = eventEmitter.addListener(
      'onDocumentScanSuccess',
      onDocumentScanSuccess,
    );
    const documentScanCancelListener = eventEmitter.addListener(
      'onDocumentScanCancel',
      onDocumentScanCancel,
    );
    const documentScannerCroppingListener = eventEmitter.addListener(
      'isImageBeingCropped',
      whileDocumentScannerCropping,
    );

    const handleScanDocument = async (src: 'gallery' | 'camera') => {
      let imgResult;

      if (src === 'camera') {
        GoapptivDocumentScanner.getPicture(
          (error: string | null, result: string[] | null) => {
            if (error) {
              console.log('Error during document scan:', error);
            } else if (result && result.length > 0) {
              const editedImagePath = result[0];
              imgResult = editedImagePath;
            }
          },
        );
      } else {
        GoapptivDocumentScanner.getPictureFromGallery(
          (error: string | null, result: string[] | null) => {
            if (error) {
              console.log('Error during document scan:', error);
            } else if (result && result.length > 0) {
              const editedImagePath = result[0];
              imgResult = editedImagePath;
            }
          },
        );
      }
    };
    handleScanDocument(source);

    return () => {
      documentScanSuccessListener.remove();
      documentScanCancelListener.remove();
      documentScannerCroppingListener.remove();
    };
  }, [source]);

  return <></>;
};

export default GaDocumentScannerAndroid;
