import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  LogBox,
} from "react-native";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";

export default function Like_Card({content, navigation, isdata, setIsData}) {

  const remove = async (cidx) => {
    let userUniqueId;
    if (Platform.OS == "ios") {
      let iosID = await Application.getIosIdForVendorAsync();
      userUniqueId = iosID;
    } else {
      userUniqueId = await Application.androidId;
    }
    firebase_db
      .ref("/like/" + userUniqueId + "/" + cidx)
      .remove()
      .then(function () {
        let result = [];

        result = isdata.filter((data, i) => {
          return data.idx !== cidx;
        });

        setIsData(result);
      });
  };






  return(
    <TouchableOpacity onPress={()=>{navigation.navigate("Detail", { idx: content.idx })}}>
      <View>

        <Text>
          {content.title}
        </Text>

        <Text>
          {content.sex}
        </Text>

        <TouchableOpacity onPress={()=>{
          remove(content.idx)
        }}>
          <Text style={{color :'red'}}>Delete</Text>
        </TouchableOpacity>
      </View>




    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({

})