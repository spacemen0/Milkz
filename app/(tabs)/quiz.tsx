import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { defaultStyles } from "@/utils/DefaultStyles";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import QuizCard from "@/components/QuizCard";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MMKV, useMMKVString } from "react-native-mmkv";
import { storage } from "@/utils/Storage";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { Quiz } from "@/utils/Types";
import { getRandomUnansweredQuiz } from "@/utils/Database";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

const QuizComponent = () => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const backgroundColor = useThemeColor({}, "background");
  const db = useSQLiteContext();
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const fetchRandomQuiz = useCallback(async () => {
    setIsAnimating(true);
    const username = storage.getString("username");
    if (username) {
      try {
        const quiz = await getRandomUnansweredQuiz(db, username);
        setCurrentQuiz(quiz);
      } catch (error) {
        console.error("Error fetching random quiz:", error);
      } finally {
        setIsAnimating(false);
      }
    }
  }, []);
  useEffect(() => {
    fetchRandomQuiz();
  }, [fetchRandomQuiz]);

  const handlePress = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      translateY.value = withTiming(10, {
        duration: 600,
        easing: Easing.linear,
      });
      opacity.value = withTiming(
        0,
        { duration: 600, easing: Easing.linear },
        () => {
          runOnJS(updateQuiz)();
          translateY.value = 10;
          opacity.value = withTiming(1, {
            duration: 1200,
            easing: Easing.linear,
          });
          translateY.value = withTiming(
            0,
            { duration: 600, easing: Easing.linear },
            () => {
              runOnJS(setIsAnimating)(false);
            }
          );
        }
      );
    }, 600);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const updateQuiz = async () => {
    await fetchRandomQuiz();
  };

  if (!currentQuiz) {
    return (
      <View style={[defaultStyles.container]}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <SafeAreaView
      mode="padding"
      style={[defaultStyles.container, { backgroundColor }]}
    >
      <ThemedView style={[defaultStyles.container]}>
        <View>
          <ThemedText style={[defaultStyles.title]} type="title">
            Your Daily Quiz
          </ThemedText>
          <ThemedText style={[styles.subtext]} type="subtitle">
            {currentQuiz ? `Question ${currentQuiz.id + 1}` : ""}
          </ThemedText>
        </View>
        <Animated.View style={[animatedStyle, styles.quizCardContainer]}>
          <QuizCard
            quiz={currentQuiz}
            onPress={handlePress}
            disabled={isAnimating}
          />
        </Animated.View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quizCardContainer: {
    alignSelf: "flex-end",
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

export default QuizComponent;
