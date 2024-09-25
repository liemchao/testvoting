import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import { useUIContext } from "../../context/ui";
import CloseIcon from "@mui/icons-material/Close";
import { DrawerCloseButton } from "../../styles/appbar";
import { lighten } from "polished";
import { Colors } from "../../styles/theme";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { useNavigate } from "react-router-dom";

const MiddleDivider = styled((props) => <Divider variant="middle" {...props} />)``;

export default function AppDrawer() {
  const navigate = useNavigate();

  const { drawerOpen, setDrawerOpen } = useUIContext();
  const handleLangePage = () => {
    navigate("/");
  };
  const handleIntroduce = () => {
    navigate("/introduce");
  };
  const handleLogin = () => {
    navigate("/authentication/sign-in");
  };
  return (
    <>
      {" "}
      {drawerOpen && (
        <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: "2.5rem",
              color: lighten(0.09, Colors.secondary),
            }}
          />{" "}
        </DrawerCloseButton>
      )}{" "}
      <Drawer open={drawerOpen}>
        <List>
          <ListItemButton>
            <ButtonLangding
              width={"5rem"}
              nameButton="Trang chủ"
              bgColor="#005B82"
              hovercolor="#0005E4"
              onClick={() => {
                handleLangePage();
              }}
            />{" "}
          </ListItemButton>{" "}
          <ListItemButton>
            <ButtonLangding
              width={"5rem"}
              nameButton="Giới thiệu"
              bgColor="#005B82"
              hovercolor="#0005E4"
              onClick={() => {
                handleIntroduce();
              }}
            />{" "}
          </ListItemButton>{" "}
          <ListItemButton>
            <ButtonLangding
              width={"5rem"}
              nameButton="Đăng nhập"
              bgColor="#005B82"
              hovercolor="#0005E4"
              onClick={() => {
                handleLogin();
              }}
            />{" "}
          </ListItemButton>{" "}
          <MiddleDivider />
        </List>{" "}
      </Drawer>{" "}
    </>
  );
}
