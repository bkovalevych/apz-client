import './App.css';
import '../node_modules/uikit/dist/css/uikit.min.css';
import  React from 'react';
import {findSubscribes, findFollowers} from './functions/follower'
import {getUsers} from './functions/userFunctions'
import Menu from './components/menu/menu'
import Home from './components/home/home'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Users from "./components/users/users";
import Groups from "./components/groups/groups";
import LoginForm from './components/loginForm/loginForm'
import strings from './res/localisation'
import Media from './components/move_media/moveMedia';
import Main from './components/main/main'
import jwt from 'jwt-decode';

import Velocity from 'velocity-animate'
import "bootswatch/dist/cyborg/bootstrap.min.css"
import Filter from "./components/filter/filter"
import Loader from './components/loader/loader'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: localStorage['language'] || 'en',
            profile: localStorage['userToken']? jwt(localStorage['userToken']): null,
            users: null,
            moveMedias: null,
            moveBases: null,
            messages: null,
            subscribes: null,
            fetch: 0
        };
        this.setSubscribes = this.setSubscribes.bind(this);
        this.setUser = this.setUser.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);

        this.setUsers = this.setUsers.bind(this);
    }
    
    setSubscribes(val) {
        this.setState({subscribes: val});
    }
    
    setUsers(val) {
        this.setState({users: val});
    }

    setUser(val) {
        this.setState({profile: val});
    }

    changeLanguage(val) {
        this.setState({language: val})
    }

    
    static rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    static backgroundOn() {
        let root = document.getElementById('root');
        let container = document.createElement('div');
        let parent = document.createElement("div");
        parent.className += " dark";
        root.appendChild(parent);
        parent.appendChild(container)
        let count = this.rand(50, 120);
        container.innerHTML += `<div class='ball' style='opacity: 0.8; width: 100px; height: 30px; color: red'>MuscleBit</div>`
        for (let i = 1; i < count; ++i) {
            let radius = this.rand(10, 50);
            let opacity = this.rand(1, 100) / 100;
            container.innerHTML += `<div class='ball' style='opacity: ${opacity}; width: ${radius}px; height: ${radius}px'/>`
        }
        let minZ = -50;
        let maxZ = 5;
        let width = window.screen.availWidth;
        let height = window.screen.availHeight;
        Velocity(document.getElementsByClassName('ball'),
            {
                translateX: [
                    () => {return '+=' + this.rand(-width / 4, width / 4)},
                    () => {return  App.rand(0, width - 10)}
                ],
                translateY: [
                    () => {return '+=' + this.rand(-height / 4, height / 4)},
                    () => {return  App.rand(0, height - 10)}
                ],
                translateZ: [
                    () => {return '+=' + this.rand(minZ / 10, maxZ / 10)},
                    () => {return this.rand(minZ, maxZ)}
                ],
                opacity: [
                    () => {return '+=' + this.rand(40, 100) / 100;},
                    () => {return this.rand(1, 100) / 100;}
                ],

            },
            {duration: 10000, loop: 100, delay: 100});

        Velocity(document.getElementsByClassName('dark'), {
                perspective: [500, 5]
            },
            {
                duration: 1000, easing: "easeInSine", delay: 2000
            });
    }
    componentDidMount(): void {
        App.backgroundOn();
        if (!this.state.users) {
            this.setState({fetch: this.state.fetch + 1})
            getUsers().then(resp => {
                if (resp.errors) {
                    return;
                }
                if (resp.data) {
                    let obj = {};
                    for (let key in resp.data) {
                        let col = resp.data[key];
                        obj[col._id] = col;
                    }
                    this.setState({users:obj, fetch: this.state.fetch - 1});
                }
            })
        }
        if (!this.state.subscribes && this.state.profile) {
            this.setState({fetch: this.state.fetch + 1});
            findSubscribes(this.state.profile._id).then(resp => {
                if (resp.errors) {
                    return;
                }
                if (resp.data) {
                    let obj = {};
                    for (let key in resp.data) {
                        let col = resp.data[key];
                        obj[col.user] = true;
                    }
                    this.setState({subscribes:obj, fetch: this.state.fetch - 1});
                } else
                    this.setState({subscribes:{}, fetch: this.state.fetch - 1});
            })
        }

    }
    render() {
        const nam = this.state.profile? <h2 style={{marginTop: '-100px', padding: "50px"}}>{this.state.profile.nickname}</h2> : '';
        const anim = (e) => {
            if (e.target.className !== "App") {
                return;
            }
            Velocity(document.getElementsByClassName('dark'),
                {
                    scaleX: 1.1,
                    scaleY: 1.1,
                    rotateZ: Math.floor(Math.random() * 4) - 2,
                    transformOriginX: e.clientX,
                    transformOriginY: e.clientY
                },
                {duration: 500, easing: "easeOutSine"});
        };



        strings.setLanguage(this.state.language);
        const funcSetUser = this.setUser;
        const userData = this.state.profile;
        const users = this.state.users;
        const setSubscribes = this.setSubscribes;
        const setUsers = this.setUsers;
        const subscribes = this.state.subscribes;
        const WrappedUsers = (props) => {
            return (<Users {...props}
                           strings={strings}
                           user={userData}
                           users={users}
                           subscribes={subscribes}
                           setSubscribes={setSubscribes}
                           setUsers={setUsers}
            />)
        };
       const WrappedLogin = function(props) {
            return (<LoginForm {...props} strings={strings}  setUser={funcSetUser}/>);
       };

        const WrappedMedia = function(props) {
            return (<Media {...props} strings={strings} users={users} />);
        };

        const WrappedMain = function(props) {
            return (<Main {...props} strings={strings} />)
        };
        
        const WrappedHome = function (props) {
            return (<Home {...props} strings={strings} subscribes={subscribes}/>)
        };

        const WrappedGroups = (props) => {
            return (<Groups {...props} strings={strings} user={this.state.profile}/>)
        }



        return (
           <>
               {this.state.fetch? <Loader off={false}/>:
            <div className="App" onClick={anim}>
               <Router>
                   {nam}
                   <Filter strings={strings}/>
                   <Menu setLanguage={this.changeLanguage} language ={this.state.language} user={this.state.profile} setUser={this.setUser}/>
                   <Switch>
                       <Route exact path="/" component={WrappedMain}/>
                       <Route path="/move" component={WrappedMedia}/>
                       <Route path="/users" component={WrappedUsers} />
                       <Route path="/groups" component={WrappedGroups} />
                       <Route path="/login" component={WrappedLogin}/>
                       <Route path="/home" component={WrappedHome}/>
                           
                       
                   </Switch>
               </Router>
           </div>}</>
       );
   }
}

export default App;
