import * as React from 'react';
import {Button} from 'uikit-react';
import './main.css';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {label: 0};
        if (props) {
            this.state.label = props.label;
        }
    }


    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const lin = <p>{this.state.label? this.state.label: ''}</p>;
        return (
            <div className='mainBox'>
                {lin}
               <Button>Hui</Button>
               <Button>SomeInfo2</Button>
               <Button>SomeInfo3</Button>
               <Button>SomeInfo4</Button>
               <Button>SomeInfo5</Button>
            </div>
        )
    }
}



export default Main;