import React from "react";
import { defaultStyles } from "@/utils/DefaultStyles";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { WideButton } from "@/components/WideButton";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { storage } from "@/utils/Storage";

const profile = () => {
  const router = useRouter();
  return (
    <ThemedView style={defaultStyles.container}>
      <ThemedText style={defaultStyles.title} type="title">
        profile
      </ThemedText>
      <WideButton
        text="Log Out"
        onPress={() => {
          router.replace("/");
          storage.set("LoggedIn", false);
        }}
        style={styles.button}
      />
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  button: {
    margin: 10,
    width: "90%",
    height: 50,
  },
});

export default profile;
