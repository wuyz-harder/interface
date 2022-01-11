import React, { Component } from 'react'
import "./project.css"
import { Table,Button } from 'antd';

 export default class project extends Component {

    columns = [
        { title: '项目名', dataIndex: 'project_name', key: 'project_name' },
        { title: '发起者', dataIndex: 'maker', key: 'maker' },
        { title: '接口数量', dataIndex: 'interface_number', key: 'interface_number' },
        {
          title: '操作',
          dataIndex: '',
          key: 'id',
          render: (text, record, index) => {
             return <a><Button type="link" onClick={()=>this.delete(record)}>删除</Button></a>
        }
        },
      ];
    
    delete = (record)=>{
        this.props.del(record.id)
    } 
    // 初始化数据
    render() {
        return (
            <div>
                  <h1>项目汇总</h1>
                    用来展示所有的项目
                <h2>项目总数：{this.props.project.project.length}</h2>
                <Table
                    columns={this.columns}
                    rowKey={record=>record.id}
                    expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>
                    }}
                    dataSource={this.props.project.project}
                /> 
            </div>
        )
    }
}


