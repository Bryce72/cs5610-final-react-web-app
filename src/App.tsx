import QuestionEditor from "./QuestionEditor";
import SignIn from "./SignIn";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import TempNavigation from "./TempNavigation";
import { Provider } from "react-redux";
import store from "./store"

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <TempNavigation />

          <Routes>
            <Route path="/" element={<Navigate to="SignIn" />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/QuestionEditor/*" element={<QuestionEditor />}></Route>
            {/* TODO: add route for your page here */}
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}