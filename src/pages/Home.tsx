import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { LOGIN, REGISTER } from "../constants/routes/routes";

export default function Home() {
  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
      <Button type="primary" icon={<LoginOutlined />}>
        Login
        <Link to={LOGIN} />
      </Button>
      <Button type="primary" icon={<LoginOutlined />}>
        Register
        <Link to={REGISTER} />
      </Button>
    </div>
  );
}
