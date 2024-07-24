import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Element from "./Element";
import Box from "@mui/material/Box";

export default function ProfileCandidata() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Card sx={{ maxheight: "90px", marginTop: "-3%" }}>
        <Avatar
          alt="Remy Sharp"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyBp3-DrQ2g6NbgtBg0AOobNA1MEY7MC4_OQ&usqp=CAU"
          sx={{ width: 75, height: 75 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            Nguyễn Thanh Liêm
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tại sao chúng ta phải phải tham gia vào những chiến dịch ngớ ngẩn vì chúng ta cần nó.
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "-2%" }}>
        <Element />
      </Box>
    </>
  );
}
