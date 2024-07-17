import React from 'react';
import { Route,Redirect } from "react-router-dom";

const PreventedRoute = ({
    component: Component,
    meta,
    ...otherProps
}) => {

    React.useEffect(() => {
        document.title = meta.title;
    }, [meta])

    const isLoggedIn = localStorage.getItem('loginData');

    const masterLayout = (props) => (
        <div id="main-section" className="main-section">
            <Component {...props} />
        </div>
    )

    if (!isLoggedIn) {
        return (
            // <Route
            //     {...otherProps}
            //     render={(props) => <Component {...props} />}
            // />
            <Route
                {...otherProps}
                render={(props) => masterLayout(props)}
            />
        )
    }

    return (
        <Redirect to="/dashboard" />
    )
}

export default PreventedRoute;
