import React from 'react';
import {Button,Slider,Checkbox,DatePicker,Select,Radio,Form,Row,Col,Icon,message,notification,Modal,Input,TreeSelect } from 'antd';

// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';

// 引入 新建广告系列按钮 组件
import BtnForm from './modalForm.jsx';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const treeData = [{
        label: '节点一',
        value: '0-0',
        key: '0-0',
        children: [{
            label: '子节点一',
            value: '0-0-0',
            key: '0-0-0'
        }]
    }, {
        label: '节点二',
        value: '0-1',
        key: '0-1',
        children: [{
            label: '子节点三',
            value: '0-1-0',
            key: '0-1-0',
        },{
            label: '子节点四',
            value: '0-1-1',
            key: '0-1-1',
        }]
    }

]

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selV: [''],
            selValue:'',
            sDate:'',
            eDate:'',
            ischecked: false,
            data: {
                deviceName: ""
            },
            value: ['0-0'],
            fetchTableData: props.fetchTableData
        }        
    }

    // device name change event
    deviceNameChange = (e) => {
        // console.log("deviceName:" + value);
        
        this.state.data.deviceName  = e.target.value;
    }
    // 选择广告系列
    selChange = (value) => {        
        this.setState({selValue: value});
    }

    // 选择日期范围
    dateChange = (value) => {
        this.setState({sDate: value[0].toLocaleDateString()});
        this.setState({eDate: value[1].toLocaleDateString()});
    }

    // 过滤无数据广告
    checkChange = (e) => {
        this.setState({ischecked: e.target.checked});
        if(e.target.checked == true) {
            message.config({top: 5});
            message.warning('过滤无数据广告已开启！');            
        }
    }

    // 查询提示框
    confirmMsg = () => {           
        var data = {};
        Object.assign(data, this.props.form.getFieldsValue());
        data.sevenLose &&  (data.sevenLose = data.sevenLose ? 1 : 0);
        data.dataRoaming && (data.dataRoaming = data.dataRoaming ? 1: 0);
        data.sevenActivate && (data.sevenActivate = data.sevenActivate ? 1: 0);
        data.policyComplianceState && (data.policyComplianceState = data.policyComplianceState ? 0 : 1);
        this.state.fetchTableData(data);
    } 

    // 获取下拉框数据
    fetchSelData = () => {
        fetch('../data/selectData.json')
            .then((res) => { console.log(res.status);return res.json(); })
            .then((data) => { this.setState({selV:data.obj}); })
            .catch((e) => { console.log(e.message); });
    }    
    onUserGroupChange = (value) => {
        this.setState({ value });
    }
    // 组件渲染后获取外界数据(GET)
    componentDidMount() {
        this.fetchSelData();
    }
    
    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

        /*控制查询按钮状态*/
        let isDisabled = this.state.selValue ==='' ? true : false;

        /*时间控件初始的起止日期，间隔为30天*/
        let defaultStartDate = new Date();
        let defaultEndDate = new Date(defaultStartDate.getTime()+30*24*60*60*1000);

        const tProps = {
            treeData,
            onChange: this.onUserGroupChange,
            multiple: true,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceHolder: '请选择',
            style:{
                width:300,
            }

        }
        return (
            <div id="header">
                <Form inline form={this.props.form}>
                    <Row type="flex" justify="start" gutter={16} align="middle">
                        <Col sm="8">
                            <FormItem
                                label="用户组"
                            >
                                <TreeSelect {...tProps} {...getFieldProps('userGroup', {initialValue: ['0-0-0']})}/>
                            </FormItem>
                        </Col>
                        <Col sm="8">
                            <FormItem
                              label="设备名称"
                            >
                              <Input  type="text" {...getFieldProps('deviceName', {})} placeholder="" />
                            </FormItem>
                        </Col>
                        <Col sm="8">
                            <FormItem
                              label="MEI号"
                            >
                              <Input  type="text" {...getFieldProps('imei', {})} placeholder="" />
                            </FormItem>
                        </Col>
                        <Col sm="8">
                            
                            <FormItem
                              label="是否破解"
                            >
                            <RadioGroup {...getFieldProps('deviceRooted', {})}>
                                <RadioButton value={1}>已破解</RadioButton>
                                <RadioButton value={0}>未破解</RadioButton>
                             </RadioGroup>
                           </FormItem>
                        </Col>
                        <Col sm="8">
                            <FormItem
                              label="筛选条件"
                            >
                            <Checkbox {...getFieldProps('sevenLose', {})} >7日内失去控制</Checkbox>
                            <Checkbox {...getFieldProps('dataRoaming', {})} >在漫游</Checkbox>
                            <Checkbox {...getFieldProps('policyComplianceState', {})}>违反安卓策略</Checkbox>
                            <Checkbox {...getFieldProps('sevenActivate', {})} >7日内注册</Checkbox>
                            
                           </FormItem>
                        </Col>
                        <Col sm="8">
                            <FormItem
                              label="权限状态"
                            >
                            <RadioGroup {...getFieldProps('authStatus', {})}>
                                <RadioButton value={false}>正常</RadioButton>
                                <RadioButton value={true}>异常</RadioButton>
                             </RadioGroup>
                           </FormItem>
                        </Col>
                        <Col sm="8">
                            <FormItem
                              label="级联搜索"
                            >
                            <RadioGroup {...getFieldProps('isCascadeSearch', {})}>
                                <RadioButton value={1}>是</RadioButton>
                                <RadioButton value={0}>否</RadioButton>
                             </RadioGroup>
                           </FormItem>
                        </Col>

                        <Col sm="8">
                            <FormItem>
                                <Button onClick={this.confirmMsg} >查询</Button>
                            </FormItem>
                        </Col>
                       
                    </Row>
                    
                    
                </Form>
            </div>
        )
    }   
}
Header = Form.create()(Header);
export default Header;