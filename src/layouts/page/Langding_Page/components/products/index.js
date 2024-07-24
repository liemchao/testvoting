import { Box, Button, Container, Grid } from "@mui/material";
import { products } from "../../data";
import SingleProduct from "./SingleProduct";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SingleProductDesktop from "./SingleProductDesktop";
import { useContext } from "react";
import { Authen } from "context/authenToken/AuthenToken";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callAPIgetListCandidates } from "context/redux/action/action";

export default function Products() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const { token } = useContext(Authen);
  const dispatch = useDispatch();
  useEffect(() => {
    const callAPI = async () => {
      await dispatch(callAPIgetListCandidates(token));
    };
    callAPI();
  }, [dispatch, token]);

  const candidate = useSelector((state) => {
    return state.candidate;
  });
  /// sửa API xong rồi thì bỏ candidate vào đây chấm là ra
  const renderProducts = products.map((product) => (
    <Grid
      item
      key={product.id}
      xs={2}
      sm={4}
      md={4}
      display="flex"
      flexDirection={"column"}
      alignItems="center"
    >
      {matches ? (
        <SingleProduct product={product} matches={matches} />
      ) : (
        <SingleProductDesktop product={product} matches={matches} />
      )}
    </Grid>
  ));
  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderProducts}
      </Grid>
    </Container>
  );
}
