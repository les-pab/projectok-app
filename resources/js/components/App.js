import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { theme } from "../material-ui/styles";
import { AuthProvider } from "./auth/AuthProvider";
import AuthReroute from "./auth/AuthReroute";
import Index from "./landing/Index";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Counselor from "./counselor/Counselor";
import Student from "./student/Student";
import ScrollToTop from "./shared/ScrollToTop";

const AppRoute = () => {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="/student/create">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <AuthReroute path="/student">
                    <Student />
                </AuthReroute>
                <AuthReroute path="/counselor">
                    <Counselor />
                </AuthReroute>
            </Switch>
        </>
    );
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <ScrollToTop />
                    <AppRoute />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
