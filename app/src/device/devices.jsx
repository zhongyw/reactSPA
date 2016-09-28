import React from 'react';

import {Table,Icon,Tooltip} from 'antd';
import { Link } from 'react-router';
// import fetchMock from 'fetch-mock';

// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';

import './devices.less';
import '../common/commonHelper.js';
import '../common/deviceHelper.js';
// 引入组件
import Title from '../components/title.jsx';
import Header from './components/header.jsx';
import DeviceActivateStatus from './components/deviceActivateStatus.jsx';
import DeviceAssistStatus from './components/deviceAssistStatus.jsx';
import DeviceAuthStatus from './components/DeviceAuthStatus.jsx';

export default class Antdes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tData:[],
            loading: true,
            pagination: {
                total: 100,
                showSizeChanger: true,
                size: 'large',
                onShowSizeChange(current, pageSize) {
                    console.log('Current: ', current, '; PageSize: ', pageSize);
                },
                onChange(current) {
                    console.log('Current: ', current);
                },
            }
        }
    }

    // 行单击事件
    rowClick = (e) => {
        console.log(e.key);
    }

    displayAlert = () => {
        console.log('blablabla')
    }

    // 获取表格数据
    fetchTableData = (postData) => {
        //'Content-Type': 'application/json'
        /**
        *'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        * 无法获取到this.request.body的值,
        * 应该是koa-bodyparser插件的问题， 无法解析值有方括号的参数
        **/

        fetch('http://192.168.206.129:3000/api/emm/device/devices/list', {method: 'post', mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(postData)
          })
            .then((res) => { console.log(res.status);console.log(res);return res.json(); })
            .then((data) => {
                this.setState({loading:false});
                this.setState({tData:data.devices});

                this.setState({pagination: pagerAdapt(this.state.pagination, data.page)});
            })
            .catch((e) => { console.log(e.message);});
    }

    // 组件渲染后获取外界数据(GET)
    componentDidMount() {
        this.fetchTableData();
    }

    render() {

        /*定义表格列*/
        const columns = [{
            title: 'Device name',
            dataIndex: 'device_name'
        }, {
            title: 'Owner',
            dataIndex: 'ownership'
        }, {
            title: 'Activated status',
            dataIndex: 'managedStatus',
            render: (text) => {
                return <DeviceActivateStatus status={text}/>

            }
        }, {
            title: 'Assist status',
            dataIndex: 'lostStatus',
            render: (text, record) => {
                return <DeviceAssistStatus item={record}/>
            }
        },{
            title: 'Client version',
            dataIndex: 'userAgent',
            render: (text, record) => {

                return getAgentVersion(record.platform_id,record.user_agent);
            }
        }, {
            title: 'Device model',
            dataIndex: 'model'
        },{
            title: 'Authorization status',
            dataIndex: 'clickRate',
            render: (text, record) => ( <DeviceAuthStatus item="{record}"/> )
        }, {
            title: 'Device system',
            dataIndex: 'operation_system'
        }, {
            title: 'Operate',
            dataIndex: 'handle',
            render:
                (t,r,i) => (
                    <span>
                        <Tooltip title="Lost"><Link to={"/device/edit/"+(i+1)}><i className="fa fa-pencil" /></Link></Tooltip>&nbsp;&nbsp;
                        <Tooltip title="Delete"><i className="fa fa-trash" style={{color:'#FD5B5B'}}/></Tooltip>
                    </span>
                )
        }];

        return (
            <div id="wrap">
                <Title titleName="激活设备" onMouseOver={this.displayAlert}/>
                <Header fetchTableData={this.fetchTableData}/>
                <div id="table">
                    <Table
                        rowSelection={{}}
                        dataSource={this.state.tData}
                        columns={columns}
                        size="middle"
                        pagination={this.state.pagination}
                        onRowClick={this.rowClick}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        )
  }
}
