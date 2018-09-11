import React, { Component } from 'react';
import './toDoList.css'

import ToDoItem from "../../components/toDoItem"
import { Route,Switch } from 'react-router-dom'

export default class ToDoList extends Component{
    createToDoList(highlitedCategory,categories){
        categories = categories || this.props.categories;

        for(let i = 0;i<categories.length;i++){
            let category = categories[i];
            let toDoOutput = [];
            if (category){
                if(category.id === highlitedCategory){ //ищем выделеную категорию
                    category.toDoList.map((toDo)=>{
                        if(!this.props.showOnlyDone || (this.props.showOnlyDone && toDo.done)){
                            let toDoName = toDo.toDoName;
                            if(this.props.searchedValue === '' || toDoName.indexOf(this.props.searchedValue) !== -1)
                            toDoOutput.push(<ToDoItem key = { toDo.id }
                                                      name = { toDoName }
                                                      id = { toDo.id }
                                                      checked = { toDo.done }
                                                      categories = { this.props.categories }
                                                      changeCategories = { this.props.changeCategories }
                                                      changeDoneStatus = { ()=>{ this.changeDoneStatus(highlitedCategory,toDo.id)} }
                                                      returnEditToDoStatus = { () => { this.returnEditToDoStatus(toDo.id) } }/>);
                        }
                    });
                    return toDoOutput;
                } else{
                    toDoOutput = this.createToDoList(highlitedCategory,category.subCategories);
                    if(toDoOutput) return toDoOutput;
                }
            }
        }
    }

    changeDoneStatus = (highlitedCategory, id, categories) => {
        categories = categories || this.props.categories;
        if (categories){
            let currentCategory = categories.find((category) => { //ищем выделеную категорию
                if(category.id !== highlitedCategory){
                    this.changeDoneStatus(highlitedCategory, id, category.subCategories);
                    return false;
                }else return true;
            });

            if(currentCategory !== undefined){ //если категория была найдена
                let currentToDo = currentCategory.toDoList.find((toDo) => {
                    return toDo.id === id; //id текущего to do
                });

                if(currentToDo !== undefined){ //если таск был найден
                    currentToDo.done = !currentToDo.done;
                }

            }
            this.returnCategories(categories);
        }
    }

    returnCategories(categories){
        const { changeCategories } = this.props;

        changeCategories(categories);
    }

    returnEditToDoStatus = (toDoToEdit) => {
        //if(!this.props.editToDoStatus)
        this.props.changeEditToDoStatus(toDoToEdit);
    }

    render(props){
        return(
                <div>
                    <Route path={'/:highlitedCategory'} render={(props)=>{
                        const { params } = props.match;

                        return(<div className='toDoList'>
                                { this.createToDoList(params.highlitedCategory) }
                        </div>);
                    }}/>

                    <Route path={'/:highlitedCategory/show_done'} render={(props)=>{
                        const { params } = props.match;

                        return(<div className='toDoList'>
                                hello
                        </div>);
                    }}/>
                </div>
            )
    }
}
