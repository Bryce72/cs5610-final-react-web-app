// import Database from "../Database/index.js";
import model from "./model.js";

export function findAllCourses() {
  return model.find();
}
