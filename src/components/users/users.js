import React, {useState, useEffect} from 'react';
import {VelocityComponent} from 'velocity-react'
import {getUsers} from '../../functions/userFunctions'
import Badge from "react-bootstrap/Badge";
import {CardColumns} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import './users.css'
import Button from "react-bootstrap/Button";
import {subscribe, unsubscribe} from "../../functions/follower";

export default class Users extends React.Component  {
    constructor (props) {
        super(props);
        this.userFollow = this.userFollow.bind(this);
        this.userUnsubscribe = this.userUnsubscribe.bind(this);
    }


     userFollow = (e) => {
        if (!this.props.user) {
            this.props.history.push('/login');
        }
        const idUser = e.target.parentNode.parentNode.id;
        if(idUser) {
            subscribe(this.props.user.session, idUser, this.props.user._id).then(resp => {
                if (!resp.errors) {
                    let propObj = {};
                    propObj[idUser] = true;
                    let newObj = Object.assign(this.props.subscribes, propObj);
                    let changeUser = this.props.users;
                    changeUser[idUser].followersNumber += 1;
                    this.props.setSubscribes(newObj);
                    this.props.setUsers(changeUser);
                }
            });
        }
    };


    userUnsubscribe = (e) => {
        if (!this.props.user) {
            return;
        }
        const idUser = e.target.parentNode.parentNode.id;
        if(idUser) {
            unsubscribe(this.props.user.session, [idUser]).then(resp => {
                if (!resp.errors) {
                    let propObj = this.props.subscribes;
                    delete propObj[idUser];

                    let changeUser = this.props.users;
                    changeUser[idUser].followersNumber -= 1;
                    this.props.setSubscribes(propObj);
                    this.props.setUsers(changeUser);
                }
            });
        }
    };
render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const oneUser = (prop) => {
        let btnUser = <Button variant="warning" onClick={this.userFollow}>{this.props.strings.subscribe}</Button>
        if (this.props.subscribes && this.props.subscribes[prop._id]) {
            btnUser = <Button variant="secondary" onClick={this.userUnsubscribe}>{this.props.strings.unsubscribe}</Button>
        }
        return (
            <div className='userBox' id={prop._id}>
                <div className="profilePhoto">{prop.img? <img src={prop.img}/>: <i className="fa fa-user-circle-o fa-3x"/>}</div>
                <h5 className="nickname">{prop.nickname}</h5>
                <div className="numberSubscribes">
                    <Badge variant="info">
                        {prop.subscribesNumber}
                    </Badge>
                    subscribes
                </div>
                <div className="numberFollowers">
                    <Badge variant="info">
                        {prop.followersNumber}
                    </Badge>
                    followers
                </div>
                <div className="clickFollow">
                    {btnUser}
                </div>
            </div>
        )
    };

    const rendUsers = () => {
        let media = [];
        for (let key in this.props.users) {
            if (this.props.user && this.props.users[key]._id === this.props.user._id) {
                continue;
            }
            media.push(oneUser(this.props.users[key]));
        }
        return media;
    };
    let represent = this.props.users? rendUsers(): "Users not found";

    return (
        <>
            <h3>{this.props.strings.menuUsers}</h3>
            <div className='allUsers'>
                {represent}
            </div>
        </>
    );
}



}