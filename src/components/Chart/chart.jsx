import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export default function BarChartWithDatePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // const handleStartDateChange = (date) => {
  //   setStartDate(date);
  // };

  // const handleEndDateChange = (date) => {
  //   setEndDate(date);
  // };

  // Dữ liệu mẫu cho biểu đồ
  const data = [
    { name: "Chiến dịch 1", vote: 10 },
    { name: "Chiến dịch  2", vote: 20 },
    { name: "Chiến dịch  3", vote: 15 },
    { name: "Chiến dịch  4", vote: 30 },
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={300} mt={2}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="vote" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ marginTop: "2rem" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker localeText={{ start: "Ngày bắt đầu", end: "Ngày kết thúc" }} />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
}
