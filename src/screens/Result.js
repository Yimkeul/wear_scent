import React,{useState,useEffect} from 'react'
import {View,Text} from 'react-native'

export default function Result({navigation, route}){

  

  const [prevdata ,setPrevdata ] =useState()
  
  const [ready, setReady] = useState(false)

  useEffect(()=>{
    setReady(false)
    const {isSex,isAge,isStyle } =route.params
    setPrevdata([isSex,isAge,isStyle])
  },[])

  useEffect(()=>{
    setReady(true)
  })

  return !ready ? <View></View> : (
    <View>

      <Text>

        {console.log('--------')}
        {console.log(prevdata)}

        {prevdata[0]}
        </Text>     
       <Text>{prevdata[1]}</Text>
       <Text>{prevdata[2]}</Text>
    </View>
  )
}

