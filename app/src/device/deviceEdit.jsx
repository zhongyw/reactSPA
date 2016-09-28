import React from 'react';
import { Tabs, Icon, Row, Col, Button, Modal, Form, Input } from 'antd';


const TabPane = Tabs.TabPane,
      confirm = Modal.confirm,
      createForm = Form.create,
      FormItem = Form.Item;

import Title from '../components/title.jsx';
import DeviceInfoHardware from './components/deviceInfoHardware.jsx';

class DeviceEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible : false
        }
    }
    refreshDevice(){
        confirm({
            title: '刷新设备',
            content: '你确认要刷新设备吗？',
            onOk(){
                console.log('ok clicked');
            },
            onCancel(){

            }
        });
    }
    showChgPwdModal = (e) => {
        this.setState({visible: true});
    }
    hideChgPwdModal = (e) => {
        this.setState({visible: false});
    }
    handleChgPwdSubmit = (e) => {
        //e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if(!!errors){
                console.log('Errors in form!!');
                return;
            }
            console.log('Submit!');
        })
    }
    checkPass = (rule, value, callback) => {
        const { validateFields } = this.props.form;
        if(value){
            validateFields(['repasswd'], { force: true});
        }
        callback();
    }
    checkPass2 = (rule, value, callback) => {
        const { getFieldValue } = this.props.form;
        if(value && value !== getFieldValue('passwd')){
            callback('两次输入密码不一致！');
        }else{
            callback();
        }
    }
    render(){
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        };
        const passwdProps = getFieldProps('passwd', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码'},
                { min:6, max:18, message: '请输入6-18位密码'},
                { validator: this.checkPass}
            ]
        });
        const rePasswdProps = getFieldProps('repasswd', {
            rules: [
                { required: true, whitespace: true, message: '请填写确认密码'},
                { min:6, max:18, message: '请输入6-18位密码'},
                { validator: this.checkPass2}
            ]
        });
        return (
            <div id="wrap" className="row-padding button-padding">
                <Title titleName="修改设备" />
                <Row>
                    <Col span="4" className="gutter-row" style={{"textAlign" : "center"}}>
                        <div className="gutter-box" style={{'marginTop': '20px'}}><Icon type="laptop" style={{"fontSize":"40px"}}/></div>
                    </Col>
                    <Col span="20" className="gutter-row">
                        <Row>
                            <Col span="10">
                                    拥有人：s
                            </Col>
                            <Col span="10">
                                    IMEI号：  Jul 26, 2016 3:58:22 PM
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10">
                                    最后上报时间： Jul 26, 2016 3:58:22 PM
                            </Col>
                            <Col span="10">
                                    客户端版本：  2.7.2(10002)
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10">
                                    激活状态：激活
                            </Col>
                            <Col span="10">
                                    激活时间：   Jul 26, 2016 3:58:22 PM
                            </Col>
                        </Row>
                        
                    </Col>
                    
                </Row>
                <Row>
                    <Col offset="4">
                        <Button type="primary" size="large" onClick={this.refreshDevice}>刷新设备</Button>
                        <Button type="primary" size="large">系统锁屏</Button>
                        <Button type="primary" size="large">安全锁屏</Button>
                        <Button type="primary" size="large" onClick={this.showChgPwdModal}>重置密码</Button>
                        <Button type="primary" size="large">恢复出厂</Button>
                        <Button type="primary" size="large">擦除全部数据</Button>
                        <Button type="primary" size="large">擦出企业数据</Button>
                    </Col>
                </Row>
                <Tabs defaultActiveKey="2" >
                    <TabPane tab={<span><Icon type="appstore-o" />激活设备</span>} key="1">

                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />硬件信息</span>} key="2">
                        <DeviceInfoHardware></DeviceInfoHardware>
                    </TabPane>
                    <TabPane tab={<span><Icon type="laptop" />系统信息</span>} key="3">
                        系统信息
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />安全信息</span>} key="4">
                        安全信息
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />服务信息</span>} key="5">
                        服务信息
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />软件信息</span>} key="6">
                        软件信息
                    </TabPane>
                    <TabPane tab={<span><Icon type="android" />位置信息</span>} key="7">
                        位置信息
                    </TabPane>
                </Tabs>
                <div>
                    <Modal title="登录" visible={this.state.visible} onOk={this.handleChgPwdSubmit} onCancel={this.hideChgPwdModal}>
                      <Form horizontal form={this.props.form}>
                        <Row>
                          <Col span="16">
                                <FormItem
                                  {...formItemLayout}
                                  label="密码"
                                  hasFeedback
                                  labelCol={{span:5}}
                                  wrapperCol={{span:19}}
                                >
                                 <Input {...passwdProps}  type="password" autoComplete="off" />
                                </FormItem>
                            </Col>
                          </Row>
                          <Row>
                          <Col span="16"><FormItem
                          {...formItemLayout}
                          label="确认密码"
                          labelCol={{span:5}}
                          wrapperCol={{span:19}}
                          hasFeedback
                        >
                          <Input {...rePasswdProps}  type="password" autoComplete="off" />
                        </FormItem></Col>
                              </Row>
                      </Form>
                    </Modal>
                  </div>
            </div>
        )
    }
}

export default DeviceEdit = Form.create()(DeviceEdit);