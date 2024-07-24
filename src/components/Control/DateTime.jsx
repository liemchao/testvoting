import * as React from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function DateTime(props) {
 
  const { label, value, onChange, width, disabled, disablePast, defaultValue } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} sx={{ width: { width } }}>
        <DateTimePicker
          label={label}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          disablePast={disablePast}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
