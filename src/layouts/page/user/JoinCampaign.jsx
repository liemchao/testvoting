// import { filter } from "lodash";
// import { Link as RouterLink } from "react-router-dom";
import React from "react";
// import { styled } from "@mui/material/styles";
// import { useState } from "react";
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import Page from "components/Layout/Page";
export default function JoinCampain() {
  const cards = [
    {
      title: "Nguyễn Thanh Liêm",
      subtitle: "Kĩ Thuật Phần Mềm",
      image:
        "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg",
    },
    {
      title: "Trần Thị Ngu",
      subtitle: "Ngôn Ngữ Anh",
      image:
        "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg",
    },
    {
      title: "Văn Thị Thông Minh",
      subtitle: "An ninh Mạng",
      image:
        "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg",
    },
    {
      title: "Văn Thị Thông Minh",
      subtitle: "An ninh Mạng",
      image:
        "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg",
    },
    {
      title: "Văn Thị Thông Minh",
      subtitle: "An ninh Mạng",
      image:
        "https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg",
    },
  ];
  return (
    <Grid
      container
      spacing={3}
      // sx={{
      //   backgroundImage:
      //     "url('https://png.pngtree.com/thumb_back/fh260/background/20210621/pngtree-red-yellow-background-victor-pngtree-image_732462.jpg')",
      //   height: "100%",
      //   display: "cover",
      // }}
    >
      {cards.map((card, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card sx={{ maxWidth: 300, paddingLeft: "1rem" }}>
            <CardMedia sx={{ height: 200 }} image={card.image} title="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.subtitle}
              </Typography>
            </CardContent>
            <CardActions sx={{ marginLeft: "10%" }}>
              <Button size="small">Bình chọn</Button>
              <Button size="small">Chi tiết</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
