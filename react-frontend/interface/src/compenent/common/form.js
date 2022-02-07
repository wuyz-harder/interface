import React, { PureComponent } from 'react'

import { Form, Input, InputNumber, Button ,} from 'antd';
import store from "../../redux/store/store"
export default class form extends PureComponent {
    
    layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
    };
/* eslint-disable no-template-curly-in-string */

    validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    };
    /* eslint-enable no-template-curly-in-string */


    onFinish = (values) => {
        console.log(values.project);
        store.dispatch({type:"ADD_PROJECT",data:values.project})
    };

    render() {
        return (
            <Form {...this.layout} name="nest-messages" onFinish={this.onFinish} validateMessages={this.validateMessages}>
      <Form.Item
        name={['project', 'project_name']}
        label="项目名字"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
      
        name={['project', 'maker']}
        label="发起者"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        
        name={['project', 'interface_number']}
        label="接口数量"
        rules={[
          {
            required: true,
            
            min: 0,
            max: 99,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...this.layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
        <Button type="dashed" style={{marginLeft:"10px"}} onClick = {()=>this.props.add()}>
          取消
        </Button>
      </Form.Item>
    </Form>
        )
    }
}
