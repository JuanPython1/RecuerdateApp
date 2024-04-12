import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const ProfileScreen = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No hay usuario logueado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.avatar}
        source={{
          uri: user.photoURL || 'https://via.placeholder.com/150',
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.username}>{user.displayName}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Button title="Cerrar sesión" onPress={() => auth().signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ProfileScreen;
