import React from "react";
import Users from "./pages/users";
import NavBar from "./components/navBar";
import Main from "./pages/main";
import Login from "./pages/login";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <>
            <div>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Main}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/users/:userId?" component={Users}/>
                </Switch>
            </div>
        </>
    );
};

export default App;
