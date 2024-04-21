import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
 // Importa la función de formato de fecha

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Lista = ({ navigation }: RouterProps) => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIRESTORE_DB, 'Tareas'), (snapshot) => {
      const updatedTareas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTareas(updatedTareas);
      console.log(updatedTareas);
    });

    return () => unsubscribe();
  }, []);

  const goToTareas = () => {
    navigation.navigate('CrearTarea')
  }

  const eliminarTarea = async (id) => {
    try {
      await deleteDoc(doc(FIRESTORE_DB, 'Tareas', id));
      const updatedTareas = tareas.filter((t) => t.id !== id);
      setTareas(updatedTareas);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.backImage}>
        <View style={styles.whiteBox}>
          <View style={styles.titleContainer}>
            <Pressable
              onPress={() => FIREBASE_AUTH.signOut()}
              style={({ pressed }) => {
                return { opacity: pressed ? 0 : 1 };
              }}>
              <Image style={styles.icon} source={require('../../assets/icono.png')} />
            </Pressable>
            <Text style={styles.h1}>RecuerDate</Text>
            <Pressable
              onPress={() => navigation.navigate('Perfil')}
              style={({ pressed }) => {
                return { opacity: pressed ? 0 : 1 };
              }}>
              <Image style={styles.icon} source={require('../../assets/perfil.png')} />
            </Pressable>
          </View>
          <Text style={styles.h2}>Mis Tareas</Text>
        </View>
        <Text style={styles.h3}> ^ Filtrar por Fecha</Text>
      </View>

      <View>
        <Text style={styles.h2}>Tareas</Text>
        <View style={styles.tareasContainer}>
          {tareas.map((tarea) => (
            <View key={tarea.id} style={styles.tareaItem}>
              <Text>Titulo: {tarea.Nombre}</Text>
              <Text>{tarea.Descripcion}</Text>
              <Text>{tarea.Prioridad}</Text>
              <Text>{tarea.TipoTarea}</Text>
              
              <Pressable
                onLongPress={() => eliminarTarea(tarea.id)} 
                style={({ pressed }) => ({
                  backgroundColor: pressed ? '#f00' : '#ccc', 
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 5,
                })}>
                <Text style={{ color: '#fff' }}>Eliminar</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={goToTareas}>
          <Text style={styles.buttonText}>Agregar una nueva tarea</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Lista;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#acf9ff',
    color: '#ffffff',
  },
  h1: {
    fontFamily:'Roboto',
    fontWeight:'bold',
    fontSize: 20,
    textAlign:"center",
    alignItems: 'center',
    alignSelf: 'center',
  },
  h2: {
    color: 'black',
    fontSize: 14,
    textAlign:"center",
  },
  h3: {
    color: 'black',
    fontSize: 14,
    paddingTop: 2,
    textAlign:"left",
  },
  backImage: {
    backgroundColor: '#acf9ff',
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteBox: {
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 5,
    height:20,
  },
  button: {
    backgroundColor: '#477489',
    height:90,
    padding: 25,
    borderRadius: 15,
    marginHorizontal: 65,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight:'bold',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 21
  },
  icon: {
    width: 45,
    height: 45,
    marginTop:20
  },
  tareasContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  tareaItem: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
