import React, { Component } from 'react';

import InputWithSearch from "../inputWithSearch";
import Checkbox from "../checkbox";

export default  class Header extends Component {
    state = {
        searchValue: ''
    }

    returnToDoOutput = () => {
        this.props.changeToDoOutput();
    }

    returnSearchedToDo = () => {
        this.props.changeSearchedToDo(this.state.searchValue);
    }

    handleSearchChange = (e) => {
        this.setState( {searchValue: e.target.value } );
    }

    render(){
        return <header className='flex-row'>
            <h1>To Do list</h1>
            <div className='filter flex-row'>
                <InputWithSearch placeholder="Search"
                                 changeEvent = { this.handleSearchChange }
                                 data = { this.state.searchValue }
                                 clickEvent = { this.returnSearchedToDo } />
                <Checkbox label = {'Show done'}
                          changeEvent = { this.returnToDoOutput }/>
            </div>
        </header>
    }
}
