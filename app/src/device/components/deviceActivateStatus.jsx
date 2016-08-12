import React from 'react';
export default class DeviceActivateStatus extends React.Component {
	
    constructor(props) {
        super(props);
        this.state = {            
            status: props.status
        }        
    }
    
    render() {  
		if(this.state.status == 1){
            return <span className='label label-sm label-success'>Enabled</span>;
        }else if(this.state.status == 2){
            return <span className='label label-sm label-warning'>Deactivated</span>;
        }else{
            return <span className='label label-sm label-danger'>Not activated</span>;
        }

    }   

}