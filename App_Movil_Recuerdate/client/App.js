import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {

  
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
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList 
          data={recordatorios}
          keyExtractor={(recordatorios) => recordatorios.id}
          renderItem={({ item }) => (<Task {...item} toggleRecordatorio={toggleRecordatorio} clearRecordatorio={clearRecordatorio}/>)}
          ListHeaderComponent={() => <Text style={styles.titulo}> Today</Text>}
          contentContainerStyle={styles.contentContainerStyle}
          />
        </SafeAreaView>

      </View>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  

  container: {
    flex: 1,
    backgroundColor: '#E9E9EF',
  },
  contentContainerStyle: {
    padding: 15,
  },
  titulo: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
    top: 10
  }
});
