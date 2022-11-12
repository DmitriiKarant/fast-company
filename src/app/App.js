import React from "react";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <>
            <div>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Main}/>
                    <Route path="/login/:type?" component={Login}/>
                    <Route path="/users/:userId?/:edit?" component={Users}/>
                </Switch>
            </div>
        </>
    );
};

export default App;
