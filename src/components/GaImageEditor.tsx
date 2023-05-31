// import React, {useEffect, useState} from 'react';
// import AmazingCropper, {DefaultFooter} from 'react-native-amazing-cropper';
// import {Dimensions, Modal, View} from 'react-native';
// import {wp, hp} from '../utility/responsive/ScreenResponsive';
// import {getImageDimensions} from '../utility/ImageSizeGetter';
// import CustomCropperFooter from './CustomFooter';

// interface AmazingCropperPageProps {
//   path: string;
//   onError?: Function;
//   onDone: (p: string) => void;
//   onCancel: Function;
// }

// const GaImageEditor: React.FC<AmazingCropperPageProps> = ({
//   path,
//   onCancel,
//   onDone,
//   onError,
// }) => {
//   const [width, setWidth] = useState<number>(wp(100));
//   const [heght, setHeight] = useState<number>(10);
//   const [openEditor, setOpenEditor] = useState(false);

//   async function getDime() {
//     await getImageDimensions(path).then(d => {
//       setWidth(d.width);
//       setHeight(d.height);
//     });
//   }
//   useEffect(() => {
//     getDime();
//   }, []);
//   console.log('PATH_OF_IMAGE', path, width, heght);

//   return (
//     <View>
//       <Modal>
//         <View
//           style={[
//             {
//               width: wp(100),
//               height: hp(100),
//             },
//           ]}>
//           <AmazingCropper
//             COMPONENT_WIDTH={wp(100)}
//             COMPONENT_HEIGHT={hp(100)}
//             footerComponent={<CustomCropperFooter />}
//             onError={onError && onError()}
//             onCancel={() => {
//               onCancel();
//             }}
//             onDone={p => {
//               onDone(p);
//             }}
//             imageUri={path}
//           />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default GaImageEditor;

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const GaImageEditor = (props: Props) => {
  return (
    <View>
      <Text>GaImageEditor</Text>
    </View>
  );
};

export default GaImageEditor;

const styles = StyleSheet.create({});
