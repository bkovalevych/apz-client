import './userCard.css'
import divWithClassName from "react-bootstrap/esm/divWithClassName";
import React from 'react';


export default class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            _id: '',
            count_followers: 0
        }
    }
    render() {
        return (
          <div>

          </div>
        );
    }
}