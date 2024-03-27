import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Lista = ({navigation}: RouterProps) => {

  useEffect(() => {
    
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>RercuerDate</Text>
      <Text style={styles.h1}>Mis Tareas</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('detalles')}>
        <Text style={styles.buttonText}>Abrir Detalles</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => FIREBASE_AUTH.signOut()}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Lista

const styles = StyleSheet.create({
  container: {
    textAlign:'justify',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#acf9ff',
    color: '#ffffff'
  },
  h1:{
    paddingTop:2,
    textAlign:'center',
    fontSize:30
  },
  h2:{
    color:'#cefafb',
    paddingLeft:65,
    fontSize:10
  },
  h3:{
    color:'#cefafb',
    textAlign:'center',
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
    width: '100%',
    height: '65%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#081e36',
    borderTopRightRadius: 50,
    color:'#ffffff'
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 65,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#5d524c',
    color: '#ffffff'
  },
  button: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
