import axios from "axios"
import './index.css'
import React from 'react';
import { Button, message, Form, Input } from 'antd';
export const Login = () => {

    const onFinish = (values) => {
        axios.post("http://localhost:3000/user/login", values).then((res) => {
            if (res.data.code !== 200) {
                message.error(res.data.msg)
                return false
            } else if (res.data.code === 200) {
                message.success(res.data.msg)
            };
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login_body">
            <div className="login_box">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户邮箱"
                        name="userEamin"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户邮箱',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password maxLength={20} minLength={6}  />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
}