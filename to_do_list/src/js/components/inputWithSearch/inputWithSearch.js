import React from 'react';
import './inputWithSearch.css'

import Input from "../input"
import Icon from "../icon";
import IconButton from "../iconButton";

export default class InputWithSearch extends Input {
    render(){
        return(
            <div className='search-block'>
                {super.render()}
                <IconButton cssClass='search'
                            clickEvent = { this.props.clickEvent }/>
            </div>
        )
    }
}
