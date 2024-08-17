import { Divider, ListItemButton, ListItemIcon } from "@mui/material";
import {
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
  MyList,
} from "../../styles/appbar";

import { Colors } from "../../styles/theme";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import { useNavigate } from "react-router-dom";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

export default function Actions({ matches }) {
  const navigate = useNavigate();

  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;
  const handleLogin = () => {
    navigate("/authentication/sign-in");
  };
  const handleIntroduce = () => {
    navigate("/introduce");
  };
  const handleLangePage = () => {
    navigate("/");
  };
  return (
    <Component>
      <MyList type="row">
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <ButtonLangding
              width={"10rem"}
              nameButton="Trang chủ"
              bgColor="#d44fac"
              hovercolor="#d44fac"
              onClick={() => {
                handleLangePage();
              }}
            />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <ButtonLangding
              width={"10rem"}
              nameButton="Giới thiệu"
              bgColor="#005B82"
              hovercolor="#0005E4"
              onClick={() => {
                handleIntroduce();
              }}
            />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "center",
              color: matches && Colors.secondary,
            }}
          >
            <ButtonLangding
              width={"10rem"}
              nameButton="Đăng nhập"
              bgColor="#005B82"
              hovercolor="#0005E4"
              onClick={() => {
                handleLogin();
              }}
            />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
      </MyList>
    </Component>
  );
}
