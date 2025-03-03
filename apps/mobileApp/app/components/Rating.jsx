import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // You can replace this with the appropriate icon library
import { FontAwesome } from '@expo/vector-icons';

const rates = [1, 2, 3, 4, 5];

const Rating = ({ totalRating }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {rates.map((value, index) => (
        <React.Fragment key={index}>
          {value <= totalRating ? (
            <AntDesign name="star" size={24} color="gold" />
          ) : (
            <>
              {value > totalRating && totalRating > value - 1 ? (
                <FontAwesome name="star-half-o" size={24} color="gold" />
              ) : (
                <AntDesign name="staro" size={24} color="gray" />
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default Rating;
