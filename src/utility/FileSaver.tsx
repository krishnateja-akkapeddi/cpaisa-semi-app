import RNFS from 'react-native-fs';

export const saveFileToAppSandbox = async (
  fileUri: string,
): Promise<string> => {
  try {
    // Generate a unique file name for the saved file
    const fileName = `${Date.now()}.jpg`; // Adjust the file extension as needed

    // Get the app's document directory path
    const dirPath = RNFS.DocumentDirectoryPath;

    // Create a new directory within the document directory to store the files
    const newDirPath = `${dirPath}/SavedFiles`;
    await RNFS.mkdir(newDirPath);

    // Move the file to the app sandbox
    const destinationPath = `${newDirPath}/${fileName}`;
    await RNFS.moveFile(fileUri, destinationPath);

    console.log('File saved successfully:', destinationPath);
    return destinationPath;
  } catch (error) {
    console.log('File saving error:', error);
    throw error;
  }
};
