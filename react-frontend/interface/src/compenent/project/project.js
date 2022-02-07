import React, { PureComponent } from 'react'
import "./project.css"
import NewForm from "../common/form"
import { Table,Button, Input, } from 'antd';

 export default class project extends PureComponent {

    // current = 1
    columns = [
        { title: '项目名', dataIndex: 'project_name', key: 'project_name' },
        { title: '发起者', dataIndex: 'maker', key: 'maker' },
        { title: '接口数量', dataIndex: 'interface_number', key: 'interface_number' },
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
    state = {
        display:"none"
    }
    show = ()=>{
        this.setState({
            display:this.state.display==="none"?"block":"none"
        })
    }
    // 初始化数据
    render() {
        return (
            <div style={{height:"100vh"}}>
                <div className="new" style={{display:this.state.display}}>
                    <NewForm add={()=>this.show()}></NewForm>
                    </div>
                <div className="fm" style={{display:this.state.display}}> 
                </div>
                
                  <h1 style={{paddingLeft:"20px"}}>项目汇总</h1>
                    <text style={{paddingLeft:"20px"}}>用来展示所有的项目</text>
                <h2 style={{paddingLeft:"20px"}}>项目总数：{this.props.project.project.length}  
                <Button 
                type="primary"
                onClick = {()=>this.show()} 
                style={{float:'right',right:"20px"}}>
                    新建
                    </Button></h2>
                <Table
                    columns={this.columns}
                    rowKey={record=>record.id}
                    pagination={
                        {
                            position: 'bottomRight',
                            total:this.props.project.project.length,
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
                    dataSource={this.props.project.project}
                /> 
            </div>
        )
    }
}


