import { ComponentType, useContext } from "react";
import { Redirect, Route } from "react-router-dom";

export type ProtectedRouteProps = {
  path: string;
  exact?: boolean;
  component: ComponentType<any>;
};

const PrivateRoute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  const credential = localStorage.getItem("credential");

  return (
    <Route
      {...rest}
      render={(props) =>
        credential ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export default PrivateRoute;
