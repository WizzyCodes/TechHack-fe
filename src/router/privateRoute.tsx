import { GlobalContext } from "../global/globalProvider";
import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: FC<any> = ({ children }) => {
  const { user }: any = useContext(GlobalContext);
  // const isAuthenticated = JSON.parse(localStorage.getItem("auth")!);

  return (
    <div>
      {!user ? (
        <div>
          <Navigate to="/auth/" />
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default PrivateRoute;