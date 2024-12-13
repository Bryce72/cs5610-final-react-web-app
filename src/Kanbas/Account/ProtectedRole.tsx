import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Dashboard from "../Dashboard";

export default function ProtectedRole({ children, role }: { children: any, role: string }) {

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (currentUser.role === role) {
    return children;
  } else {

    const roleHierarchy = ["STUDENT", "TA", "FACULTY", "ADMIN"];
    let allowed = false;

    for (let i in roleHierarchy) {
      if (allowed && currentUser.role === roleHierarchy[i]) {
        return children;
      }
      if (role === roleHierarchy[i]) {
        allowed = true;
      }
    }

    return null;
  }
}
