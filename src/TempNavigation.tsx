import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function TempNavigation() {
    // TODO: add your page to this list
    const pages = [
        { name: "Sign In Page", path: "/SignIn" },
        { name: "Questions Editor Page", path: "/QuestionEditor" }
    ]

    const { pathname } = useLocation()

    return (
        <div>
            <h3>Temporary Navigation Bar for Development</h3>

            {pages.map((p) => (
                <Link to={p.path}>
                    <button className={`btn m-3 ${pathname.includes(p.path) ? 'btn-primary' : 'btn-secondary'}`}>
                        {p.name}
                    </button>
                </Link>
            ))}

            <hr />

        </div>
    );
}