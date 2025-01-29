import { NavigationProp } from '@react-navigation/native';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, ScrollView } from 'react-native';
import { CheckBox } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const tareaId = route.params.tareaId;
    const tareaRef = doc(FIRESTORE_DB, 'Tareas', tareaId);
    const unsubscribe = onSnapshot(tareaRef, (doc) => {
      if (doc.exists()) {
        const tareaData = doc.data();
        setTarea({ id: doc.id, ...tareaData });
        setNombreTarea(tareaData.Nombre);
        setPrioridad(tareaData.Prioridad);
        setTipoTarea(tareaData.TipoTarea);
        setFecha(new Date(tareaData.Fecha.toDate()));
        setDescripcion(tareaData.Descripcion);
      } else {
        console.log('La tarea no existe');
      }
    });

    return () => unsubscribe();
  }, [route.params.tareaId]);

  const guardarEdicion = async () => {
    if (!tarea) {
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
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Error al guardar los cambios: ' + error.message);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(Platform.OS === 'ios');
    setFecha(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || fecha;
    setShowTimePicker(Platform.OS === 'ios');
    setFecha(currentTime);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.whiteBox}>
          <View style={styles.titleContainer}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
              <Image style={styles.icon} source={require('../../assets/icono.png')} />
            </Pressable>
            <Text style={styles.h1}>RecuerDate</Text>
            <Pressable
              onPress={() => navigation.navigate('Perfil')}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
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
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
          <Text style={styles.datePickerButtonText}>{fecha.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={fecha}
            mode='date'
            display='default'
            onChange={handleDateChange}
          />
        )}
        <Text style={styles.h3}>Editar Hora Límite</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
          <Text style={styles.datePickerButtonText}>{fecha.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={fecha}
            mode='time'
            display='default'
            onChange={handleTimeChange}
          />
        )}
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
      </ScrollView>
    </View>
  );
};

export default EditarTarea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#477489',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  icon: {
    width: 45,
    height: 45,
    marginHorizontal: '2%',
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
    bottom: '10%',
    textAlign: 'center',
  },
  whiteBox: {
    backgroundColor: '#ffffff',
    width: '100%',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 5,
    height: 35,
  },
  h3: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    height: 56,
    borderWidth: 0,
    borderRadius: 20,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    width: '70%',
  },
  button: {
    backgroundColor: '#a2f1f8',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
  },
  buttonText: {
    color: '#e75455',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 10,
    width: '70%',
  },
  datePickerButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: '70%',
  },
  backImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
});
