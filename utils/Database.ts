import { type SQLiteDatabase } from "expo-sqlite/next";
import { Quiz } from "./Types";
import { Data } from "./Data";

export async function initializeDatabase(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
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

      CREATE TABLE users (
        username TEXT PRIMARY KEY
      );

      CREATE TABLE quizzes (
        id INTEGER PRIMARY KEY NOT NULL,
        genre TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        question TEXT NOT NULL,
        answer0 TEXT NOT NULL,
        answer1 TEXT NOT NULL,
        answer2 TEXT NOT NULL,
        correctAnswer INTEGER NOT NULL
      );

      CREATE TABLE answersheets (
        id INTEGER PRIMARY KEY NOT NULL,
        username TEXT NOT NULL,
        quiz_id INTEGER NOT NULL,
        selectedAnswer INTEGER NOT NULL,
        time TEXT NOT NULL,
        isCorrect INTEGER NOT NULL,
        FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE,
        FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE CASCADE
      );
    `);

    // Insert predefined quizzes
    for (const quiz of Data) {
      await db.runAsync(
        `INSERT INTO quizzes (id, genre, difficulty, question, answer0, answer1, answer2, correctAnswer) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        quiz.id,
        quiz.genre,
        quiz.difficulty,
        quiz.question,
        quiz.answers[0],
        quiz.answers[1],
        quiz.answers[2],
        quiz.correctAnswer
      );
    }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
}

export const addUser = async (db: SQLiteDatabase, username: string) => {
  return await db.runAsync("INSERT INTO users (username) VALUES (?)", username);
};

export const getQuizzes = async (db: SQLiteDatabase): Promise<Quiz[]> => {
  return await db.getAllAsync<Quiz>("SELECT * FROM quizzes");
};

export const addAnswerSheet = async (
  db: SQLiteDatabase,
  username: string,
  quizId: number,
  selectedAnswer: 0 | 1 | 2,
  time: string,
  isCorrect: boolean
) => {
  return await db.runAsync(
    `INSERT INTO answersheets (username, quiz_id, selectedAnswer, time, isCorrect) 
     VALUES (?, ?, ?, ?, ?)`,
    username,
    quizId,
    selectedAnswer,
    time,
    isCorrect ? 1 : 0
  );
};

export const getAnswerSheetsByUser = async (
  db: SQLiteDatabase,
  username: string
) => {
  return await db.getAllAsync(
    "SELECT * FROM answersheets WHERE username = ?",
    username
  );
};
