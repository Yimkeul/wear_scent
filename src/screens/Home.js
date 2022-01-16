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
} from "react-native";

export default function Home({ navigation }) {
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaView style={styles.Main_Container}>
      <StatusBar barStyle="light-content" backgroundColor={"black"} />
      {/* <ScrollView style={styles.Scroll}>
      </ScrollView> */}

      <View style={styles.WebView_Continer}>
        <Text>이미지 미리보기 자리 (web-view자리)</Text>
      </View>

      <View style={styles.Show_Style_Result_Container}>
        <Text>착장 종류 결과창</Text>
      </View>

      <View style={styles.Action_Buttons_Container}>
      <TouchableOpacity style={styles.Btn_Touch}>
          <View style={styles.Btn}>
            <Text>초기화</Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.Btn_Touch} onPress={()=>{navigation.navigate('Research')}}>
          <View style={styles.Btn}>
            <Text>다음</Text>
          </View>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Main_Container: {
    flex: 1,
    marginHorizontal: 10,
  },
  Scroll: {
    flex: 1,
  },
  WebView_Continer: {
    height: Dimensions.get("window").height * 0.55,
    borderWidth: 1,
    // marginHorizontal : 10,
    marginTop: 10,

    justifyContent: "center",
    alignItems: "center",
  },
  Show_Style_Result_Container: {
    marginVertical: 20,
    // marginHorizontal : 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.1,
  },
  Action_Buttons_Container: {
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.2,

    // paddingHorizontal :20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  Btn: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
    borderRadius: Dimensions.get("window").width * 0.2,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Btn_Touch: {
    
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
    borderRadius: Dimensions.get("window").width * 0.2,
  },
});
