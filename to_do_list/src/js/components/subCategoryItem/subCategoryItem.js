import React, { Component } from 'react';
import './subCategoryItem.css'

import IconButton from "../iconButton";
import CategoryItem from "../categoryItem";

export class SubCategoryItem extends CategoryItem{
    render(){
        return(
            <div className='sub'>
                {super.render()}
            </div>
        )
    }

}
