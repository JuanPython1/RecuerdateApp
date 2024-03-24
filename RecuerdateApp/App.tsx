import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './app/screens/Login';
import Lista from './app/screens/Lista';
import Detalles from './app/screens/Detalles';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

const Stack = createNativeStackNavigator();
const StackInterna = createNativeStackNavigator();

function diseñoInterno() {
  return(
    <StackInterna.Navigator>
       <StackInterna.Screen name='Mi tareas' component={Lista} />
       <StackInterna.Screen name='detalles' component={Detalles} />
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
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}


