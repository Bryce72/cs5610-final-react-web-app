import QuestionEditor from "./QuestionEditor";
import SignIn from "./Account";
import Quizzes from "./Quizzes";
import QuizDetails from "./QuizDetails";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import TempNavigation from "./TempNavigation";
import { Provider } from "react-redux";
import store from "./store";
import Account from "./Account";



export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <TempNavigation />

          <Routes>
            <Route path="/" element={<Navigate to="SignIn" />} />
            <Route path="/SignIn" element={<Account />} />
            <Route path="/QuestionEditor/*" element={<QuestionEditor />}></Route>
            {/* TODO: add route for your page here */}
            <Route path="/Quizzes" element={<Quizzes />} />
            <Route path="/QuizDetails" element={<QuizDetails />} />

          </Routes>

        </div>
      </HashRouter>
    </Provider>
  );
}