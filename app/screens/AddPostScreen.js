import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const AddPostScreen = () => {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
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
    <View>
      <Text>AddPostScreen</Text>
    </View>
  );
};

export default AddPostScreen;
