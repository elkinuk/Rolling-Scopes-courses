import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import Header from "../../components/header"
import Navigation from "../navigation"
import CategoryList from "../categoryList"
import ToDoList from "../toDoList"

import DATA from "./dataStructure.js";

export default class Main extends Component{

    state = DATA; //* ну такое себе, но для чистоты сойдет

    changeCategories = (categories) => {
        let state = Object.assign({},this.state);
        state.categories = categories;
        this.setState(state);
    }

    changeSearchedToDo = (searchValue) => {
        let state = Object.assign({},this.state);
        state.searchedValue = searchValue;
        this.setState(state);
    }

    changeToDoOutput = () => {
        let state = Object.assign({},this.state);
        state.showOnlyDone = !this.state.showOnlyDone;
        this.setState(state);
    }

    changeEditCategoryStatus = () => {
        let state = Object.assign({},this.state);
        state.editCategoryStatus = !state.editCategoryStatus;
        //без сл строки статус для изменения имени категории не меняется, в чем проблема????
        this.state.editCategoryStatus = !this.state.editCategoryStatus;
        this.setState(state);
    }

    changeEditToDoStatus = (toDoToEdit) => {
        let state = Object.assign({},this.state);

        state.toDoToEdit = toDoToEdit;
        if(!(this.state.editToDoStatus && this.state.toDoToEdit !== toDoToEdit)){
                state.editToDoStatus = !this.state.editToDoStatus;
        } else if(this.state.toDoToEdit === undefined) state.editToDoStatus = !this.state.editToDoStatus;

        //без сл блока статус для изменения имени todo не меняется, в чем проблема????
        this.state.toDoToEdit = toDoToEdit;
        if(!(this.state.editToDoStatus && this.state.toDoToEdit !== toDoToEdit)){
            this.state.editToDoStatus = !this.state.editToDoStatus;
        } else if(this.state.toDoToEdit === undefined) this.state.editToDoStatus = !this.state.editToDoStatus;

        this.setState(state);
    }

    render(){//* убрать повторяемость props-ов
        return( <Router>
                    <main>
                        <Header changeToDoOutput = { this.changeToDoOutput }
                                changeSearchedToDo = { this.changeSearchedToDo }/>

                        <Navigation categories = { this.state.categories }
                                    changeCategories = { this.changeCategories }
                                    changeEditCategoryStatus = { this.changeEditCategoryStatus }
                                    editCategoryStatus = { this.state.editCategoryStatus }
                                    changeEditToDoStatus = { this.changeEditToDoStatus }
                                    editToDoStatus = { this.state.editToDoStatus }
                                    toDoToEdit = { this.state.toDoToEdit }/>

                        <CategoryList categories = { this.state.categories }
                                      changeCategories = { this.changeCategories }
                                      changeEditCategoryStatus = { this.changeEditCategoryStatus }
                                      editCategoryStatus = { this.state.editCategoryStatus }/>

                        <ToDoList categories = { this.state.categories }
                                  changeCategories = { this.changeCategories }
                                  showOnlyDone =  { this.state.showOnlyDone }
                                  changeEditToDoStatus = { this.changeEditToDoStatus }
                                  editToDoStatus = { this.state.editToDoStatus }
                                  searchedValue = { this.state.searchedValue }/>
                    </main>
                </Router> );
    }
}
