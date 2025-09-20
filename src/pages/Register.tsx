import { SaveOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { App, Button, Card, Form, Input } from "antd";
import { axiosInstance } from "../lib/axios";
import { LOGIN } from "../constants/routes/routes";

export default function Register() {
  const { message } = App.useApp();
  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async (values) => {
      const response = await axiosInstance.post("api/auth/register", values);
      return response.data;
    },
    onSuccess: () =>{
      message.success("Registration successful! You can now log in.");
      window.location.href = LOGIN;
    },
    onError: () => message.error("Registration failed! Please try again."),
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 300 }} title="Create your account">
        <Form
          name="login-form"
          layout="vertical"
          onFinish={(values) => handleSubmit(values)}
        >
          <Form.Item
            label="FullName"
            name="fullname"
            rules={[
              { required: true, message: "Please input your FullName!" },
              {
                min: 3,
                message: "FullName must be at least ${min} characters!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                type: "string",
                min: 8,
                message: "Password must be at least ${min} characters!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm-Password"
            name="confirm-password"
            hasFeedback={true}
            rules={[
              { required: true, message: "Please input your password!" },
              {
                type: "string",
                min: 8,
                message: "Password must be at least ${min} characters!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            dependencies={["password"]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={isPending}
            >
              Create account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
