import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import CrearTarea from './app/screens/CrearTarea';
import EditarTarea from './app/screens/EditarTarea';
import Lista from './app/screens/Lista';
import Login from './app/screens/Login';
import ProfileScreen from './app/screens/Perfil';
import RecuperarContraseña from './app/screens/RecuperContraseña';
import Registro from './app/screens/Registro';
import { FIREBASE_AUTH, FIRESTORE_DB } from './firebaseConfig';
import * as Notificaciones from 'expo-notifications';
import * as Device from 'expo-device'
import { Platform } from 'react-native'



Notificaciones.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  })
})



const registerForPushNotificationAsync = async () => {
  let token;
  if(Device.isDevice){
    const {status: existingStatus} = await Notificaciones.getPermissionsAsync();
    let finalStatus = existingStatus;
    if(existingStatus !== 'granted') {
      const { status } = await Notificaciones.requestPermissionsAsync();
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('la obtencion del token del push Notification fue fallida')
      return;
    }
    token = (await Notificaciones.getExpoPushTokenAsync()).data;
    console.log(token);
  } else { return; }

  if (Platform.OS === 'android') {
    Notificaciones.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notificaciones.AndroidImportance.MAX,
      vibrationPattern: [0,250,250,250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

const Stack = createNativeStackNavigator();
const StackInterna = createNativeStackNavigator();

function DiseñoInterno() {
 
  return (
    <StackInterna.Navigator>
      <StackInterna.Screen name='Mi tareas' component={Lista} options={{ title: 'Mis tareas', headerShown: false }}  />
      <StackInterna.Screen name='CrearTarea' component={CrearTarea} options={{ title: 'Crear Tarea', headerShown: false }} />
      <StackInterna.Screen name='EditarTarea' component={EditarTarea} options={{ title: 'Editar Tarea', headerShown: false }} />
      <StackInterna.Screen name='Perfil' component={ProfileScreen} options={{ title: 'Perfil', headerShown: false }}  />
    </StackInterna.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [expoPushToken, setExpoPushToken] = React.useState('');

  React.useEffect(() => {
    registerForPushNotificationAsync().then(token => setExpoPushToken(token))
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (<Stack.Screen name='Interno' component={DiseñoInterno}  options={{ headerShown: false }} />) :
          (<Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />)}
        <Stack.Screen name='Register' component={Registro} options={{ headerShown: false }} />
        <Stack.Screen name='RecuperarContraseña' component={RecuperarContraseña} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
