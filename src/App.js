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
import Media from './components/move_media/moveMedia';
import Main from './components/main/main'
import jwt from 'jwt-decode';
import {logout} from './functions/userFunctions'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: localStorage['language'] || 'en',
            profile: localStorage['userToken']? jwt(localStorage['userToken']): null
        };
        this.setUser = this.setUser.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.closing = this.closing.bind(this);
    }

    setUser(val) {
        this.setState({profile: val});
    }

    changeLanguage(val) {
        this.setState({language: val})
    }

    closing (){
        alert('confirm');
        if (this.state.profile) {
            logout(this.state.profile.session).then();
        }
        return null;
    };


    render() {
        window.onbeforeunload = this.closing;
        strings.setLanguage(this.state.language);
        const funcSetUser = this.setUser;
       const WrappedLogin = function(props) {
            return (<LoginForm {...props} strings={strings}  setUser={funcSetUser}/>);
        };

        const WrappedMedia = function(props) {
            return (<Media {...props} strings={strings} />);
        };

        const WrappedMain = function(props) {
            return (<Main {...props} strings={strings} />)
        };

        return (
           <div className="App">
               <Router>
                   <Menu setLanguage={this.changeLanguage} language ={this.state.language} user={this.state.profile} setUser={this.setUser}/>
                   <Switch>
                       <Route exact path="/" component={WrappedMain}/>
                       <Route path="/move" component={WrappedMedia}/>
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
