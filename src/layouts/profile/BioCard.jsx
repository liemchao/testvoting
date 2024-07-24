import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import { CardActions } from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";
export default function BioCard(props) {
  let { avatar, name, sologan } = props;
  const [input, setInput] = React.useState([liem]);

  function _treat(e) {
    setInput(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <Card
      sx={{
        width: 600,
        maxWidth: "100%",
        boxShadow: "lg",
      }}
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar src={input} sx={{ "--Avatar-size": "4rem" }} />
        <Chip
          size="sm"
          variant="soft"
          color="primary"
          sx={{ mt: -1, border: "3px solid", borderColor: "background.surface" }}
        >
          PRO
        </Chip>
        <Typography fontSize="lg" fontWeight="lg" sx={{ mt: 1, mb: 0.5 }}>
          {name}
        </Typography>
        <Typography level="body2" sx={{ maxWidth: "24ch" }}>
          {sologan}
        </Typography>
      </CardContent>
      <CardOverflow sx={{ bgcolor: "background.level1" }}>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <label htmlFor="contained-button-file">
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              name="image"
              type="file"
              display="none"
              style={{ opacity: 0, position: "absolute", zIndex: -1 }}
              onChange={_treat}
            />

            <ButtonLangding
              variant="contained"
              component="span"
              nameButton="Tải ảnh"
              bgColor="#FFA500"
              hovercolor="#F7941D"
              sx={{
                marginLeft: "20%",
              }}
            />
          </label>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}
