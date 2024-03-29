import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Lista = ({ navigation }: RouterProps) => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.backImage}>
        <View style={styles.whiteBox}>
          <View style={styles.titleContainer}>
          
            <Pressable
              onPress={() => FIREBASE_AUTH.signOut()}
              style={({ pressed }) => {
                return { opacity: pressed ? 0 : 1 };
              }}>
              <Image style={styles.icon} source={require('../../assets/icono.png')} />
            </Pressable>
            <Text style={styles.h1}>RecuerDate</Text>  
            <Pressable
              onPress={() => navigation.navigate('detalles')}
              style={({ pressed }) => {
                return { opacity: pressed ? 0 : 1 };
              }}>
              <Image style={styles.icon} source={require('../../assets/perfil.png')} />
            </Pressable>
          </View>
          <Text style={styles.h2}>Mis Tareas</Text>
        </View>
        <Text> ^ Filtrar por Fecha</Text>
      </View>
    </View>
  );
};

export default Lista;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#acf9ff',
    color: '#ffffff',
  },
  h1: {
    paddingTop: 2,
    fontSize: 30,
    textAlign:"center",
  },
  h2: {
    color: 'black',
    fontSize: 15,
    paddingTop: 2,
    textAlign:"center",
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',   
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',   
  },
});