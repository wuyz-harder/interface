import React, { Component } from 'react'
import {NavLink,Router,Route,Routes} from "react-router-dom"
import { Menu } from 'antd';
import Project from "../src/compenent/project/connect_project"
import People from "../src/compenent/people/people"
import Interface from "../src/compenent/interface/interface"
import Log from "../src/compenent/log/log"
import "./App.css"
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined
} from '@ant-design/icons';


export default class App extends Component {
    state = {
       
      };
    render() {
        return (
            <div className="main">
                
                <div className="full">
                        <div>
                            <h1 style={{color:"#fff",paddingTop:"20px",paddingLeft:"10px"}}>接口管理平台</h1>
                        </div>
                        
                        <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        >
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                           <NavLink to="/project">项目汇总</NavLink> 
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <NavLink to="/interface">接口管理</NavLink> 
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ContainerOutlined />}>
                            <NavLink to="/people">开发人员</NavLink> 
                        </Menu.Item>
                        <Menu.Item key="4" icon={<AppstoreOutlined />}>
                             <NavLink to="/log">日志记录</NavLink> 
                        </Menu.Item>
                        </Menu>
                </div>
                <div className="data">
                    <div>
                        
                        <Routes>
                            <Route path="/project" element={<Project></Project>}></Route>
                            <Route path="/interface" element={<Interface></Interface>}></Route>
                            <Route path="/people" element={<People></People>}></Route>
                            <Route path="/log" element={<Log></Log>}></Route>
                        </Routes> 
                    </div>

                </div>
            </div>
        )
    }
    
}


