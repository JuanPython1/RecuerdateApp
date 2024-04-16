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
          <Image style={styles.icon3} source={require('../../assets/perfil.png')} />
      {userData && (
        <>
          <Text >Nombre de usuario {userData.user}</Text>
          <Text >Correo electrónico {userData.email}</Text>
        </>
      )}</View>
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
    backgroundColor:'#ffffff'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 15,
    marginTop: 5,
    height:20,
  },
  h1: {
    fontFamily:'Roboto',
    fontWeight:'bold',
    // paddingTop: 2,
    fontSize: 20,
    textAlign:"center",
    alignItems: 'center',
    alignSelf: 'center',
  },
  h2: {
    color: 'black',
    fontSize: 14,
    // paddingTop: 2,
    textAlign:"center",
  },
  h3: {
    color: 'black',
    fontSize: 14,
    paddingTop: 2,
    textAlign:"left",
  },
  userInfo: {
    marginVertical:5,
    flexDirection:'column',
    // textAlign:'center',
    alignItems:'center',
    padding:10,
    fontSize: 15,
    marginHorizontal: 65,
  },
  icon: {
    width: 45,
    height: 45,
    marginTop: 10,
    marginHorizontal:10
  },
  icon2: {
    width: 45,
    height: 45,
    marginTop: 10,
    marginHorizontal:15,
    opacity:0
  },
  icon3: {
    backgroundColor:'#ff6b5b',
    width: 180,
    height: 180,
    marginTop: 10,
    marginHorizontal:15
  },
  backImage: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  whiteBox: {
    padding:10,
    backgroundColor: '#ff6b5b',
    width:'100%',
  },
});

