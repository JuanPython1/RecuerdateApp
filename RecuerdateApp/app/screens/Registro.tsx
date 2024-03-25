import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
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
      <Text style={styles.h1}>Crear una nueva cuenta</Text>
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
            <Button title='Registrarse' onPress={singUp} color={'#000000'} />
            <Button title='Volver al inicio de sesión' onPress={() => navigation.navigate('Login')} color={'#000000'} /> {/* Botón para regresar al inicio de sesión */}
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
    backgroundColor: '#acf9ff',
    color:'#000000'
  },
  whiteSheet: {
    width: '100%',
    height: '80%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 50,
    color:'#ffffff'
  },
  h1:{
    paddingTop:5,
    marginHorizontal: 65,
    color:'#000000',
    textAlign:'left',
    fontSize:30
  },
  h2:{
    paddingTop:5,
    marginHorizontal: 65,
    color:'#d3d3d3',
    textAlign:'left',
    fontSize:10
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 65,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#d3d3d3'
  }
});

export default Registro;