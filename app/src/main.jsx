import React from 'react';
import ReactDOM from 'react-dom';

// 引入垫片兼容IE
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect,IndexLink} from 'react-router';

// 引入Antd组件
import { Menu, Icon, Breadcrumb, Row, Col } from 'antd';
const SubMenu = Menu.SubMenu;

// 引入单个页面（包括嵌套的子页面）
import Welcome from './welcome/welcome.jsx';
import Login from './login/login.jsx';
import Devices from './device/devices.jsx';
import Profile from './profile/profile.jsx';
import Antdes from './antdes/antdes.jsx';
import Gallery from './gallery/gallery.jsx';
import Subpage from './subpage/subpage.jsx';
import Last from './last/last.jsx';
import EditPage from './editPage/editPage.jsx';
import DeviceEdit from './device/deviceEdit.jsx';

// 引入Ant-Design样式 & Animate.CSS样式 & font-awesome样式
import 'antd/dist/antd.min.css';
import 'animate.css/animate.min.css';
import 'font-awesome/css/font-awesome.min.css';

// 引入主体样式
import './main.less';

// 配置整体组件
class Init extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '1',
            openKeys: []
        };

    }    
    handleClick = (e) => {
        this.setState({
           current: e.key,
           openKeys: e.keyPath.slice(1),
        });
    }
    onToggle = (info) => {
        this.setState({
           openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
        });
    }

    render() {
        return (
            <div>
                <div id="leftMenu"> 
                    <img src='../images/logo.png' width="50" id="logo"/>  {/*logo图标*/}                
                    <Menu onClick={this.handleClick}
                        style={{ width: 146 }}
                        openKeys={this.state.openKeys}
                        onOpen={this.onToggle}
                        onClose={this.onToggle}
                        selectedKeys={[this.state.current]}
                        theme="light"
                        mode="inline">
                        <Menu.Item key="1">                    
                            <IndexLink to="/"><span><Icon type="home" /><span>Home</span></span></IndexLink>
                        </Menu.Item>    
                        <SubMenu key="Device" title={<span><Icon type="windows" /><span>Device</span></span>}>
                            <Menu.Item key="Devices"><Link to="/device/">Devices</Link></Menu.Item>
                            <Menu.Item key="Online"><Link to="/device/online">Online</Link></Menu.Item>
                            <Menu.Item key="Group"><Link to="/device/group">Group</Link></Menu.Item>
                            <Menu.Item key="History"><Link to="/device/history">History</Link></Menu.Item>
                            <Menu.Item key="profile"><Link to="/profile">profile</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="bar-chart" /><span>导航二12</span></span>}>
                            <Menu.Item key="3"><Link to="/antdes">子导航二</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="appstore" /><span>导航三</span></span>}>
                            <Menu.Item key="4"><Link to="/gallery">子导航三</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/subpage">子导航四</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="6">
                            <Link to="/last"><span><Icon type="solution" /><span>结尾页</span></span></Link>
                        </Menu.Item>
                    </Menu>                    
                </div>
                <div id="rightWrap">
                    <Row type="flex" justify="start" align="middle" style={{'padding-bottom': '5px'}}>
                        <Col><Icon type="home" style={{'margin-right': '3px'}}></Icon></Col>
                        <Col><Breadcrumb {...this.props}/></Col>
                    </Row>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

// 配置路由，并将路由注入到id为init的DOM元素中
ReactDOM.render((
    <Router history={hashHistory} >
        <Route path="/" breadcrumbName="Home" icon="link" component={Init}>
            <IndexRoute component={Welcome}/>
            <Route path="profile" component={Profile} />
            <Route path="device/" breadcrumbName="Device" >
                <IndexRoute component={Devices}/>
                <Route path="edit/:deviceId" breadcrumbName="Edit" component={DeviceEdit}/>
            </Route>
            <Route path="antdes" component={Antdes} />
            <Route path="gallery" component={Gallery} />
            <Route path="subpage" component={Subpage} />
            <Route path="last" component={Last} />
            <Route path="editPage/:rowId" component={EditPage} />
            <Route path="login" component={Login}/>
        </Route>
    </Router>
), document.querySelector('#init'))
