import { useState } from "react"
import './index.css'
import React from 'react';
import { Button, message, Form, Input } from 'antd';
import axios from "axios"
export const Register = () => {

    const onFinish = (values) => {
        if (strengthIndex == 3) {
            axios.post("http://localhost:3000/user/add", values).then((res) => {
                console.log('is res', res)
                if (res.data.code !== 200) {
                    message.error(res.data.msg)
                    return false
                } else if (res.data.code === 200) {
                    message.success(res.data.msg)
                };
            })
        } else {    
            message.error("密码强度较低")
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //密码为八位及以上并且大小写字母数字特殊字符三项都包括
    const strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    //密码为八位及以上并且大小写字母、数字、特殊字符三项中有两项，强度是中等
    const mediumRegex = new RegExp("^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*\\W))|((?=.*[0-9])(?=.*\\W))|((?=.*[A-Z])(?=.*\\W))).*$", "g");
    const enoughRegex = new RegExp("(?=.{8,}).*", "g");
    const pwdStrength = {
        1: "低",
        2: "中",
        3: "高",

    }
    const [strengthIndex, setStrength] = useState()
    const passWordChange = (e) => {
        console.log(e.target.value)
        const pwdInputValue = e.target.value
        if (strongRegex.test(pwdInputValue)) {
            setStrength(3)
        } else if (mediumRegex.test(pwdInputValue)) {
            setStrength(2)
        } else if (enoughRegex.test(pwdInputValue)) {
            setStrength(1)
        } else {
            setStrength(1)
        }
    }

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
                            {
                                pattern: "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$",
                                message: "请输入正确格式的邮箱"
                            }
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
                        <Input.Password maxLength={20} minLength={6} onChange={passWordChange} />
                    </Form.Item>
                    {
                         strengthIndex ? 
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            密码强度: {pwdStrength[strengthIndex]}
                        </Form.Item>
                        :
                        ''
                    }

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
}