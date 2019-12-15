import React from 'react';

import './menu.css';
import { withRouter} from 'react-router-dom'
import strings from '../../res/localisation'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {logout as backLogOut} from '../../functions/userFunctions'

import { Nav, NavDropdown, Button } from 'react-bootstrap';



class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {label: 0, language: 'en', path: "/main", anim: 'on'};
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.goToLink = this.goToLink.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAnimationChange = this.handleAnimationChange.bind(this);

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

    handleAnimationChange(e) {
        e.preventDefault();

        let anim = e.target.value;
        this.setState({anim: anim});
        if (anim === 'on') {
            document.getElementsByClassName('dark')[0].children[0].style.display = 'block';
        } else {
            document.getElementsByClassName('dark')[0].children[0].style.display = 'none';
        }
    }

    logout() {
        localStorage.setItem('userToken', '');
        backLogOut(this.props.user.session).then();
        this.props.setUser(null);
    }

    render() {
        strings.setLanguage(this.props.language);
        let logOut = this.props.user? <Button onClick={this.logout}>{strings.menuLogout}</Button>: <Nav.Link eventKey="/login">{strings.menuLogin}</Nav.Link>;
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


                    <NavDropdown title={<i className="fa fa-users fa-2x"/>} id="nav-dropdown">

                        <NavDropdown.Item eventKey="/users">{strings.menuUsers}</NavDropdown.Item>
                        <NavDropdown.Item eventKey="/groups">{strings.menuGroups}</NavDropdown.Item>
                    </NavDropdown>
                    <div className='flex-row ml-md-auto d-md-flex'>
                        {nick}
                        <Nav.Item style={{marginRight: "20px"}}>
                            {logOut}
                        </Nav.Item>
                        <Nav.Item style={{marginRight: "20px"}}>
                            {strings.language}
                            <select onChange={this.handleLanguageChange} value={this.props.language}>
                                <option value="en">En</option>
                                <option value="ua">Ua</option>
                            </select>
                        </Nav.Item>
                        <Nav.Item style={{marginRight: "20px"}}>
                            {strings.animation}
                            <select onChange={this.handleAnimationChange} value={this.state.anim}>
                                <option value="on">On</option>
                                <option value="off">Off</option>
                            </select>
                        </Nav.Item>

                    </div>

                </Nav>
            </>
    )
    }
}



export default withRouter(Main);