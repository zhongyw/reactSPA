import React from 'react';
import {Row, Col} from 'antd';

export default class DeviceInfoHardware extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: props.status
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span="24"
                         style={{'fontSize':'14px', 'fontWeight': 'bold', 'borderBottom': 'solid 1px #efefef'}}>
                        硬件详细
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        生产商: Xiaomi
                    </Col>
                    <Col span="12">
                        型号: Redmi 3X
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        设备序列号: 2944c4ed7d23
                    </Col>
                    <Col span="12">
                        账号:
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        处理器名称: AArch64 Processor rev 4 (aarch64)
                    </Col>
                    <Col span="12">
                        处理器速度: 1401 MHz
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        处理器个数: 8
                    </Col>
                    <Col span="12">
                        运行内存: 1855.0 MB
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        总共内存: 24563 MB
                    </Col>
                    <Col span="12">
                        剩余内存: 23059 MB
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        总共外加内存: 24563 MB
                    </Col>
                    <Col span="12">
                        剩余外加内存: 23059 MB
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        应用数据: 1230 MB
                    </Col>
                    <Col span="12">
                        屏幕分辨率: 720*1280
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        系统语言: 中文
                    </Col>
                    <Col span="12">
                        屏幕尺寸: 5.0
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        时区: GMT+08:00, 中国标准时间
                    </Col>
                    <Col span="12">
                        拥有人: a
                    </Col>
                </Row>
            </div>
        )
    }
}