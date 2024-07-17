import React from 'react';
import { Route, Redirect, useLocation } from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import Toast from '../components/Shared/Toast/Toast';
import Loader from '../components/Shared/Loader/Loader';

const ProtectedRoute = ({
    component: Component,
    meta,
    ...otherProps
}) => {

    React.useEffect(() => {
        document.title = meta.title;
    }, [meta])

    const isLoggedIn = localStorage.getItem('loginData');
    const location = useLocation();

    const masterLayout = (props) => (
        <div id="main-section" className='dashboard-container'>
            <Sidebar {...props} />
            <div id='dashboard-area' className='dashboard-right-side'>
                <Header {...props} />
                <div>
                    <div className='dashboard-body'>
                        <Component {...props} />
                    </div>
                </div>
            </div>
        </div>
    )

    // if (isLoggedIn) {
        return (
            <Route
                {...otherProps}
                render={(props) => masterLayout(props)}
            />
        )
    // }

    // return (
    //     <Redirect
    //         to={{
    //             pathname: '/login',
    //             state: {
    //                 from: `${location.pathname}${location.search || ''}${location?.hash || ''}`
    //             }
    //         }}
    //     />
    // )
}

export default ProtectedRoute;
