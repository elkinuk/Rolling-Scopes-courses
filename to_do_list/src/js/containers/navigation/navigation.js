import React, { Component } from 'react';
import './navigation.css'
import { withRouter } from 'react-router'

 import InputWithBtn from "../../components/inputWithBtn"
 import Range from "../../components/range"
 import Calc from "../../calc.js"

class Navigation extends Component{
     state = {
         categoryName: '',
         toDoName: ''
     }
      addCategory = () => {
          let categoryName = this.state.categoryName;
          if (categoryName){
                  let categories = this.props.categories;
                  categories.push({ id: Calc.getID(),
                                    categoryName:categoryName,
                                    toDoList:[],
                                    subCategories:[]});
                  this.returnCategories(categories);
          } else alert('Введите название категории!!!');
      }

      editCategory = (categories) => {
          let categoryName = this.state.categoryName;
          let highlitedCategory = (this.props.location.pathname).slice(1);

          if (categoryName){
              categories = categories || this.props.categories;
            let currentCategory = categories.find((el) => {
                if(el.id !== highlitedCategory){ //ищем выделеную категорию
                    this.editCategory(el.subCategories);
                    return false;
                }else return true;
            });

            if(currentCategory !== undefined){ //если категория была найдена
                currentCategory.categoryName = categoryName;
                this.returnEditCategoryStatus();
            }

            this.returnCategories(categories);

          } else alert('Введите название категории!!!');
      }

      addToDo = (categories) => {
         categories = categories || this.props.categories;
         let highlitedCategory = (this.props.location.pathname).slice(1);
         if (this.state.toDoName){
             let currentCategory = categories.find((category) => { //ищем выделеную категорию
                 if(category.id !== highlitedCategory){
                     this.addToDo(category.subCategories);
                     return false;
                 }else return true;
             });

             if(currentCategory !== undefined)//если категория была найдена
                 currentCategory.toDoList.push({ id: Calc.getID(),
                                          toDoName: this.state.toDoName,
                                          done:false });

             this.returnCategories(categories);
         }
         else alert('Введите название задания!!!');
      }

      editToDo = (categories) => {
          categories = categories || this.props.categories;
          let highlitedCategory = (this.props.location.pathname).slice(1);
          if (this.state.toDoName){
              let currentCategory = categories.find((category) => { //ищем выделеную категорию
                  if(category.id !== highlitedCategory){
                      this.editToDo(category.subCategories);
                      return false;
                  }else return true;
              });

              if(currentCategory !== undefined){ //если категория была найдена
                  let currentToDO = currentCategory.toDoList.find((toDo) => { //ищем нужный todo
                      return toDo.id === this.props.toDoToEdit;
                  });

                  if(currentToDO !== undefined){ //если таск был найден
                      currentToDO.toDoName = this.state.toDoName;
                      this.returnEditToDoStatus();
                  }

              }
              this.returnCategories(categories);
          }
          else alert('Введите название задания!!!');
      }

      getToDoCount = (categories) => { //пофиксить для подкатегорий не считает рэндж из-за того что проскакивает в find дальше, после нахождения
         categories = categories || this.props.categories;//попробовать через for
         let toDoCount = { max:0 , done:0 };
         let highlitedCategory = (this.props.location.pathname).slice(1);
         for(let i=0;i<categories.length;i++){
             if(categories[i].id === highlitedCategory){
                 toDoCount.max = categories[i].toDoList.length;
                 categories[i].toDoList.map((el)=>{
                     if(el.done) toDoCount.done++;
                 });
                 return toDoCount;
             } else {
                 let subToDoCount = this.getToDoCount(categories[i].subCategories);
                 if (subToDoCount !== undefined) return subToDoCount;
             }
         }
      }

      handleCategoryChange = (e) => {
          let state = Object.assign({},this.state);
          state.categoryName = e.target.value;
          this.setState(state);
      }

      handleTaskChange = (e) => {
          let state = Object.assign({},this.state);
          state.toDoName = e.target.value;
          this.setState(state);
      }

      returnCategories(categories){
          this.props.changeCategories(categories);
      }

      returnEditCategoryStatus(){
          this.props.changeEditCategoryStatus();
      }

      returnEditToDoStatus(){
          this.props.changeEditToDoStatus();
      }

    render(){
        let toDoCount = this.getToDoCount() || {max:0, done:0};
        let clickEventC;
        let buttonNameC;
        let clickEventT;
        let buttonNameT;
        if(this.props.editCategoryStatus){
            clickEventC = this.editCategory;
            buttonNameC = 'Edit';
        } else {
            clickEventC = this.addCategory;
            buttonNameC = 'Add';
        }
        let categoryInput = <InputWithBtn  placeholder = 'Category title'
                                       clickEvent = { () => clickEventC() }
                                       data = { this.state.categoryName }
                                       changeEvent = { this.handleCategoryChange }
                                       buttonName = { buttonNameC }/>;
        if(this.props.editToDoStatus){
            clickEventT = this.editToDo;
            buttonNameT = 'Edit';
        } else {
            clickEventT = this.addToDo;
            buttonNameT = 'Add';
        }
        let toDoInput = <InputWithBtn  placeholder = 'Task title'
                                       clickEvent = { () => clickEventT() }
                                       data = { this.state.toDoName }
                                       changeEvent = { this.handleTaskChange }
                                       buttonName = { buttonNameT }/>;

          return(
              <nav>
                 <div className = "flex-row">
                     { categoryInput }
                     { toDoInput }
                 </div>
                  <Range max = { toDoCount.max } done = { toDoCount.done } />
              </nav>
          )
      }
  }

export default withRouter(Navigation);
