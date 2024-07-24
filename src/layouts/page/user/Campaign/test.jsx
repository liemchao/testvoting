//----------------------------------------------------------------

import { Box, Card, Grid, Typography } from "@mui/material";
import CardTop1 from "components/CardTop/CardTop1";
import CardTop2 from "components/CardTop/CardTop2";
import CardTop3 from "components/CardTop/CardTop3";
import MultipleInteractionCard from "components/Cards/CardCandidate";
import MultipleInteractionCard1 from "components/Cards/cardtop";
export default function Test() {
  const data = [
    {
      name: "Ứng cử viên 1",
      image:
        "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg",
      score: 8,
    },
    {
      name: "Ứng cử viên 2",
      image:
        "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg",
      score: 6,
    },
    {
      name: "Ứng cử viên 3",
      image:
        "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg",
      score: 9,
    },
    {
      name: "Ứng cử viên 4",
      image:
        "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg",
      score: 7,
    },
    {
      name: "Ứng cử viên 5",
      image:
        "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg",
      score: 5,
    },
    {
      name: "Ứng cử viên 6",
      image:
        "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg",
      score: 10,
    },
    {
      name: "Ứng cử viên 7",
      image:
        "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg",
      score: 4,
    },
    {
      name: "Ứng cử viên 8",
      image:
        "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg",
      score: 8,
    },
    {
      name: "Ứng cử viên 9",
      image:
        "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg",
      score: 9,
    },
    {
      name: "Ứng cử viên 10",
      image:
        "https://hienthao.com/wp-content/uploads/2023/05/c6e56503cfdd87da299f72dc416023d4-736x620.jpg",
      score: 7,
    },
  ];

  const sortedData = [...data].sort((a, b) => b.score - a.score);

  const topData = sortedData.slice(0, 3); // Lấy 3 người đứng đầu
  const remainingData = sortedData.slice(3); // Lấy danh sách người
  return (
    <>
      <Box textAlign="center">
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            fontSize: "50px",
            color: "#B83490",
            fontFamily: "UTM Swiss Condensed Regular", // Đặt font chữ tùy chỉnh
          }}
        >
          Bảng xếp hạng top 10
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", ml: "1rem" }}>
        <Grid container spacing={3} mt={-1} bottom={2}>
          <Grid item xs={12} md={4} lg={4}>
            <CardTop1 name={topData[0].name} image={topData[0].image} score={topData[0].score} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <CardTop2 name={topData[1].name} image={topData[1].image} score={topData[1].score} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <CardTop3 name={topData[2].name} image={topData[2].image} score={topData[2].score} />
          </Grid>
          <Grid item xs={12}>
            <hr style={{ borderTop: "1px solid #ccc" }} />
          </Grid>
          {remainingData.map((person, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <MultipleInteractionCard1
                index={index + 4}
                name={person.name}
                image={person.image}
                score={person.score}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
