import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import CrearTarea from './app/screens/CrearTarea';
import Lista from './app/screens/Lista';
import Login from './app/screens/Login';
import ProfileScreen from './app/screens/Perfil';
import RecuperarContraseña from './app/screens/RecuperContraseña';
import Registro from './app/screens/Registro';
import { FIREBASE_AUTH } from './firebaseConfig';


const Stack = createNativeStackNavigator();
const StackInterna = createNativeStackNavigator();

function diseñoInterno() {
  return(
    <StackInterna.Navigator>
        <StackInterna.Screen name='Mi tareas' component={Lista} options={{title: 'Mis tareas', headerShown:false}}/>
        <StackInterna.Screen name='CrearTarea' component={CrearTarea} options={{headerShown: false}}/>
        <StackInterna.Screen name='Perfil' component={ProfileScreen} options={{ title: 'Perfil', headerShown: false }} />  
    </StackInterna.Navigator>
  )

}

export default function App() {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
      });
    }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (<Stack.Screen name='Interno' component={diseñoInterno} options={{headerShown: false}} />):
         (<Stack.Screen name='Login' component={Login} options={{headerShown: false}} />)}
          <Stack.Screen name='Register' component={Registro} options={{headerShown: false}} />
          <Stack.Screen name='RecuperarContraseña' component={RecuperarContraseña} options={{headerShown: false}} />
      </Stack.Navigator>


    </NavigationContainer>
  );
}


