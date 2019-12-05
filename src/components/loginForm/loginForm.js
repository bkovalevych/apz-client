import divWithClassName from "react-bootstrap/esm/divWithClassName";
import React from 'react';
import { Route, Link, Switch, BrowserRouter as Router, withRouter} from 'react-router-dom'
import strings from '../../res/localisation'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            _id: '',
            count_followers: 0,
            login: true
        };
        this.showLogin = this.showLogin.bind(this);
        this.showReg = this.showReg.bind(this);
    }
    showLogin(e) {
        e.preventDefault();
        this.setState({login: true})
    }

    showReg(e) {
        e.preventDefault()
        this.setState({login: false})
    }

    render() {

        return (
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
                                    <form action="" method="post" name="login">
                                        <div className="form-group">
                                            <label >Email</label>
                                            <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="email"/>
                                        </div>
                                        <div className="form-group">
                                            <label >{this.props.strings.password}</label>
                                            <input type="password" name="password" id="password"  className="form-control" aria-describedby="emailHelp" placeholder="Password"/>
                                        </div>
                                        <div className="col-md-12 text-center ">
                                            <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">{this.props.strings.menuLogin}</button>
                                        </div>
                                        <div className="form-group">
                                            <p className="text-center">
                                                {this.props.strings.dontHaveAcc}<br/>
                                                <a href='' id="signup" onClick={this.showReg}>{this.props.strings.signUp}</a>
                                            </p>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div id="second" style={{display: !this.state.login? "block": "none"}}>
                                <div className="myform form ">
                                    <div className="logo mb-3">
                                        <div className="col-md-12 text-center">
                                            <h1 >{this.props.strings.signUp}</h1>
                                        </div>
                                    </div>
                                    <form action="#" name="registration">
                                        <div className="form-group">
                                            <label>{this.props.strings.firstName}</label>
                                            <input type="text"  name="firstname" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder={this.props.strings.firstName}/>
                                        </div>
                                        <div className="form-group">
                                            <label>{this.props.strings.lastName}</label>
                                            <input type="text"  name="lastname" className="form-control" id="lastname" aria-describedby="emailHelp" placeholder={this.props.strings.lastName}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="email"/>
                                        </div>
                                        <div className="form-group">
                                            <label >{this.props.strings.password}</label>
                                            <input type="password" name="password" id="password"  className="form-control" aria-describedby="emailHelp" placeholder={this.props.strings.password}/>
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