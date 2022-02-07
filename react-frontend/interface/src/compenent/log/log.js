import React, { Component } from 'react'
import { Table,Button } from 'antd';

export default class Log extends Component {


    columns = [
        { title: '详情', dataIndex: 'detail', key: 'detail' },
        { title: '用户名', dataIndex: 'user_name', key: 'user_name' },
        { title: '时间', dataIndex: 'time', key: 'time' },
        
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
    render() {
        return (
            <div>
                        <h1>日志汇总</h1>
                    用来展示所有的日志
                <h2>接口总数：{this.props.log.log.length}</h2>
                 <Table
                    columns={this.columns}
                    rowKey={record=>record.id}
                    pagination={
                        {
                            total:this.props.log.log.length,
                            pageSize:8,
                            current:1,
                            onChange(page,pageSize){
                                    this.current = page
                                    this.pageSize = pageSize
                            }
                        }
                    }
                    expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.id}</p>
                    }}
                    dataSource={this.props.log.log}
                /> 
            </div>
        )
    }
}
