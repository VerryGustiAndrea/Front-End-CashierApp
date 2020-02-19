import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Main from "./components/Main";
import Order from "./components/Order";
import History from "./components/HistoryOrder";
import Login from "./components/Login";
import * as serviceWorker from "./serviceWorker";
import Profile from "./components/profile";
import { BrowserRouter as Router, Route , Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const AppWithRouter = () => {



  return (
    <Fragment>
    <div class="topnav">
        <a class="active" href="http://localhost:3000/main"><img  type="image" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAJFBMVEX///8AAAD09PRhYWH7+/s6OjowMDBwcHAoKChRUVE3NzcsLCyM//LZAAAAzElEQVR4nO3dyQ3DMAxFQWfz2n+/qSCAwIu/mJkK9I4UAWlZAAAAAAAAAAAAAAAAGLa95rCVC/fHHPZy4Xr30QetChXGU6gwn0KF+RQqzKdQYT6Fvz1nUS4EAAAAAIAu3rMoFx7nZwbnUS687l4qDbrKhf23awpTKFSYT6HCfAoV5lOoMF+9sP982H/Gv/v6ZVi5EAAAAAAAurj7qYRh5cL+2zWFKRQqzKdQYT6FCvMpVJhP4T8X9v8bof//FgAAAAAAAAAAAAAAAH/oC2kQN9xJuPAoAAAAAElFTkSuQmCC" width="45" /></a>
    </div> 

    <Router>
    <div class="icon-bar">
      <Link to="/main"><img  type="image" alt="" src="https://i.pinimg.com/originals/4e/24/f5/4e24f523182e09376bfe8424d556610a.png" width="35" /></Link>
      <Link to="/History"><img  type="image" alt="" src="https://www.pngkit.com/png/detail/508-5088916_png-file-svg-history-icon-vector-png.png" width="35" /></Link>
      <Link to="#"><img  data-toggle="modal" data-target="#ModalAdd" type="image" alt="" src="https://i.ya-webdesign.com/images/how-to-add-a-png-to-a-photo.png" width="40" /></Link>
    </div>

      <Route path="/" exact component={App} /> {/*localhost:3000/*/}
      <Route path="/order" exact component={Order} />
      <Route path="/main" exact component={Main} />
      <Route path="/history" component={History} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
    </Router>
    </Fragment>
  );
};

const AppWithRedux = () => {
  return (
    <Provider store={store}>
      <AppWithRouter />
    </Provider>
  );
};

// ReactDOM.render(<App batch={14} city="Depok" />, document.getElementById('root'));
ReactDOM.render(<AppWithRedux />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
