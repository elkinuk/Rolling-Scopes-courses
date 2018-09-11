import React from 'react';
import './iconButton.css'

import Icon from "../icon";

export default class IconButton extends Icon{

    render(){
        return(
            <button className={'icon-button ' + this.props.cssClass}
                    onClick={ ()=>{ this.props.clickEvent() } }>

                {super.render()}
                <span></span>

            </button>
        )
    }
}
