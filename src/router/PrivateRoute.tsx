import { FC, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const taskioUser = useSelector((state: any) => state.taskioUser);
  return <>{taskioUser ? <>{children}</> : <Navigate to="/sign-in-page" />}</>;
};

export default PrivateRoute;
