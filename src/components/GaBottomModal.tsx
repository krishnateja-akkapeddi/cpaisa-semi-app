import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {wp} from '../utility/responsive/ScreenResponsive';

type BottomModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const GaBottomModal: React.FC<BottomModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  const [modalVisible, setModalVisible] = useState(visible);

  const handleClose = () => {
    setModalVisible(false);
    onClose();
  };

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'flex-start',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomRadius: 10,
    marginHorizontal: 20,
    marginBottom: 2,
    alignItems: 'flex-start',
    width: wp('100%'),
  },
});

export default GaBottomModal;
