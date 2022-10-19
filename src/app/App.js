import React from "react";
import Users from "./components/users";
import NavBar from "./components/navBar";
import Main from "./components/main";
import Login from "./components/login";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <>
            <div>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Main}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/users/:postId?" component={Users}/>
                </Switch>
            </div>
        </>
    );
};

export default App;
