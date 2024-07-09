import React from "react";
import { defaultStyles } from "@/utils/DefaultStyles";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const analysis = () => {
  return (
    <ThemedView style={defaultStyles.container}>
      <ThemedText style={defaultStyles.title} type="title">
        analysis
      </ThemedText>
    </ThemedView>
  );
};

export default analysis;
