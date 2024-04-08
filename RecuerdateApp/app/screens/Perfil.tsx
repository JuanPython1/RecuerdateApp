import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}


const Perfil = ({navigation}: RouterProps ) => {


  return (
    <View style={styles.container}>
      <Text>Perfil</Text>
      <Pressable
              onPress={() => navigation.navigate('Mi tareas')}
              style={({ pressed }) => {
                return { opacity: pressed ? 0 : 1 };
              }}>
              <Image style={styles.icon} source={require('../../assets/icono.png')} />
            </Pressable>
    </View>
  )
}

export default Perfil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#acf9ff',
    color: '#ffffff',
  },  
  icon: {
    width: 45,
    height: 45,
    marginTop:20
    // resizeMode: 'contain',
  },
})