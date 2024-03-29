import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const singUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('¡RECUERDATE EN REVISAR TU CORREO ELECTRONICO!');
      navigation.navigate('Login'); // Redirige al usuario de vuelta al inicio de sesión después del registro exitoso
    } catch (error: any) {
      console.log(error);
      alert('Registro fallido: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.h1}>Crear una nueva cuenta</Text> */}
      <View style={styles.signInContainer}>
      <Text style={styles.h1}>Crear una nueva cuenta</Text>
        <Text style={styles.signInText}>¿Ya estás registrado? Inicia sesión <Text style={styles.signInLink} onPress={() => navigation.navigate('Login')}>aquí</Text>.</Text>
      </View>
      <View style={styles.whiteSheet}>
      <KeyboardAvoidingView behavior='padding'>
        <Text style={styles.h2}>CORREO</Text>
        <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)} />
        <Text style={styles.h2}>CONTRASEÑA</Text>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)} />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={singUp}>
              <Text style={styles.buttonText}>Únete</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Volver al inicio de sesión</Text>
            </TouchableOpacity> */}
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
    // textAlign:'right',
    position: 'absolute', // Para posicionar el contenedor del enlace de manera absoluta
    bottom: '82%', // Distancia desde la parte inferior de la pantalla
    width: '100%', // Ancho completo
    paddingHorizontal: 65, // Espacio en los bordes laterales
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
    // paddingHorizontal:65,
    // paddingTop:'auto',
    color: '#000000',
    textAlign:'right',
    fontSize: 26,
    // zIndex:2
  },
  signInText: {
    fontFamily:'Roboto',
    // paddingHorizontal: 65,
    color:'#000000',
    textAlign:'right',
    fontSize:12,
    // paddingBottom:'80%'
  },
  signInLink: {
    fontWeight:'bold',
    color: 'black', // Color azul para indicar un enlace
    // textDecorationLine: 'underline', // Subrayado para indicar un enlace
  },
  h2:{
    fontFamily:'Roboto',
    fontWeight:'bold',
    paddingTop:5,
    marginHorizontal: 65,
    color:'#d3d3d3',
    textAlign:'left',
    fontSize:10,
    zIndex:3
  },
  h3:{
    fontFamily:'Roboto',
    paddingHorizontal: 65,
    textAlign:'right',
    fontSize:14,
    paddingBottom:'80%'
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
    // width: '80%',
    // alignSelf: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 12,
  }
});

export default Registro;
