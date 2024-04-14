import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, TextInput, Modal  } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}



const RecuperContraseña = ({navigation}: RouterProps) => {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal de verificación
  const auth = FIREBASE_AUTH;
 
  //recuperar contraseña
  const recuperar = async () => {
    try {
      // Envía un correo de recuperación al email proporcionado
      await sendPasswordResetEmail(auth,email);
      setModalVisible(true); // Mostrar el modal de verificación
      console.log('Correo de recuperación enviado');
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error.message);
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
            <Text style={styles.modalText}>Verifica tu correo electrónico para recuperar tu contraseña.</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <View style={styles.signInContainer1}>
        <Pressable
              onPress={() => navigation.navigate('Login')}
              style={({ pressed }) => {
                return { opacity: pressed ? 0 : 1 };
              }}>
              <Image style={styles.icon} source={require('../../assets/icono.png')} />
        </Pressable>
        </View>
      <View style={styles.blueSheet}>
         <Text style={styles.h1}>Olvidaste la Contraseña?</Text>
         <Text style={styles.signInText}>Llena los siguientes datos </Text>
         <View style={styles.recuperar}>
         <KeyboardAvoidingView behavior='padding'>
         <Text style={styles.h2}>CORREO</Text>
         <TextInput value={email} style={styles.input} placeholder="hello@gmail.com" autoCapitalize="none" onChangeText={(text) => setEmail(text)} />    
              <TouchableOpacity style={styles.button} onPress={recuperar}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>          
         </KeyboardAvoidingView>
         
        </View>
      </View>
    </View>
  )
}

export default RecuperContraseña
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        position:'relative'
      },
      blueSheet: {
        width: '100%',
        height: '80%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#a2f1f8',
        borderTopLeftRadius: 50,
        color:'#ffffff',
        zIndex:2
      },
      signInText: {
        fontFamily:'Roboto',
        color:'#000000',
        textAlign:'center',
        fontSize:14,
      },
      signInContainer: {
        position: 'absolute',
        bottom: '82%',
        width: '100%',
        paddingHorizontal: 100,
        zIndex:3
      },
      h1: {
        fontFamily: 'Roboto',
        color: '#000000',
        textAlign:'right',
        fontSize: 35,
        fontWeight:'bold',
      },
      h2:{
        fontFamily:'Roboto',
        fontWeight:'bold',
        paddingTop:5,
        marginHorizontal: 65,
        color:'#888',
        textAlign:'left',
        fontSize:12,
        zIndex:4
      },
      input: {
        fontFamily:'Roboto',
        marginVertical: 10,
        marginHorizontal: 65,
        height: 56,
        borderWidth: 0,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#888'
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
    icon: {
        width: 45,
        height: 45,
        marginTop:20,
        zIndex:1 
        // resizeMode: 'contain',
      },
      signInContainer1: {
        position: 'absolute',
        bottom: '82%',
        width: '100%',
        paddingHorizontal: 100,
        top: 16, // Ajusta la posición vertical según tus necesidades
        left: 16, // Ajusta la posición horizontal según tus necesidades
      },
      recuperar: {
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 30, // Ajusta este valor para mover el texto hacia abajo
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
  
