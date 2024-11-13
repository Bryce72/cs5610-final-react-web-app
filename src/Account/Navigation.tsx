import { Link } from "react-router-dom";
export default function Navigation(){
    return (
        <div id="wd-account-navigation">
            <Link to={'/Signin'} > Signin </Link> <br />
            <Link to={'/Signup'} > Signup </Link> <br />
            <Link to={'/Profile'} > Profile </Link> <br />
        </div>
    );
}