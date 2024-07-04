import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

// export async function save(key: string, value: string) {
//   await SecureStore.setItemAsync(key, value);
// }

// export async function getValueFor(key: string) {
//   let result = await SecureStore.getItemAsync(key);
//   if (result) {
//     return result;
//   } else {
//     return undefined;
//   }
// }
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="auth"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
