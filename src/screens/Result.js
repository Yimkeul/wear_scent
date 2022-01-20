import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  LogBox,
  Alert,
  Image,
  Modal,
  Button,
} from "react-native";

export default function Result({ navigation, route }) {
  LogBox.ignoreAllLogs();

  const [prevdata, setPrevdata] = useState();

  const [ready, setReady] = useState(false);

  const [showmodal, setShowmodal] = useState(false);

  useEffect(() => {
    setReady(false);
    const { isSex, isAge, isStyle } = route.params;
    setPrevdata([isSex, isAge, isStyle]);
  }, []);

  useEffect(() => {
    setReady(true);
  });

  return !ready ? (
    <View></View>
  ) : (
    <SafeAreaView>
      <StatusBar barStyle="light-content"/>
      {/*헤더*/}
      <View id="header" style={styles.header}>
        <View id="Logo" style={styles.LogoBox}>
          <Image source={require("../../assets/tt.png")} style={styles.Logo} />
        </View>

     

        <TouchableOpacity
          onPress={() => {
            setShowmodal(true);
          }}
          style={styles.FAQBox}
        >
          <View id="FAQ">
            <Image
              source={require("../../assets/question_mark.png")}
              style={styles.FAQ}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.heartBox}>
          <View id="heart">
            <Image
              source={require("../../assets/heart.png")}
              style={styles.heart}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBox}
          onPress={()=>{navigation.navigate('Home')}}
        >
                  <View id="home">
            <Image
              source={require("../../assets/house.png")}
              style={styles.home}
            />
          </View>

        </TouchableOpacity>
      </View>

      {/* 헤더 끝 */}

     

      <Text>
        {console.log("--------")}
        {console.log(prevdata)}

        {prevdata[0]}
      </Text>
      <Text>{prevdata[1]}</Text>
      <Text>{prevdata[2]}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 헤드 스타일
  header: {
    marginHorizontal: -10,
    height: Dimensions.get("window").height * 0.1,
    backgroundColor: "white",
    flexDirection: "row",
  },

  LogoBox: {
    flex: 5,

    marginLeft: 10,
  },
  FAQBox: {
    flex: 1,
  },
  heartBox: {
    flex: 1,

  },
  homeBox: {
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
  home: {
    height: "100%",
    width: "50%",
    marginLeft: "25%",
    resizeMode: "contain",
  },
});
