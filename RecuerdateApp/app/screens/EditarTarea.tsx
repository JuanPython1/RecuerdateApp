import { NavigationProp } from '@react-navigation/native';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FIRESTORE_DB } from '../../firebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
  route: any; // Asumiendo que pasas el ID de la tarea a editar como parámetro de la ruta
}

const EditarTarea = ({ navigation, route }: RouterProps) => {
  const [tarea, setTarea] = useState(null);
  const [nombreTarea, setNombreTarea] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [tipoTarea, setTipoTarea] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    // Recuperar la tarea seleccionada usando el ID proporcionado en la ruta
    const tareaId = route.params.tareaId;
    const tareaRef = doc(FIRESTORE_DB, 'Tareas', tareaId);
    const unsubscribe = onSnapshot(tareaRef, (doc) => {
      if (doc.exists()) {
        setTarea({ id: doc.id, ...doc.data() });
      } else {
        // Manejar el caso en que la tarea no existe
        console.log('La tarea no existe');
      }
    });

    return () => unsubscribe();
  }, [route.params.tareaId]);

  const guardarEdicion = async () => {
    if (!tarea) {
      // Manejar el caso en que no se pueda editar la tarea
      console.log('No se puede editar la tarea');
      return;
    }

    try {
      await updateDoc(doc(FIRESTORE_DB, 'Tareas', tarea.id), {
        Nombre: nombreTarea,
        Prioridad: prioridad,
        TipoTarea: tipoTarea,
        Fecha: fecha,
        Descripcion: descripcion,
      });
      navigation.goBack(); // Volver a la pantalla anterior después de guardar los cambios
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Error al guardar los cambios: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backImage}>
        <View style={styles.whiteBox}>
          <View style={styles.titleContainer}>
            <Pressable
              onPress={() => navigation.goBack()}
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
      <Text style={styles.h2}>Editar Tarea</Text>
      </View>
        <Text style={styles.h3}>Editar Tarea Creada</Text>
      <TextInput
        value={nombreTarea}
        onChangeText={setNombreTarea}
        style={styles.input}
        placeholder='Asignar Nombre...'
      />
      <Text style={styles.h3}>Editar Prioridad</Text>
      <View style={styles.checkboxContainer}>
      <CheckBox
        title='Exposición'
        checked={prioridad === 'Exposición'}
        onPress={() => setPrioridad('Exposición')}
      />
      <CheckBox
        title='Evaluación'
        checked={prioridad === 'Evaluación'}
        onPress={() => setPrioridad('Evaluación')}
      />
      <CheckBox
        title='Tarea'
        checked={prioridad === 'Tarea'}
        onPress={() => setPrioridad('Tarea')}
      />
      <CheckBox
        title='Taller'
        checked={prioridad === 'Taller'}
        onPress={() => setPrioridad('Taller')}
      />
      </View>
      <Text style={styles.h3}>Editar Tipo</Text>
      <View style={styles.checkboxContainer}>
      <CheckBox
        title='Individual'
        checked={tipoTarea === 'Individual'}
        onPress={() => setTipoTarea('Individual')}
      />
      <CheckBox
        title='Grupal'
        checked={tipoTarea === 'Grupal'}
        onPress={() => setTipoTarea('Grupal')}
      />
      </View>
      <Text style={styles.h3}>Editar Fecha Límite</Text>
      <TextInput
        value={fecha.toLocaleDateString()}
        style={styles.datePickerButtonText}
        editable={false} // Evita que el usuario edite la fecha directamente
      />
      <Text style={styles.h3}>Editar Descripción</Text>
      <TextInput
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
        placeholder='Descripción...'
      />

      <TouchableOpacity style={styles.button} onPress={guardarEdicion}>
        <Text style={styles.buttonText}>GUARDAR CAMBIOS</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default EditarTarea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#477489',
    color:'#ffffff'
  },
  icon: {
    width: 45,
    height: 45,
    marginTop: 20,
  },
  h1: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  h2: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
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
    height: 20,
  },
  h3: {
    color:'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center'
  },
  input: {
    height: 56,
    borderWidth: 0,
    borderRadius: 20,
    fontFamily:'Roboto',
    textAlign:'center',
    marginVertical:10,
    marginHorizontal:65,
    padding:10,
    backgroundColor:'#ffffff'
  },
  button: {
    backgroundColor: '#a2f1f8',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 65,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#e75455',
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkboxContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 65,
    borderRadius: 15,
    tintColor: '#ff6700',
    borderColor: '#ff6700',
  },
  datePickerButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  backImage: {
    backgroundColor: '#477489',
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
});
