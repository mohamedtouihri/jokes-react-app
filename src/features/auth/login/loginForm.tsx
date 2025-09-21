import { SaveOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import { DASHBORD } from "../../../constants/routes/routes";
import { LOGINAPI } from "../../../constants/loginApi/loginApi";

export default function LoginForm() {
  const { message } = App.useApp();
  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async (values) => {
      const response = await axiosInstance.post(LOGINAPI, values);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      message.success("Login successful! You can now log in.");
      window.location.href = DASHBORD;
    },
    onError: () => message.error("Login failed! Please try again."),
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
      <Card style={{ width: 300 }} title="Login to your account">
        <Form
          name="login-form"
          layout="vertical"
          onFinish={(values) => handleSubmit(values)}
        >
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              icon={<SaveOutlined />}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
