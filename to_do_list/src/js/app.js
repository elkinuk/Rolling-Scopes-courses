import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Main from "./containers/main"

class App extends Component{

    render(){
        return(
            <div className='container'>
                <Main />
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
