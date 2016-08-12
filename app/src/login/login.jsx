import React from 'react';

/*彩色动感标题组件*/
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            col:'#666'
        }        
    }


    render() {
        
        return (
            <h1 className="animated rotateIn" id="welcome">Login</h1>
        )
    }       
}