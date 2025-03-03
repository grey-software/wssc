import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS, SIZES, SHADOWS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../GlobalState/UserSlice";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { io } from "socket.io-client";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Audio } from 'expo-av'; // Import Audio from expo-av
import {ip} from '../screens/Login'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, // Set this to true
    shouldSetBadge: false,
  }),
});

const Header = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { wssc, user } = useSelector((state) => state.app);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const [expoPushToken, setExpoPushToken] = useState('');
  const navigation = useNavigation();
  const socket = useRef(null);
  const sound = useRef(new Audio.Sound());

  const handleNewNotification = async (message) => {
    setNotifications(prevNotifications => [...prevNotifications, { message, read: false }]);
    setUnreadCount(prevCount => prevCount + 1);
    // Schedule a push notification
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: message,
          data: { data: 'goes here' },
          sound: true,
        },
        trigger: { seconds: 2 },
      });

      // Play the sound
      if (sound.current._loaded) {
        await sound.current.unloadAsync();
      }
      await sound.current.loadAsync(require('../../assets/livechat-129007.mp3'));
      await sound.current.playAsync();
    } catch (error) {
      console.error('Error scheduling push notification:', error);
    }
  };

  useEffect(() => {
    const initializeSocket = async () => {
      socket.current = io(`http://${ip}:7000`);

      socket.current.on("connect", () => {
        console.log("Socket connected");
      });

      socket.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      socket.current.on('complaint-status-updated1', async data => {
        const { message } = data.payload;
        await handleNewNotification(message);
      });
    };
    const registerForPushNotifications = async () => {
      try {
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }

        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            throw new Error('Failed to get push token for push notification!');
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          setExpoPushToken(token);
          console.log('Expo Push Token:', token);
        } else {
          throw new Error('Must use physical device for Push Notifications');
        }
      } catch (error) {
        console.error('Error registering for push notifications:', error);
      }
    };

    initializeSocket();
    registerForPushNotifications();

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);
  const markNotificationAsRead = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].read = true;
    setNotifications(updatedNotifications);
    setUnreadCount(prevCount => Math.max(prevCount - 1, 0));
  };

  const logOut = () => {
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("wssc");
    AsyncStorage.removeItem("token");
    dispatch(LogOut());
    setIsMenuOpen(false);

    ToastAndroid.showWithGravity(
      "Logged out successfully",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    user &&
    wssc && (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.iconContainer}>
          <Image style={Styles.img} source={require("../../assets/Logo.png")} />
          <Text style={Styles.logoName}>{wssc.shortname}</Text>
        </View>
        <View style={Styles.iconContainer}>
          
        <View style={Styles.iconContainer}>
        <TouchableOpacity onPress={() => setShowAllNotifications(prev => !prev)}>
          <FontAwesome6 name="bell" size={25} color={COLORS.feedbackColor} />
          {unreadCount > 0 && (
            <View style={Styles.notificationBadge} onPress={() => setUnreadCount(0)}>
              <Text style={Styles.notificationCount}>
                {unreadCount}
              </Text>
            </View>
          )}
          </TouchableOpacity>
        {showAllNotifications && (
          <View style={Styles.notificationContainer}>
            <ScrollView contentContainerStyle={Styles.notificationContent}>
              {notifications.map((notification, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => markNotificationAsRead(index)}
                  style={[
                    Styles.notificationText,
                    { backgroundColor: notification.read ? COLORS.readColor : COLORS.unreadColor }
                  ]}
                >
                  <Text style={Styles.notificationText}>
                    {notification.message}
                  </Text>
                </TouchableOpacity>
              ))}

              </ScrollView>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
          {user.profile_image ? (
            <Image style={Styles.img} source={{ uri: user.profile_image }} />
          ) : (
            <FontAwesome
              name="user-circle"
              size={35}
              color={COLORS.primary}
            />
          )}
        </TouchableOpacity>
        </View>
        {isMenuOpen && (
          <Animatable.View
            animation="fadeIn"
            duration={500}
            style={Styles.menu}
          >
           
            <View style={Styles.profile}>
              <Image
                source={
                  user.profile_image
                    ? { uri: user.profile_image }
                    : require("../../assets/Logo.png")
                }
                style={Styles.imgProfile}
              />
              <Text style={Styles.name}>{user.name}</Text>
            </View>
            <TouchableOpacity
              style={Styles.items}
              onPress={() => {
                navigation.navigate("Profile");
                setIsMenuOpen(false);
              }}
            >
              <Feather name="settings" size={20} color={COLORS.primary} />
              <Text style={Styles.item}>Settings</Text>
            </TouchableOpacity>
            <Text
              style={Styles.logout}
              onPress={() => {
                setIsMenuOpen(false);
                logOut();
              }}
            >
              Logout
            </Text>
          </Animatable.View>
        )}
      </SafeAreaView>
    )
  );
};

const Styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: "#fff",
    paddingRight: 12,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
    position: "relative",
  },
  logoName: {
    fontSize: SIZES.large,
    fontWeight: "500",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  notificationContainer: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    maxHeight: 200,
    width: 300,
    overflow: "hidden",
  },
  notificationContent: {
    flexGrow: 1,
  },
  notificationText: {
    fontSize: SIZES.medium,
    marginBottom: 5,
  },
  img: {
    height: 35,
    width: 35,
    borderRadius: 30,
  },
  imgProfile: {
    height: 25,
    width: 25,
    borderRadius: 30,
  },
  menu: {
    position: "absolute",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    top: 80,
    right: 12,
    gap: 12,
    width: 180,
    ...SHADOWS.medium,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  name: {
    fontSize: SIZES.medium,
    fontWeight: "500",
  },
  item: {
    fontSize: SIZES.medium,
  },
  logout: {
    color: "#fff",
    backgroundColor: COLORS.closedColor,
    width: "fit-content",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    width: 65,
  },
  readColor: {
    backgroundColor: '#f0f0f0', // Adjust as needed
  },
  unreadColor: {
    backgroundColor: '#ffffff', // Adjust as needed
  },
});

export default Header;
