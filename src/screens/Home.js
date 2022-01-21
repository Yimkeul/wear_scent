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
  Alert,
  Modal,
  Button,
  Image,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import DropShadow from "react-native-drop-shadow";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home({ navigation, route }) {
  LogBox.ignoreAllLogs();
  const _url = "https://stoic-perlman-d070d2.netlify.app"; //작업중인 사이트
  const webViewRef = useRef(); //필요
  const [getstyle, setGetstyle] = useState("undefined");
  onMessage = (data) => {

    if (data == getstyle) {
  
      setGetstyle(data);
    
    } else {
      setGetstyle(data);

    }
  };

  const [showmodal, setShowmodal] = useState(false);
  const close=()=>{
    setShowmodal(false)
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      webViewRef.current.goBack();
      setGetstyle("undefined");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.Main_Container}>
      <StatusBar barStyle="default"/>

      {/*헤더*/}
      <View id="header" style={styles.header}>
        <View id="Logo" style={styles.LogoBox}>
          <Image source={require("../../assets/logo_letter.png")} style={styles.Logo} />
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

        <TouchableOpacity onPress={() => {navigation.navigate("Like")}} style={styles.heartBox}>
          <View id="heart">
            <Image
              source={require("../../assets/heart.png")}
              style={styles.heart}
            />
          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {       
          // webViewRef.current.goBack();
            setGetstyle("undefined");}} style={styles.resetBox}>
          <View id="reset">
            <Image
              source={require("../../assets/reset.png")}
              style={styles.reset}
            />
          </View>
        </TouchableOpacity>
      </View>
       {/* 헤더 끝 */}

      {/* 모달창 */}
      <Modal animationType={"slide"} transparent={false} visible={showmodal} onRequestClose={close}>
        <View style={{ }}>
          <Text>modal</Text>
          <Button
            title="닫기"
            onPress={() => {
              setShowmodal(false);
            }}
          />
          <TouchableOpacity>
            <Image source={require("../../assets/IC_24C.png")} />
          </TouchableOpacity>
          <Image
            source={require("../../assets/Logo.png")}
            style={{ height: "10%", resizeMode: "contain" }}
          />
        </View>
      </Modal>

      {/* 웹뷰 & 결과 OS 분리 --> 그림자*/}
       {Platform.OS == "ios" ? (
        <DropShadow style={styles.shadowProp}>
          <View style={styles.WebView_Continer}>
            <WebView
              style={styles.web_}
              source={{ uri: _url }}
              ref={(ref) => (webViewRef.current = ref)}
              bounces={false}
              scrollEnabled={false}
              onMessage={(event) => {
                onMessage(event.nativeEvent.data);
              }}
            />
          </View> 

          {/* 스타일 결과창 */}
           <View style={styles.Show_Style_Result_Container}>
          {!getstyle == "undefined" ? (
              <Text style={styles.Show_Style_Result_Text}>
                 Your Style is...
              </Text>
            ) : (
              <View style = {{flexDirection:"row" }}>
                <View style={{flex : 1 }}></View>
                <View style={{flex: 1 ,  alignItems :'center' , justifyContent :'center' }}>

                <Text style={styles.Show_Style_Result_Text}>{getstyle}</Text>
                </View>

                <View style={{flex : 1, alignItems :'flex-end' , justifyContent :'center' }}>

                <TouchableOpacity style = {{flexDirection:"row" }} onPress={()=>{navigation.navigate("Research", { isStyle: getstyle })}}>
                  <Text >click</Text>
        
                  <MaterialIcons name="navigate-next" size={24} color="black" />
                </TouchableOpacity>
                </View>
              </View>

            )}
          </View>
          
        </DropShadow> 
       ) : ( 
        <>
           <View
            style={{
              ...styles.WebView_Continer,
              elevation: 6,
              shadowColor: "#141414",
            }}
          >
            <WebView
              style={styles.web_}
              source={{ uri: _url }}
              ref={(ref) => (webViewRef.current = ref)}
              bounces={false}
              scrollEnabled={false}
              onMessage={(event) => {
                onMessage(event.nativeEvent.data);
              }}
            />
          </View> 
          {/* 스타일 결과창 */}
           <View
            style={{
              ...styles.Show_Style_Result_Container,
              elevation: 6,
              shadowColor: "#141414",
            }}
          >
            {!getstyle == "undefined" ? ( //임시로
              <Text style={styles.Show_Style_Result_Text}>
                Your Style is...
              </Text>
            ) : (
              <View style = {{flexDirection:"row" }}>
                <View style={{flex : 1 }}></View>
                <View style={{flex: 1 ,  alignItems :'center' , justifyContent :'center' }}>

                <Text style={styles.Show_Style_Result_Text}>{getstyle}</Text>
                </View>

                <View style={{flex : 1, alignItems :'flex-end' , justifyContent :'center'}}>

                <TouchableOpacity style = {{flexDirection:"row" }} onPress={()=>{navigation.navigate("Research", { isStyle: getstyle })}}>
                  <Text >click</Text>
        
                  <MaterialIcons name="navigate-next" size={24} color="black" />
                </TouchableOpacity>
                </View>
              </View>

            )}
          </View> 
        </>
       )} 


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Main_Container: {
    flex: 1,
  },

  web_: {
    flex: 1,
  },
  WebView_Continer: {
    overflow: "hidden",
    marginHorizontal: 10,
    height: Dimensions.get("screen").height * 0.68,
    borderRadius: 10,
    marginTop: 10,
  },

  Show_Style_Result_Container: {
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.1,
  },

  Show_Style_Result_Text: {
    fontSize: 18,
    fontWeight: "700",
  },

  Action_Buttons_Container: {
    marginHorizontal: 10,
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor:'aqua'
  },

  Btn2: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  Btn_Touch1: {
    width : '45%',
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#f21a1d",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",

  },

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

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
