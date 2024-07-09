import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { defaultStyles } from "@/utils/DefaultStyles";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import QuizCard from "@/components/QuizCard";
import { Data } from "@/utils/Data";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MMKV, useMMKVString } from "react-native-mmkv";
import { storage } from "@/utils/Storage";

const Quiz = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  console.log(useMMKVString("username", storage)[0]);
  const handlePress = (selectedOption: 0 | 1 | 2) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      translateY.value = withTiming(10, {
        duration: 500,
        easing: Easing.linear,
      });
      opacity.value = withTiming(
        0,
        { duration: 500, easing: Easing.linear },
        () => {
          runOnJS(updateQuizIndex)();
          translateY.value = 10;
          opacity.value = withTiming(1, {
            duration: 500,
            easing: Easing.linear,
          });
          translateY.value = withTiming(
            0,
            { duration: 500, easing: Easing.linear },
            () => {
              runOnJS(setIsAnimating)(false);
            }
          );
        }
      );
    }, 500);
  };

  const updateQuizIndex = () => {
    setCurrentQuizIndex((prevIndex) => (prevIndex + 1) % Data.length);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <ThemedView style={[defaultStyles.container, { paddingTop: 100 }]}>
      <ThemedText style={[defaultStyles.title]} type="title">
        Your Daily Quiz
      </ThemedText>
      <ThemedText style={[styles.subtext]} type="subtitle">
        Question {currentQuizIndex + 1} of {Data.length}
      </ThemedText>
      <View style={styles.quizContainer}>
        <Animated.View style={[animatedStyle, styles.quizCardContainer]}>
          <QuizCard
            {...Data[currentQuizIndex]}
            onPress={handlePress}
            disabled={isAnimating}
          />
        </Animated.View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quizCardContainer: {
    alignSelf: "stretch",
    marginHorizontal: 20,
  },
  subtext: {
    fontSize: 15,
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 5,
  },
});

export default Quiz;
