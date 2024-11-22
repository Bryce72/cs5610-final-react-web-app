// import db from mongo when ready

//TODO
export function findQuizzesForCourse(courseID) {
  const { quizzes } = Database;
  return quizzes.filter((quiz) => quiz.course === courseId);
}

//TODO
export function createQuiz(quiz) {
  //add unique ID to the new quiz, for now use timestamp
  const newQuiz = { ...quiz, quiz_id: Date.now().toString() };
}

//TODO
export function deleteQuiz(quizID) {
  const { quizzes } = Database;
  Database.quizzes = quizzes.filter((quiz) => quiz._id !== quizId);
}

//TODO
export function updateQuiz(quizID, quizUpdates) {
  const { quizzes } = Database;
  const quizze = quizzes.find((quizze) => quizze._id === quizzeId);
  Object.assign(quizze, quizzeUpdates);
  return quizze;
}

import Qui from "../Database/index.js";

export function findModulesForCourse(courseId) {
  const { modules } = Database;
  return modules.filter((module) => module.course === courseId);
}

export function createModule(module) {
  const newModule = { ...module, _id: Date.now().toString() };
  Database.modules = [...Database.modules, newModule];
  return newModule;
}
export function deleteModule(moduleId) {
  const { modules } = Database;
  Database.modules = modules.filter((module) => module._id !== moduleId);
}

export function updateModule(moduleId, moduleUpdates) {
  const { modules } = Database;
  const module = modules.find((module) => module._id === moduleId);
  Object.assign(module, moduleUpdates);
  return module;
}
