import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import AvatarPerfilEditable from '../../components/AvatarPerfilEditable';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';

const Perfil = ({ navigation }: any) => {
  const [userData, setUserData] = useState<any | null>(null);
  const [fotoPerfil, setFotoPerfil] = useState({ img: '/assets/AvatarNeutral.webp' });
  const firestore = FIRESTORE_DB;

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (FIREBASE_AUTH.currentUser) {
          const userDoc = await getDoc(doc(firestore, 'usuarios', FIREBASE_AUTH.currentUser.uid));
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

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requieren permisos para acceder a la galería de imágenes');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFotoPerfil({ img: result.assets[0].uri });
    }
  };

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
          <AvatarPerfilEditable info={fotoPerfil} onPress={selectImage} />
          {userData && (
            <View style={styles.userDataContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.h3}>{userData.username}</Text>
                <AntDesignIcon name='user' style={styles.iconos} />
              </View>
              <View style={styles.barraHorizontal} />
              <View style={styles.rowContainer}>
                <Text style={styles.h3}>{userData.email}</Text>
                <AntDesignIcon name='mail' style={styles.iconos} />
              </View>
              <View style={styles.barraHorizontal} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  barraHorizontal: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
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
    fontSize: 15,
    marginTop: 80,
  },
  userDataContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '65%',
  },
  userInfo: {
    marginTop: 5,
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 15,
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
  iconos: {
    color: '#545454',
    fontSize: 25,
    marginLeft: 10,
    top: 40,
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default Perfil;
