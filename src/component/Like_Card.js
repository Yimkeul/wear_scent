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
import DropShadow from "react-native-drop-shadow";

export default function Like_Card({ content, navigation, isdata, setIsData }) {
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


  if(Platform.OS=="ios"){
    return(
      <DropShadow style={styles.shadowProp}>
  <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Detail", { idx: content.idx });
      }}
    >
      <View style={styles.card}>
        <Image
          source={require("../../assets/ex_perfume.png")}
          style={styles.img}
        />

        <View
          style={{ flex: 1, flexDirection: "row", backgroundColor: "pink" }}
        >
          <View style={{ flex: 8, justifyContent: "center" }}>
            <Text style={styles.text} numberOfLines={1}>
              {content.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              remove(content.idx);
            }}
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            <Image source={require("../../assets/trash.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>



        
      </DropShadow>
    )
  }else{
    return(
      <TouchableOpacity
      style={[styles.container ,styles.shadow_aos ]}
      onPress={() => {
        navigation.navigate("Detail", { idx: content.idx });
      }}
    >
      <View style={styles.card}>
        <Image
          source={require("../../assets/ex_perfume.png")}
          style={styles.img}
        />

        <View
          style={{ flex: 1, flexDirection: "row", backgroundColor: "pink" }}
        >
          <View style={{ flex: 8, justifyContent: "center" }}>
            <Text style={styles.text} numberOfLines={1}>
              {content.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              remove(content.idx);
            }}
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
          >
            <Image source={require("../../assets/trash.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>

      
      )
  }
 



}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    backgroundColor:'white'
  },
  card: {
    width: "100%",
    height: Dimensions.get("window").height * 0.25,
  },
  img: {
    width: "100%",
    height: "80%",

    resizeMode: "contain",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  shadow_aos : {
    elevation: 10,
    shadowColor: "#141414",
  }
});
