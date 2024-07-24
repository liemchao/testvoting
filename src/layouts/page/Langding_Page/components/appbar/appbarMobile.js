import { AppbarContainer, AppbarHeader } from "../../styles/appbar";
import MenuIcon from "@mui/icons-material/Menu";
import Actions from "./actions";
import { Box, IconButton } from "@mui/material";
import { useUIContext } from "../../context/ui";
import Logo from "assets/images/Logo_main.png";
import { useSelector } from "react-redux";
export default function AppbarMobile({ matches }) {
  const { setDrawerOpen, setShowSearchBox } = useUIContext();

  const design = useSelector((state) => {
    return state.design;
  });
  return (
    <AppbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <AppbarHeader textAlign={"center"} variant="h4">
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 3 }}>
          <img src={Logo} alt="Logo" style={{ width: "80px", height: "auto" }} />
          <img src={design.icon} alt="Logo" style={{ width: "80px", height: "auto" }} />
        </Box>
      </AppbarHeader>
      {/* <Actions matches={matches} /> */}
    </AppbarContainer>
  );
}
