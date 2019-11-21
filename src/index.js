import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import List from './routes/List/List';
import Details from './routes/Details/Details';
import Error from './routes/Error/Error';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


const RenderApp = () => {
    return (
        <div>
           <Router basename="/react-redux-graphql-pokemon/">
              <div style={{textAlign: "center"}}>
                 <Link to="/">
                   <img style={{height: 120}} src={"./pokemon-logo.png"} alt="logo" />
                 </Link>

              </div>
               <Switch>
                   <Route exact path="/">
                       <List/>
                   </Route>
                   <Route path="/pokemon/:id">
                       <Details/>
                   </Route>
                   <Route path="/error">
                       <Error/>
                   </Route>
               </Switch>
           </Router>
       </div>
    )
}

const ReduxApp = () => {
    return (
        <Provider store={store}>
            <RenderApp />
        </Provider>
    )
}



ReactDOM.render(<ReduxApp/>, document.getElementById('root'));

