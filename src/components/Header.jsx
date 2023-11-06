import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const opciones = ['Pomodoro', 'Short Break', 'Long Break']

export default function Header({setTime, currenTime, setCurrenTime}){

  function handlePress(index){
    const newTime = index === 0 ? 25 : index === 1 ? 5: 15;
    setCurrenTime(index)
    setTime(newTime * 60)
  }


  return(
    <View style={{flexDirection:'row'}}>
      {opciones.map((elemen, index) =>(
        <TouchableOpacity key={index} style={[styles.elementStyle, currenTime !== index && {borderColor: 'transparent'}]} onPress={() => handlePress(index)}>
          <Text style={{fontWeight:'bold'}}>{elemen}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  elementStyle:{
    width: '33%',
    borderWidth:3,
    padding:5,
    borderColor: 'white',
    marginVertical:20,
    borderRadius:10,
    alignItems:'center'
  }
})