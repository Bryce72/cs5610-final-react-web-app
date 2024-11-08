import QuestionEditor from "./QuestionEditor";
import SignIn from "./SignIn";
import Quizzes from "./Quizzes";
import QuizDetails from "./QuizDetails";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import TempNavigation from "./TempNavigation";
export default function App() {
  return (
    <HashRouter>
      <div>
        <TempNavigation />

        <Routes>
          <Route path="/" element={<Navigate to="SignIn" />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/QuestionEditor/*" element={<QuestionEditor />}></Route>
          {/* TODO: add route for your page here */}
          <Route path="/Quizzes" element={<Quizzes />} />
          <Route path="/QuizDetails" element={<QuizDetails />} />

        </Routes>

      </div>
    </HashRouter>
  );
}