import {
  Dialog,
  DialogTitle,
  Slide,
  Box,
  IconButton,
  DialogContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../../styles/theme";
import styled from "@emotion/styled";
import { ProductAddToCart, Product, ProductImage } from "../../styles/product";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
}));

export default function ProductDetail({ open, onClose, product }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog TransitionComponent={SlideTransition} variant="permanant" open={open} fullScreen>
      <DialogTitle
        sx={{
          background: Colors.secondary,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent={"space-between"}>
          Chi tiết ứng cử viên
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <ProductDetailWrapper display={"flex"} flexDirection={matches ? "column" : "row"}>
          <Product sx={{ mr: 4 }}>
            <ProductImage src={product.image} />
          </Product>
          <ProductDetailInfoWrapper>
            <Typography variant="subtitle">{product.price}</Typography>
            {/* <Typography variant="subtitle">Font-end</Typography> */}
            <Typography sx={{ lineHeight: 2 }} variant="h4">
              {product.name}
            </Typography>
            <Typography variant="body">{product.description}</Typography>
          </ProductDetailInfoWrapper>
        </ProductDetailWrapper>
      </DialogContent>
    </Dialog>
  );
}
