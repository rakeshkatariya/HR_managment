import React, { Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import Error404 from './components/Shared/Error404/Error404';
import FallbackComponent from './components/Shared/FallbackComponent/FallbackComponent';
import PreventedRoute from './layouts/PreventedRoute';
import ProtectedRoute from './layouts/ProtectedRoute';
import routes from './routes';

function Router() {
    return (
        <React.Suspense fallback={<FallbackComponent />}>
            <Switch>
                {routes.filter(x => !x.isShared).map((x, idx) => {
                    return (
                        x.isPreventedRoute ?
                            <PreventedRoute exact path={x.path} meta={x.meta} component={React.lazy(() => import(`./components/${x.name}/${x.name}`))} key={idx} />
                            :
                            <ProtectedRoute exact path={x.path} meta={x.meta} component={React.lazy(() => import(`./components/${x.name}/${x.name}`))} key={idx} />

                    )
                })}
                <Route path={"*" || "/404Error"} component={Error404} />
            </Switch>
        </React.Suspense>
    )
}

export default Router;