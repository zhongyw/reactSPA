import React from 'react';
export default class DeviceAuthStatus extends React.Component{

	constructor(props){
		super(props);
		this.item = props.item;
	}

	render(){
		if(this.item.authStatus){
			return <a href="javascript:void(0)" style={{color:'red'}} onclick="showAuthStatus({this.item.id})">Abnormal</a>
		}else{
			return <span style={{color:'green'}}>Normal</span>
		}
	}
}
