import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Home() {
  return (
    <div>
      <Button type="primary" icon={<LoginOutlined />}>
        Login
        {(window.location.href = "/login")}
      </Button>
      <Button type="primary" icon={<LoginOutlined />}>
        Register
        {(window.location.href = "/register")}
      </Button>
    </div>
  );
}
