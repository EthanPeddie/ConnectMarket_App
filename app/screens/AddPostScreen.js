import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";

const AddPostScreen = () => {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

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
          onSubmit={(value) => console.log(value)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View>
              <TextInput
                placeholder="itle"
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
              <TouchableOpacity
                className="bg-blue-700 p-4 rounded-2xl mt-2"
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
});

export default AddPostScreen;
