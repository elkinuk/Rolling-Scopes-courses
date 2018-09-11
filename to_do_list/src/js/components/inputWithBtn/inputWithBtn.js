import React from 'react';
import './inputWithBtn.css'

import Input from "../input"

export default class InputWithBtn extends Input {
    render(){
        return(
            <div className='input-block flex-row'>
                { super.render() }
                <button onClick = { this.props.clickEvent} > { this.props.buttonName }</button>
            </div>
        )
    }
}
