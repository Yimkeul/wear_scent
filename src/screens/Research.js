import React, { useEffect, useState } from "react";
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
  Image,
  Modal,
  Platform
} from "react-native";
import DropShadow from "react-native-drop-shadow";

export default function Research({ navigation, route }) {
  const [isClick_sex_man, setCSM] = useState();
  const [isClick_sex_woman, setCSW] = useState();

  const [isSex, setIsSex] = useState();

  const [isclick_age_10, setA10] = useState();
  const [isclick_age_20, setA20] = useState();
  const [isclick_age_30, setA30] = useState();
  const [isclick_age_40, setA40] = useState();

  const [isAge, setIsAge] = useState();

  const [isStyle, setIsStyle] = useState();

  const [ismodalshow, setIsmodalshow] = useState(false);

  const back = () => {
    setIsmodalshow(false);
  };

  useEffect(() => {
    if (isAge !== 999 && isSex !== "null") {
      setIsmodalshow(true);
    } else {
      setIsmodalshow(false);
    }
  }, [isAge, isSex]);
  const check_arr = () => {
    if (isSex == "null" || isAge == 999) {
      Alert.alert("선택해주세요");
    } else {
      navigation.navigate("Result", {
        isSex: isSex,
        isAge: isAge,
        isStyle: isStyle,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsStyle(route.params.isStyle);
      setIsAge(999);
      setIsSex("null");
      setCSM(false);
      setCSW(false);

      setA10(false);
      setA20(false);
      setA30(false);
      setA40(false);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setIsStyle(route.params.isStyle);
    setIsAge(999);
    setIsSex("null");
    setCSM(false);
    setCSW(false);

    setA10(false);
    setA20(false);
    setA30(false);
    setA40(false);
  }, []);
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaView style={styles.Main_Container}>
      <StatusBar barStyle="light-content" backgroundColor={"black"} />

      <View id="Part_Sex">
        <View style={styles.Title_Sex}>
          <Text style={styles.title_text}>성별과 나이를 선택해주세요</Text>
        </View>

        <View style={styles.Select_Sex}>
          <TouchableOpacity
            style={styles.Sex_Touch}
            onPress={() => {
              setIsSex("man"), setCSM(true);
              setCSW(false);
            }}
          >
            {!isClick_sex_man ? (
              <Image
                source={require("../../assets/man_before.png")}
                style={styles.Sex_img}
              />
            ) : (
              <Image
                source={require("../../assets/man_after.png")}
                style={styles.Sex_img}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Sex_Touch}
            onPress={() => {
              setIsSex("woman"), setCSM(false);
              setCSW(true);
            }}
          >
            {!isClick_sex_woman ? (
              <Image
                source={require("../../assets/woman_before.png")}
                style={styles.Sex_img}
              />
            ) : (
              <Image
                source={require("../../assets/woman_after.png")}
                style={styles.Sex_img}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>


{Platform.OS == "ios" ? (      <DropShadow style={styles.shadowProp}>
      <View id="Part_Age">
        <View style={styles.Select_Age}>
          <View
            id="top"
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            {isclick_age_10 ? (
              <TouchableOpacity
                style={styles.Age_Box_af}
                onPress={() => {
                  setIsAge(10);
                  setA10(true);
                  setA20(false);
                  setA30(false);
                  setA40(false);
                }}
              >
                <Text style={{ color: "white",   fontSize: 18,
    fontWeight: "700", }}>10대</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.Age_Box}
                onPress={() => {
                  setIsAge(10);
                  setA10(true);
                  setA20(false);
                  setA30(false);
                  setA40(false);
                }}
              >
                <Text style={{ color: "black"  , fontSize: 18,
    fontWeight: "700", }}>10대</Text>
              </TouchableOpacity>
            )}

            {isclick_age_20 ? (
              <TouchableOpacity
                style={styles.Age_Box_af}
                onPress={() => {
                  setIsAge(20);
                  setA10(false);
                  setA20(true);
                  setA30(false);
                  setA40(false);
                }}
              >
                <Text style={{ color: "white", fontSize: 18,
    fontWeight: "700" }}>20대</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.Age_Box}
                onPress={() => {
                  setIsAge(20);
                  setA10(false);
                  setA20(true);
                  setA30(false);
                  setA40(false);
                }}
              >
                <Text style={{ color: "black" , fontSize: 18,
    fontWeight: "700"}}>20대</Text>
              </TouchableOpacity>
            )}
          </View>

          <View
            id="bottom"
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            {isclick_age_30 ? (
              <TouchableOpacity
                style={styles.Age_Box_af}
                onPress={() => {
                  setIsAge(30);
                  setA10(false);
                  setA20(false);
                  setA30(true);
                  setA40(false);
                }}
              >
                <Text style={{ color: "white", fontSize: 18,
    fontWeight: "700" }}>30대</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.Age_Box}
                onPress={() => {
                  setIsAge(30);
                  setA10(false);
                  setA20(false);
                  setA30(true);
                  setA40(false);
                }}
              >
                <Text style={{ color: "black", fontSize: 18,
    fontWeight: "700" }}>30대</Text>
              </TouchableOpacity>
            )}

            {isclick_age_40 ? (
              <TouchableOpacity
                style={styles.Age_Box_af}
                onPress={() => {
                  setIsAge(40);
                  setA10(false);
                  setA20(false);
                  setA30(false);
                  setA40(true);
                }}
              >
                <Text style={{ color: "white", fontSize: 18,
    fontWeight: "700" }}>40대 이상</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.Age_Box}
                onPress={() => {
                  setIsAge(40);
                  setA10(false);
                  setA20(false);
                  setA30(false);
                  setA40(true);
                }}
              >
                <Text style={{ color: "black" , fontSize: 18,
    fontWeight: "700"}}>40대 이상</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      </DropShadow>):(  
      <View id="Part_Age">
        <View style={styles.Select_Age}>
          <View
            id="top"
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            {isclick_age_10 ? (
              <TouchableOpacity
                style={{...styles.Age_Box_af,             elevation: 10,
                  shadowColor: "#141414",}}
                onPress={() => {
                  setIsAge(10);
                  setA10(true);
                  setA20(false);
                  setA30(false);
                  setA40(false);
                }}
              >
                <Text style={{ color: "white",   fontSize: 18,
    fontWeight: "700", }}>10대</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
              style={{...styles.Age_Box,             elevation: 10,
                shadowColor: "#141414",}}
                onPress={() => {
                  setIsAge(10);
                  setA10(true);
                  setA20(false);
                  setA30(false);
                  setA40(false);
                }}
              >
                <Text style={{ color: "black"  , fontSize: 18,
    fontWeight: "700", }}>10대</Text>
              </TouchableOpacity>
            )}

            {isclick_age_20 ? (
              <TouchableOpacity
              style={{...styles.Age_Box_af,             elevation: 10,
                shadowColor: "#141414",}}
                onPress={() => {
                  setIsAge(20);
                  setA10(false);
                  setA20(true);
                  setA30(false);
                  setA40(false);
                }}
              >
                <Text style={{ color: "white", fontSize: 18,
    fontWeight: "700" }}>20대</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
              style={{...styles.Age_Box,             elevation: 10,
                shadowColor: "#141414",}}
                onPress={() => {
                  setIsAge(20);
                  setA10(false);
                  setA20(true);
                  setA30(false);
                  setA40(false);
                }}
              >
                <Text style={{ color: "black" , fontSize: 18,
    fontWeight: "700"}}>20대</Text>
              </TouchableOpacity>
            )}
          </View>

          <View
            id="bottom"
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            {isclick_age_30 ? (
              <TouchableOpacity
              style={{...styles.Age_Box_af,             elevation: 10,
                shadowColor: "#141414",}}
                onPress={() => {
                  setIsAge(30);
                  setA10(false);
                  setA20(false);
                  setA30(true);
                  setA40(false);
                }}
              >
                <Text style={{ color: "white", fontSize: 18,
    fontWeight: "700" }}>30대</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
              style={{...styles.Age_Box,             elevation: 10,
                shadowColor: "#141414",}}
                onPress={() => {
                  setIsAge(30);
                  setA10(false);
                  setA20(false);
                  setA30(true);
                  setA40(false);
                }}
              >
                <Text style={{ color: "black", fontSize: 18,
    fontWeight: "700" }}>30대</Text>
              </TouchableOpacity>
            )}

            {isclick_age_40 ? (
              <TouchableOpacity
              style={{...styles.Age_Box_af,             elevation: 10,
                shadowColor: "#141414",}}
                onPress={() => {
                  setIsAge(40);
                  setA10(false);
                  setA20(false);
                  setA30(false);
                  setA40(true);
                }}
              >
                <Text style={{ color: "white", fontSize: 18,
    fontWeight: "700" }}>40대 이상</Text>
              </TouchableOpacity>
            ) : (
         

             
              <TouchableOpacity
              style={{...styles.Age_Box,   elevation: 10,
                shadowColor: "#141414"        }}
                onPress={() => {
                  setIsAge(40);
                  setA10(false);
                  setA20(false);
                  setA30(false);
                  setA40(true);
                }}
              >
                <Text style={{ color: "black" , fontSize: 18,
    fontWeight: "700"}}>40대 이상</Text>
              </TouchableOpacity>
        
            )}
          </View>
        </View>
      </View>
      )}


      <Modal
        visible={ismodalshow}
        animationType={"slide"}
        transparent={true}
        onRequestClose={back}
      >
        <View
          style={{ flex: 1, justifyContent: "flex-end", paddingBottom: "5%" }}
        >
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                setIsmodalshow(false);
              }}
              style={{
                paddingHorizontal: "5%",
                paddingBottom: "2%",
                paddingTop: "5%",
              }}
            >
              <Text style={{ fontSize: 15 }}>X</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.show_result_container}
            onPress={() => {
              setIsAge(999);
              setIsSex("null");
              setTimeout(() => {
                check_arr();
              }, 1);
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700" }}>결과보기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Main_Container: {
    flex: 1,
    backgroundColor: "white",
  },

  Title_Sex: {
    paddingTop: "5%", 
    alignItems: "center",
  },
  title_text: {
    fontSize: 18,
    fontWeight: "700",
    backgroundColor: "white",
    padding: "10%",
    textDecorationLine: "underline",
  },
  Select_Sex: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },

  Sex_img: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
  },

  Select_Age: {
    justifyContent: "space-evenly",
    height: Dimensions.get("window").height * 0.5,
  },

  Age_Box: {
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    borderWidth: 3,
    backgroundColor:'white',

  },

  Age_Box_af: {
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    backgroundColor: "#020715",
     
  },

  show_result_container: {
    borderWidth: 3,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: "5%",
    marginHorizontal: "2%",
  },



  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
