import * as React from 'react';
import {Button, Link} from 'uikit-react';
import {get} from '../../functions/groups'

import strings from '../../res/localisation'



class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fetch: false, data: null};

        this.getData = this.getData.bind(this);
    }

    getData() {
        this.setState({fetch: true});
        get().then(data => {
            this.setState({data: data.data, fetch: false});
        })
    }



    componentDidMount(): void {
        this.getData();
    }

    render() {
        let oneElem = (opt) => {
            return (<div id={opt.id} style={{ height: "200px", background: "#3f3f3f"}}>
                <h3>{opt.name}</h3>
                <br/>
                <p>{opt.description}</p>
                <br/>
                <p style={{float: "right"}}>{opt.count} users</p>
            </div>)
        };
        let groups = () => {
            if (this.state.fetch) return <div>waiting</div>
            let gr = [];
            for (let key in this.state.data) {
                let d = this.state.data[key];
                gr.push(oneElem(d))
            }
            return gr;
        };

        return (
            <>
              <h1>{this.props.strings.menuGroups}</h1>
                <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gridGap: '10px'}}>
                    {groups()}
                </div>

            </>
        )
    }
}



export default Groups;