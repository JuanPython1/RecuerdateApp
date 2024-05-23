import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationProp } from '@react-navigation/native';
import { addDoc, collection, getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Platform, ScrollView } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../firebaseConfig';
import * as Notificacion from 'expo-notifications';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const CrearTarea = ({ navigation }: RouterProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAvisoVisible, setModalAvisoVisible] = useState(false);
  const [taskData, setTaskData] = useState({
    nombreTarea: '',
    prioridad: '',
    tipoTarea: '',
    fecha: new Date(),
    hora: new Date(),
    descripcion: ''
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHoraPicker, setShowHoraPicker] = useState(false);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(FIRESTORE_DB, 'usuarios', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  const AgregarTarea = async () => {
    const { nombreTarea, prioridad, tipoTarea, fecha, hora, descripcion } = taskData;
    if (!nombreTarea || !prioridad || !tipoTarea || !fecha || !hora || !descripcion) {
      setModalAvisoVisible(true);
    } else {
      try {
        const user = FIREBASE_AUTH.currentUser;
        await addDoc(collection(FIRESTORE_DB, 'Tareas'), {
          Nombre: nombreTarea,
          Prioridad: prioridad,
          TipoTarea: tipoTarea,
          Fecha: fecha,
          Hora: hora,
          Descripcion: descripcion,
          UsuarioId: user ? user.uid : null,
          Usuario: userData?.username || 'Anon'
        });
        await RecordatorioTareaNotificacion(taskData);
        setModalVisible(true);
      } catch (error) {
        console.log(error);
        alert('Error al guardar los datos: ' + error.message);
      }
    }
  };

  const handleInputChange = useCallback((key: string, value: any) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  }, []);

  const handleFechaChange = (event: any, nuevaFecha?: Date) => {
    if (nuevaFecha) {
      handleInputChange('fecha', nuevaFecha);
    }
    setShowDatePicker(false);
  };

  const handleHoraChange = (event: any, nuevaHora?: Date) => {
    if (nuevaHora) {
      handleInputChange('hora', nuevaHora);
    }
    setShowHoraPicker(false);
  };

  const handleModalCerrado = () => {
    setModalVisible(false);
    navigation.navigate('Mi tareas');
  };

  const renderModal = useMemo(() => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Tarea Creada</Text>
          <Pressable style={[styles.button, styles.buttonClose]} onPress={handleModalCerrado}>
            <Text style={styles.textStyle}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  ), [modalVisible]);

  const renderAvisoModal = useMemo(() => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalAvisoVisible}
      onRequestClose={() => setModalAvisoVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalAvisoView}>
          <Text style={styles.modalText}>Debe llenar todos los campos</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalAvisoVisible(false)}
          >
            <Text style={styles.textStyle}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  ), [modalAvisoVisible]);

  const RecordatorioTareaNotificacion = async (tarea) => {
    const trigger = new Date(tarea.hora);
    const now = new Date(); // Obtiene la fecha y hora actual
    
    // Verifica si la fecha de la tarea es anterior a la fecha actual
    if (trigger <= now) {
      alert('La fecha de la tarea ya ha pasado.');
      return; // No progresa más en la función
    }
    
    try {
      await Notificacion.scheduleNotificationAsync({
        content: {
          title: "Recordatorio de Tarea",
          body: tarea.nombreTarea,
        },
        trigger,
      });
    } catch (e) {
      alert('La notificación falló al programarse porque la fecha ya pasó.');
    }
  };
  return (
    <View style={styles.container}>
      {renderModal}
      {renderAvisoModal}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.whiteBox}>
          <View style={styles.titleContainer}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({ opacity: pressed ? 0 : 1 })}
            >
              <Image style={styles.icon} source={require('../../assets/icono.png')} />
            </Pressable>
            <Text style={styles.h1}>RecuerDate</Text>
            <Pressable
              onPress={() => navigation.navigate('Perfil')}
              style={({ pressed }) => ({ opacity: pressed ? 0 : 1 })}
            >
              <Image style={styles.icon} source={require('../../assets/perfil.png')} />
            </Pressable>
          </View>
          <Text style={styles.h2}>Nueva Tarea</Text>
        </View>
        
        <Text style={styles.h3}>Asignar nueva tarea</Text>
        <TextInput
          value={taskData.nombreTarea}
          onChangeText={(value) => handleInputChange('nombreTarea', value)}
          style={styles.input}
          placeholder='Asignar Nombre...'
        />
        <Text style={styles.h3}>Prioridad</Text>
        <View style={styles.checkboxContainer}>
          {['Exposición', 'Evaluación', 'Tarea', 'Taller'].map((option) => (
            <CheckBox
              key={option}
              title={option}
              checked={taskData.prioridad === option}
              onPress={() => handleInputChange('prioridad', option)}
            />
          ))}
        </View>
        <Text style={styles.h3}>Tipo</Text>
        <View style={styles.checkboxContainer}>
          {['Individual', 'Grupal'].map((tipo) => (
            <CheckBox
              key={tipo}
              title={tipo}
              checked={taskData.tipoTarea === tipo}
              onPress={() => handleInputChange('tipoTarea', tipo)}
            />
          ))}
        </View>
        <Text style={styles.h3}>Fecha Límite</Text>
        <Pressable onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerButtonText}>{taskData.fecha.toLocaleDateString()}</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            mode='date'
            value={taskData.fecha}
            onChange={handleFechaChange}
          />
        )}
        <Text style={styles.h3}>Hora Límite</Text>
        <Pressable onPress={() => setShowHoraPicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerButtonText}>{taskData.hora.toLocaleTimeString()}</Text>
        </Pressable>
        {showHoraPicker && (
          <DateTimePicker
            mode='time'
            value={taskData.hora}
            onChange={handleHoraChange}
          />
        )}

        <Text style={styles.h3}>Descripción</Text>
        <TextInput
          value={taskData.descripcion}
          onChangeText={(value) => handleInputChange('descripcion', value)}
          style={styles.input}
          placeholder='Descripción...'
        />

        <TouchableOpacity style={styles.button} onPress={AgregarTarea}>
          <Text style={styles.buttonText}>CONFIRMAR TAREA</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CrearTarea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#477489',
    position: 'relative',
  },
  scrollContainer: {
    paddingBottom: 20,
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
  input: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 65,
    height: 56,
    borderWidth: 0,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  h3: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
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
    paddingHorizontal: 15,
    marginTop: 5,
    height: 29,
  },
  icon: {
    width: 45,
    height: 45,
    marginTop: 20,
  },
  checkboxContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 65,
    borderRadius: 15,
  },
  datePickerButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 65,
    borderRadius: 20,
    paddingVertical: 12,
    marginTop: 5,
  },
  datePickerButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonText: {
    color: '#e75455',
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#a2f1f8',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 65,
    alignItems: 'center',
    marginTop: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalAvisoView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
