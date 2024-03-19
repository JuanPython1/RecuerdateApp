import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InputTask from './components/InputTask';
import Task from './components/Task';
import { getIPAddress } from 'react-native-network-info';



export default function App() {

  
  const [recordatorios, setRecordatorios] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const ip = await getIPAddress();
    const response = await fetch(`http://${ip}:8080/recordatorios/1`);
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
          renderItem={({ item }) => (<Task {...item} toggleRecordatorio={toggleRecordatorio} clearRecordatorio={clearRecordatorio}/>)}
          ListHeaderComponent={() => <Text style={styles.titulo}>RecuerDate</Text>}
          ListEmptyComponent={()=> <Text style={styles.subtitulo}>Mis Tareas</Text>}
          contentContainerStyle={styles.contentContainerStyle}
          />
          <InputTask recordatorios={recordatorios} setRecordatorios={setRecordatorios} />
        </SafeAreaView>

    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  

  container: {
    flex: 1,
    backgroundColor: '#a2f1f8',
  },
  contentContainerStyle: {
    padding: 15,
    backgroundColor:"#ffffff"
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
    fontStyle: 'Montserrat-Regular',
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 15,
    top: 10
  }
});
