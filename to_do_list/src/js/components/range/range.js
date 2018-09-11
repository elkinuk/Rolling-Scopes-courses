import React, { Component } from 'react';
import './range.css'

import styled from 'styled-components'

export default class Range extends Component {
    render(){
        const RangeDiv = styled.div`
        & input::-webkit-slider-runnable-track{
                        background: linear-gradient(to right,
                                                    #1ABC9C 0%,
                                                    #1ABC9C ${() => (this.props.max === 0) ? '0%' : (this.props.done/this.props.max * 100)+'%'},
                                                    #ddd ${() => (this.props.max === 0) ? '0%' : (this.props.done/this.props.max * 100)+'%'},
                                                    #ddd 100%)}
        `
        return(
            <RangeDiv className='range'>
                <input type='range' min='0' max = { this.props.max }/>
            </RangeDiv>
        )
    }
}
