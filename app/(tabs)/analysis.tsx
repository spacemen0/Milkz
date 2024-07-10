import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { defaultStyles } from "@/utils/DefaultStyles";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSQLiteContext } from "expo-sqlite";
import { getQuizzes } from "@/utils/Database";
import { Quiz } from "@/utils/Types";

const Analysis = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const db = useSQLiteContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await getQuizzes(db);
        setQuizzes(quizData);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchData();
  }, [db]);

  const renderItem = ({ item }: { item: Quiz }) => {
    return item ? (
      <View style={styles.itemContainer}>
        <ThemedText style={styles.title}>{item.question}</ThemedText>
        <ThemedText style={styles.details}>Genre: {item.genre}</ThemedText>
        <ThemedText style={styles.details}>
          Difficulty: {item.difficulty}
        </ThemedText>
        <ThemedText style={styles.details}>
          Answers: {item.answers.join(", ")}
        </ThemedText>
        <ThemedText style={styles.details}>
          Correct Answer: {item.correctAnswer}
        </ThemedText>
      </View>
    ) : (
      <></>
    );
  };

  return (
    <ThemedView style={[defaultStyles.container, { paddingTop: 50 }]}>
      <ThemedText style={defaultStyles.title} type="title">
        Analysis
      </ThemedText>
      <FlatList
        data={quizzes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
  },
  list: {
    padding: 20,
  },
});

export default Analysis;
