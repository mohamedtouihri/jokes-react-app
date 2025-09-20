import type { MenuProps } from "antd";
import { Avatar, Dropdown } from "antd";
import { LOGIN } from "../../constants/routes/routes";

const Logout = () => {
  localStorage.removeItem("token");
  window.location.href = LOGIN;
};
const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a rel="noopener noreferrer" href="#" onClick={Logout}>
        Logout
      </a>
    ),
  },
];

const DropdownUser = () => (
    <Dropdown menu={{ items }} placement="top" >
      <Avatar size={40}>USER</Avatar>
    </Dropdown>
);

export default DropdownUser;
