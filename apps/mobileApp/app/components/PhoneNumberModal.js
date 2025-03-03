import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

const PhoneNumberModal = ({ isModal, setIsModal, navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOtp = () => {
    // Basic validation: Check if phone number is provided
    if (!phoneNumber) {
      Alert.alert('Invalid Phone Number', 'Please enter your phone number.');
      return;
    }

    // Additional validation (e.g., check if phone number format is correct) goes here...

    // Navigate to OTPModal page and pass phone number as a parameter
    navigation.navigate('OTPModal', { phoneNumber });
    
    // Close the modal
    setIsModal(false);
  };

  return (
    <Modal visible={isModal} onRequestClose={() => setIsModal(false)} animationType='fade' transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <MaterialIcons name='phone' size={72} color={COLORS.primary} />
          <Text style={styles.heading}>Enter Your Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder='Phone Number'
            keyboardType='phone-pad'
            onChangeText={setPhoneNumber}
            value={phoneNumber}
          />
          <TouchableOpacity style={styles.btn} onPress={handleSendOtp}>
            <Text style={styles.btnText}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 20,
    width: '70%',
    gap: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: SIZES.medium,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    width: '100%',
    height: 45,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});

export default PhoneNumberModal;
