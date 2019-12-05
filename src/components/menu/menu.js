import React from 'react';

import './menu.css';
import { Route, Link, Switch, BrowserRouter as Router, withRouter} from 'react-router-dom'
import strings from '../../res/localisation'

import Users from '../users/users'
import Groups from '../groups/groups'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import { DropdownButton, Dropdown, Nav, NavDropdown } from 'react-bootstrap';
import {Scope as browserHistory} from "@babel/traverse";


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {label: 0, language: 'en', path: "/main"};
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.goToLink = this.goToLink.bind(this);
    }


    goToLink(val) {
        this.props.history.push(val);
    }


    handleLanguageChange(e) {
        e.preventDefault();
        let lang = e.target.value;
        this.props.setLanguage(lang);
        localStorage.setItem('language', lang);
    }


    render() {
         strings.setLanguage(this.props.language);
        return (

            <Nav variant="tabs" className="flex-column flex-md-row" activeKey={this.props.location.pathname} onSelect={this.goToLink}>
                <Nav.Item >
                    <Nav.Link eventKey="/main">
                        {strings.menuMain}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/moveMedia">
                        {strings.menuMoveMedia}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/moveBase">
                        {strings.menuMoveBase}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/profile">
                        {strings.menuProfile}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/home">
                        {strings.menuHome}
                    </Nav.Link>
                </Nav.Item>

                <NavDropdown title="People" id="nav-dropdown">
                    <NavDropdown.Item eventKey="/users">{strings.menuUsers}</NavDropdown.Item>
                    <NavDropdown.Item eventKey="/groups">{strings.menuGroups}</NavDropdown.Item>

                </NavDropdown>
                <div className='flex-row ml-md-auto d-md-flex'>
                    <Nav.Item>
                        <Nav.Link eventKey="/login">
                            {strings.menuLogin}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{marginRight: "20px"}}>
                        <select onChange={this.handleLanguageChange}>
                            <option value="en">En</option>
                            <option value="ua">Ua</option>
                        </select>
                    </Nav.Item>

                </div>

            </Nav>
    )
    }
}



export default withRouter(Main);