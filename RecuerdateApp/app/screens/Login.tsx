import { NavigationProp } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Login = ({navigation}: RouterProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const singIn = async () => {
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert('Iniciar Sesión fallido: '+ error.message);
    } finally {
      setLoading(false);
    }
  }

  const goToRegister = () => {
    navigation.navigate('Register'); // Navega a la pantalla de registro
  };
 
  return (
    <View style={styles.container}>
    <View style={styles.backImage} />
      <View style={styles.whiteSheet}>
      <KeyboardAvoidingView behavior='padding'>
        <Text style={styles.h1}>Iniciar sesión</Text>
        <Text style={styles.h3}>Inicie sesión para continuar.</Text>
        <Text style={styles.h2}>CORREO</Text>
        <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}   ></TextInput>
        <Text style={styles.h2}>CONTRASEÑA</Text>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}   ></TextInput>

        { loading ? (
            <ActivityIndicator size="large" color="#0000" />
        ) : (
            <>
              <TouchableOpacity style={styles.button1} onPress={singIn}>
                <Text style={styles.buttonText}>Iniciar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={goToRegister}>
                <Text style={styles.buttonText2}>¡Inscribete!</Text>
              </TouchableOpacity>
            </>
        )}
      </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    textAlign:'justify',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#acf9ff',
    color: '#ffffff'
  },
  h1:{
    fontWeight:'bold',
    fontFamily:'Roboto',
    paddingTop:5,
    color:'#cefafb',
    textAlign:'center',
    fontSize:30
  },
  h2:{
    fontFamily:'Roboto',
    color:'#cefafb',
    paddingLeft:65,
    fontSize:10
  },
  h3:{
    fontFamily:'Roboto',
    color:'#cefafb',
    textAlign:'center',
    fontSize:9
  },
  h4:{
    fontFamily:'Roboto',
    fontSize:14,
    textAlign:'center',
    color:'#081e36'
  },
  h5:{
    fontFamily:'Roboto',
    textAlign:'center',
    color:'#d0f9fd',
    fontSize:9
  },
  backImage: {
    backgroundColor: '#acf9ff',
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    paddingTop:50,
    width: '100%',
    height: '65%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#081e36',
    borderTopRightRadius: 50,
    color:'#ffffff'
  },
  input: {
    marginVertical: 5,
    marginHorizontal: 65,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#5d524c',
    color: '#ffffff'
  },
  button1: {
    backgroundColor: '#cff9fd',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 65,
    alignItems: 'center',
    // alignSelf: 'center',
    marginTop: 10
  },
  button2: {
    // backgroundColor: '#cff9fd',
    padding: 10,
    borderRadius: 5,
    // alignItems: 'center',
    // width: '80%',
    // alignSelf: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#000000',
    fontSize: 14
  },
  buttonText2: {
    textAlign:'center',
    color: '#d0f9fd',
    fontSize: 10
  }
});
