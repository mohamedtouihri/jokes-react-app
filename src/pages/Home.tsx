import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link, Navigate } from "react-router-dom";
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
        <Navigate to={LOGIN} /> 
        Login
      </Button>
      <Button type="primary" icon={<LoginOutlined />} size="large">
        <Navigate to={REGISTER} />
        Register
      </Button>
    </div>
  );
}
