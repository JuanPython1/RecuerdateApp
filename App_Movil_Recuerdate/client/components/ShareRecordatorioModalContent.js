import { useEffect, useState } from "react";
import { Keyboard, View, Text, StyleSheet, Button, Alert } from "react-native";

export default function SharedRecordatorioModalContent({
  id,
  titulo,
  descripcion,
  fecha_hora,
  shared_with_id,
  completado,
}) {
  const [author, setAuthor] = useState({});
  const [sharedWith, setSharedWith] = useState({});
  useEffect(() => {
    fetchInfo();
  }, []);

  async function fetchInfo() {
    const response = await fetch(
      `http://192.168.80.13:8080/recordatorios/shared_recordatorios/${id}`,
      {
        method: "GET",
      }
    );
    const { author, shared_with } = await response.json();
    setAuthor(author);
    setSharedWith(shared_with);
  }

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.titulo, { marginBottom: 20 }]}>Tareas Compartidas</Text>
      <Text style={[styles.titulo, { marginBottom: 20 }]}>"{titulo}"</Text>
      <Text style={[styles.titulo]}>Estado</Text>
      <View
        style={[
          styles.status,
          { backgroundColor: completado === 1 ? "#4ade80" : "#f87171" },
        ]}
      >
        <Text style={[styles.titulo, { color: "white" }]}>
          {completado === 1 ? "Completado" : "Incompleto"}
        </Text>
      </View>
      <Text style={[styles.descripcion]}>PARTICIPANTES</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.participant}>
          <Text style={[styles.descripcion, { color: "white" }]}>
            {author.name}
          </Text>
        </View>
        <View style={styles.participant}>
          <Text style={[styles.descripcion, { color: "white" }]}>
            {sharedWith.name}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  titulo: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  descripcion: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "900",
    color: "black",
  },
  participant: {
    backgroundColor: "#8b5cf6",
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 20,
    fontWeight: "900",
    color: "white",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
  status: {
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 20,
    fontWeight: "900",
    color: "white",
  },
});