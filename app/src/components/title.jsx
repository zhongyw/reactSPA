import React from 'react';
import {Button,Row,Col} from 'antd';

/*页面标题组件，可传参*/
export default class Title extends React.Component {
    constructor(props) {
        super(props);       
    } 

    handleOver = (e) => {
        this.props.onMouseOver(e);
    }   
    returnClick = (e) => {
        window.history.back();
    }
    render() {
        const titleStyle = {
            padding:'5px 20px',
            background:'#ECECEC',
            marginBottom: 10,
            letterSpacing:4,
            borderRadius:5,
            overflow:'hidden',
        };
        let props = {
            onMouseOver:this.handleOver,
        }
        return (
            <div style={titleStyle} {...this.props} >
                <Row>
                    <Col span="12"><h2>{this.props.titleName}</h2></Col>
                    <Col span="12" style={{'textAlign': 'right'}}><Button type="ghost" onClick={this.returnClick} style={{'margin':0}}>返回</Button></Col>
                </Row>
            </div>
        )
    }
}
        