import React from 'react';
export default class DeviceAssistStatus extends React.Component{

	constructor(props){
		super(props);
		this.item = props.item;
	}

	render(){
		let 
			className = "",
			text = "";
		if(this.item.mdm_cert_invalid_status != 1 && this.item.lost_status != 1){
			className = "label label-sm label-success";
		}else{
			className = "label label-sm label-danger";
		}

		if(this.item.mdm_cert_invalid_status == 1){
			if(this.item.lost_status == 1){
				text = "Lost | MDM auth failed";
			}else{
				text = "MDM auth failed";
			}
		}else{
			if(this.item.lost_status == 1){
				text = "Lost";
			}else{
				text = "Normal";
			}
		}

		return <span className="{className}">{text}</span>

	}
}

