import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { defaultStyles } from "@/constants/DefaultStyles";
import { WideButton } from "./WideButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

const QuizCard = ({
  title,
  options,
}: {
  title: string;
  options: [string, string, string];
}) => {
  const borderColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );
  return (
    <ThemedView
      style={[
        defaultStyles.container,
        {
          borderColor: borderColor,
          borderWidth: 2,
          borderRadius: 4,
          padding: 10,
          marginTop: 20,
          flexGrow: 0.5,
        },
      ]}
    >
      <ThemedText style={{ fontSize: 24 }}>{title}</ThemedText>
      {options.map((text, index) => (
        <WideButton
          text={text}
          key={index}
          style={{ width: 280, marginTop: 15 }}
          onPress={() => {
            alert("Press!");
          }}
        ></WideButton>
      ))}
    </ThemedView>
  );
};

export default QuizCard;

const styles = StyleSheet.create({});
