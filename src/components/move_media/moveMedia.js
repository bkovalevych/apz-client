import React, {useState, useEffect} from 'react';
import {getMedia} from '../../functions/moveMedia';
import './moveMedia.css'
import {Card, CardColumns, Button, Tabs, Tab} from 'react-bootstrap'
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";


export default function(props) {
    let [data, getData] = useState(null);
    const [tabsKey, setTabs] = useState(' ');





    const renderMedia = (arr) => {
        let result = [];
        for(let key in arr) {
            let elem = arr[key];
            result.push(
                <Card id={elem._id.toString()}>
                    <Card.Header>
                        {elem.name}
                    </Card.Header>
                    <Card.Subtitle>
                        {props.users[elem.author.toString()].nickname}
                    </Card.Subtitle>
                    <Card.Body>
                        {elem.description}
                    </Card.Body>
                    <Card.Footer>
                        {elem.date}
                    </Card.Footer>
                </Card>
            )
        }
        return result;
    };

    const represent =
        data === null?
            <p>There are no medias of move</p> :
        (data === false)?
            <p>Waiting</p> :
            renderMedia(data);
            if (!data)
                getMedia().then(media => {
                    getData(media);
                });
    return (
        <>
           <h3>{props.strings.menuMoveMedia}</h3>
            <Button><i className='fa fa-plus'/></Button>
            <CardColumns>
                {represent}
            </CardColumns>
        </>
    )
}