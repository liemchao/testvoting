import { Typography } from "@mui/material";
import { ProductMetaWrapper } from "../../styles/product";
export default function ProductMeta({ product, matches }) {
  return (
    <ProductMetaWrapper>
      <Typography variant={matches ? "h7" : "h4"} lineHeight={2}>
        {product.name}
      </Typography>
      <Typography variant={matches ? "body2" : "body1"}>{product.price}</Typography>
    </ProductMetaWrapper>
  );
}
