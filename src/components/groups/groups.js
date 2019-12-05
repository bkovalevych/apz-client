import * as React from 'react';
import {Button, Link} from 'uikit-react';


import strings from '../../res/localisation'



class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {label: 0, language: 'en'};
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }



    handleLanguageChange(e) {
        e.preventDefault();
        let lang = e.target.value;
        this.setState(prevState => ({
            language: lang
        }));
        console.log('changed');
    }

    render() {
        strings.setLanguage(this.state.language);
        return (
            <h1>{strings.menuGroups}</h1>
        )
    }
}



export default Groups;