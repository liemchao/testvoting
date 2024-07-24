import React from "react";
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from "@mui/material";

export default function Select(props) {
  const { name, label, value, onChange, options, defaultValue, sx, size, disabled } = props;

  return (
    <FormControl
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "6fr 1fr" },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        size={size}
        sx={sx}
        label={label}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
      >
        {options?.map((item) => (
          <MenuItem key={item.id} value={item.id} title={item.nametitle}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
