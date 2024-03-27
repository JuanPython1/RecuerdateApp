import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Detalles from './app/screens/Detalles';
import Lista from './app/screens/Lista';
import Login from './app/screens/Login';
import Registro from './app/screens/Registro';
import { FIREBASE_AUTH } from './firebaseConfig';

const Stack = createNativeStackNavigator();
const StackInterna = createNativeStackNavigator();

function diseñoInterno() {
  return(
    <StackInterna.Navigator>
       <StackInterna.Screen name='Mi tareas' component={Lista} options={{headerShown:false}}/>
       <StackInterna.Screen name='detalles' component={Detalles} options={{headerShown: false}} />
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

          <Stack.Screen name='Register' component={Registro} />
      </Stack.Navigator>


    </NavigationContainer>
  );
}


