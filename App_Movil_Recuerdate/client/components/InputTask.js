import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

export default function InputTask({ recordatorios, setRecordatorios }) {
  const [showEmojies, setShowEmojies] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0.1));

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardWillShow", () => {
      setShowEmojies(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setShowEmojies(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleSubmit = async () => {
    if (messageBody === "") {
      return;
    } else {
        const currentTime = new Date();
      const response = await fetch("http://192.168.80.13:8080/recordatorios", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user_id: 1,
          titulo: messageBody,
          descripcion: null,
          fecha_hora: currentTime.toISOString(),
        }),
      });
      const newRecordatorio = await response.json();
      setRecordatorios([...recordatorios, { ...newRecordatorio, shared_with_id: null }]);
      Keyboard.dismiss();
      setMessageBody("");
    }
  };

  const RenderEmoji = ({ emoji }) => {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={"transparent"}
        onPress={() => {
          setMessageBody(messageBody + emoji);
        }}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </TouchableHighlight>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {showEmojies && (
          <Animated.View
            style={[
              styles.emojiesContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <RenderEmoji emoji="✅" />
            <RenderEmoji emoji="🚨" />
            <RenderEmoji emoji="📝" />
            <RenderEmoji emoji="🎁" />
            <RenderEmoji emoji="🛒" />
            <RenderEmoji emoji="🎉" />
            <RenderEmoji emoji="🏃🏻‍♂️" />
          </Animated.View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Agregar Una Nueva Tarea"
            scrollEnabled={true}
            onChangeText={setMessageBody}
            defaultValue={messageBody}
          />
          <Pressable onPress={handleSubmit}>
            <AntDesign
              name="check"
              size={40}
              color={messageBody ? "black" : "#000000"}
              style={{ paddingLeft: 5 }}
            />
          </Pressable>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    // borderTopWidth: 0.2,
    // borderTopColor: "#00000030",
    alignItems: "baseline",
  },
  emojiesContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingLeft: 10,
    marginVertical: 10,
  },
  inputContainer: {
    display:"flex",
    width: "100%",
    height:150,
    margin:10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#477489",
    borderWidth: 1,
    borderRadius: 15,
  },
  emoji: {
    fontSize: 25,
    paddingVertical: 5,
    marginRight: 10,
    color:"#000000",
  },

  containerTextInput: {
    textAlign:"center",
    width: windowWidth - 100,
    // minHeight: 45,
    // paddingHorizontal: 15,
    // paddingTop: 8,
    fontSize: 21,
    paddingVertical: 5,
    borderColor: "lightgray",
    color:"#ffffff",
    marginBottom: 5,
    fontWeight: "600",
  },
});