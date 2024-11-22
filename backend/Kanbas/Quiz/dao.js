// import db from mongo when ready

//TODO
export function findQuizzesForCourse(courseID) {}

//TODO
export function createQuiz(quiz) {
  //add unique ID to the new quiz, for now use timestamp
  const newQuiz = { ...quiz, quiz_id: Date.now().toString() };
}

//TODO
export function deleteQuiz(quizID) {}

//TODO
export function updateQuiz(quizID, quizUpdates) {}

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
