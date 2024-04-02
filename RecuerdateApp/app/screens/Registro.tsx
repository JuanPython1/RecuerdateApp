import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';

const Registro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE_DB;

  const singUp = async () => {
    setLoading(true);
    try {
      // Comprobar si el nombre de usuario ya está en uso
      const usernameQuery = query(collection(firestore, 'users'), where('username', '==', username));
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        throw new Error('El nombre de usuario ya está en uso');
      }

      // Crear usuario en Firebase Auth
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('¡RECUERDATE EN REVISAR TU CORREO ELECTRONICO!');
      navigation.navigate('Login'); 

      // Agregar datos a Firestore
      await addDoc(collection(firestore, 'usuarios'), { username: username, email: email });


    } catch (error: any) {
      console.log(error);
      alert('Registro fallido: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={singUp}>
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
  }
});

export default Registro;
