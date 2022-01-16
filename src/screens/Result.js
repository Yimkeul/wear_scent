import React,{useState,useEffect} from 'react'
import {View,Text} from 'react-native'

export default function Result({navigation, route}){


  const [prevdata ,setPrevdata ] =useState()
  
  const [ready, setReady] = useState(false)

  useEffect(()=>{
    setReady(false)
    const {isSex,isAge } =route.params
    setPrevdata([isSex,isAge])
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
    </View>
  )
}

