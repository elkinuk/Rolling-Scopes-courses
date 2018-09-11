import React, { Component } from 'react';
import './checkbox.css'

export default class Checkbox extends Component{
    render(){
        let checkbox;
        checkbox = (this.props.checked) ?
            <input type = "checkbox" checked onChange = { () => { this.props.changeEvent() } } /> :
            <input type = "checkbox" onChange = { () => { this.props.changeEvent() } } />
        return(
            <div className = "checkbox-block">
                <label className = "checkbox">
                    { checkbox }
                    <i></i>
                </label>
                <span>{this.props.label}</span>
            </div>
        )
    }
}
