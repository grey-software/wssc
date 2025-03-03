import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { COLORS, SHADOWS } from '../constants/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { SetUserData } from '../GlobalState/UserSlice';
import { Feather } from '@expo/vector-icons';
import { RH, RW, RF, RR } from '../components/Responsive';
import {SetSupervisorData} from '../GlobalState/SupervisorSlice'
import { Octicons,Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

export const ip = '192.168.0.103'
export const API = axios.create({ baseURL: `http://${ip}:7000` }); 

const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false); 
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState('');
    const [supervisor,setSupervisor] = useState(false)

    const [showPassword, setShowPassword] = useState(false); 
  
    // Function to toggle the password visibility state 
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 

    const logIn = async () => {
      if (!supervisor) {
          if (phone == '' || password == '') {
              return;
          } else {
              // api call
              setLoading(true)
              try {
                  const res = await API.post('/api/v1/auth/signin', { phone, password });
                  await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
                  await AsyncStorage.setItem('wssc', JSON.stringify(res.data.WSSC));
                  await AsyncStorage.setItem('token', JSON.stringify(res.data.token));
                  console.log(res.data);
                  dispatch(SetUserData({ user: res.data.user, wssc: res.data.WSSC, token: res.data.token }))
                  setLoading(false);
                  ToastAndroid.showWithGravity(
                      'Welcome to the app 🎉',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                  );
  
  
              } catch (error) {
                  setLoading(false)
                  if (error.response) {
                      if (error.response.status == 404) {
                          ToastAndroid.showWithGravity(
                              'User not found 😔',
                              ToastAndroid.SHORT,
                              ToastAndroid.CENTER,
                          );
                      } else if (error.response.status == 400) {
                          ToastAndroid.showWithGravity(
                              'Incorrect phone or password',
                              ToastAndroid.SHORT,
                              ToastAndroid.CENTER,
                          );
                      } else {
                          ToastAndroid.showWithGravity(
                              'Something went wrong 😟',
                              ToastAndroid.SHORT,
                              ToastAndroid.CENTER,
                          );
                      }
                  }
              }
  
  
          }
      } else {
          if (phone == '' || password == '') {
              return;
          } else {
              // api call
              setLoading(true)
              try {
                  const res = await API.post('/api/v1/supervisors/signin', { phone, password });
                  await AsyncStorage.setItem('supervisor', JSON.stringify(res.data.supervisor));
                  await AsyncStorage.setItem('swssc', JSON.stringify(res.data.WSSC));
                  await AsyncStorage.setItem('stoken', JSON.stringify(res.data.supervisorToken));
                  console.log(res.data);
                  dispatch(SetSupervisorData({ supervisor: res.data.supervisor, WSSC: res.data.WSSC, supervisorToken: res.data.supervisorToken }))
                  setLoading(false);
                  ToastAndroid.showWithGravity(
                      'Welcome to the app 🎉',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER,
                  );
  
  
              } catch (error) {
                  setLoading(false)
                  if (error.response) {  
                      if (error.response.status == 404) {
                          ToastAndroid.showWithGravity(
                              'User not found 😔',
                              ToastAndroid.SHORT,
                              ToastAndroid.CENTER,
                          );
                      } else if (error.response.status == 400) {
                          ToastAndroid.showWithGravity(
                              'Incorrect phone or password',
                              ToastAndroid.SHORT,
                              ToastAndroid.CENTER,
                          );
                      } else {
                          ToastAndroid.showWithGravity(
                              'Something went wrong 😟',
                              ToastAndroid.SHORT,
                              ToastAndroid.CENTER,
                          );
                      }
                  }
              }
  
  
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
            <Text style={Styles.titleText}>Your Voice, Our Commitment</Text>
            </View>
            <View style={Styles.form}>
                <View style={Styles.formInput}>
                <TextInput style={Styles.input} placeholder='Mobile Number | فون نمبر' keyboardType='number-pad' onChangeText={(value) => setPhone(value)} />
                </View>
                <View style={Styles.formInput1}>
                <TextInput style={Styles.input} placeholder='Enter Password | پاس ورڈ درج کریں' keyboardType='ascii-capable' onChangeText={(value) => setPassword(value)} secureTextEntry={!showPassword} />
                <MaterialCommunityIcons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    // style={Styles.icon} 
                    onPress={toggleShowPassword} 
                /> 
                </View>
            </View>

            <TouchableOpacity style={Styles.submitButton} onPress={logIn}>
                {
                    !loading ? <Text style={Styles.buttonText} >Login</Text> : <Feather style={Styles.icon} name="loader" size={28} color='#fff' />
                }
            </TouchableOpacity>
            {/* Button for Supervisor */}
           <KeyboardAvoidingView style={Styles.btnContainer} behavior="padding">
           <TouchableOpacity style={[Styles.btn, supervisor ? Styles.inactiveBtn : Styles.activeBtn]} onPress={() => setSupervisor(true)}>
                    <Text style={[Styles.btnText, supervisor ? Styles.activeBtnText : Styles.inactiveBtnText]}>Supervisor</Text>
                </TouchableOpacity>

                {/* Button for Citizen */}
                <TouchableOpacity style={[Styles.btn, !supervisor ? Styles.inactiveBtn : Styles.activeBtn]} onPress={() => setSupervisor(false)}>
                    <Text style={[Styles.btnText, !supervisor ? Styles.activeBtnText : Styles.inactiveBtnText]}>{'   '} Citizen {'   '}</Text>
                </TouchableOpacity>
           </KeyboardAvoidingView>
        
        {/* Additional Text */}
        {!supervisor ? (
    <View style={Styles.additionalText}>
        <Text style={Styles.additionalTextText}>
            Create an account{' '}
            <Text
                style={Styles.clickableText}
                onPress={() => navigation.navigate('SignUp')}>
                Click here
            </Text>
        </Text>
        <Text style={Styles.additionalTextText}>ہمارے ساتھ رجسٹر کریں</Text>
    </View>
) : (
    <View style={Styles.additionalText}>
        <Text style={Styles.additionalTextText}>
            Login here{' '}
        </Text>
        <Text style={Styles.additionalTextText}>ہمارے ساتھ لاگ ان کریں</Text>
    </View>
)}
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
    width: RW(85),
  },
  logoContainer: {
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
    fontSize: 16,
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
    // borderBottomWidth: 2,
    // borderBottomColor: '#cbd5e0',
    width: '100%',
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
    fontWeight: '400',
  },
  activeBtn: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
},
  inactiveBtn: {
    backgroundColor: '#29a329',
    borderColor: '#4299e1',
},

activeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
},
inactiveBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '300',
},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'fixed',
    bottom: -100,
    width: '100%',
    paddingHorizontal: 20,
},
btn: {
  backgroundColor: COLORS.primary,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 18,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: 'blue',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 7,
},
btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    // textTransform: 'uppercase',
},

  linkContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  additionalText: {
    marginTop: 10,
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
});


export default Login