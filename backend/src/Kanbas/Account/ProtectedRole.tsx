import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Dashboard from "../Dashboard";
export default function ProtectedRole({ children, role }: { children: any, role: string }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser.role === role) {
    return children;
  }else{
    return null;
  }
}
