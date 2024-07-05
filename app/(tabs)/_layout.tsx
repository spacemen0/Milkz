import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: { padding: 5 },
      }}
    >
      <Tabs.Screen
        name="quiz"
        options={{
          tabBarAllowFontScaling: true,
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: () => (
            <MaterialIcons
              name="quiz"
              size={28}
              style={{ marginBottom: -3 }}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: () => (
            <MaterialIcons
              name="bar-chart"
              size={28}
              style={{ marginBottom: -3 }}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: () => (
            <MaterialIcons
              name="people"
              size={28}
              style={{ marginBottom: -3 }}
              color="black"
            />
          ),
        }}
      />
    </Tabs>
  );
}
