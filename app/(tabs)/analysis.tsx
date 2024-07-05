import { View, Text } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/DefaultStyles";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
const analysis = () => {
  return (
    <ThemedView style={defaultStyles.container}>
      <ThemedText style={defaultStyles.title}>analysis</ThemedText>
    </ThemedView>
  );
};

export default analysis;
