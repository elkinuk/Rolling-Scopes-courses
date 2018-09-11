import React, { Component } from 'react';
import './categoryList.css'
import { withRouter } from 'react-router'

import CategoryItem from "../../components/categoryItem"
import SubCategoryItem from "../../components/subCategoryItem"
import Calc from "../../calc.js"

class CategoryList extends Component{

    createCategoriesList(categories){
        categories = categories || this.props.categories;
        let categoriesEl = [];
        let highlitedCategory = (this.props.location.pathname).slice(1);
        categories.map( (el) => {
            let cssClass = (el.id === highlitedCategory) ? 'highlited' : '';
            categoriesEl.push( <CategoryItem cssClass = {cssClass}
                                             key = { el.id }
                                             id = { el.id }
                                             name = { el.categoryName }
                                             removeCategoryItem = { ()=>{ this.removeCategoryItem(el.id) } }
                                             addSubCategoryItem = { ()=>{ this.addSubCategoryItem(el.id) } }
                                             returnEditCategoryStatus = { this.returnEditCategoryStatus }/> );
            if(el.subCategories.length){ //если есть подкатегории
                categoriesEl.push( <div className='sub' key={'sub' + el.id}>
                                        { this.createCategoriesList(el.subCategories) }
                                   </div> );
            }
        });

        return categoriesEl;
    }

    removeCategoryItem = (categoryId, categories) => {
        categories = categories || this.props.categories;
        let deletedCategoryId = categories.findIndex((el)=>{
            if(el.id !== categoryId){
                this.removeCategoryItem(categoryId,el.subCategories);
                return false;
            } else return true;
        });
        if (deletedCategoryId !== -1){
            categories.splice( deletedCategoryId, 1);
        }
        this.returnCategories(categories);
    }

    addSubCategoryItem = (categoryId, categories) => {
        categories = categories || this.props.categories;
        let currentCategory = categories.find((el)=>{
            return el.id === categoryId;
        });
        if (currentCategory !== undefined){ //если категория была найдена
            currentCategory.subCategories.push(
                { id: Calc.getID(),
                  categoryName: 'New Subcategory' + currentCategory.subCategories.length,
                  toDoList: [],
                  subCategories:[]
                });
            this.returnCategories(categories);
        }
    }

    returnEditCategoryStatus = () => {
        if(!this.props.editCategoryStatus)
            this.props.changeEditCategoryStatus();
    }

    returnCategories(categories){
        this.props.changeCategories(categories);
    }

    render(){
        return( <aside> { this.createCategoriesList() } </aside> );
    }
}

export default withRouter(CategoryList);
