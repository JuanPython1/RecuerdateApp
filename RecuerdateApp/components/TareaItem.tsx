// TareaItem.tsx
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TareaItemProps {
  tarea: any; // Tipo de datos para la tarea
  onEditarTarea: (id: string) => void; // Función para editar la tarea
  onEliminarTarea: (id: string) => void; // Función para eliminar la tarea
}

const TareaItem: React.FC<TareaItemProps> = ({ tarea, onEditarTarea, onEliminarTarea }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  return (
    <View style={styles.tareaItem}>
      <Text style={styles.h4}>Titulo: {tarea.Nombre}</Text>
      {mostrarDetalles && (
        <>
          <Text style={styles.h4}>Descripción: {tarea.Descripcion}</Text>
          <Text style={styles.h4}>Prioridad: {tarea.Prioridad}</Text>
          <Text style={styles.h4}>Tipo de Tarea: {tarea.TipoTarea}</Text>
          <Text style={styles.h4}>Usuario: {tarea.Usuario}</Text>
        </>
      )}
      <Pressable
        onPress={() => setMostrarDetalles(!mostrarDetalles)}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#ffffff' : '#111d35',
          padding: 10,
          borderRadius: 360,
          marginTop: 5,
        })}
      >
        <Text style={{ color: '#ffffff' }}>
          {mostrarDetalles ? 'Cerrar Detalles' : 'Ver Detalles'}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onEditarTarea(tarea.id)}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#ffffff' : '#111d35',
          padding: 10,
          borderRadius: 360,
          marginTop: 5,
        })}
      >
        <Text style={{ color: '#ffffff' }}>Editar Tarea</Text>
      </Pressable>
      <Pressable
        onLongPress={() => onEliminarTarea(tarea.id)}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#000000' : '#e75455',
          padding: 10,
          borderRadius: 360,
          marginTop: 5,
        })}
      >
        <Text style={{ color: '#fff' }}>Eliminar</Text>
      </Pressable>
    </View>
  );
};

export default TareaItem;

const styles = StyleSheet.create({
  h4: {
    fontSize: 19,
    textAlign: 'center',
  },
  tareaItem: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
