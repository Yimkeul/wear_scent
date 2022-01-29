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
} from "react-native";
import { firebase_db } from "../firebaseConfig";
import * as Application from "expo-application";

export default function Like_Card_od({content, navigation, isdata, setIsData}) {

  const remove = async (cidx) => {
    let userUniqueId;
    if (Platform.OS == "ios") {
      let iosID = await Application.getIosIdForVendorAsync();
      userUniqueId = iosID;
    } else {
      userUniqueId = await Application.androidId;
    }
    firebase_db
      .ref("/like/" + userUniqueId + "/" + cidx)
      .remove()
      .then(function () {
        let result = [];

        result = isdata.filter((data, i) => {
          return data.idx !== cidx;
        });

        setIsData(result);
      });
  };






  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Detail", { idx: content.idx });
      }}
    >





      <View style={styles.card}>
      
      <Image source={require('../../assets/ex_perfume.png')} style={styles.img}/>

      <View style={{flex :1 , flexDirection :'row',backgroundColor:'pink' }}>


      <View style={{flex : 8, justifyContent:'center' }}> 
          <Text style={styles.text}  numberOfLines={1}>{content.title}</Text>
        </View>


        <TouchableOpacity 
        onPress={()=>{
          remove(content.idx)
        }}
        style={{flex : 2, justifyContent:'center',alignItems:'center'}}> 
          <Image source={require('../../assets/trash.png')}/>
        </TouchableOpacity>





      </View>






      </View>










    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    marginBottom:20,
    borderWidth :1

  },
  card:{
    width:'100%',
    height:Dimensions.get('window').height*0.25,
  

  },
  img:{
    width:'100%',
    height:'80%',
    resizeMode : 'contain'
    
  },
  text:{
    fontSize :15,
    fontWeight : 'bold',
    marginLeft:5
    

  }

});
