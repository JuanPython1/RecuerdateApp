import { useState } from "react";
import { Keyboard, View, Text, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function RecordatorioModalContent({ id, titulo }) {
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch("http://192.168.80.13:8080/recordatorios/shared_recordatorios", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        recordatorio_id: id,
        user_id: 1, //hard coded value (user 1)
        email: email, // hard coded value (user 2)
      }),
    });
    const data = await response.json();
    console.log(data);
    Keyboard.dismiss();
    setEmail("");
    setFocus(false);
    Alert.alert(
      "¡Felicitaciones! 🎉",
      `Has compartido exitosamente ${titulo} con ${email}`,
      [{ text: "Listo" }]
    );
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>¡COMPARTE TU TAREA!</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>"{titulo}"</Text>
      <Text style={styles.description}>
      Ingresa el correo electrónico del usuario con el que deseas compartir tu tarea. Comparten un 
      tarea con alguien y manténgase sincronizado con sus objetivos todos los días.
      </Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType="email-address"
        style={[
          styles.input,
          focus && { borderWidth: 3, borderColor: "black" },
        ]}
        placeholder="Introduce tu email de contacto"
      />
      <Button
        onPress={handleSubmit}
        title="COMPARTIR"
        disabled={email.length === 0}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
});