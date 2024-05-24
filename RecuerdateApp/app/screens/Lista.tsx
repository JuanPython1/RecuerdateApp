import React, { useState, useEffect, useRef } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { collection, deleteDoc, doc, onSnapshot, query, where, getDoc } from 'firebase/firestore';
import { ScrollView, StyleSheet, Text, View, Pressable, Animated, Image, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import TareaItem from '../../components/TareaItem'; // Importa el componente TareaItem
import { cancelScheduledNotificationAsync } from 'expo-notifications';
import Burbujas from '../../components/burbujasAnimadas';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Lista = ({ navigation }: RouterProps) => {
  const [tareas, setTareas] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial de la animación

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

  useEffect(() => {
    // Animación de desvanecimiento
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Duración de la animación en milisegundos
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const goToTareas = () => {
    navigation.navigate('CrearTarea');
  };

  const eliminarTarea = async (id) => {
    try {
      const tareaRef = doc(FIRESTORE_DB, 'Tareas', id);
      const tareaDoc = await getDoc(tareaRef);
      if (tareaDoc.exists()) {
        const tareaData = tareaDoc.data();
        const notificationId = tareaData.NotificacionId;

        // Cancelar la notificación si existe
        if (notificationId) {
          await cancelScheduledNotificationAsync(notificationId);
        }

        // Eliminar la tarea de la base de datos
        await deleteDoc(tareaRef);

        // Actualizar la lista de tareas en el estado local
        const updatedTareas = tareas.filter((t) => t.id !== id);
        setTareas(updatedTareas);
      } else {
        console.log('La tarea no existe.');
      }
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
        <Burbujas />
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

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.tareasContainer}>
            {tareas.map((tarea) => (
              <TareaItem
                key={tarea.id}
                tarea={tarea}
                onEditarTarea={EditarTarea} // Pasa la función EditarTarea como prop
                onEliminarTarea={eliminarTarea} // Pasa la función eliminarTarea como prop
              />
            ))}
          </View>
          <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
            <TouchableOpacity style={styles.button} onPress={goToTareas}>
              <Text style={styles.buttonText}>Agregar una nueva tarea</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
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
  semitituloTareas: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '7%',
  },
  backImage: {
    backgroundColor: '#acf9ff',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteBox: {
    backgroundColor: '#ffffff',
    paddingBottom: 10,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 5,
    height: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 45,
    height: 45,
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 50,
  },
  tareasContainer: {
    flexDirection: 'column',
    borderRadius: 5,
    marginVertical: '5%',
  },
  bubblesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
