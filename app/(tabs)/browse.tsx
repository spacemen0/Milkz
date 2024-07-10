import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { defaultStyles } from "@/utils/DefaultStyles";
import { useSQLiteContext } from "expo-sqlite";
import { getAnswerSheetsByUser } from "@/utils/Database";
import { AnswerSheet } from "@/utils/Types";
import { storage } from "@/utils/Storage";
import { useFocusEffect } from "expo-router";

export default function BrowseAnswerSheets() {
  const [answerSheets, setAnswerSheets] = useState<AnswerSheet[]>([]);
  const username = storage.getString("username");
  const db = useSQLiteContext();

  const fetchData = useCallback(async () => {
    if (username) {
      try {
        const answerSheetData = await getAnswerSheetsByUser(db, username);
        setAnswerSheets(answerSheetData);
      } catch (error) {
        console.error("Error fetching answer sheets:", error);
      }
    }
  }, [db, username]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const renderItem = ({ item }: { item: AnswerSheet }) => (
    <View style={styles.itemContainer}>
      <ThemedText style={styles.details}>Username: {item.username}</ThemedText>
      <ThemedText style={styles.details}>Quiz ID: {item.quizId}</ThemedText>
      <ThemedText style={styles.details}>
        Selected Answer: {item.selectedAnswer}
      </ThemedText>
      <ThemedText style={styles.details}>
        Is Correct: {item.isCorrect ? "Yes" : "No"}
      </ThemedText>
      <ThemedText style={styles.details}>
        Timestamp: {item.timestamp}
      </ThemedText>
    </View>
  );

  return (
    <ThemedView style={[defaultStyles.container, { paddingTop: 50 }]}>
      <ThemedText style={defaultStyles.title} type="title">
        Answer Sheets
      </ThemedText>
      <FlatList
        data={answerSheets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  details: {
    fontSize: 14,
  },
  list: {
    padding: 20,
  },
});
