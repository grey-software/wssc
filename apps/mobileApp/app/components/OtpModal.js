import React, { useState, useRef } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

const OtpModal = ({ isModal, setIsModal, confirm, setConfirm, phone }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleVerify = () => {
    // Combine OTP digits into a single string
    const otpValue = otp.join('');

    // Basic validation: Check if OTP is 4 digits
    if (otpValue.length !== 4 || isNaN(otpValue)) {
      Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP.');
      return;
    }

    // Additional verification logic goes here...

    // If OTP verification succeeds, execute the 'confirm' callback
    if (confirm) {
      confirm(otpValue);
    }

    // Close the modal
    setIsModal(false);
  };

  const focusInput = (index) => {
    inputRefs.current[index].focus();
  };

  const handleInputChange = (value, index) => {
    // Update OTP array with the new value
    const newOtp = [...otp];
    newOtp[index] = value;

    // Set the updated OTP state
    setOtp(newOtp);

    // Auto-focus on the next input field
    if (value && value.length === 1 && index < 3) {
      focusInput(index + 1);
    }
  };

  return (
    <Modal visible={isModal} onRequestClose={() => setIsModal(false)} animationType='fade' transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <MaterialIcons name='verified-user' size={72} color={COLORS.primary} />
          <Text style={styles.heading}>Enter OTP Code</Text>
          <View style={styles.inputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.input}
                maxLength={1}
                keyboardType='numeric'
                onChangeText={(value) => handleInputChange(value, index)}
                value={digit}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.btn} onPress={handleVerify}>
            <Text style={styles.btnText}>Verify</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    width: 45,
    height: 45,
    fontSize: 35,
    textAlign: 'center',
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

export default OtpModal;
