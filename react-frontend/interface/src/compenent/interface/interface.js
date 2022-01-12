import React, { PureComponent } from 'react'
import { Table,Button,Pagination } from 'antd';

export default class Interface extends PureComponent {
    
    columns = [
        { title: '接口名字', dataIndex: 'interface_name', key: 'interface_name' },
        { title: '接口路径', dataIndex: 'url', key: 'url' },
        { title: '接口方法', dataIndex: 'method', key: 'method' },
        { title: '所属项目', dataIndex: 'project_name', key: 'iproject_name' },
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
                 <Table
                    columns={this.columns}
                    rowKey={record=>record.id}
                    pagination={
                        {
                            total:this.props.interface.interface.length,
                            pageSize:8,
                            current:1,
                            onChange(page,pageSize){
                                    this.current = page
                            }
                        }
                    }
                    expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>
                    }}
                    dataSource={this.props.interface.interface}
                /> 
            </div>
        )
    }
}
