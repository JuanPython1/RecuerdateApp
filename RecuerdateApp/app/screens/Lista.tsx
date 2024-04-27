import { NavigationProp } from '@react-navigation/native';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
 // Importa la función de formato de fecha

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Lista = ({ navigation }: RouterProps) => {
  const [tareas, setTareas] = useState([]);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

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
        <Text style={styles.h3}> ^ Filtrar por Fecha</Text>
      

      <View>
        <Text style={styles.h2}>Tareas</Text>
        <View style={styles.tareasContainer}>
          {tareas.map((tarea) => (
            <View key={tarea.id} style={styles.tareaItem}>
              <Text style={styles.h4}>Titulo: {tarea.Nombre}</Text>
              {tareaSeleccionada === tarea.id && (
                <>
                <Text style={styles.h4} >Descripción: {tarea.Descripcion}</Text>
                <Text style={styles.h4}>Prioridad: {tarea.Prioridad}</Text>
                <Text style={styles.h4}>Tipo de Tarea: {tarea.TipoTarea}</Text>
              </>
              )}
              <Pressable onPress={() => setTareaSeleccionada(tarea.id)} style={({pressed}) => ({
                backgroundColor: pressed ? '#ffffff' : '#111d35',
                padding: 10,
                borderRadius: 360,
                marginTop: 5
              })} > 
                
              <Text style={{ color: '#ffffff' }}>Ver Detalles</Text>
              </Pressable>
              <Pressable onPress={() => EditarTarea(tarea.id)} style={({pressed}) => ({
                backgroundColor: pressed ? '#ffffff' : '#111d35',
                padding: 10,
                borderRadius: 360,
                marginTop: 5
              })} > 
                
              <Text style={{ color: '#ffffff' }}>Editar Tarea</Text>
              </Pressable>
              <Pressable
                onLongPress={() => eliminarTarea(tarea.id)} 
                style={({ pressed }) => ({
                  backgroundColor: pressed ? '#000000' : '#e75455', 
                  padding: 10,
                  borderRadius: 360,
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
  h4:{
    fontSize: 19,
    textAlign: 'center'
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
    marginHorizontal: 65,
    flexDirection:'column',
    // backgroundColor: '#ffffff',
    // padding: 10,
    // margin: 10,
    borderRadius: 5,
  },
  tareaItem: {
    // marginHorizontal: 65,
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
