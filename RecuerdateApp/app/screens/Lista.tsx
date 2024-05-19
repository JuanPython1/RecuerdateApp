import { NavigationProp } from '@react-navigation/native';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import TareaItem from '../../components/TareaItem'; // Importa el componente TareaItem

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Lista = ({ navigation }: RouterProps) => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    const unsubscribe = onSnapshot(
      query(collection(FIRESTORE_DB, 'Tareas'), where('UsuarioId', '==', user?.uid)), // Filtrar por UID del usuario actual
      (snapshot) => {
        const updatedTareas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTareas(updatedTareas);
      }
    );

    return () => unsubscribe();
  }, []);

  const goToTareas = () => {
    navigation.navigate('CrearTarea');
  };

  const eliminarTarea = async (id) => {
    try {
      await deleteDoc(doc(FIRESTORE_DB, 'Tareas', id));
      const updatedTareas = tareas.filter((t) => t.id !== id);
      setTareas(updatedTareas);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const EditarTarea = (id) => {
    // Navegar a la pantalla de edición con el ID de la tarea seleccionada
    navigation.navigate('EditarTarea', { tareaId: id });
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

        <View style={styles.tareasContainer}>
          <Text style={styles.semitituloTareas}>Tareas</Text>
          {tareas.map((tarea) => (
            <TareaItem
              key={tarea.id}
              tarea={tarea}
              onEditarTarea={EditarTarea} // Pasa la función EditarTarea como prop
              onEliminarTarea={eliminarTarea} // Pasa la función eliminarTarea como prop
            />
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
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  h2: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  h3: {
    color: 'black',
    fontSize: 14,
    paddingTop: 2,
    textAlign: 'left',
  },
  semitituloTareas:{
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '7%'
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
    width: '100%'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 5,
    height: 30,
  },
  button: {
    backgroundColor: '#477489',
    height: 90,
    borderRadius: 15,
    marginHorizontal: 65,
    marginVertical: '2%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    alignItems: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 21,
  },
  icon: {
    width: 45,
    height: 45,
    marginTop: 20,
  },
  tareasContainer: {
    marginHorizontal: 65,
    flexDirection: 'column',
    borderRadius: 5,
  },
});
