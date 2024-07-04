import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tabs.Screen
        name="quiz"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="quiz" size={24} color="black" />
          ),
        }}
      />{" "}
      <Tabs.Screen
        name="analysis"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="bar-chart" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="people" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
