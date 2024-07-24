import * as React from "react";
import { styled } from "@mui/system";
import { Box, TextField } from "@mui/material";

export default function TextArea(props) {
  const { name, label, value, onChange, placeholder, defaultValue, width, disabled, marginRight } =
    props;

  const StyleBox = styled(Box)(({ theme }) => ({
    alignItems: "center",
    flexWrap: "wrap",
    display: "grid",
  }));
  return (
    <Box>
      <TextField
        sx={{ width: { width }, marginRight: { marginRight } }}
        placeholder={placeholder}
        label={label}
        multiline
        required
        rows={2}
        maxRows={4}
        value={value}
        disabled={disabled}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        py={2}
        gap={2}
      />
    </Box>
  );
}
