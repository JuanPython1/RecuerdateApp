import { View, StyleSheet, TextInput, Text, Button, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavigationProp } from '@react-navigation/native';


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
      alert('Iniciar Session fallido: '+ error.message);
    } finally {
      setLoading(false);
    }
  }


  const goToRegister = () => {
    navigation.navigate('Register'); // Navega a la pantalla de registro
  };
 
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
        <Text>Correo</Text>
        <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}   ></TextInput>
        <Text>Contraseña</Text>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}   ></TextInput>

        { loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : (
            <>
              <Button title='Iniciar' onPress={singIn}/>
              <Button title='Registrarse' onPress={goToRegister} /> 
            </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  }
});
