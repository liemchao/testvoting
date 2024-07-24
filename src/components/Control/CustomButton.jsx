import Button from "@mui/material/Button";
import React from "react";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("FFEE32"),
  backgroundColor: "FFEE32",
  "&:hover": {
    backgroundColor: "#5DC9BC",
  },
  display: "center",
}));

export default function CustomButton() {
  return (
    <Stack spacing={2} direction="row" width="200px">
      <ColorButton variant="outline" to=""></ColorButton>
    </Stack>
  );
}
