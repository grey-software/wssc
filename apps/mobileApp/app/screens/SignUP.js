import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ToastAndroid,  ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/theme';
import { Feather } from '@expo/vector-icons';
import { API } from './Login';
import { RH, RW } from '../components/Responsive';

const SignUP = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isFocus, setIsFocus] = useState();
    const [WSSC_CODE, setWSSC] = useState('');
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false); 
  
    // Function to toggle the password visibility state 
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 

    const data = [
        { label: 'Peshawar', value: 'wsscp25001' },
        { label: 'Mardan', value: 'wsscm23200' },
        { label: 'Kohat', value: 'wssck026010' },
        { label: 'Swat', value: 'wsscs19200' },
        { label: 'Abbottabad', value: 'wssca22020' },
    ];

    const signUp = async () => {
        setLoading(true)
        if (name == '' || phone == '' || password == '' || confirmPass == '' || WSSC_CODE == '') {
            ToastAndroid.showWithGravity(
                'Please provide all the information',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            setLoading(false)
            return;
        } else if (password !== confirmPass) {
            ToastAndroid.showWithGravity(
                'Passwords does not match',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            setLoading(false)
        } else {
            try {
                const res = await API.post('/api/v1/auth/signup', { name, phone, password, WSSC_CODE });

                setLoading(false)

                ToastAndroid.showWithGravity(
                    'Account created 🎉, Please login to continue',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                navigation.navigate("Login");
            } catch (error) {
                setLoading(false)
                ToastAndroid.showWithGravity(
                    'Something went wrong!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        }
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.innerContainer}>
            <View style={Styles.logoContainer}>
            <Image
                style={Styles.logo}
                source={require('../../assets/govt_logo.jpeg')}
            />
            </View>
           <View style={Styles.title}>
            <Text style={Styles.titleText}>آپ کی آواز، ہمارا عزم</Text>
            <Text style={Styles.titleText}>Your Voice, Our Commitment</Text>
          </View>
            <View style={Styles.form}>
                <View style={Styles.formInput}>
                <TextInput style={Styles.input} placeholder='User Name | صارف نام' keyboardType='name-phone-pad' onChangeText={(value) => setName(value)} />
                </View>
                <View style={Styles.formInput}>
                <TextInput style={Styles.input} placeholder='Mobile Number | فون نمبر' keyboardType='number-pad' onChangeText={(value) => setPhone(value)} />
                </View>
                <View style={Styles.formInput1}>
                <TextInput style={Styles.input} placeholder='Create Password | پاس ورڈ بنائیں' keyboardType='ascii-capable' onChangeText={(value) => setPassword(value)} secureTextEntry={!showPassword} />
                <MaterialCommunityIcons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa" 
                    onPress={toggleShowPassword} 
                /> 
                </View>
                <View style={Styles.formInput1}>
                <TextInput style={Styles.input} placeholder='Confirm Password | تصدیق کریں' keyboardType='ascii-capable' onChangeText={(value) => setConfirmPass(value)} secureTextEntry={!showPassword} />
                <MaterialCommunityIcons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    onPress={toggleShowPassword} 
                /> 
                </View>

                <Dropdown
                    style={[Styles.dropdown, isFocus && { borderColor: COLORS.primary }]}
                    placeholderStyle={Styles.placeholderStyle}
                    selectedTextStyle={Styles.selectedTextStyle}
                    inputSearchStyle={Styles.inputSearchStyle}
                    iconStyle={Styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={WSSC_CODE}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setWSSC(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <FontAwesome6
                            style={Styles.icon}
                            color={isFocus ? COLORS.primary : 'black'}
                            name="map"
                            size={20}
                        />
                    )}
                />

            
            <TouchableOpacity style={Styles.submitButton} onPress={signUp}>
                {
                    !loading ? <Text style={Styles.buttonText} >Sign Up</Text> : <Feather style={Styles.icon} name="loader" size={28} color='#fff' />
                }
            </TouchableOpacity>
            </View>
            <View style={Styles.additionalText}>
                <Text style={Styles.additionalTextText}>Already have an account?{' '} <Text
              style={Styles.clickableText}
              onPress={() => navigation.navigate('Login')}>
              Click here
            </Text>
          </Text>
            </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
      },logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      logo: {
        width: RW(30), // Updated width using RW
        height: RW(30), // Updated height using RW
      },
        title: {
          marginLeft: 10,
          alignItems: 'center',
          justifyContent: 'center',
        },
        titleText: {
          fontSize: 14,
          color: '#718096',
          fontWeight: '600',
          textAlign: 'center',
        },
        form: {
              width: '100%',
            },
        formInput: {
              position: 'relative',
              marginTop: 10,
              marginBottom: 15,
              borderBottomWidth: 2,
              borderBottomColor: '#cbd5e0',
            },
            formInput1: {
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center', 
              backgroundColor: '#f3f3f3', 
              paddingHorizontal: 14,
              position: 'relative',
              marginTop: 10,
              marginBottom: 15,
              borderBottomWidth: 2,
              borderBottomColor: '#cbd5e0',
            },
        input: {
              paddingVertical: 10,
              paddingHorizontal: 0,
              fontSize: 16,
              color: '#000',
              width: '100%',
            },
    
        passwordContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          marginBottom: 15,
        },  
        iconContainer: {
          position: 'absolute',
          right: 10,
        }, 
        submitButton: {
          width: '100%',
          backgroundColor: '#29a329',
          borderRadius: 40,
          paddingVertical: 15,
          marginTop: 10,
          alignItems: 'center',
          shadowColor: 'blue', // Shadow color
          shadowOffset: { width: 0, height: 2 }, // Shadow offset
          shadowOpacity: 3, // Shadow opacity
          shadowRadius: 3, // Shadow radius
          elevation: 10, // Android shadow elevation
      },
        buttonText: {
          fontSize: 18,
          color: '#fff',
          fontWeight: '300',
        },
         
        additionalText: {
          marginTop: 20,
          alignItems: 'center',
        },
        additionalTextText: {
          fontSize: 14,
          color: '#4a5568',
          textAlign: 'center',
        },
        clickableText: {
          color: '#4299e1',
          textDecorationLine: 'underline',
        },
        icon: {
            marginRight: 5,
        },
        label: {
            position: 'absolute',
            backgroundColor: 'white',
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
        },
        placeholderStyle: {
            fontSize: 16,
        },
        selectedTextStyle: {
            fontSize: 16,
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },


})

export default SignUP