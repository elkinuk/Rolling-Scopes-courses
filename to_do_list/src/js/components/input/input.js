import React, { Component } from 'react';

export default class Input extends Component {
    render(){
        return <input value = { this.props.data || '' }
                      type='text'
                      placeholder = { this.props.placeholder }
                      onChange = { this.props.changeEvent }/>
    }
}
