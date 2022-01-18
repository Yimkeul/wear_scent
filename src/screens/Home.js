import React, { useState, useEffect, useRef } from "react";
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
  Alert
} from "react-native";

import { WebView } from "react-native-webview";

export default function Home({ navigation, route }) {

  console.log(Dimensions.get('window').height)
  console.log(Dimensions.get('window').width)
  LogBox.ignoreAllLogs();
  const _url = "https://stoic-perlman-d070d2.netlify.app"; //작업중인 사이트

  const webViewRef = useRef(); //필요
  const [getstyle, setGetstyle] = useState('undefined');
  onMessage = (data) => {
    console.log("이거 도는중임 ");
    if (data == getstyle) {
      console.log("같군");
      setGetstyle(data);
      console.log(data);
    }else{
      setGetstyle(data);
      console.log(data)
    }
  };

useEffect(()=>{
  const unsubscribe = navigation.addListener('focus',()=>{
    // Alert.alert('Refreshed!')
    webViewRef.current.goBack()
    setGetstyle('undefined')
  })
  return(
    unsubscribe
  )
},[navigation])

  return (
    <SafeAreaView style={styles.Main_Container}>
      <StatusBar barStyle="light-content" backgroundColor={"black"} />
      {/* <ScrollView style={styles.Scroll}>
      </ScrollView> */}

      <View style={styles.WebView_Continer}>
        <WebView
          style={styles.web_}
          source={{ uri: _url }}
          ref={(ref) => (webViewRef.current = ref)}
          bounces={false}
          scrollEnabled={false}
          // onMessage={onMessage()}
          onMessage={(event) => {
            onMessage(event.nativeEvent.data);
            // Alert.alert(event.nativeEvent.data);
          }}
        />

      </View>
      

      <View style={styles.Show_Style_Result_Container}>
        {getstyle == 'undefined' ? <Text>당신의 스타일은?</Text> :<Text>{getstyle}</Text>}
      </View>

      <View style={styles.Action_Buttons_Container}>
        <TouchableOpacity style={styles.Btn_Touch} onPress={
          ()=>{
            webViewRef.current.goBack()
            setGetstyle('undefined')
          }
        }>
          <View style={styles.Btn}>
            <Text>초기화</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Btn_Touch}
          onPress={() => {
            navigation.navigate("Research" , {isStyle : getstyle});
            
          }}
        >
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
  web_: {
    flex: 1,
  },
  WebView_Continer: {
    minHeight: Dimensions.get("window").height * 0.55,
    // width: Dimensions.get("window").width*0.9,
    // width: "100%",
    borderWidth : 5,
    borderRadius : 10,
    marginTop: 10,
    borderColor: 'rgb(130,130,130)'
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
