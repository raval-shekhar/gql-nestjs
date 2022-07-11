import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message } from "antd";
import { registerMutation } from "apollo/mutation/auth";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { setAuthData } from "redux/reducers/auth";

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #F8F8F8;
  form {
    width: 360px;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
  }
  .center {
   text-align: center;
  } 
`;

interface RegisterProps { }

const Register: FunctionComponent<RegisterProps> = () => {

  const [callUpdateUser, { data, error }] = useMutation(registerMutation);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      message.error('Password must be 8 character long')
    }
    if (data && data.register) {
      dispatch(setAuthData(data.register));
      navigate("/dashboard");
    }
  }, [data, dispatch, error, navigate]);

  const onFinish = (values: any) => {
    callUpdateUser({
      variables: {
        ...values,
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <RegisterWrapper>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </RegisterWrapper>
  );
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
