import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Button type="primary" icon={<LoginOutlined />}>
        Login
        <Link to="/login" />
      </Button>
      <Button type="primary" icon={<LoginOutlined />}>
        Register
        <Link to="/register" />
      </Button>
    </div>
  );
}
