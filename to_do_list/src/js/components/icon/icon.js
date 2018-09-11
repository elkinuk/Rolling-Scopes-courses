import React, { Component } from 'react';

export default class Icon extends Component{
    render(){
        let cssClass = 'fa fa-'+ this.props.cssClass;
        return(
            <i className = {cssClass} aria-hidden = 'true' ></i>
        )
    }
}
