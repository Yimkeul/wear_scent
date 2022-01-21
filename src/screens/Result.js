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
  Platform
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DropShadow from "react-native-drop-shadow";

export default function Result({ navigation, route }) {
  LogBox.ignoreAllLogs();

  const [prevdata, setPrevdata] = useState();

  const [ready, setReady] = useState(false);

  const [showmodal, setShowmodal] = useState(false);

  useEffect(() => {
    // setReady(false);
    const { isSex, isAge, isStyle } = route.params;
    setPrevdata([isSex, isAge, isStyle]);
  }, []);

  // useEffect(() => {
  //   setReady(true);
  // },[]);

  // {console.log("--------")}
  // {console.log(prevdata)}
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
            <Text style={{ fontSize: 30 }} numberOfLines={1}>
              Title
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <TouchableOpacity onPress={() => {}}>
              <AntDesign name="hearto" size={25} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginHorizontal: 10, flex: 2 }}>
          <Text style={{color : 'black'}} numberOfLines={3}>
            This space is explanation.{`\n`}
            {prevdata}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => {}} style={styles.Button_box}>
        <Text style={styles.Button_box_text}>바로가기</Text>
      </TouchableOpacity>

      </DropShadow>) : (<>
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
        <View style={{...styles.Text_box,elevation: 10,
                  shadowColor: "#141414"}}>
        <View
          style={{
            marginHorizontal: 10,
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 9, justifyContent: "center" }}>
            <Text style={{ fontSize: 30 }} numberOfLines={1}>
              Title
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <TouchableOpacity onPress={() => {}}>
              <AntDesign name="hearto" size={25} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginHorizontal: 10, flex: 2 }}>
          <Text style={{color : 'black'}}numberOfLines={9}>
            This space is explanation.{`\n`}
            {prevdata}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => {}} style={{...styles.Button_box,elevation: 10,
                  shadowColor: "#141414"}}>
        <Text style={styles.Button_box_text}>바로가기</Text>
      </TouchableOpacity>
      </>)}
        
     
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
