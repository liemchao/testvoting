import { CardActions, Dialog, DialogContent, DialogTitle, Paper } from "@mui/material";
import Iconify from "assets/theme/components/icon/Iconify";
import PageHeader from "components/Layout/PageHeader";
import { Authen } from "context/authenToken/AuthenToken";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
export default function EditProfile(props) {
  const { open, setOpen } = props;
  const { token } = useContext(Authen);
  const dispath = useDispatch();



  const formByid = useSelector((state) => {
    //
  });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper>
      <Dialog maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Card
            variant="outlined"
            sx={{
              maxHeight: "max-content",
              maxWidth: "100%",
              mx: "auto",
              overflow: "auto",
              resize: "horizontal",
            }}
          >
            <Typography level="h2" fontSize="xl" startDecorator={<InfoOutlined />}>
              Chỉnh sửa hồ sơ cá nhân
            </Typography>
            <Divider inset="none" />
            <CardContent
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
                gap: 1.5,
              }}
            >
              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Họ và tên</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Expiry date</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>CVC/CVV</FormLabel>
                <Input />
              </FormControl>
              <FormControl sx={{ gridColumn: "1/-1" }}>
                <FormLabel>Card holder name</FormLabel>
                <Input placeholder="Enter cardholder's full name" />
              </FormControl>

              <CardActions>
                <Button variant="solid" color="primary" sx={{ justifySelf: "center" }}>
                  Save
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
