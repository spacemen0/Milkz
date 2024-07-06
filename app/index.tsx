import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {useRouter} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {WideButton} from "@/components/WideButton";
import {defaultStyles} from "@/constants/DefaultStyles";

export default function Index() {
    const router = useRouter();

    return (
        <ThemedView style={[defaultStyles.container, styles.container]}>
            <Image
                source={require("../assets/images/cover.jpg")}
                style={styles.coverImage}
            />

            <View style={styles.textContainer}>
                <ThemedText type="title" style={styles.titleText}>
                    If your smile now I might just melt
                </ThemedText>
                <ThemedText type="subtitle" style={styles.subtitleText}>
                    Lick me off the plate
                </ThemedText>
            </View>

            <View style={styles.buttonContainer}>
                <WideButton
                    text="Start with me"
                    onPress={() => {
                        console.log("Login");
                        router.push("/auth?type=login");
                    }}
                    style={styles.button}
                />
                <WideButton
                    text="Create account"
                    onPress={() => {
                        console.log("Sign Up");
                        router.push("/auth?type=signup");
                    }}
                    style={styles.button}
                />
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    coverImage: {
        width: "100%",
        height: "auto",
        aspectRatio: 1,
        borderRadius: 10,
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    titleText: {
        marginTop: 15,
        padding: 10,
        textAlign: "center",
        lineHeight: 32,
    },
    subtitleText: {
        padding: 10,
        textAlign: "center",
    },
    buttonContainer: {
        width: "100%",
    },
    button: {
        margin: 10,
        width: "90%",
        height: 50,
    },
});
