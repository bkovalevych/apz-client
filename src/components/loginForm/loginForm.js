import divWithClassName from "react-bootstrap/esm/divWithClassName";
import React, {useEffect, useState} from 'react';
import { Route, Link, Switch, BrowserRouter as Router, withRouter} from 'react-router-dom'
import strings from '../../res/localisation'
import {login, register} from '../../functions/userFunctions'
import jwt from 'jwt-decode';
import Alert from "react-bootstrap/Alert";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            _id: '',
            count_followers: 0,
            login: true,
            password: '',
            pending: false,
            regName: '',
            regEmail: '',
            regPassword: '',
            errorsReg: '',
            registered: ''
        };
        this.showLogin = this.showLogin.bind(this);
        this.showReg = this.showReg.bind(this);
        this.login = login.bind(this);
        this.register = register.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onSubmitReg = this.onSubmitReg.bind(this);
    }

    showLogin(e) {
        e.preventDefault();
        this.setState({login: true})
    }

    onSubmitLogin(e) {
        e.preventDefault();
        this.setState({pending: true, errors: null});
        this.login(this.state.email, this.state.password).then(data => {
            if(data.errors) {
                this.setState({errors: data.errors.toString(), pending: false});
                return;
            }
            this.props.setUser(jwt(data.data));
            this.setState({pending: false});
            this.props.history.push('profile');
        });

    }

    onSubmitReg(e) {
        e.preventDefault();
        this.setState({pending: true, errorsReg: null, registered: null});
        this.register(this.state.regEmail, this.state.regName, this.state.regPassword).then(data => {
            if (data.errors) {
                this.setState({errorsReg: data.errors.toString(), pending: false, registered: null});
                return;
            }
            this.setState({pending: false, registered: data.data});
        })
    }



    showReg(e) {
        e.preventDefault();
        this.setState({login: false})
    }

    onChange(e) {
        let param = {};
        param[e.target.name] = e.target.value;
        this.setState(param)
    }

    render() {
        let errors = this.state.errors? <Alert variant={"danger"}>{this.state.errors}</Alert>: "";
        let errorsReg = this.state.errorsReg? <Alert variant={"danger"}>{this.state.errorsReg}</Alert>: "";
        let reg = this.state.registered? <Alert variant={"info"}>{this.state.registered}</Alert>: "";
        return (
            this.state.pending? <p>Waiting</p> :
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 mx-auto">
                            <div id="first" style={{display: this.state.login? "block": "none"}}>
                                <div className="myform form ">
                                    <div className="logo mb-3">
                                        <div className="col-md-12 text-center">
                                            <h1>{this.props.strings.menuLogin}</h1>
                                        </div>
                                    </div>
                                    <form onSubmit={this.onSubmitLogin}>
                                        <div className="form-group">
                                            <label >Email</label>
                                            <input type="email"
                                                   name="email"
                                                   className="form-control"
                                                   id="email"
                                                   aria-describedby="emailHelp"
                                                   placeholder="email"
                                                   onChange={this.onChange}
                                                   value={this.state.email}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label >{this.props.strings.password}</label>
                                            <input type="password"
                                                   name="password"
                                                   id="password"
                                                   className="form-control"
                                                   aria-describedby="emailHelp"
                                                   placeholder="Password"
                                                   onChange={this.onChange}
                                                   value={this.state.password}
                                            />
                                        </div>
                                        <div className="col-md-12 text-center ">
                                            <button type={'submit'}
                                                    className=" btn btn-block mybtn btn-primary tx-tfm"
                                            >{this.props.strings.menuLogin}</button>
                                        </div>
                                        <div className="form-group">
                                            <p className="text-center">
                                                {this.props.strings.dontHaveAcc}<br/>
                                                <a href='' id="signup" onClick={this.showReg}>{this.props.strings.signUp}</a>
                                            </p>
                                        </div>
                                    </form>
                                    {errors}
                                </div>
                            </div>
                            <div id="second" style={{display: !this.state.login? "block": "none"}}>
                                <div className="myform form ">
                                    <div className="logo mb-3">
                                        <div className="col-md-12 text-center">
                                            <h1 >{this.props.strings.signUp}</h1>
                                        </div>
                                    </div>
                                    <form onSubmit={this.onSubmitReg}>
                                        <div className="form-group">
                                            <label>Nickname</label>
                                            <input type="text"
                                                   name="regName"
                                                   className="form-control"
                                                   id="firstname"
                                                   aria-describedby="emailHelp"
                                                   placeholder="Nickname"
                                                   onChange={this.onChange}
                                                   value={this.state.regName}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email"
                                                   name="regEmail"
                                                   className="form-control"
                                                   id="email"
                                                   aria-describedby="emailHelp"
                                                   placeholder="email"
                                                   onChange={this.onChange}
                                                   value={this.state.regEmail}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label >{this.props.strings.password}</label>
                                            <input type="password"
                                                   name="regPassword"
                                                   id="password"
                                                   className="form-control"
                                                   aria-describedby="emailHelp"
                                                   placeholder={this.props.strings.password}
                                                   onChange={this.onChange}
                                                   value={this.state.regPassword}
                                            />
                                        </div>
                                        <div className="col-md-12 text-center mb-3">
                                            <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">{this.props.strings.signUp}</button>
                                        </div>
                                        <div className="col-md-12 ">
                                            <div className="form-group">
                                                <p className="text-center"><a href='' id="signin" onClick={this.showLogin}>{this.props.strings.alreadyHaveAcc}</a></p>
                                            </div>
                                        </div>
                                    </form>
                                    {errorsReg}
                                    {reg}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(LoginForm);