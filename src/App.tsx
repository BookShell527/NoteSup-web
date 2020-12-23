import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Archived from './page/Archived';
import ContactUs from './page/ContactUs';
import Home from './page/Home';
import Trash from './page/Trash';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/trash" component={Trash} />
                <Route exact path="/archived" component={Archived} />
                <Route exact path="/contactus" component={ContactUs} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;