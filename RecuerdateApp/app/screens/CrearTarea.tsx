import { NavigationProp } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FIRESTORE_DB } from '../../firebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const CrearTarea = ({ navigation }: RouterProps) => {
  const [tareas, setTareas] = useState<any[]>([]);
  const [tarea, setTarea] = useState('');

  const goToLista = () => {
    navigation.navigate('Lista')
}

  useEffect(() => {}, []);

  const addTarea = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, 'Tareas'), {Titulo: 'Soy un titulo' , Descripcion: 'Soy una descripcion', Realizado: false});
    console.log("doc: ", doc)
  } 



  // return (
  //   <View style={styles.container}>
  //   <View style={styles.backImage}>
  //     <View style={styles.whiteBox}>
  //       <View style={styles.titleContainer}>
  //           <Pressable
  //             onPress={() => navigation.navigate('Mi tareas')}
  //             >
              
  //             <Image style={styles.icon} source={require('../../assets/icono.png')} /><Text style={styles.h1}>RecuerDate</Text>
  //             <Image style={styles.icon} source={require('../../assets/perfil.png')} />
  //     </Pressable>
      
  //     </View>
      
  //     <Text style={styles.h2}>Asignar nueva tarea</Text>
  // return (
  //   <View style={styles.container}>
  //     <View style={styles.backImage}>
  //       <View style={styles.whiteBox}>
  //         <View style={styles.titleContainer}>
  //         <TouchableOpacity style={styles.buttonback} onPress={goToLista}>
  //             <Image style={styles.icon} source={require('../../assets/icono.png')} />3
  //     </TouchableOpacity>
            {/* <Pressable
              onPress={goToLista}
              style={({ pressed }) => {
                return { opacity: pressed ? 0 : 1 };
              }}>
              <Image style={styles.icon} source={require('../../assets/icono.png')} />
            </Pressable> */}
            return (
              <View style={styles.container}>
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
          <Text style={styles.h3}>Prioridad</Text>
          <Text style={styles.h3}>Tipo</Text>
          <Text style={styles.h3}>Fecha Limite</Text>
      </View>
    </View>
  )
}

export default CrearTarea


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#477489',
    color: '#ffffff',
  },
  h1: {
    fontFamily:'Roboto',
    fontWeight:'bold',
    // paddingTop: 2,
    fontSize: 20,
    textAlign:"center",
    // alignItems: 'center',
    // alignSelf: 'center',
  },
  h2: {
    color: 'black',
    fontSize: 14,
    // paddingTop: 2,
    textAlign:"center",
  },
  h3: {
    color: 'black',
    fontSize: 16,
    paddingTop: 2,
    paddingVertical:5,
    textAlign:"center",
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
  buttonback: {
    // backgroundColor: '#cff9fd',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 65,
    alignItems: 'center',
    // alignSelf: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#000000',
    fontSize: 16
  },
  icon: {
    width: 45,
    height: 45,
    marginTop:20
    // resizeMode: 'contain',
  },
});