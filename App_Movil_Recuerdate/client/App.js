import { AntDesign } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InputTask from './components/InputTask';
import Task from './components/Task';


export default function App({ navigation }) {

  
  const [recordatorios, setRecordatorios] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const response = await fetch("http://192.168.80.13:8080/recordatorios/1");
    const data = await response.json();
    setRecordatorios(data);
  }

  function clearRecordatorio(id) {
    setRecordatorios(recordatorios.filter((recordatorios) => recordatorios.id !== id));
  }

  function toggleRecordatorio(id) {
    setRecordatorios(
      recordatorios.map((recordatorios) => 
        recordatorios.id === id 
        ? {...recordatorios, completado: recordatorios.completado === 1 ? 0 : 1}
        : recordatorios
      )
    );
  }


  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <StatusBar style="auto" />
        <SafeAreaView style={styles.container}>
          <FlatList 
            data={recordatorios}
            keyExtractor={(recordatorios) => recordatorios.id}
            renderItem={({ item }) => (
              <Task {...item} toggleRecordatorio={toggleRecordatorio} clearRecordatorio={clearRecordatorio}/>
            )}
            ListHeaderComponent={() => (
              <>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <AntDesign name="logout" size={45} color="black"/>
                </TouchableOpacity>
                <Text style={styles.titulo}>RecuerDate</Text>
              </>
            )}
            ListEmptyComponent={() => <Text style={styles.subtitulo}>Mis Tareas</Text>}
            contentContainerStyle={styles.contentContainerStyle}
          />
          <InputTask recordatorios={recordatorios} setRecordatorios={setRecordatorios} />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  

  container: {
    flex: 1,
    backgroundColor: '#a2f1f8',
    alignItems:"center",
    flexDirection:"column",
  },
  contentContainerStyle: {
    flexDirection:"column",
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5,
    height:119,
    backgroundColor: "#ffffff",
    width: windowWidth,
    alignSelf:"center",
  },
  titulo: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 28,
    marginBottom: 5,
    fontStyle: "Montserrat-bold",
    top: 10
  },
  subtitulo: {
    textAlign:"center",
    fontStyle: 'Montserrat-Regular',
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 15,
    top: 10
  },
  backButton: {
    flex:1,
    position:"absolute",
    transform: [{ rotate: '180deg' }],//codigo para girar algo ajskdak
  }
});
