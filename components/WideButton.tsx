import React from "react";
import { StyleSheet, ViewStyle, TouchableHighlight } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

interface WideButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function WideButton({
  text,
  onPress,
  disabled = false,
  style,
}: WideButtonProps) {
  const backgroundColor = useThemeColor(
    { light: Colors.dark.background, dark: Colors.light.background },
    "background"
  );

  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, { backgroundColor }, style]}
    >
      <ThemedText
        darkColor="#11181C"
        lightColor="#ECEDEE"
        style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
      >
        {text}
      </ThemedText>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
