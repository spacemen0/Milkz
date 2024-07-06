import type { TextProps, ViewProps } from "react-native";

export type QuizInfo = {
  question: string;
  answers: [string, string, string];
  correctAnswer: 0 | 1 | 2;
};

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};
