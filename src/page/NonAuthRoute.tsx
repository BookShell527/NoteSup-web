import React, { useContext } from "react";
import { context } from "../context/context";
import { Route, Redirect } from "react-router-dom";

const NonProtectedRoute = ({ component: Component, ...rest }: any) => {
    const { currentUser } = useContext(context);
    return (
        <Route {...rest} render={
            (props) => {
                if (currentUser === null) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/" />
                }
            }
        } />
    )
}

export default NonProtectedRoute
