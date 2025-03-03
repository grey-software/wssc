import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Adjust according to your store structure
import { ChangedPassword } from '../GlobalState/authApiCalls'; // Your API function for changing passwords
import { RootState } from '../GlobalState/store';
import BreadCrumb from './BreadCrumb';
import { FontAwesome5 } from '@expo/vector-icons';

const PasswordChangeModel = ({setUpdatePassword}) => {
  const [pass, setPass] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.app);
  const [loading, setLoading] = useState(false);

  const UpdatedPassword = async () => {
    if (pass !== confirmpass) {
      ToastAndroid.show('Passwords do not match. Please make sure both passwords are identical.', ToastAndroid.SHORT);
      return;
    }
    if (!user) {
      ToastAndroid.show('User not logged in', ToastAndroid.SHORT);
      return;
    }
    const userId = user._id;
    const updatedPass = {
      password: pass,
    };

    setLoading(true);

    try {
      const res = await ChangedPassword(dispatch, updatedPass, userId, token);
      // console.log('token:',token);
      // console.log('Response status:', res.status);
      // console.log('Response data:', res.data);
      
// console.log('id: ',token);
      if (res.status === 200) {
        ToastAndroid.show('Password changed successfully', ToastAndroid.SHORT);
        setUpdatePassword(false)
      } else {
        ToastAndroid.show('Something went wrong, try again', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      ToastAndroid.show('An unexpected error occurred, please try again', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.breadCrumb}>
      <FontAwesome5 name='arrow-circle-left' size={30} color={'gray'}
                onPress={() => setUpdatePassword(false)} />
      <Text style={styles.title}>Update Password</Text>
      <Text style={styles.blank}></Text>
      </View>

      <TextInput
        onChangeText={(value) => setPass(value)}
        secureTextEntry
        placeholder="New Password"
        style={styles.input}
      />
      <TextInput
        onChangeText={(value) => setConfirmpass(value)}
        secureTextEntry
        placeholder="Confirm New Password"
        style={styles.input}
      />

      <TouchableOpacity onPress={UpdatedPassword} style={styles.changeButton}>
        <Text style={styles.changeButtonText}>Change Password</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007bff" style={styles.loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  blank:{
    width:10
  },
  breadCrumb: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 10,
  },
  changeButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});

export default PasswordChangeModel;
