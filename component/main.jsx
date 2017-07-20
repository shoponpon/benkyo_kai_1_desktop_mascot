import React from 'react';
import ReactDOM from 'react-dom';
import Mascot from './mascot';

class App extends React.Component{
    render(){

        const mascotProps = {
            width: 500,
            height: 128,
            fps:30,
            image:"./5000.png"
        }

        return(
            <Mascot {...mascotProps} />
        );
    }
}

var container = document.querySelector("#app")

ReactDOM.render(<App />, container)