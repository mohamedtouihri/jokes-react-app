import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { LOGIN, REGISTER } from "../constants/routes/routes";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Button type="primary" icon={<LoginOutlined />} size="large">
        <Link to={LOGIN}></Link>Login
      </Button>
      <Button type="primary" icon={<LoginOutlined />} size="large">
        <Link to={REGISTER}></Link>Register
      </Button>
    </div>
  );
}
