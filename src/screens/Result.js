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
  Image,
  Linking
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DropShadow from "react-native-drop-shadow";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";

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
      img_link : "",
      link:""
    },
  ]); 

  const [ran, setRan] = useState();
  const [rr,setRR ] = useState(false)
  useEffect(() => {
    const { isSex, isAge, isStyle } = route.params;
    setPrevdata([isSex, isAge, isStyle]);
    console.log("---useEffect---");
    console.log(isSex + " " + isAge + " " + isStyle);

    firebase_db
      .ref("/perfume")
      .once("value")
      .then((snapshot) => {

        let dpp = snapshot.val();
    
        setAlldata(dpp)
        setRR(true)
        

        // setFi(
        //   dpp.filter((d) => {
        //     return (d.sex == isSex && d.age == isAge && d.style == isStyle);
        //   })
        // );
        // let min = 0;
        // let max = Object.keys(fi).length;
   
        // let rn = Math.floor(Math.random() * (max - min)) + min;
        // setRan(rn);
      });
  }, []);


  const [ready, setReady] = useState(false)
  useEffect(()=>{
    setReady(false)
    if(rr == true){
      
      setFi(
        alldata.filter((d)=>{
          // return (d.sex == prevdata[0]&&d.age ==prevdata[1]&&d.style==prevdata[2] ) //teachable machine의 정확성이 높아지면 분류 세분화 가능
          //지금은 간단한게 결과값을 표출하기 위해 style항목을 제외했다.
          return (d.sex == prevdata[0]&&d.age ==prevdata[1] )
        }
       )
      )
    let min =0
    let max = Object.keys(fi).length
        
    let rn = Math.floor(Math.random()*(max-min)) + min

    setRan(rn)
    }

  },[rr])




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

    
    firebase_db
      .ref("/like/" + userUniqueId + "/" + fi[ran].idx )
      .set(fi[ran], function (error) {
        console.log(fi[ran]);
        Alert.alert("저장!");
      });
  };

  return (
    <View style={styles.container}>
     <StatusBar barStyle="default"/>
      {Platform.OS == "ios" ? (
        <DropShadow style={styles.shadowProp}>
       
          <View style={styles.img_box}>
          {fi[ran] !== undefined ? 
            <ImageBackground
            source={{uri : fi[ran].img_link}}
            style={{ resizeMode: "contain", flex: 1 }}
            imageStyle={{
              borderBottomRightRadius: 70,
              borderBottomLeftRadius: 70,
            }}
          />
          :<View></View>
          
          }
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
                   <Text style={{ fontSize: 28 }} numberOfLines={2}>
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

          <TouchableOpacity       onPress={() => {Linking.openURL(fi[ran].link)}} style={styles.Button_box}>
            <Text style={styles.Button_box_text}>바로가기</Text>
          </TouchableOpacity>
        </DropShadow>
      ) : (
        <>
          <View style={styles.img_box}>
            {fi[ran] !== undefined ? 
            <ImageBackground
            source={{uri : fi[ran].img_link}}
            style={{ resizeMode: "contain", flex: 1 }}
            imageStyle={{
              borderBottomRightRadius: 70,
              borderBottomLeftRadius: 70,
            }}
          />
          :<View></View>
          
          }
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
                flex: 2,
                flexDirection: "row",
                
              }}
            >
              <View style={{ flex: 9, justifyContent: "center" }}>
                {fi[ran] !== undefined ? (
                  <Text style={{ fontSize: 28 }} numberOfLines={2}>
                    {fi[ran].title}
                  </Text>
                ) : undefined}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
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
            onPress={() => {Linking.openURL(fi[ran].link)}}
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
    backgroundColor:'white'
  },
  img_box: {
    height: Dimensions.get("window").height * 0.55,
    marginTop : '10%',
    backgroundColor: "white",
    // borderBottomRightRadius: 70,
    // borderBottomLeftRadius: 70,
    
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
