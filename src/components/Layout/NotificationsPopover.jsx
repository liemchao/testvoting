// import { faker } from "@faker-js/faker";
import { useState, useRef, useDebugValue, useEffect } from "react";
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import MenuPopover from "./MenuPopover";
import Scrollbar from "./Scrollbar";
import Iconify from "assets/theme/components/icon/Iconify";
// import Iconify from "assets/theme/components/icon/Iconify";
import jwt_decode from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { handleGetCampaignById } from "context/redux/action/action";
import { useDispatch } from "react-redux";
import { URL_API } from "config/axios/Url/URL";
import API from "config/axios/API/API";
import { CustomizedToast } from "components/toast/ToastCustom";

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const anchorRef = useRef(null);
  const [data, setData] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);

  const [notifications, setNotifications] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://liemtroller-001-site1.jtempurl.com/api/v1/notifications/${decode.Username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // other headers if needed
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  // const fetchDataProcess = async () => {
  //   try {
  //     const response = await axios.put(
  //       `https://votingsystemfptu-001-site1.dtempurl.com/api/v1/campaigns/update-process`,
  //       token
  //     );
  //   } catch (error) {
  //     console.error("Lỗi khi gọi API:", error);
  //   }
  // };
  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
    setReadNotifications(updatedNotifications.filter((notification) => notification.isRead));
  };
  // useEffect(() => {
  //   fetchData();
  //   const interval = setInterval(() => {
  //     fetchDataProcess();
  //   }, 6000);
  //   return () => clearInterval(interval);
  // }, [decode.Username]);

  useEffect(() => {
    if (data) {
      setNotifications(data);
      const unreadNotifications = data?.filter((notification) => !notification.isRead);
      setReadNotifications(data?.filter((notification) => notification.isRead));
      setNotifications(unreadNotifications);
    }
  }, [data]);

  const totalUnRead = notifications.filter((item) => !item.isRead).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const badgeStyle = {
    "& .MuiBadge-badge": {
      backgroundColor: "#F89F1B",
    },
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{ color: "white", width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error" sx={badgeStyle}>
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Thông báo</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Bạn có {totalUnRead} thông báo chưa đọc
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: "overline" }}>
                Thông báo mới
              </ListSubheader>
            }
          >
            {notifications.map((notification) => (
              <NotificationItem key={notification.index} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: "overline" }}>
                Đã đọc
              </ListSubheader>
            }
          >
            {readNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCampaignStage = async (id, idnoti, navigate) => {
    try {
      const res = await API("PUT", URL_API + `/api/v1/notifications/${idnoti}`, null);
      if (res) {
        await dispatch(handleGetCampaignById(id, navigate, token));
      }
    } catch (error) {
      CustomizedToast({
        message: `${error}`,
        type: "ERROR",
      });
    }
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isRead && {
          bgcolor: "action.selected",
        }),
      }}
      onClick={() => {
        handleCampaignStage(notification.campaignId, notification.notificationId, navigate);
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {dayjs(notification.createDate).format("DD-MM-YYYY HH:mm:ss")}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: "text.secondary" }}>
        &nbsp; {notification.message}
      </Typography>
      <Typography component="span" variant="body2" sx={{ color: "text.secondary" }}>
        &nbsp;
      </Typography>
    </Typography>
  );

  if (notification.title === "Thông báo chiến dịch mới") {
    return {
      avatar: null,
      title,
    };
  }

  // Trường hợp khác, ví dụ: thông báo khác
  return {
    avatar: <Iconify icon="eva:bell-fill" />, // Thay Iconify bằng thành phần Avatar thực tế hoặc giá trị avatar tương ứng.
    title,
  };
}
