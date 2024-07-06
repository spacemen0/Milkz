import React, {useState} from "react";
import {KeyboardAvoidingView, Platform, StyleSheet, TextInput, View,} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {defaultStyles} from "@/constants/DefaultStyles";
import {WideButton} from "@/components/WideButton";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";

export default function AuthPage() {
    const {type} = useLocalSearchParams<{ type: string }>();
    const router = useRouter();
    const placeholderTextColor = useThemeColor({}, "text");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const onLogInPress = async () => {
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
        <ThemedView style={[defaultStyles.container, styles.container]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
            >
                <ThemedText
                    style={[defaultStyles.title, {marginBottom: 20}]}
                    type="title"
                >
                    {type === "login" ? "Welcome back" : "Create your account"}
                </ThemedText>
                <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="john@apple.com"
                        value={emailAddress}
                        onChangeText={setEmailAddress}
                        style={styles.inputField}
                        placeholderTextColor={placeholderTextColor}
                    />
                    <TextInput
                        placeholder="password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.inputField}
                        placeholderTextColor={placeholderTextColor}
                    />
                </View>

                {type === "login" ? (
                    <WideButton
                        onPress={onLogInPress}
                        text="Login"
                        style={styles.button}
                    />
                ) : (
                    <WideButton
                        onPress={onSignUpPress}
                        text="Sign Up"
                        style={styles.button}
                    />
                )}
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
