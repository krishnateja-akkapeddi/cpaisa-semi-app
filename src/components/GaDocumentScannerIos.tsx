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

const GaDocumentScannerIos: React.FC<DocumentScannerProps> = ({
  setImageUri,
  source,
}) => {
  useEffect(() => {
    const handleScanDocument = async (src: 'gallery' | 'camera') => {
      let imgResult;

      if (src === 'camera') {
        imgResult = await GoapptivDocumentScanner.camera();
      } else {
        imgResult = await GoapptivDocumentScanner.gallery();
      }

      imgResult ? setImageUri(imgResult) : console.error('No image result');
    };

    handleScanDocument(source);
  }, [source]);

  return <></>;
};

export default GaDocumentScannerIos;
