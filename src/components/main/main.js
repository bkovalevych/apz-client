import * as React from 'react';
import {Button} from 'uikit-react';
import './main.css';

import {useState} from "react";
function Main(props) {
    const [off, setOff] = useState(true);
    const switchAll = () => {
        setOff(!off);
    };
    return (
        <>
            <h3>{props.strings.menuMain}</h3>

        </>
    )
}

export default Main;