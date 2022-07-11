import React, { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { createPostMutation } from "apollo/mutation/posts";
import { message } from "antd";
import { useForm } from "antd/lib/form/Form";

const AddPostFormWrapper = styled.div`
  flex: 1;
`;

interface AddPostFormProps { }

const AddPostForm: FunctionComponent<AddPostFormProps> = () => {
  const [callCreatePost, { data }] = useMutation(createPostMutation);
  const [form] = useForm()

  useEffect(() => {
    if (data && data.create) {
      message.success("Post created suuccessfully");
      form.resetFields()
    }
  }, [data, form]);

  const onFinish = (values: any) => {
    callCreatePost({
      variables: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error('Fail to create post ', errorInfo);
  };

  return (
    <AddPostFormWrapper>
      <Form
        name="basic"
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
            { min: 20, message: "Description must be minimum 20 characters." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Please input your image!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AddPostFormWrapper>
  );
};

AddPostForm.propTypes = {};

AddPostForm.defaultProps = {};

export default AddPostForm;
