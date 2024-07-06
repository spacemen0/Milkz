import type { TextProps, ViewProps } from "react-native";

export type QuizInfo = {
  title: string;
  options: [string, string, string];
  correctOption: 0 | 1 | 2;
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
