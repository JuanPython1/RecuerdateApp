import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Avatar, Caption, Text, Title } from 'react-native-paper'
// import { NavigationProp } from '@react-navigation/native'

const ProfileScreem =() => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={StylePropertyMap.userInfoSection}>
        <View>
          <Avatar.Image
          source={{uri:'RecuerdateApp/assets/perfil.png'}} size={80}
          />
        </View>
        <View>
          <Title style={styles.h1}>John Doe</Title>
          <Caption style={styles.h1}>John Doe</Caption>
          <Text style={styles.h1}>John Doe</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
// interface RouterProps {
//   navigation: NavigationProp<any, any>;
// }
// export default function InfoUser({ user }){
//   console.log
//   return(
//     <View>
//       <Text>InfoUser...</Text>
//     </View>
//   )
// }

// const Perfil = ({navigation}: RouterProps ) => {


//   return (
//     <View style={styles.container}>
//       <Text>Perfil</Text>
//       <Pressable
//               onPress={() => navigation.navigate('Mi tareas')}
//               style={({ pressed }) => {
//                 return { opacity: pressed ? 0 : 1 };
//               }}>
//               <Image style={styles.icon} source={require('../../assets/icono.png')} />
//             </Pressable>
//     </View>
//   )
// }

// export default Perfil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#acf9ff',
    color: '#ffffff',
  },
  h1: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  icon: {
    width: 45,
    height: 45,
    marginTop:20
    // resizeMode: 'contain',
  },
  whiteBox: {
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
  },
})