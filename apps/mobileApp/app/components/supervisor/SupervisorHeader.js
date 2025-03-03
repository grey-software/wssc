import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ToastAndroid,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS, SIZES, SHADOWS } from "../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../../GlobalState/SupervisorSlice";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { io } from "socket.io-client";
import { Audio } from "expo-av";
import * as Notifications from "expo-notifications";
import { ip } from "@/app/screens/Login";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const SupervisorHeader = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { WSSC, supervisor } = useSelector((state) => state.supervisor);
  const [notifications, setNotifications] = useState([]);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const socket = useRef(null);
  const navigation = useNavigation();
  const sound = useRef(new Audio.Sound());

  const handleNewNotification = async (message) => {
    setNotifications(prevNotifications => [...prevNotifications, { message, read: false }]);
    setNewNotificationsCount(prevCount => prevCount + 1);

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
      await sound.current.loadAsync(require('../../../assets/livechat-129007.mp3'));
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

      socket.current.on('complaint-status-updated', async data => {
        const { message } = data.payload;
        await handleNewNotification(message);
      });
    };

    initializeSocket();

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
    setNewNotificationsCount(prevCount => Math.max(prevCount - 1, 0));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    setNewNotificationsCount(0);
  };

  const logOut = () => {
    AsyncStorage.removeItem("supervisor");
    AsyncStorage.removeItem("swssc");
    AsyncStorage.removeItem("stoken");
    dispatch(LogOut());
    setIsMenuOpen(false);

    ToastAndroid.showWithGravity(
      "Logged out successfully",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    supervisor &&
    WSSC && (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.iconContainer}>
          <Image
            style={Styles.img}
            source={require("../../../assets/Logo.png")}
          />
          <Text style={Styles.logoName}>{WSSC.shortname}</Text>
        </View>
        <View style={Styles.iconContainer}>
          <View style={Styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowAllNotifications(prev => !prev);
                markAllAsRead(); // Mark all notifications as read when opening
              }}
            >
              <FontAwesome6
                name="bell"
                size={25}
                color={COLORS.feedbackColor}
              />
              {newNotificationsCount > 0 && (
                <View style={Styles.notificationBadge}>
                  <Text style={Styles.notificationCount}>
                    {newNotificationsCount > 3 ? '3+' : newNotificationsCount}
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
                        Styles.notificationItem,
                        notification.read ? Styles.readNotification : Styles.unreadNotification
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
            {supervisor.profile_image ? (
              <Image
                style={Styles.img}
                source={{ uri: supervisor.profile_image }}
              />
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
                  supervisor.profile_image
                    ? { uri: supervisor.profile_image }
                    : require("../../../assets/Logo.png")
                }
                style={Styles.imgProfile}
              />
              <Text style={Styles.name}>{supervisor.name}</Text>
            </View>
            <TouchableOpacity
              style={Styles.items}
              onPress={() => {
                navigation.navigate("supervisorProfile");
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
  notificationItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationText: {
    fontSize: SIZES.medium,
  },
  readNotification: {
    backgroundColor: '#f0f0f0', // Adjust as needed
  },
  unreadNotification: {
    backgroundColor: '#ffffff', // Adjust as needed
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
});

export default SupervisorHeader;
