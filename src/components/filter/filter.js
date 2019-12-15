import React,{useEffect, useState} from 'react'
import {} from 'react-bootstrap'
import './filter.css';
import Velocity from 'velocity-animate'
import {VelocityTransitionGroup} from 'velocity-react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

export default function (props) {
    const [opened, setOpened] = useState(false);
    const [popularity, setPopularity] = useState(false);
    const [fresh, setFresh] = useState(false);


    // const MoveMediaSchema = {
    //
    //     author: "String{User}",
    //     date: "Date",
    //     description: Schema.Types.String,
    //     duration: "",
    //     uses_count: {type: Schema.Types.Number, default: 0},
    //     name: {type: Schema.Types.String, unique: true},
    //     mode: Schema.Types.String,
    //     data: [{moduleName: String, buf: Schema.Types.Buffer}],
    //     meta_info: Schema.Types.String,
    //     tags: [String]
    // };

const handle = () =>{
    setOpened(!opened);
}
const addInfo = (<div className="additional_filter">
    <Form.Group>
        <Form.Check type="checkbox" label={props.strings.popular}/>
        <Form.Check type="checkbox" label={props.strings.fresh}/>
    </Form.Group>
    <Form.Group>

        <Form.Control as="select" name='typeOperation' label="type">
            <option value={'withdraw'}>{props.strings.menuUsers}</option>
            <option value={'pay'}>{props.strings.menuGroups}</option>
            <option value={'all'}>{props.strings.menuMoveMedia}</option>
        </Form.Control>
    </Form.Group>

</div>);
    return (
        <>
            <div className="filter_box">
                <button className="button_filter" onClick={handle}><i className={opened? "fa fa-close fa-2x": "fa fa-search fa-2x"}/></button>
                <VelocityTransitionGroup enter={{animation: {translateX: 0, translateY: 0, translateZ: 0, rotateY: 0}, duration: 500, easing: "easeOutSine"}}
                                         leave={{animation: {translateX: 500, translateY: 0, translateZ: 200, rotateY: 10}, duration: 500, easing: "easeOutSine"}}>
                    {opened ? <input type="text" className="searchBar" value={"hu"}/>
                    : undefined}
                </VelocityTransitionGroup>
                <VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
                    {opened ? addInfo : undefined}
                </VelocityTransitionGroup>
            </div>
        </>
    )
}