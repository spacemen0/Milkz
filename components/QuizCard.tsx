import { StyleSheet, View } from "react-native";
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
  onPress: () => void;
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
    onPress();
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
    <ThemedView style={[styles.cardContainer, { borderColor }]}>
      <View>
        <ThemedText style={styles.cardTitle}>{quiz.question}</ThemedText>
        <ThemedText
          style={styles.cardSubtitle}
        >{`[${quiz.difficulty}]`}</ThemedText>
        <ThemedText style={styles.cardSubtitle}>{`[${quiz.genre}]`}</ThemedText>
      </View>
      <View>
        {quiz.answers.map((text, index) => (
          <AnimatedButton
            text={text}
            key={index}
            style={styles.wideButton}
            onPress={() => handlePress(index as 0 | 1 | 2)}
            disabled={disabled}
            correctAnswer={
              selectedOption === index
                ? index === quiz.correctAnswer
                : undefined
            }
          />
        ))}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 2,
    borderRadius: 25,
    padding: 12,
    paddingVertical: 30,
    justifyContent: "space-around",
    minWidth: "80%",
    height: 460,
    marginHorizontal: 20,
    alignSelf: "stretch",
    flexGrow: 0,
  },
  cardTitle: {
    fontSize: 24,
    paddingVertical: 2,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 20,
    textAlign: "center",
  },
  wideButton: {
    marginTop: 10,
  },
});

export default QuizCard;
