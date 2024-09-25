import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink as RouterLink, matchPath, useLocation } from "react-router-dom";
// material
import { useTheme, styled } from "@mui/material/styles";
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";
import Iconify from "assets/theme/components/icon/Iconify";
import jwt_decode from "jwt-decode";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: "relative",
    // textTransform: "capitalize",
    color: "white",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "transparent",
    "&:hover": {
      background: "linear-gradient(to right, #000000, #0007EF)",
      color: "white",
    },
    fontSize: 16,
  })
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "white",
  backgroundColor: "transparent",
  "&:hover": {
    color: "white",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children, subItems } = item;

  const [open, setOpen] = useState(isActiveRoot || Boolean(children || subItems));

  const handleOpen = () => {
    setOpen((prev) => !prev);
    // setOpen(true);
  };

  const activeRootStyle = {
    background: "linear-gradient(to right, #000000, #0007EF)",
    color: "white",
    backgroundColor: "transparent",
    "&:hover": {
      background: "linear-gradient(to right,#005F8A, #061949)",
      color: "white",
    },
  };

  const activeSubStyle = {
    background: "linear-gradient(to right, #000000, #0007EF)",
    color: "white",
  };

  if (children || subItems) {
    return (
      <>
        {/* menu multipe  */}
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText sx={{ fontWeight: "bold" }} disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
            sx={{ width: 15, height: 15 }}
          />
        </ListItemStyle>

        {(children || subItems) && (
          <Collapse in={open} timeout="auto">
            {children && (
              <List component="div" disablePadding>
                {children.map((child) => (
                  <NavItem key={child.title} item={child} active={active} />
                ))}
              </List>
            )}
            {subItems && (
              <List component="div" disablePadding sx={{ left: "3%" }}>
                {subItems.map((subItem) => (
                  <ListItemStyle
                    key={subItem.title}
                    component={RouterLink}
                    to={subItem.subPath}
                    sx={{
                      ...(active(subItem.subPath) && activeSubStyle),
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "text.disabled",
                          transition: (theme) => theme.transitions.create("transform"),
                          ...(active(subItem.subPath) && {
                            transform: "scale(1)",
                            // bgcolor: "primary.main",
                          }),
                        }}
                      />
                      <ListItemIconStyle>{subItem.icons && subItem.icons}</ListItemIconStyle>
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={subItem.title} />
                  </ListItemStyle>
                ))}
              </List>
            )}
          </Collapse>
        )}
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText sx={{ fontWeight: "bold" }} disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

//NavSection
export default function NavSection({
  navConfig,
  navConfigUser,
  navConfig1,
  navConfig2,
  navConfig3,
  navConfig4,
  navConfig5,
  navConfig6,
  ...other
}) {
  const { pathname } = useLocation();
  const checkRole = () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    if (decoded.RoleName === "admin") {
      return navConfig.navConfig;
    } else if (decoded.RoleName == "user" && decoded.Permission) {
      switch (decoded.Permission) {
        case "0":
          return navConfig.navConfigUser;
        case "1":
          return navConfig.navConfig1;
        case "2":
          return navConfig.navConfig2;
        case "3":
          return navConfig.navConfig3;
        case "4":
          return navConfig.navConfig4;
        case "5":
          return navConfig.navConfig5;
        case "6":
          return navConfig.navConfig6;
        default:
          return navConfig.navConfigUser;
      }
    }
  };

  const match = (path) => (path ? !!matchPath({ path, end: true }, pathname) : false);

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {checkRole()?.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
