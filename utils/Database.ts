import { SQLiteDatabase } from "expo-sqlite/next";
import { AnswerSheet, Quiz } from "./Types";
import { Data } from "./Data";

export async function initializeDatabase(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  try {
    let result = await db.getFirstAsync<{ user_version: number }>(
      "PRAGMA user_version"
    );
    let currentDbVersion = result?.user_version ?? 0;

    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }

    if (currentDbVersion === 0) {
      await db.execAsync(`
        PRAGMA journal_mode = 'wal';

        CREATE TABLE IF NOT EXISTS users (
          username TEXT PRIMARY KEY
        );

        CREATE TABLE IF NOT EXISTS quizzes (
          id INTEGER PRIMARY KEY NOT NULL,
          genre TEXT NOT NULL,
          difficulty TEXT NOT NULL,
          question TEXT NOT NULL,
          answer0 TEXT NOT NULL,
          answer1 TEXT NOT NULL,
          answer2 TEXT NOT NULL,
          correctAnswer INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS answersheets (
          id INTEGER PRIMARY KEY NOT NULL,
          username TEXT NOT NULL,
          quizId INTEGER NOT NULL,
          selectedAnswer INTEGER NOT NULL,
          timestamp TEXT NOT NULL,
          isCorrect INTEGER NOT NULL,
          FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE,
          FOREIGN KEY (quizId) REFERENCES quizzes (id) ON DELETE CASCADE
        );
      `);

      // Insert predefined quizzes
      for (const quiz of Data) {
        await db.runAsync(
          `INSERT INTO quizzes (id, genre, difficulty, question, answer0, answer1, answer2, correctAnswer) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            quiz.id,
            quiz.genre,
            quiz.difficulty,
            quiz.question,
            quiz.answers[0],
            quiz.answers[1],
            quiz.answers[2],
            quiz.correctAnswer,
          ]
        );
      }

      await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export const addUser = async (db: SQLiteDatabase, username: string) => {
  try {
    await db.runAsync("INSERT INTO users (username) VALUES (?)", [username]);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const getQuizzes = async (db: SQLiteDatabase): Promise<Quiz[]> => {
  try {
    const quizzesRaw = await db.getAllAsync<any>("SELECT * FROM quizzes");

    return quizzesRaw.map((quiz) => ({
      id: quiz.id,
      genre: quiz.genre,
      difficulty: quiz.difficulty,
      question: quiz.question,
      answers: [quiz.answer0, quiz.answer1, quiz.answer2],
      correctAnswer: quiz.correctAnswer,
    }));
  } catch (error) {
    console.error("Error retrieving quizzes:", error);
    return [];
  }
};

export const addAnswerSheet = async (
  db: SQLiteDatabase,
  username: string,
  quizId: number,
  selectedAnswer: 0 | 1 | 2,
  timestamp: string,
  isCorrect: boolean
) => {
  try {
    await db.runAsync(
      "INSERT INTO answersheets (username, quizId, selectedAnswer, isCorrect, timestamp) VALUES (?, ?, ?, ?, ?)",
      [username, quizId, selectedAnswer, isCorrect ? 1 : 0, timestamp]
    );
  } catch (error) {
    console.error("Error adding answer sheet:", error);
  }
};

export const getAnswerSheetsByUser = async (
  db: SQLiteDatabase,
  username: string
): Promise<AnswerSheet[]> => {
  try {
    return await db.getAllAsync<AnswerSheet>(
      "SELECT * FROM answersheets WHERE username = ?",
      [username]
    );
  } catch (error) {
    console.error("Error retrieving answer sheets:", error);
    return [];
  }
};
