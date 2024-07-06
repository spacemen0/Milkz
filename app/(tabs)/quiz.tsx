import React, { useState } from "react";
import { Alert } from "react-native";
import { defaultStyles } from "@/constants/DefaultStyles";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import QuizCard from "@/components/QuizCard";
import { MockData } from "@/constants/Data";

const Quiz = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const handlePress = (selectedOption: 0 | 1 | 2) => {
    const currentQuiz = MockData[currentQuizIndex];
    const isCorrect = currentQuiz.correctAnswer === selectedOption;

    if (isCorrect) {
      Alert.alert("Correct");
    } else {
      Alert.alert("Fail");
    }
    setCurrentQuizIndex((prevIndex) => (prevIndex + 1) % MockData.length);
  };

  return (
    <ThemedView style={[defaultStyles.container, { paddingTop: 100 }]}>
      <ThemedText style={defaultStyles.title}>Quiz</ThemedText>
      <QuizCard {...MockData[currentQuizIndex]} onPress={handlePress} />
    </ThemedView>
  );
};

export default Quiz;
