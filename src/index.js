import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Main from './components/Main';
import * as serviceWorker from './serviceWorker';
import Profile from './components/profile'
import { BrowserRouter as Router,  Route  } from "react-router-dom";


class AppWithRouter extends React.Component{
    render(){
        return(
            <Router>
                <Route path = "/" exact component = {App}/> {/*localhost:3000/*/}
                <Route path = "/main" exact component = {Main} />               
                <Route path = "/profile" component = {Profile} />
            </Router>
        );
    }
    
}


// ReactDOM.render(<App batch={14} city="Depok" />, document.getElementById('root'));
ReactDOM.render(<AppWithRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
