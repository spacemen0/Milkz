import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/utils/Colors";
import { AnimatedButton } from "./AnimatedButton";
import { Quiz } from "@/utils/Types";
import { addAnswerSheet } from "@/utils/Database";
import { storage } from "@/utils/Storage";
import { useSQLiteContext } from "expo-sqlite";
import { getCurrentTimeFormatted } from "@/utils/Helpers";

const QuizCard = ({
  quiz,
  onPress,
  disabled,
}: {
  quiz: Quiz;
  onPress: (option: 0 | 1 | 2) => void;
  disabled: boolean;
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const username = storage.getString("username");
  const db = useSQLiteContext();
  const borderColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );
  useEffect(() => {
    setSelectedOption(null);
  }, [quiz]);
  const handlePress = async (index: 0 | 1 | 2) => {
    if (disabled) return;
    setSelectedOption(index);
    onPress(index);
    username &&
      (await addAnswerSheet(
        db,
        username,
        quiz.id,
        index,
        getCurrentTimeFormatted(),
        index === quiz.correctAnswer
      ));
  };

  return (
    <ThemedView style={[styles.cardContainer, { borderColor: borderColor }]}>
      <ThemedText style={styles.cardTitle}>{quiz.question}</ThemedText>
      {quiz.answers.map((text, index) => (
        <AnimatedButton
          text={text}
          key={index}
          style={styles.wideButton}
          onPress={() => handlePress(index as 0 | 1 | 2)}
          disabled={disabled}
          correctAnswer={
            selectedOption === index ? index === quiz.correctAnswer : undefined
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
