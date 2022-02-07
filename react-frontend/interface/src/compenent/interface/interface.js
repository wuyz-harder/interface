import React, { PureComponent } from 'react'
import { Table,Button } from 'antd';

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
             return <span>
                 <Button type="ghost" onClick={()=>this.delete(record)}>删除</Button>
                 <Button type="primary" onClick={()=>this.delete(record)} style={{marginLeft:'5px'}}>编辑</Button>
             </span>
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
                <h1>接口汇总</h1>
                    用来展示所有的接口
                <h2>接口总数：{this.props.interface.interface.length}</h2>
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
