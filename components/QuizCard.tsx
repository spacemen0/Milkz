import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { defaultStyles } from "@/constants/DefaultStyles";

const QuizCard = () => {
  return (
    <ThemedView style={[defaultStyles.container]}>
      <ThemedText>QuizCard</ThemedText>
    </ThemedView>
  );
};

export default QuizCard;

const styles = StyleSheet.create({});
