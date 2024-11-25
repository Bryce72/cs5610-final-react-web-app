import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function TempNavigation() {
  // TODO: add your page to this list
  const pages = [
    { name: "Sign In Page", path: "/account/Signin" },
    { name: "Questions Editor Page", path: "/QuestionEditor" },
    { name: "Quizzes Page", path: "/Quizzes" },
    { name: "Quizzes Detail Page", path: "/QuizDetails" },
    { name: "Quiz Preview Page", path: "/QuizPreview" },
  ];

  const { pathname } = useLocation();

  return (
    <div>
      <h3>Temporary Navigation Bar for Development</h3>

      {pages.map((p) => (
        <Link to={p.path} key={p.name}>
          <button
            className={`btn m-3 ${
              pathname.includes(p.path) ? "btn-primary" : "btn-secondary"
            }`}
          >
            {p.name}
          </button>
        </Link>
      ))}
      <hr />
    </div>
  );
}
