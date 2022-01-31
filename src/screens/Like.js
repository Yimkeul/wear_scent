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
  ScrollView,
  StatusBar,
} from "react-native";
import Like_Card from "../component/Like_Card";
import Like_Card_od from "../component/Like_Card_od";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Like({ navigation }) {
  LogBox.ignoreAllLogs();
  const [isdata, setIsData] = useState([]);

  useEffect(() => {
    getLike();
  }, []);

  const getLike = async () => {
    let userUniqueId;
    if (Platform.OS == "ios") {
      let iosId = await Application.getIosIdForVendorAsync();
      userUniqueId = iosId;
    } else {
      userUniqueId = await Application.androidId;
    }

    firebase_db
      .ref("/like/" + userUniqueId)
      .once("value")
      .then((snapshot) => {
        let likedata = snapshot.val();
        let like_list = Object.values(likedata);
        if (like_list && like_list.length > 0) {
          setIsData(like_list);
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="default" />
      {/*헤더*/}
      <View id="header" style={styles.header}>
        <View id="Logo" style={styles.LogoBox}>
          <Image
            source={require("../../assets/logo_letter.png")}
            style={styles.Logo}
          />
        </View>

        <View id="FAQ" style={styles.FAQBox}></View>

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.heartBox}
        >
          <View id="heart">
            <Image
              source={require("../../assets/heart_c.png")}
              style={styles.heart}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetBox}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <View id="Home">
            <Image
              source={require("../../assets/house.png")}
              style={styles.heart}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* 헤더 끝 */}

      <ScrollView style={{}}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={{ width: Dimensions.get("window").width * 0.45 }}>
            {isdata.map((content, i) => {
              if (i % 2 == 0) {
                return (
                  <Like_Card
                    key={i}
                    content={content}
                    navigation={navigation}
                    isdata={isdata}
                    setIsData={setIsData}
                  />
                );
              }
            })}
          </View>
          <View style={{ width: Dimensions.get("window").width * 0.45 }}>
            {isdata.map((content, i) => {
              if (i % 2 != 0) {
                return (
                  <Like_Card
                    key={i}
                    content={content}
                    navigation={navigation}
                    isdata={isdata}
                    setIsData={setIsData}
                  />
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 헤드 스타일
  header: {
    height: Dimensions.get("window").height * 0.1,
    backgroundColor: "white",
    flexDirection: "row",
  },

  LogoBox: {
    flex: 6,

    marginLeft: 10,
  },
  FAQBox: {
    flex: 1,
  },
  heartBox: {
    flex: 1,
  },
  resetBox: {
    flex: 1,
    marginRight: 10,
  },

  Logo: {
    height: "100%",
    width: "80%",
    resizeMode: "stretch",
  },

  FAQ: {
    height: "100%",
    width: "50%",
    marginLeft: "25%",
    resizeMode: "contain",
  },
  heart: {
    height: "100%",
    width: "50%",
    marginLeft: "25%",
    resizeMode: "contain",
  },
  reset: {
    height: "100%",
    width: "50%",
    marginLeft: "25%",
    resizeMode: "contain",
  },
  //
});
