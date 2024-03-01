import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <View>
      <Image
        source={require("../../assets/login.webp")}
        className="h-[400px] object-cover"
      />
      <View className="p-8 h-full bg-white mt-[-20px] rounded-t-3xl">
        <Text className=" text-[30px] font-bold">ConnectMarket</Text>
        <Text className=" text-slate-500 text-[18px] mt-6">
          Welcome to ConnectMarket – where buying meets selling in your
          community.
        </Text>
        <TouchableOpacity
          onPress={() => console.log("tap")}
          className="bg-blue-500 p-4 rounded-full mt-20"
        >
          <Text className="text-center text-white text-[18px]">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
