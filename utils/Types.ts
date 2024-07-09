import type { TextProps, ViewProps, ViewStyle } from "react-native";

export type Quiz = {
  id: number;
  genre: QuizGenre;
  difficulty: Difficulty;
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

export type AnimatedWideButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  correctAnswer?: boolean | undefined;
};

export type QuizGenre =
  | "Shoegaze"
  | "Alternative Rock"
  | "Experimental"
  | "Indie Rock"
  | "Psychedelia"
  | "Punk"
  | "Post Punk"
  | "New Wave"
  | "Prog Rock"
  | "Electronic"
  | "Ambient";

export type Difficulty = "Easy" | "Medium" | "Hard";
