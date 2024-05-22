import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import CrearTarea from './app/screens/CrearTarea';
import EditarTarea from './app/screens/EditarTarea';
import Lista from './app/screens/Lista';
import Login from './app/screens/Login';
import ProfileScreen from './app/screens/Perfil';
import RecuperarContraseña from './app/screens/RecuperContraseña';
import Registro from './app/screens/Registro';
import { FIREBASE_AUTH, FIRESTORE_DB } from './firebaseConfig';


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
