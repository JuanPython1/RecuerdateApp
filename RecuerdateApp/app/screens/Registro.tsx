import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification, } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';


interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Registro = ({navigation}: RouterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal de verificación
  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE_DB;

  const validacionContraseña =  () => {
    if(password !== ConfirmPassword){
     alert('Las contraseñas no coinciden. Por favor, ingresalas de nuevo.')
    }
    else{
     singUp()
    }
  }

  const singUp = async () => {
    setLoading(true);
    try {
      // Crear usuario en Firebase Auth
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (response) => {
          console.log(response);
          // Verificar usuario con el correo
          await sendEmailVerification(auth.currentUser);
          const userUID = auth.currentUser.uid; // Obtén la UID del usuario autenticado
          setModalVisible(true); // Mostrar el modal de verificación
          activateAccount(userUID); // Llama a la función para activar la cuenta y guardar los datos en Firestore
        })
        .catch((error) => {
          console.log(error);
          alert('Registro fallido: ' + error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      alert('Registro fallido: ' + error.message);
      setLoading(false);
    }
  };

  const activateAccount = async (userUID: string) => {
    try {
      // Guardar los datos en Firestore
      const userRef = doc(firestore, 'usuarios', userUID); // Crear una referencia al documento con la UID del usuario
      await setDoc(userRef, { username: username, email: email }); // Guardar los datos en el documento
      navigation.navigate('Interno'); // Redirigir a la navegación de inicio de sesión
    } catch (error) {
      console.log(error);
      alert('Error al guardar los datos: ' + error.message);
    }
  };
    
  

  return (
    <View style={styles.container}>
      {/* Modal de verificación */}
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
            <Text style={styles.modalText}>Verifica tu correo electrónico para activar tu cuenta.</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);// Llamar a la función para activar la cuenta y guardar los datos en Firestore
              }}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.signInContainer}>
        <Text style={styles.h1}>Crear una nueva cuenta</Text>
        <Text style={styles.signInText}>¿Ya estás registrado? Inicia sesión <Text style={styles.signInLink} onPress={() => navigation.navigate('Login')}>aquí</Text>.</Text>
      </View>
      <View style={styles.whiteSheet}>
        <KeyboardAvoidingView behavior='padding'>
          <Text style={styles.h2}>NOMBRE DE USUARIO</Text>
          <TextInput value={username} style={styles.input} placeholder="Nombre de usuario" autoCapitalize="none" onChangeText={(text) => setUsername(text)} />
          <Text style={styles.h2}>CORREO</Text>
          <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)} />
          <Text style={styles.h2}>CONTRASEÑA</Text>
          <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)} />
          <Text style={styles.h2}>CONFIRMAR CONTRASEÑA</Text>
          <TextInput secureTextEntry={true} value={ConfirmPassword} style={styles.input} placeholder="Confirmar Password" autoCapitalize="none" onChangeText={(text) => setConfirmPassword(text)} />

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={validacionContraseña}>
                <Text style={styles.buttonText}>Únete</Text>
              </TouchableOpacity>
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#a2f1f8',
    position:'relative'
  },
  signInContainer: {
    position: 'absolute',
    bottom: '82%',
    width: '100%',
    paddingHorizontal: 65,
    zIndex:2
  },
  whiteSheet: {
    width: '100%',
    height: '80%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 50,
    color:'#ffffff',
    zIndex:1
  },
  h1: {
    fontFamily: 'Roboto',
    color: '#000000',
    textAlign:'right',
    fontSize: 28,
    fontWeight:'bold',
  },
  signInText: {
    fontFamily:'Roboto',
    color:'#000000',
    textAlign:'right',
    fontSize:14,
  },
  signInLink: {
    fontWeight:'bold',
    color: 'black',
  },
  h2:{
    fontFamily:'Roboto',
    fontWeight:'bold',
    paddingTop:5,
    marginHorizontal: 65,
    color:'#d3d3d3',
    textAlign:'left',
    fontSize:12,
    zIndex:3
  },
  input: {
    fontFamily:'Roboto',
    marginVertical: 10,
    marginHorizontal: 65,
    height: 56,
    borderWidth: 0,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#d3d3d3'
  },
  button: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 65,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
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

export default Registro;
