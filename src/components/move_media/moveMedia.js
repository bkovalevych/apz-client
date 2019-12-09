import React, {useState, useEffect} from 'react';
import {getMedia} from '../../functions/moveMedia'
import {Card, CardColumns} from 'react-bootstrap'

export default function(props) {
    let [data, getData] = useState(null);

    useEffect(() => {

        getMedia().then(media => {
          getData(media);
        })
    }, [data]);

    const renderMedia = (arr) => {
        let result = [];
        for(let key in arr) {
            let elem = arr[key];
            result.push(
                <Card id={elem._id}>
                    <Card.Header>
                        {elem.name}
                    </Card.Header>
                    <Card.Subtitle>
                        {elem.author.toString()}
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
    return (
        <>
           <h3>{props.strings.menuMoveMedia}</h3>
            <i className="fa fa-filter fa-2x"/>
            <CardColumns>
                {represent}
            </CardColumns>
        </>
    )
}