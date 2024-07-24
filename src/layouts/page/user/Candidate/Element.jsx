// import { filter } from "lodash";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Card, Button, Typography, CardMedia, CardContent, CardActions, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleGetCandidateByIdCampaign } from "context/redux/action/action";
import { Authen } from "context/authenToken/AuthenToken";
import { useContext } from "react";
import Iconify from "assets/theme/components/icon/Iconify";
import ElementPopUp from "components/Popup/create/ElementPopUp";

export default function Element() {
  const [OpenPopUp, SetOpenPopUp] = useState(false);

  const getIcon = (name) => <Iconify icon={name} height={30} width={30} marginTop={-0.4} />;
  const stateList = [
    {
      image:
        "https://png.pngtree.com/png-vector/20190119/ourlarge/pngtree-school-line-filled-icon-png-image_325359.jpg",
      title: "Học Vấn",
      subtitle: "Subtitle 1",
    },
    {
      image:
        "https://png.pngtree.com/element_our/png_detail/20181208/certificate-icon-png_265042.jpg",
      title: "Trình độ",
      subtitle: "Subtitle 2",
    },
    {
      image:
        "https://banner2.cleanpng.com/20180713/yqz/kisspng-hobby-symbol-computer-icons-clip-art-interests-5b48bab5006a96.3859384715314930450017.jpg",
      title: "Sở thích",
      subtitle: "Subtitle 3",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/6818/6818498.png",
      title: "Skill",
      subtitle: "Subtitle 4",
    },
    {
      image:
        "https://media.istockphoto.com/id/1286305586/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-m%C3%B4-t%E1%BA%A3-c%C3%B4ng-vi%E1%BB%87c-trong-vector-logotype.jpg?s=1024x1024&w=is&k=20&c=sUanjpXlHnEpBscL_JaeDOyIv7jBb0OFF31qHPpsyhY=",
      title: "Mô tả",
      subtitle: "Subtitle 5",
    },
  ];
  //   const stateList = useSelector((state) => {
  //     return state.campaignStage;
  //   });
  const { token } = useContext(Authen);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleinvite = (id, token) => {
    dispatch(handleGetCandidateByIdCampaign(id, token));
    navigate("/user/detailcandidate");
  };
  const handleAdd = () => {
    SetOpenPopUp(true);
  };
  return (
    <Grid
      container
      spacing={1}
      sx={{
        marginTop: 1,
      }}
    >
      {stateList.map((card, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Card
            sx={{
              padding: "1rem 1rem 1rem 1rem",
              borderRadius: "18px",
            }}
          >
            <CardMedia
              sx={{
                height: 200,
                display: "cover",
              }}
              image={card.image}
              title="green iguana"
              display="cover"
            />
            <CardContent
              sx={{
                height: 120,
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {card.subtitle}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Hãy điền vào những mục này
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                sx={{
                  position: "relative",
                  left: "-1rem",
                  bottom: "-1rem",
                  display: "inline - flex",
                  width: "7rem",
                  height: "2rem",
                  background: "var(--10)",
                  color: "var(--badge-text)",
                  backgroundColor: "#ffcc33",
                  boxShadow: "0 0 0.2rem 0.1rem var(--card-bg)",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "30px",
                  marginLeft: "1rem",
                  fontSize: "1rem",
                  fontWeight: "700",
                  border: "0",
                }}
                onClick={() => handleAdd()}
              >
                Tạo
              </Button>
              <Button
                sx={{
                  position: "center",
                  left: "-1rem",
                  bottom: "-1rem",
                  display: "inline - flex",
                  width: "7rem",
                  height: "2rem",
                  background: "var(--10)",
                  color: "var(--badge-text)",
                  backgroundColor: "#ffcc33",
                  boxShadow: "0 0 0.2rem 0.1rem var(--card-bg)",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "30px",
                  marginLeft: "2rem",
                  fontSize: "1rem",
                  fontWeight: "700",
                  border: "0",
                }}
                startIcon={getIcon("material-symbols:edit")}
              ></Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <ElementPopUp OpenPopUp={OpenPopUp} SetOpenPopUp={SetOpenPopUp} />
    </Grid>
  );
}
