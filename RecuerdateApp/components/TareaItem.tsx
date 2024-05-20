import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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

  const formatDate = (dateObj: { seconds: number; nanoseconds: number }) => {
    const date = new Date(dateObj.seconds * 1000 + dateObj.nanoseconds / 1000000);
    return date.toLocaleDateString(); // Ajustar el formato según tus necesidades
  };

  const formatTime = (timeObj: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timeObj.seconds * 1000 + timeObj.nanoseconds / 1000000);
    return date.toLocaleTimeString(); // Ajustar el formato según tus necesidades
  };

  return (
    <View style={styles.tareaItem}>
      <View style={styles.textContainer}>
        <Text style={styles.tituloTarea}>{tarea.Nombre}</Text>
        {mostrarDetalles && (
          <>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Descripción: </Text>
              <Text style={styles.fieldValue}>{tarea.Descripcion}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Prioridad:</Text>
              <Text style={styles.fieldValue}>{tarea.Prioridad}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Tipo de Tarea: </Text>
              <Text style={styles.fieldValue}>{tarea.TipoTarea}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Usuario:</Text>
              <Text style={styles.fieldValue}>{tarea.Usuario}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Fecha:</Text>
              <Text style={styles.fieldValue}>{formatDate(tarea.Fecha)}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Hora:</Text>
              <Text style={styles.fieldValue}>{formatTime(tarea.Hora)}</Text>
            </View>
          </>
        )}
      </View>
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
    </View>
  );
};

export default TareaItem;

const styles = StyleSheet.create({
  tituloTarea: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24
  },
  h4: {
    fontSize: 19,
    textAlign: 'left',
  },
  tareaItem: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  icon: {
    margin: 5,
  },
  fieldContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  fieldValue: {
    color: '#666',
  },
});
