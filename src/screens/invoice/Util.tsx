import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

export async function createFileObjectFromPath(filePath: string) {
  try {
    const base64Data = await RNFS.readFile(filePath, 'base64');
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    const fileType = 'image/jpeg'; // Adjust the file type according to your file
    const fileData = `data:${fileType};base64,${base64Data}`;

    let fileUri;
    if (Platform.OS === 'android') {
      fileUri = fileData;
    } else {
      const response = await RNFetchBlob.config({fileCache: true}).fetch(
        'GET',
        fileData,
      );
      fileUri = response.path();
    }

    const file = {
      uri: fileUri,
      type: fileType,
      name: fileName,
    };

    return file;
  } catch (error) {
    console.error('Error creating file object:', error);
    return null;
  }
}

// Usage example
