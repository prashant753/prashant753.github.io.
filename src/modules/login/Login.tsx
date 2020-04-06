import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import './Login.scss';

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 9 },
};
const tailLayout = {
    wrapperCol: { offset: 7, span: 16 },
};

export class Login extends Component<any, any> {

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <div className="login">
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        className="form-syling"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <footer className="footer">
                    <p className="text-color footer-text">© Prashant. All rights reserved.</p>
                </footer>
            </React.Fragment>
        );
    }
}

export default Login;
