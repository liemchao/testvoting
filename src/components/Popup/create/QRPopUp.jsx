import { Dialog, DialogContent, DialogTitle, Grid, Paper, Button, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import PageHeader from "components/Layout/PageHeader";
import QRCode from "qrcode.react";
import Input from "components/Control/Input";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import { Girl } from "@mui/icons-material";
import Iconify from "assets/theme/components/icon/Iconify";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
import { useTheme, useMediaQuery } from "@mui/material";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
//hih

export default function QRPopUp(props) {
  const { OpenPopUp, SetOpenPopUp, link } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = () => {
    SetOpenPopUp(false);
  };

  const [qrCodeUrl, setQRCodeUrl] = useState("");

  useEffect(() => {
    const generateQRCode = () => {
      const canvas = document.getElementById("qr-code-canvas");
      if (canvas) {
        setQRCodeUrl(canvas.toDataURL());
      }
    };

    generateQRCode();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <Paper>
      <Dialog maxWidth="md" open={OpenPopUp} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Chia sẻ"
            subTitle="Bạn có thể chia sẻ chương trình đến mọi người"
            icon={getIcon("ph:share-bold")}
          />
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Box marginTop="2%">
            <Input
              width="20rem"
              disabled
              label="Chia sẻ liên kết"
              defaultValue={link}
              value={link}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </Box>
          <Box marginLeft={isMobile ? "10%" : "29%"}>
            <ButtonLangding
              marginTop="2%"
              width="13rem"
              variant="contained"
              type="submit"
              nameButton="Sao chép liên kết"
              bgColor="#F6911B"
              onClick={handleCopyLink} // Added onClick event handler
            />
          </Box>
          <Box marginTop="2%">
            <QRCode id="qr-code-canvas" value={link} />
          </Box>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
