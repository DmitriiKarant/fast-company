import React from "react";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";
import LoginProvider from "./hooks/useLogin";

const App = () => {
    return (
        <>
            <div>
                <LoginProvider>
                    <AuthProvider>
                        <NavBar />
                        <QualityProvider>
                            <ProfessionProvider>
                                <Switch>
                                    <Route path="/" exact component={Main}/>
                                    <Route path="/login/:type?" component={Login}/>
                                    <Route path="/users/:userId?/:edit?" component={Users}/>
                                </Switch>
                            </ProfessionProvider>
                        </QualityProvider>
                    </AuthProvider>
                </LoginProvider>
                <ToastContainer/>
            </div>
        </>
    );
};

export default App;
