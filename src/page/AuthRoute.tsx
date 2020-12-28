import React, { useContext } from "react";
import { context } from "../context/context";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
    const { currentUser } = useContext(context);
    return (
        <Route {...rest} render={
            (props) => {
                if (currentUser === null) {
                    return <Redirect to="/login" />
                } else {
                    return <Component {...props} />
                }
            }
        } />
    )
}

export default ProtectedRoute
