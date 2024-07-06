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
  onPress,
}: {
  title: string;
  options: [string, string, string];
  onPress: (option: 0 | 1 | 2) => void;
}) => {
  const borderColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  return (
    <ThemedView style={[styles.cardContainer, { borderColor: borderColor }]}>
      <ThemedText style={styles.cardTitle}>{title}</ThemedText>
      {options.map((text, index) => (
        <WideButton
          text={text}
          key={index}
          style={styles.wideButton}
          onPress={() => onPress(index as 0 | 1 | 2)}
        />
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 2,
    borderRadius: 25,
    padding: 10,
    paddingTop: 20,
    margin: 20,
    alignSelf: "stretch",
    flexGrow: 0,
  },
  cardTitle: {
    fontSize: 24,
    paddingVertical: 2,
    textAlign: "center",
  },
  wideButton: {
    marginTop: 15,
  },
});

export default QuizCard;
