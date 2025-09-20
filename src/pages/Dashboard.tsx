import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { FULL_JOKES_ROUTE } from "../constants/routes/routes";

export default function Dashboard() {
  // Define the expected shape of the auth data
  interface AuthData {
    fullname: string;
    // add other properties if needed
  }

  const data = useAuth() as AuthData | null;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h1></h1>
      <Result
        icon={<SmileOutlined />}
        title={data ? `Welcome, ${data.fullname}` : "Loading..."}
        extra={
          <Button type="primary">
            <Link to={FULL_JOKES_ROUTE}>Go To Jokes</Link>
          </Button>
        }
      />
    </div>
  );
}
