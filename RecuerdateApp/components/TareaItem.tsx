import React, { useState, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';

interface Tarea {
  id: string;
  Nombre: string;
  Descripcion: string;
  Prioridad: string;
  TipoTarea: string;
  Usuario: string;
  Fecha: { seconds: number; nanoseconds: number }; // Ajustar según el formato real
  Hora: { seconds: number; nanoseconds: number }; // Ajustar según el formato real
}

interface TareaItemProps {
  tarea: Tarea;
  onEditarTarea: (id: string) => void;
  onEliminarTarea: (id: string) => void;
}

const TareaItem: React.FC<TareaItemProps> = ({ tarea, onEditarTarea, onEliminarTarea }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const borderColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateBorderColor = () => {
      Animated.loop(
        Animated.timing(borderColor, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        })
      ).start();
    };

    animateBorderColor();

    return () => {
      borderColor.stopAnimation();
    };
  }, []);

  const interpolateColor = borderColor.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#009DFF', '#ffffff', '#009DFF'], // Azul claro, blanco, azul claro
  });

  const borderColorStyle = {
    borderColor: interpolateColor,
  };

  const formatDate = (dateObj: { seconds: number; nanoseconds: number }) => {
    const date = new Date(dateObj.seconds * 1000 + dateObj.nanoseconds / 1000000);
    return date.toLocaleDateString(); // Ajustar el formato según tus necesidades
  };

  const formatTime = (timeObj: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timeObj.seconds * 1000 + timeObj.nanoseconds / 1000000);
    return date.toLocaleTimeString(); // Ajustar el formato según tus necesidades
  };

  return (
    <Animated.View style={[styles.tareaItem, borderColorStyle]}>
      <Text style={styles.tituloTarea}>{tarea.Nombre}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formatDate(tarea.Fecha)}</Text>
        <Text style={styles.dateText}>{formatTime(tarea.Hora)}</Text>
      </View>
      {mostrarDetalles && (
        <>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Descripción:</Text>
            <Text style={styles.fieldValue}>{tarea.Descripcion}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Prioridad:</Text>
            <Text style={styles.fieldValue}>{tarea.Prioridad}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Tipo de Tarea:</Text>
            <Text style={styles.fieldValue}>{tarea.TipoTarea}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Usuario:</Text>
            <Text style={styles.fieldValue}>{tarea.Usuario}</Text>
          </View>
        </>
      )}
      <View style={styles.iconContainer}>
        <Pressable onPress={() => setMostrarDetalles(!mostrarDetalles)} style={styles.icon}>
          <MaterialIconsIcon name={mostrarDetalles ? 'expand-less' : 'expand-more'} size={29} color='#111d35' />
        </Pressable>
        <Pressable onPress={() => onEditarTarea(tarea.id)} style={styles.icon}>
          <FontAwesome5Icon name="edit" size={20} color="#000000" />
        </Pressable>
        <Pressable onLongPress={() => onEliminarTarea(tarea.id)} style={styles.icon}>
          <AntDesignIcon name='checkcircle' size={25} color='#e75455' />
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default TareaItem;

const styles = StyleSheet.create({
  tituloTarea: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  tareaItem: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 5,
    color: '#555',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  fieldContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  fieldValue: {
    color: '#777',
  },
});
