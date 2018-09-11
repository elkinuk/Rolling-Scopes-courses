import React, { Component } from 'react';
import './categoryItem.css'
import { Link } from 'react-router-dom'

import IconButton from "../iconButton";

export default class CategoryItem extends Component{
    render(){
        return(
            <Link to={'/'+this.props.id}>
                <div className={'category flex-row ' + this.props.cssClass}>
                    <span>{ this.props.name }</span>
                    <div className='buttons-group'>
                        <IconButton cssClass='trash-o'
                                    clickEvent = { this.props.removeCategoryItem }/>
                        <IconButton cssClass='edit'
                                    clickEvent = { this.props.returnEditCategoryStatus }/>
                        <IconButton cssClass='plus'
                                    clickEvent = { this.props.addSubCategoryItem }/>
                    </div>
                </div>
            </Link>
        )
    }
}
