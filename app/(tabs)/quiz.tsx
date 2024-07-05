import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/DefaultStyles";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import QuizCard from "@/components/QuizCard";
import { MockData } from "@/constants/Data";

// const ListItem = ({ index }: { index: string }) => {
//   const [height, setHeight] = useState(100);
//   useEffect(() => {
//     setHeight(100);
//   }, [index]);
//   return (
//     <Pressable
//       onPress={() => {
//         if (height === 100) {
//           setHeight(200);
//         } else {
//           setHeight(100);
//         }
//       }}
//       style={{ height }}
//     >
//       <View style={styles.container}>
//         <Text>
//           Web Item: {index}, size: {height}
//         </Text>
//       </View>
//     </Pressable>
//   );
// };

const quiz = () => {
  // const flashListRef = useRef<FlashList<number>>(null);
  // const renderItem = ({ index }: ListRenderItemInfo<number>) => {
  //   return <ListItem index={index.toString()} />;
  // };
  return (
    <ThemedView style={[defaultStyles.container, { paddingTop: 100 }]}>
      <ThemedText style={defaultStyles.title}>quiz</ThemedText>
      <QuizCard {...MockData[1]} />
    </ThemedView>
  );
};

export default quiz;
