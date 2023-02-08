import React, { useEffect } from "react";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);

    return (
        <>
            <div>
                <AuthProvider>
                    <NavBar/>
                    <ProfessionProvider>
                        <Switch>
                            <Route path="/" exact component={Main}/>
                            <Route path="/login/:type?" component={Login}/>
                            <Route path="/logout" component={LogOut}/>
                            <ProtectedRoute path="/users/:userId?/:edit?" component={Users}/>
                        </Switch>
                    </ProfessionProvider>
                </AuthProvider>
                <ToastContainer/>
            </div>
        </>
    );
};

export default App;
