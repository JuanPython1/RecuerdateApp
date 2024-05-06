// TareaItem.tsx
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';

interface TareaItemProps {
  tarea: any; // Tipo de datos para la tarea
  onEditarTarea: (id: string) => void; // Función para editar la tarea
  onEliminarTarea: (id: string) => void; // Función para eliminar la tarea
}

const TareaItem: React.FC<TareaItemProps> = ({ tarea, onEditarTarea, onEliminarTarea }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  return (
    <View style={styles.tareaItem}>
      <View style={styles.textContainer}>
        <Text style={styles.h4}> {tarea.Nombre}</Text>
        {mostrarDetalles && (
          <>
            <Text style={styles.h4}>Descripción: {tarea.Descripcion}</Text>
            <Text style={styles.h4}>Prioridad: {tarea.Prioridad}</Text>
            <Text style={styles.h4}>Tipo de Tarea: {tarea.TipoTarea}</Text>
            <Text style={styles.h4}>Usuario: {tarea.Usuario}</Text>
          </>
        )}
      </View>
      <View style={styles.iconContainer}>
        <Pressable
          onPress={() => setMostrarDetalles(!mostrarDetalles)}
        >
            {mostrarDetalles ? <MaterialIconsIcon name='expand-less' size={29} color='#111d35'/> : <MaterialIconsIcon name='expand-more' size={29} color='#111d35'/>}
         
        </Pressable>
        <Pressable
          onPress={() => onEditarTarea(tarea.id)} style={{margin: 3}}
        >
        <FontAwesome5Icon name="edit" size={20} color="#000000" style={{margin: 3}} />
        </Pressable>
        <Pressable
          onLongPress={() => onEliminarTarea(tarea.id)}
          style={{margin: 3}}>
          <AntDesignIcon name='checkcircle' size={25} color='#e75455' />
        </Pressable>
      </View>
    </View>
  );
};

export default TareaItem;

const styles = StyleSheet.create({
  h4: {
    fontSize: 19,
    textAlign: 'left',
  },
  tareaItem: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent:'center'
  },
});
