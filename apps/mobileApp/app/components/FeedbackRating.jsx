import React, { useState } from "react";
import { View, Text, ToastAndroid, TextInput,  TouchableOpacity, StyleSheet, ScrollView, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { API } from "../screens/Login";
// import { CreateFeedback } from "@/global_state/ApiCalls/complaintApiCalls";
// import Toast from 'react-native-toast-message';
// import { RootState } from "@/global_state/store";

const FeedbackRating = ({ complaint, feedback, setFeedback, complaintId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(-1);
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
  
  // get citizen token from persist storage to send in every request in order to make sure proper authorization
  const token = useSelector((state) => state.app.token);

  const rates = [1, 2, 3, 4, 5];
  const RatingInWords = ["", "Very Bad", "Bad", "Good", "Very Good", "Excellent"];

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleFeedback = async () => {
    console.log('Complaint Details:' ,complaint);
    let feedback1 = {rating, description}
    if (rating > 0) {
      try {
        const res = await API.patch(
          `/api/v1/complaints/feedback/${complaintId}`,
          feedback1,
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
            );
            console.log("complaint feedback filed");
            console.log(res);
            ToastAndroid.showWithGravity(
              "Thanks for your Feedback",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            setDescription('')
            setRating(-1)
            setFeedback(!feedback);
            navigation.navigate('Complaints');
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong, please try again',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Your rating helps us improve our service',
      });
    }
  };
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
      <Pressable>
        <View style={styles.header}>
          <Text style={styles.headerText}>Complaint Feedback</Text>
          <TouchableOpacity onPress={() => setFeedback(!feedback)}>
            <AntDesign name="close" size={24} style={styles.closeIcon} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.serviceText}>Are you satisfied with our service?</Text>
        <Text style={styles.serviceText}>کیا آپ ہماری سروس سے مطمئن ہیں؟</Text>
        <Text style={styles.ratingText}>How would you rate us</Text>
        <View style={styles.ratingContainer}>
          <View style={{display:'flex', flexDirection:'row'}}>
            {rates.map((value) => (
              <TouchableOpacity key={value} onPress={() => handleRatingClick(value)}>
                {value <= rating ? <AntDesign name="star" style={styles.star} size={24} color="grey" /> : <AntDesign name="staro" size={24} color="gray" style={styles.star}/>}
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <Text style={styles.ratingWords}>{rating > -1 ? RatingInWords[rating] : ""}</Text>
          </View>
        </View>
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>Your words are appreciated</Text>
          <Text style={styles.feedbackLabel}>آپ کے الفاظ قابل تعریف ہیں۔</Text>
          <TextInput
            style={styles.feedbackInput}
            multiline
            numberOfLines={5}
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <TouchableOpacity onPress={handleFeedback} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: -hp(35),
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color:'rgb(26, 89, 128)',
  },
  closeIcon: {
    fontSize: 24,
    color: "green",
  },
  serviceText: {
    fontSize: 16,
    textAlign: "center",
    // marginVertical: 10,
    marginTop:7
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  star: {
    fontSize: 32,
    color: "#ffd700",
    marginHorizontal: 5,
  },
  ratingWords: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffd700",
  },
  feedbackContainer: {
    marginVertical: 10,
  },
  feedbackLabel: {
    fontSize: 16,
  },
  feedbackInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FeedbackRating;
