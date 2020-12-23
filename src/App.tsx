import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar';
import Archived from './page/Note/Archived';
import ContactUs from './page/Note/ContactUs';
import Home from './page/Note/Home';
import Trash from './page/Note/Trash';
import Login from './page/authentication/Login';
import Register from './page/authentication/Register';
import "./App.css";
import { ContextProvider } from './context/context';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ContextProvider>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/trash" component={Trash} />
                    <Route exact path="/archived" component={Archived} />
                    <Route exact path="/contactus" component={ContactUs} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </ContextProvider>
        </BrowserRouter>
    );
}

export default App;