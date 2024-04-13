import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';

const Perfil = ({ navigation }: any) => {
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => {
                return { opacity: pressed ? 0 : 1 };
              }}>
              <Image style={styles.icon} source={require('../../assets/icono.png')} />
            </Pressable>
      {userData && (
        <>
          <Text style={styles.userInfo}>Nombre de usuario: {userData.username}</Text>
          <Text style={styles.userInfo}>Correo electrónico: {userData.email}</Text>
        </>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
  icon: {
    width: 45,
    height: 45,
    marginTop: 20,
  },
});

export default Perfil;
