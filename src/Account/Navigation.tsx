import { Link } from "react-router-dom";
export default function Navigation(){
    return (
        <div id="wd-account-navigation">
            <Link to={'/account/signin'} > Signin </Link> <br />
            <Link to={'/account/signup'} > Signup </Link> <br />
            <Link to={'/account/profile'} > Profile </Link> <br />
        </div>
    );
}