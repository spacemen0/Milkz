import { initializeDatabase } from "@/utils/Database";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="quiz.db" onInit={initializeDatabase}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="auth"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
