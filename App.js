import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
//Platform nos ayuda a distinguir cosas dependiendo del sistema operatio 
const color = ['#F7DC6F', '#A2D9CE', '#D7BDE2'];
export default function App() {
  const [isWorking, SetIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currenTime, setCurrenTime] = useState('POMO' | 'SHORT' | 'BREAK');
  const [activado, setActivado] = useState(false);

  function handleStartStop() {
    setActivado(!activado)
  }
  useEffect(() => {
    let interval = null;
    if (activado){
      //Correr el time
      interval = setInterval(() =>{
        setTime(time - 1)
      },1000);
    }else{
      //limpiar el interval 
      clearInterval(interval);
    }
    if(time === 0){
      setActivado(false);
      SetIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }
    return ()  => clearInterval(interval);

  }, [activado, time])

  return (
    <View style={[styles.container, { backgroundColor: color[currenTime] }]}>

      <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: Platform.OS === 'android' && 60 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header setTime={setTime} currenTime={currenTime} setCurrenTime={setCurrenTime} />
        <Timer time={time} />
          <TouchableOpacity style={styles.button} onPress={handleStartStop}>
            <Text style={{color:'white', fontWeight:'bold'}}>{activado ? 'STOP' : 'START'}</Text>
          </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  button :{
    alignItems:'center',
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius:15
  }
});
