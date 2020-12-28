import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import AuthRoute from "./page/AuthRoute";
import NonAuthRoute from "./page/NonAuthRoute";
import Navbar from './components/Navbar';
import Archived from './page/Note/Archived';
import ContactUs from './page/Note/ContactUs';
import Home from './page/Note/Home';
import Trash from './page/Note/Trash';
import Login from './page/authentication/Login';
import NavbarNote from "./components/NavbarNote";
import Register from './page/authentication/Register';
import Note from "./page/Note/Note";
import "./App.css";
import { ContextProvider } from './context/context';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ContextProvider>
                <Switch>
                    <AuthRoute exact path={["/", "/note", "/trash", "/archived", "/contactus"]} component={Navbar} />
                    <AuthRoute exact path="/note/:id" component={NavbarNote} />
                </Switch>
                <Switch>
                    <AuthRoute exact path="/" component={Home} />
                    <AuthRoute exact path="/note" component={Home} />
                    <AuthRoute exact path="/note/:id" component={Note} />
                    <AuthRoute exact path="/trash" component={Trash} />
                    <AuthRoute exact path="/archived" component={Archived} />
                    <AuthRoute exact path="/contactus" component={ContactUs} />
                    <NonAuthRoute exact path="/login" component={Login} />
                    <NonAuthRoute exact path="/register" component={Register} />
                </Switch>
            </ContextProvider>
        </BrowserRouter>
    );
}

export default App;