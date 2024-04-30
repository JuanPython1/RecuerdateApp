import React, { useEffect, useState, useRef } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { getDoc, doc } from 'firebase/firestore'; // Importa las funciones necesarias de Firestore
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import AvatarPerfil from '../../components/AvatarPerfilEditable';


const fotoPerfil = {
  img: '/assets/AvatarNeutral.webp'
}


const Perfil = ({ navigation }: any) => {
  const [userData, setUserData] = useState<any | null>(null);
  const firestore = FIRESTORE_DB;

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (FIREBASE_AUTH.currentUser) {
          const userDoc = await getDoc(doc(firestore, 'usuarios', FIREBASE_AUTH.currentUser.uid)); // Suponiendo que 'usuarios' es la colección donde guardas los datos del usuario
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
   
  }, [firestore]);
  console.log(userData)
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
            <Image style={styles.icon2} source={require('../../assets/perfil.png')} />
          </View>
          <Text style={styles.h2}>Mi Perfil</Text>
        </View>
        <View style={styles.userInfo}>
        <AvatarPerfil info={fotoPerfil}/>
          {userData && (
            <>
              <Text style={styles.h3}>Nombre de usuario: {userData.username}</Text>
              <Text style={styles.h3}>Correo electrónico: {userData.email}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    height: 20,
  },
  h1: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  h2: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  h3: {
    color: 'black',
    fontSize: 14,
    paddingTop: 2,
    textAlign: 'left',
  },
  userInfo: {
    marginVertical: 5,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    fontSize: 15,
    marginHorizontal: 65,
  },
  icon: {
    width: 45,
    height: 45,
    marginTop: 10,
    marginHorizontal: 10,
  },
  icon2: {
    width: 45,
    height: 45,
    marginTop: 10,
    marginHorizontal: 15,
    opacity: 0,
  },
  icon3: {
    backgroundColor: '#ff6b5b',
    width: 180,
    height: 180,
    marginTop: 10,
    marginHorizontal: 15,
  },
  backImage: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  whiteBox: {
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingBottom: 10,
  },
});
