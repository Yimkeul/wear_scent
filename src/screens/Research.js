import React, { useEffect, useState } from "react";
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
} from "react-native";

export default function Research({ navigation,route }) {
  const [isClick_sex_man, setCSM] = useState();
  const [isClick_sex_woman, setCSW] = useState();
  const [isClick_sex_uni, setCSU] = useState();

  const [isSex, setIsSex] = useState();

  const [isclick_age_10, setA10] = useState();
  const [isclick_age_20, setA20] = useState();
  const [isclick_age_30, setA30] = useState();
  const [isclick_age_40, setA40] = useState();

  const [isAge, setIsAge] = useState();

  const [isdata, setIsData] = useState([]);

  const [isStyle, setIsStyle] = useState()

  const getDate = (a, b) => {
    setIsData([a, b]);
  };

 

  const check_arr = () =>{
      getDate(isSex,isAge)

      if(isSex=="null" || isAge == 999){
        Alert.alert("선택해주세요")
  
      }else{
        navigation.navigate('Result',{isSex : isSex, isAge : isAge , isStyle :isStyle})

      }

  }

  useEffect(() => {
    // console.log("++" + route.params.isStyle)
    // console.log(isStyle)
    setIsStyle(route.params.isStyle)
    setIsAge(999);
    setIsSex("null");
    setIsData([])
    setCSM(false);
    setCSW(false);
    setCSU(false);

    setA10(false);
    setA20(false);
    setA30(false);
    setA40(false);
  }, []);

  return (
    <SafeAreaView style={styles.Main_Container}>
   
      <StatusBar barStyle="light-content" backgroundColor={"black"} />
      <ScrollView style={styles.Scroll}>
        <View id="Part_Sex">
          <View style={styles.Title_Sex}>
            <Text>성별</Text>
          </View>

          <View style={styles.Select_Sex}>
            <TouchableOpacity
              style={styles.Sex_Touch}
              onPress={() => {
                setIsSex("man"), setCSM(true);
                setCSW(false);
                setCSU(false);
              }}
            >
              <View
                style={{
                  ...styles.Sex_Box,
                  backgroundColor: isClick_sex_man ? "red" : undefined,
                }}
              >
                <Text>남</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Sex_Touch}
              onPress={() => {
                setIsSex("woman"), setCSM(false);
                setCSW(true);
                setCSU(false);
              }}
            >
              <View
                style={{
                  ...styles.Sex_Box,
                  backgroundColor: isClick_sex_woman ? "red" : undefined,
                }}
              >
                <Text>여</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Sex_Touch}
              onPress={() => {
                setIsSex("uni"), setCSM(false), setCSW(false), setCSU(true);
              }}
            >
              <View
                style={{
                  ...styles.Sex_Box,
                  backgroundColor: isClick_sex_uni ? "red" : undefined,
                }}
              >
                <Text>중성</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* {console.log(isSex)} */}

        <View id="Part_Age">
          <View style={styles.Title_Age}>
            <Text>나이</Text>
          </View>

          <View style={styles.Select_Age}>
            <TouchableOpacity
              style={{...styles.Age_Touch, backgroundColor : isclick_age_10 ? 'red' : undefined}}
              onPress={() => {
                setIsAge(10);
                setA10(true);
                setA20(false);
                setA30(false);
                setA40(false);
              }}
            >
              <View style={styles.Age_Box}>
                <Text>10대</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
 style={{...styles.Age_Touch, backgroundColor : isclick_age_20 ? 'red' : undefined}}
              onPress={() => {
                setIsAge(20);
                setA10(false);
                setA20(true);
                setA30(false);
                setA40(false);
              }}
            >
              <View style={styles.Age_Box}>
                <Text>20대</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
 style={{...styles.Age_Touch, backgroundColor : isclick_age_30 ? 'red' : undefined}}
              onPress={() => {
                setIsAge(30);
                setA10(false);
                setA20(false);
                setA30(true);
                setA40(false);
              }}
            >
              <View style={styles.Age_Box}>
                <Text>30대</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
 style={{...styles.Age_Touch, backgroundColor : isclick_age_40 ? 'red' : undefined}}
              onPress={() => {
                setIsAge(40);
                setA10(false);
                setA20(false);
                setA30(false);
                setA40(true);
              }}
            >
              <View style={styles.Age_Box}>
                <Text>40대 이상</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* {console.log(isAge)} */}

        <View>
          <TouchableOpacity
            style={styles.show_result_touch}
            onPress={() => {
              check_arr()
             
            }}
          >
            <View style={styles.show_result_container}>
              <Text>결과보기</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={{ backgroundColor: "red", color: "white" }}>
          {`${isdata}`}
        </Text>
        {/* {console.log("isdata : " + isdata)} */}
      </ScrollView>
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

  Title_Sex: {
    marginVertical: 20,
    alignItems: "center",
  },
  Select_Sex: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
  Sex_Box: {
    borderWidth: 1,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").width * 0.1,
  },
  Sex_Touch: {
    borderRadius: 7,
  },

  Title_Age: {
    marginVertical: 20,
    alignItems: "center",
  },
  Select_Age: {
    // flexDirection:"column",
    alignItems: "center",
  },

  Age_Box: {
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.15,
  },

  Age_Touch: {
    borderRadius: 7,
    borderWidth: 1,
    marginBottom: 50,
  },

  show_result_touch: {},
  show_result_container: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});
