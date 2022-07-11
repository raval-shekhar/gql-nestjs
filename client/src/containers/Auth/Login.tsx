import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message } from "antd";
import { loginQuery } from "apollo/query/auth";
import { useLazyQuery } from "@apollo/client";
import { setAuthData } from "redux/reducers/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f8f8;
  .center {
   text-align: center;
  } 
  form {
    width: 360px;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
  }
`;

interface LoginProps { }

const Login: FunctionComponent<LoginProps> = () => {
  const [callLoginuery, { data, error }] = useLazyQuery(loginQuery, {
    fetchPolicy: "no-cache",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      message.error('Invalid credencial')
    }

    if (data && data.login) {
      dispatch(setAuthData(data.login));
      navigate("/dashboard");
    }
  }, [data, dispatch, error, navigate]);

  const onFinish = (values: any) => {
    callLoginuery({ variables: values });
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error('Login failed ', errorInfo);
  };

  return (
    <LoginWrapper>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type={"email"} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="center">
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
        <div className="center">
          <Link to="/register">Register</Link>
        </div>
      </Form>
    </LoginWrapper>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
