import { View, Text, Button } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}


const Lista = ({navigation}: RouterProps) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={() => navigation.navigate('detalles')} title='Abrir Detalles' />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title='Cerrar Sesión' />
    </View>
  )
}

export default Lista