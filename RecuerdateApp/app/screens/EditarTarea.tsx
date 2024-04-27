import { NavigationProp } from '@react-navigation/native';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
      <Text style={styles.h3}>Editar Tarea</Text>
      <TextInput
        value={nombreTarea}
        onChangeText={setNombreTarea}
        style={styles.input}
        placeholder='Asignar Nombre...'
      />
      <Text style={styles.h3}>Prioridad</Text>
      {/* CheckBox para Prioridad */}
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
      <Text style={styles.h3}>Tipo</Text>
      {/* CheckBox para Tipo */}
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
      <Text style={styles.h3}>Fecha Límite</Text>
      <TextInput
        value={fecha.toLocaleDateString()}
        style={styles.input}
        editable={false} // Evita que el usuario edite la fecha directamente
      />
      <Text style={styles.h3}>Descripción</Text>
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
  );
};

export default EditarTarea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
