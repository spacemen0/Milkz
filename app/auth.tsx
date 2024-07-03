import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { defaultStyles } from "@/constants/DefaultStyles";
import { useState } from "react";
import { WideButton } from "@/components/WideButton";
import { Colors } from "@/constants/Colors";
import { save } from "./_layout";

export default function AuthPage() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const onLogInPress = async () => {
    save("isLoggedIn", "true");
    router.dismiss(1);
    router.replace("/(tabs)/quiz");

    console.log("Logged In!");
  };
  const onSignUpPress = async () => {
    router.dismiss(1);
    router.replace("/(tabs)/quiz");

    console.log("Signed Up!");
  };
  return (
    <ThemedView style={[defaultStyles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ width: "80%" }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <Text style={styles.title}>
          {type === "login" ? "Welcome back" : "Create your account"}
        </Text>
        <View style={{ marginBottom: 30 }}>
          <TextInput
            autoCapitalize="none"
            placeholder="john@apple.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />
        </View>

        {type === "login" ? (
          <WideButton onPress={onLogInPress} text="Login" />
        ) : (
          <WideButton onPress={onSignUpPress} text="Sign Up" />
        )}
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    fontSize: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    padding: 10,
    backgroundColor: "#fff",
  },
});
