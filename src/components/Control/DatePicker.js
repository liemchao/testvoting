import * as React from "react";
import { FormControl } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";

export default function DatePicker(props) {
  const { name, value, handleChange } = props;

  return (
    <FormControl
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "6fr 1fr" },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={name}
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
