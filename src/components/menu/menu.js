import React from 'react';

import './menu.css';
import { withRouter} from 'react-router-dom'
import strings from '../../res/localisation'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {logout as backLogOut} from '../../functions/userFunctions'

import { Nav, NavDropdown } from 'react-bootstrap';
import {Button} from 'uikit-react'


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {label: 0, language: 'en', path: "/main"};
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.goToLink = this.goToLink.bind(this);
        this.logout = this.logout.bind(this);
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

    logout() {
        localStorage.setItem('userToken', '');
        backLogOut(this.props.user.session).then();
        this.props.setUser(null);
    }

    render() {
        strings.setLanguage(this.props.language);
        let logOut = this.props.user? <Button onClick={this.logout}> Log out</Button>: <Nav.Link eventKey="/login">{strings.menuLogin}</Nav.Link>;
        let nick = this.props.user? <Nav.Item className='nick'><div >{this.props.user.nickname}</div></Nav.Item>: '';
        return (
            <>
                <Nav variant="tabs" className="flex-sm-column flex-md-row" activeKey={this.props.location.pathname} onSelect={this.goToLink}>
                    <Nav.Item >
                        <Nav.Link eventKey="/">
                            {strings.menuMain}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/move">
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
                        {nick}
                        <Nav.Item style={{marginRight: "20px"}}>
                            {logOut}
                        </Nav.Item>
                        <Nav.Item style={{marginRight: "20px"}}>
                            <select onChange={this.handleLanguageChange} value={this.props.language}>
                                <option value="en">En</option>
                                <option value="ua">Ua</option>
                            </select>
                        </Nav.Item>

                    </div>

                </Nav>
            </>
    )
    }
}



export default withRouter(Main);