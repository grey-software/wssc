import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { COLORS, SHADOWS, SIZES } from "../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { complaints_types } from "./../../assets/data/complaintTypes";
import ComplaintTypeItem from "../components/ComplaintTypeItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "./Login";
import { ScrollView } from "react-native-gesture-handler";
import { RH, RW, RF, RR } from '../components/Responsive';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Home = () => {
    const navigation = useNavigation();
    const [allComplaintsCount, setAllComplaintsCount] = useState(0);
    const [inprogressComplaintsCount, setInProgressComplaintsCount] = useState(0);
    useEffect(() => {
      const fetchComplaintsCount = async () => {
        navigation.addListener("focus", async () => {
          try {
            const storedToken = await AsyncStorage.getItem("token");
            const token = JSON.parse(storedToken);
    
            const res = await API.get("/api/v1/complaints", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
    
            const allComplaints = res.data.allComplaints;
            const allComplaintsCount = allComplaints.length; // Calculate the length of the array for count
            console.log('',allComplaintsCount);
            const InProgress = allComplaints.status = 'InProgress';
            setAllComplaintsCount(allComplaintsCount); // Update state with the count
            setInProgressComplaintsCount(InProgress.length);
          } catch (error) {
            console.log("Error fetching complaints:", error);
          }
        });
      };
    
      fetchComplaintsCount();
    }, []);
    
  return (
    <View style={Styles.container}>
      {/* <View style={Styles.tabsContainer}>
        <TouchableOpacity style={Styles.tab}>
          <Text style={Styles.tabNumber}>{inprogressComplaintsCount}</Text>
          <Text style={Styles.tabString}>InProgress</Text>
        </TouchableOpacity>
        <Text style={Styles.divider}></Text>
        <TouchableOpacity style={Styles.tab}>
          <Text style={Styles.tabNumber}>{allComplaintsCount}</Text>
          <Text style={Styles.tabString}>All Complaints</Text>
        </TouchableOpacity>
        <Text style={Styles.divider}></Text>
        <MaterialIcons
          onPress={() => navigation.navigate("Complaints")}
          name="keyboard-arrow-right"
          size={35}
          color={COLORS.primary}
        />
      </View> */}
      <Text style={Styles.heading}>Please choose complaint type</Text>
      <FlatList
        numColumns={2}
        data={complaints_types}
        renderItem={({ item, index }) => (
          <ComplaintTypeItem complaintType={item} index={index} />
        )}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{
          columnGap: 50,
          alignItems: "start",
          marginVertical: RH(1.5),
          flexGrow: 1,
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    // margin: RH(0.9),
    margin: wp('2%'),
    marginTop: hp('2.6%'),
  },
  tabsContainer: {
    // marginTop: RH(0.89),
    marginTop: wp('2%'),
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderColor: COLORS.primary,
    borderWidth: 1,
    ...SHADOWS.medium,
    gap: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tab: {
    alignItems: "center",
  },
  tabNumber: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontWeight: "700",
  },
  tabString: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  divider: {
    borderColor: COLORS.gray2,
    borderWidth: 1,
  },
  heading: {
    marginTop: RH(1.5),
    fontSize: SIZES.large,
    fontWeight: "500",
    color: COLORS.gray,
    textAlign: "center",
  },
});

export default Home;
