import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { AnimatedButton } from "./AnimatedButton";

const QuizCard = ({
  question,
  answers,
  correctAnswer,
  onPress,
  disabled,
}: {
  question: string;
  answers: [string, string, string];
  correctAnswer: 0 | 1 | 2;
  onPress: (option: 0 | 1 | 2) => void;
  disabled: boolean;
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const borderColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );
  useEffect(() => {
    setSelectedOption(null);
  }, [question, answers]);
  const handlePress = (index: 0 | 1 | 2) => {
    if (disabled) return;
    setSelectedOption(index);
    onPress(index);
  };

  return (
    <ThemedView style={[styles.cardContainer, { borderColor: borderColor }]}>
      <ThemedText style={styles.cardTitle}>{question}</ThemedText>
      {answers.map((text, index) => (
        <AnimatedButton
          text={text}
          key={index}
          style={styles.wideButton}
          onPress={() => handlePress(index as 0 | 1 | 2)}
          disabled={disabled}
          correctAnswer={
            selectedOption === index ? index === correctAnswer : undefined
          }
        />
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 2,
    borderRadius: 25,
    padding: 12,
    paddingVertical: 30,
    minWidth: "80%",
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
    marginTop: 20,
  },
});

export default QuizCard;
