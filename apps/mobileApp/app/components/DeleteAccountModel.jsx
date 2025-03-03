import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ToastAndroid } from 'react-native';
import { UserAccountDelete } from '../GlobalState/authApiCalls'; // Assuming you have this function
import { RootState } from '../GlobalState/store';
import { useNavigation } from '@react-navigation/native';



const DeleteAccountModel = ({setDeleteAccountt}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token, user } = useSelector((state) => state.app);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [confirmPressed, setConfirmPressed] = useState(false);
  const DeleteUserAccount = async () => {
    if (!user) {
      ToastAndroid.show('User not logged in', ToastAndroid.SHORT);
      return;
    }

    const userId = user._id;

    try {
      const res = await UserAccountDelete(dispatch, userId, token);
      if (res.status === 200) {
        ToastAndroid.show('Account deleted successfully', ToastAndroid.SHORT);
        // setShowModal(false);
        navigation.navigate('Login')
      } else {
        ToastAndroid.show('Error deleting account', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      ToastAndroid.show('An error occurred', ToastAndroid.SHORT);
    }
  };

  const CancelDeleteAccount = () => {
    // setShowModal(false);
    setDeleteAccountt(false)
  };
  return (
    <View style={styles.container}>
     <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.message}>
            Are you sure you want to delete your account permanently?
          </Text>

          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={CancelDeleteAccount} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          <TouchableOpacity onPress={DeleteUserAccount} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
           
           
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginRight: 15,
    backgroundColor: '#aaa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  confirmButton: {
    backgroundColor: '#f00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#f00',
    fontWeight: 'bold',
  },
});
export default DeleteAccountModel;
