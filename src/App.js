import './App.css';
import '../node_modules/uikit/dist/css/uikit.min.css';
import  React, { useState } from 'react';
import Menu from './components/menu/menu'
import ReactDom from 'react-dom';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Users from "./components/users/users";
import Groups from "./components/groups/groups";
import LoginForm from './components/loginForm/loginForm'
import strings from './res/localisation'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: localStorage['language'] || 'en'
        };
        this.changeLanguage = this.changeLanguage.bind(this);
    }
    changeLanguage(val) {
        this.setState({language: val})
    }
    render() {
        strings.setLanguage(this.state.language);
        const WrappedLogin = function(props) {
            // Конструкция "{...props}" нужна, чтобы не потерять
            // параметры, переданные от компонента Route
            return (<LoginForm {...props} strings={strings} />);
        };
       return (
           <div className="App">
               <Router>
                   <Menu setLanguage={this.changeLanguage} language ={this.state.language}/>
                   <Switch>
                       <Route path="/users" component={Users} />
                       <Route path="/groups" component={Groups} />
                       <Route path="/login" component={WrappedLogin}/>
                   </Switch>
               </Router>


           </div>
       );
   }
}

export default App;
