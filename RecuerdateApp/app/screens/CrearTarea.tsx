import DateTimePicker from '@react-native-community/datetimepicker'; // Importa DateTimePicker
import { NavigationProp } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FIRESTORE_DB } from '../../firebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const CrearTarea = ({ navigation }: RouterProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nombreTarea, setNombreTarea] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [tipoTarea, setTipoTarea] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [descripcion, setDescripcion] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar la visibilidad del selector de fecha

  const AgregarTarea = async () => {
    try {
      // Guardar los datos en Firestore
      await addDoc(collection(FIRESTORE_DB, 'Tareas'), {Nombre: nombreTarea, Prioridad: prioridad, TipoTarea: tipoTarea, Fecha: fecha, Descripcion: descripcion});
      
       // Redirigir a la navegación de inicio de sesión
    } catch (error) {
      console.log(error);
      alert('Error al guardar los datos: ' + error.message);
    }
    
  }


  const handlePrioridadChange = (option: string) => {
    setPrioridad(option);
  };

  const handleTipoTareaChange = (tipo: string) => {
    setTipoTarea(tipo);
  };

  const handleFechaChange = (event: any, nuevaFecha?: Date) => {
    // `event` es el evento de cambio del DateTimePicker
    if (nuevaFecha) {
      setFecha(nuevaFecha);
    }
    setShowDatePicker(false); // Oculta el selector de fecha después de seleccionar una fecha
  };

  const handleModalAbierto = () => {
    setModalVisible(true); // Cierra el modal
    AgregarTarea();
  };

  const handleModalCerrado = () => {
    navigation.navigate('Mi tareas');
  };

  return (
    <View style={styles.container}>

    <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Tarea Creada</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleModalCerrado}
                >
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
              </View>
            </View> 
          </Modal>

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
          <Text style={styles.h2}>Nueva Tarea</Text>
        </View>
        <Text style={styles.h3}>Asignar nueva tarea</Text>
        <TextInput
          value={nombreTarea}
          onChangeText={setNombreTarea}
          style={styles.input}
          placeholder='Asignar Nombre...'
        />
        <Text style={styles.h3}>Prioridad</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            title='Exposición'
            checked={prioridad === 'Exposición'}
            onPress={() => handlePrioridadChange('Exposición')}
          />
          <CheckBox
            title='Evaluación'
            checked={prioridad === 'Evaluación'}
            onPress={() => handlePrioridadChange('Evaluación')}
          />
          <CheckBox
            title='Tarea'
            checked={prioridad === 'Tarea'}
            onPress={() => handlePrioridadChange('Tarea')}
          />
          <CheckBox
            title='Taller'
            checked={prioridad === 'Taller'}
            onPress={() => handlePrioridadChange('Taller')}
          />
        </View>
        <Text style={styles.h3}>Tipo</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            title='Individual'
            checked={tipoTarea === 'Individual'}
            onPress={() => handleTipoTareaChange('Individual')}
          />
          <CheckBox
            title='Grupal'
            checked={tipoTarea === 'Grupal'}
            onPress={() => handleTipoTareaChange('Grupal')}
          />
        </View>
        <Text style={styles.h3}>Fecha Limite</Text>
        <Pressable onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerButtonText}>{fecha.toLocaleDateString()}</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            mode='date'
            value={fecha}
            onChange={handleFechaChange}
          />
        )}

      <Text style={styles.h3}>Descripcion</Text>
              <TextInput
                value={descripcion}
                onChangeText={setDescripcion}
                style={styles.input}
                placeholder='Descripción...'
              />

        <TouchableOpacity style={styles.button} onPress={handleModalAbierto}>
            <Text style={styles.buttonText}>CONFIRMAR TAREA</Text>
        </TouchableOpacity>

      </View>
      
    </View>
  );
};

export default CrearTarea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#477489',
    color: '#ffffff',
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
    // paddingTop: 2,
    // paddingVertical: 3,
    textAlign: 'center',
  },
  backImage: {
    backgroundColor: '#477489',
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteBox: {
    backgroundColor: '#ffffff',
    paddingTop: 1,
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
  icon: {
    width: 45,
    height: 45,
    marginTop: 20,
  },
  checkboxContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 65,
    // marginTop: 5,
    borderRadius:15,
    tintColor: '#ff6700',
    borderColor:'#ff6700'
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
    color: '#ffffff',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 65,
    alignItems: 'center',
    marginTop: 10
  },
  // Estilos para el modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});
