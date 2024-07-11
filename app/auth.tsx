import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { defaultStyles } from "@/utils/DefaultStyles";
import { WideButton } from "@/components/WideButton";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { storage } from "@/utils/Storage";
import { addUser } from "@/utils/Database";
import { useSQLiteContext } from "expo-sqlite";

const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;

export default function AuthPage() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const router = useRouter();
  const placeholderTextColor = useThemeColor({}, "text");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const db = useSQLiteContext();

  const validateInputs = () => {
    if (username.length < MIN_USERNAME_LENGTH) {
      Alert.alert(
        "😠",
        `Username must be at least ${MIN_USERNAME_LENGTH} characters long.`
      );
      return false;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      Alert.alert(
        "😠",
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
      return false;
    }

    const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordComplexityRegex.test(password)) {
      Alert.alert(
        "😠",
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return false;
    }

    return true;
  };

  const onLogInPress = async () => {
    if (!validateInputs()) return;
    router.dismiss(1);
    router.replace("/(tabs)/quiz");
    storage.set("LoggedIn", true);
    storage.set("username", username);

    console.log("Logged In!");
  };

  const onSignUpPress = async () => {
    if (!validateInputs()) return;
    await addUser(db, username);
    router.dismiss(1);
    router.replace("/(tabs)/quiz");
    console.log("Signed Up!");
  };

  return (
    <ThemedView style={[defaultStyles.container, styles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <ThemedText
          style={[defaultStyles.title, { marginBottom: 20 }]}
          type="title"
        >
          {type === "login" ? "Welcome back" : "Create your account"}
        </ThemedText>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text.trim())}
            style={styles.inputField}
            placeholderTextColor={placeholderTextColor}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            secureTextEntry
            style={styles.inputField}
            placeholderTextColor={placeholderTextColor}
          />
        </View>

        <WideButton
          onPress={type === "login" ? onLogInPress : onSignUpPress}
          text={type === "login" ? "Login" : "Sign Up"}
          style={styles.button}
        />
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  keyboardAvoidingView: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 30,
  },
  inputField: {
    width: "100%",
    height: 50,
    fontSize: 18,
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    marginVertical: 8,
  },
  button: {
    width: "100%",
    height: 50,

    justifyContent: "center",
    alignItems: "center",
  },
});
