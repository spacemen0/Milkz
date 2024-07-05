import type { TextProps, ViewProps } from "react-native";

export type QuizInfo = {
  title: string;
  options: [string, string, string];
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
