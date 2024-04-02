import { NavigationProp } from '@react-navigation/native';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const CrearTarea = ({ navigation }: RouterProps) => {
  const [tareas, setTareas] = useState<any[]>([]);
  const [tarea, setTarea] = useState('');

  useEffect(() => {}, []);

  const addTarea = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, 'Tareas'), {Titulo: 'Soy un titulo' , Descripcion: 'Soy una descripcion', Realizado: false});
    console.log("doc: ", doc)
  } 



  return (
    <View style={styles.container}>
    <View style={styles.backImage}>
      <View style={styles.whiteBox}>
        <View style={styles.titleContainer}>
           <Pressable
              onPress={() => navigation.navigate('Mi tareas')}
              >
              <Image style={styles.icon} source={require('../../assets/icono.png')} />
      </Pressable>
      <Text style={styles.h1}>RecuerDate</Text>
      </View>
      
      <Text style={styles.h2}>CrearTarea</Text>
    </View>
    </View>
    </View>
  )
}

export default CrearTarea


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#acf9ff',
    color: '#ffffff',
  },
  h1: {
    fontFamily:'Roboto',
    fontWeight:'bold',
    // paddingTop: 2,
    fontSize: 18,
    textAlign:"center",
    alignItems: 'center',
    alignSelf: 'center',
  },
  h2: {
    color: 'black',
    fontSize: 12,
    // paddingTop: 2,
    textAlign:"center",
  },
  h3: {
    color: 'black',
    fontSize: 12,
    paddingTop: 2,
    textAlign:"left",
  },
  backImage: {
    backgroundColor: '#acf9ff',
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
    height:20,
  },
  button: {
    backgroundColor: '#cff9fd',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 65,
    alignItems: 'center',
    // alignSelf: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#000000',
    fontSize: 14
  },
  icon: {
    width: 45,
    height: 45,
    marginTop:20
    // resizeMode: 'contain',
  },
});