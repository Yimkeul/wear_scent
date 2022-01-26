import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  LogBox,
  Alert,
  ImageBackground,
  Modal,
  Button,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DropShadow from "react-native-drop-shadow";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";
//test 5
export default function Result({ navigation, route }) {
  LogBox.ignoreAllLogs();

  const [prevdata, setPrevdata] = useState(); //route로 받아온 데이터 저장용

  const [alldata, setAlldata] = useState({}); //firebase에서 데이터 받아옴

  const [fi, setFi] = useState([
    {
      idx: 999999,
      title: "",
      explain: "",
      sex: "",
      age: "",
      style: "",
    },
  ]); //테스트중 (filter)

  const [rr, setRR] = useState(false);
  const [ran, setRan] = useState();

  useEffect(() => {
    const { isSex, isAge, isStyle } = route.params;
    setPrevdata([isSex, isAge, isStyle]);
    console.log("---useEffect---");
    console.log(isSex + " " + isAge + " " + isStyle);

    firebase_db
      .ref("/perfume")
      .once("value")
      .then((snapshot) => {
        // console.log("파이어베이스에서 데이터 가져왔습니다!!");
        let dpp = snapshot.val();
        setAlldata(dpp);
        // setRR(true)
        setFi(
          dpp.filter((d) => {
            return d.sex == isSex && d.age == isAge;
          })
        );
        let min = 0;
        let max = Object.keys(fi).length;
        let rn = Math.floor(Math.random() * (max - min)) + min;
        setRan(rn);
      });
  }, []);

  // useEffect(()=>{
  //   if(rr == true){
  //     setFi(
  //       alldata.filter((d)=>{
  //         return((d.sex == prevdata[0] && d.age == prevdata[1]))
  //       })
  //     )
  //   let min =0
  //   let max = Object.keys(fi).length
  //   let rn = Math.floor(Math.random()*(max-min)) + min
  //   setRan(rn)
  //   }

  // },[rr])

  //좋아요 함수
  const LIKE = async () => {
    let userUniqueId;
    if (Platform.OS == "ios") {
      let iosID = await Application.getIosIdForVendorAsync();
      userUniqueId = iosID;
    } else {
      userUniqueId = await Application.androidId;
    }

    console.log(userUniqueId);
    // let date = new Date().toString()
    
    firebase_db
      .ref("/like/" + userUniqueId + "/" + fi[ran].idx )
      .set(fi[ran], function (error) {
        console.log(fi[ran]);
        Alert.alert("저장!");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {Platform.OS == "ios" ? (
        <DropShadow style={styles.shadowProp}>
          <View style={styles.img_box}>
            <ImageBackground
              source={require("../../assets/intro.png")}
              style={{ resizeMode: "cover", flex: 1 }}
              imageStyle={{
                borderBottomRightRadius: 70,
                borderBottomLeftRadius: 70,
              }}
            />
          </View>
          <View style={styles.Text_box}>
            <View
              style={{
                marginHorizontal: 10,
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 9, justifyContent: "center" }}>
              {fi[ran] !== undefined ? (
                  <Text style={{ fontSize: 30 }} numberOfLines={1}>
                    {fi[ran].title}
                  </Text>
                ) : undefined}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <TouchableOpacity onPress={() => {LIKE()}}>
                  <AntDesign name="hearto" size={25} color="red" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginHorizontal: 10, flex: 2 }}>
            {fi[ran] !== undefined ? (
                <Text style={{ color: "black" }} numberOfLines={3}>
                  {fi[ran].explain}
                </Text>
              ) : undefined}
            </View>
          </View>

          <TouchableOpacity onPress={() => {}} style={styles.Button_box}>
            <Text style={styles.Button_box_text}>바로가기</Text>
          </TouchableOpacity>
        </DropShadow>
      ) : (
        <>
          <View style={styles.img_box}>
            <ImageBackground
              source={require("../../assets/intro.png")}
              style={{ resizeMode: "cover", flex: 1 }}
              imageStyle={{
                borderBottomRightRadius: 70,
                borderBottomLeftRadius: 70,
              }}
            />
          </View>
          <View
            style={{
              ...styles.Text_box,
              elevation: 10,
              shadowColor: "#141414",
            }}
          >
            <View
              style={{
                marginHorizontal: 10,
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 9, justifyContent: "center" }}>
                {fi[ran] !== undefined ? (
                  <Text style={{ fontSize: 30 }} numberOfLines={1}>
                    {fi[ran].title}
                  </Text>
                ) : undefined}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    LIKE();
                  }}
                >
                  <AntDesign name="hearto" size={25} color="red" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginHorizontal: 10, flex: 2 }}>
              {fi[ran] !== undefined ? (
                <Text style={{ color: "black" }} numberOfLines={3}>
                  {fi[ran].explain}
                </Text>
              ) : undefined}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {}}
            style={{
              ...styles.Button_box,
              elevation: 10,
              shadowColor: "#141414",
            }}
          >
            <Text style={styles.Button_box_text}>바로가기</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img_box: {
    height: Dimensions.get("window").height * 0.58,
    backgroundColor: "gray",
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 70,
  },
  Text_box: {
    marginHorizontal: 10,
    marginTop: 10,
    height: Dimensions.get("window").height * 0.23,
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 20,
  },
  Button_box: {
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: "5%",
    marginHorizontal: "2%",
  },
  Button_box_text: {
    fontSize: 18,
    fontWeight: "700",
  },

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
