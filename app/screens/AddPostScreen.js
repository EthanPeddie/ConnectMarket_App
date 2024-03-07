import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

import { app } from "../../firebaseConfig";

const AddPostScreen = () => {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      setCategoryList([]);
      const querySnapshot = await getDocs(collection(db, "Category"));

      querySnapshot.forEach((doc) => {
        console.log("DOC:", doc.id, " => ", doc.data());
        setCategoryList((category) => [...category, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = (value) => {
    value.image = image;
    console.log(value);
  };

  return (
    <View className="p-10">
      <View className="mb-[20px]">
        <Text className="text-[27px] font-bold">Add New Post</Text>
        <Text className="text-[17px] text-gray-500">
          Create New Post and Start Selling
        </Text>
      </View>
      <View>
        <Formik
          initialValues={{
            title: "",
            description: "",
            category: "",
            price: "",
            address: "",
            image: "",
          }}
          onSubmit={(value) => onSubmitMethod(value)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View>
              <TouchableOpacity
                onPress={pickImage}
                style={{ width: 100, height: 100 }}
              >
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <Image
                    source={require("../../assets/placeholder.png")}
                    style={styles.image}
                  />
                )}
              </TouchableOpacity>

              <TextInput
                placeholder="title"
                value={values.title}
                style={styles.textInput}
                onChangeText={handleChange("title")}
              />
              <TextInput
                placeholder="description"
                value={values.description}
                style={[styles.textInput, { textAlignVertical: "top" }]}
                numberOfLines={5}
                onChangeText={handleChange("description")}
              />
              <TextInput
                placeholder="address"
                value={values.address}
                style={styles.textInput}
                onChangeText={handleChange("address")}
              />
              <TextInput
                placeholder="price"
                value={values.price}
                style={styles.textInput}
                onChangeText={handleChange("price")}
                keyboardType="numeric"
              />
              <View className=" border rounded-xl mt-[10px]">
                <Picker
                  selectedValue={values.category}
                  onValueChange={(itemValue) =>
                    setFieldValue("category", itemValue)
                  }
                >
                  {categoryList !== null &&
                    categoryList.map((item, index) => (
                      <Picker.Item
                        value={item.name}
                        key={index}
                        label={item.name}
                      />
                    ))}
                </Picker>
              </View>
              <TouchableOpacity
                className="bg-blue-700 p-4 rounded-2xl mt-[20px]"
                onPress={handleSubmit}
              >
                <Text className="text-center text-white font-bold text-[15px]">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 17,
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 10,
  },
});

export default AddPostScreen;
