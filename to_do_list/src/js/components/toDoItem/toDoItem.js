import React, { Component } from 'react';

import Checkbox from "../checkbox";
import IconButton from "../iconButton";

export default class ToDoItem extends Component{

    render(){
        return(
            <section className='flex-center'>
                <Checkbox label = { this.props.name }
                          checked = { this.props.checked }
                          changeEvent = { this.props.changeDoneStatus }/>
                <IconButton cssClass='edit'
                            clickEvent = { this.props.returnEditToDoStatus } />
            </section>
        )
    }
}
