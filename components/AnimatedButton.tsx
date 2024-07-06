import React, { useEffect } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface AnimatedWideButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  correctAnswer?: boolean | undefined; // true for correct, false for incorrect
}

export function AnimatedButton({
  text,
  onPress,
  disabled = false,
  style,
  correctAnswer = undefined,
}: AnimatedWideButtonProps) {
  const backgroundColor = useThemeColor(
    { light: Colors.dark.background, dark: Colors.light.background },
    "background"
  );

  const animatedBackgroundColor = useSharedValue(backgroundColor);

  useEffect(() => {
    if (correctAnswer !== undefined) {
      animatedBackgroundColor.value = withTiming(
        correctAnswer ? "green" : "red",
        { duration: 500, easing: Easing.linear }
      );
    }
    // else {
    //   animatedBackgroundColor.value = backgroundColor;
    // }
  }, [correctAnswer, backgroundColor]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: animatedBackgroundColor.value,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style]}
    >
      <Animated.View
        style={[
          correctAnswer !== undefined
            ? animatedStyle
            : { backgroundColor: backgroundColor },
          styles.animatedView,
        ]}
      >
        <ThemedText
          darkColor="#11181C"
          lightColor="#ECEDEE"
          style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
        >
          {text}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  animatedView: {
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
