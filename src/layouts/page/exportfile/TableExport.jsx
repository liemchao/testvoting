import React, { useState } from "react";
import { readExcelFile } from "./Utils";
import { Link, useParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Box,
} from "@mui/material";
import FileReader from "react-file-reader";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import { CustomizedToast } from "components/toast/ToastCustom";
import { CSVLink } from "react-csv";
import axios from "axios";
import { useDispatch } from "react-redux";
import { handleGetCandidateByIdCampaign } from "context/redux/action/action";
import ButtonLangding from "assets/theme/components/button/ButtonLangding";

function ExcelTable() {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  // Khởi tạo trạng thái ban đầu
  const [selectAllCells, setSelectAllCells] = useState(false);
  const [selected, setSelected] = useState([]);
  const csvData = [
    ["fullName", "description", "groupName"],
    ["Nguyễn Thanh Liêm", "Đẹp trai", "Nhóm ứng viên 1"],
    ["Nguyễn Thanh Tèo", "Không đẹp trai", "Nhóm ứng viên 1"],
    ["Nguyễn Thanh Trạng", "Xấu trai", "Nhóm ứng viên 1"],
  ];

  // Hàm xử lý sự kiện chọn/tắt chọn tất cả các hàng
  const handleSelectAll = () => {
    setSelectAllCells(!selectAllCells);
    if (!selectAllCells) {
      const allRows = data.rows.map((row) => row[0]);
      setSelected(allRows);
    } else {
      setSelected([]);
    }
  };

  // Kiểm tra xem một hàng có được chọn hay không
  const isSelected = (row) => {
    return selected.includes(row[0]);
  };

  // Hàm xử lý sự kiện chọn/tắt chọn một hàng
  const handleSelect = (row) => {
    const rowId = row[0];
    const selectedIndex = selected.indexOf(row[0]);
    let newSelected = [];

    if (selectedIndex === -1) {
      // Nếu hàng chưa được chọn, hãy thêm nó vào danh sách các hàng đã chọn
      newSelected = [...selected, rowId];
    } else {
      // Nếu hàng đã được chọn, hãy loại bỏ nó khỏi danh sách các hàng đã chọn
      newSelected = selected.filter((id) => id !== rowId);
    }

    setSelected(newSelected);
  };

  const handleFiles = async (files) => {
    const file = files[0];
    const result = await readExcelFile(file);
    setData(result);
  };

  const handleConfirm = async () => {
    if (selected.length === 0) {
      CustomizedToast({
        message: "Vui lòng chọn ít nhất một hàng.",
        type: "ERROR",
      });
      return;
    }

    const headers = data.columns; // Headers from the Excel file
    const selectedRows = data.rows.filter((row) => selected.includes(row[0])); // Filter selected rows

    const accountList = selectedRows.map((row) => {
      const account = {};
      headers.forEach((header, index) => {
        account[header] = row[index];
      });
      return account;
    });

    const payload = {
      campaignId: id,
      listCandidate: accountList,
    };
    try {
      const response = await axios.post(
        "https://liemtroller-001-site1.jtempurl.com/api/v1/candidates/list-candidate",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // other headers if needed
          },
        }
      );

      CustomizedToast({
        message: "Thêm danh sách thành công",
        type: "SUCCESS",
      });
      dispatch(handleGetCandidateByIdCampaign(token, id));
    } catch (error) {
      CustomizedToast({
        message: `${error.response.data.message}`,
        type: "ERROR",
      });
    }
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Link
          style={{ textDecoration: "none" }}
          to={
            "https://docs.google.com/spreadsheets/d/1aiEsz-cEVulEjXWTtHEDKEJ4XH0NVuyb/edit#gid=2057474914"
          }
        >
          <ButtonLangding
            width="10rem"
            nameButton="Tải file mẫu"
            bgColor="#FFA500"
            hovercolor="#F7941D"
          />
        </Link>

        <FileReader fileTypes={[".xlsx", ".csv"]} handleFiles={handleFiles}>
          <ButtonLangding
            variant="contained"
            type="submit"
            nameButton="Tải lên file Excel"
            bgColor="#71C043"
            hovercolor="#2BB557"
          />
        </FileReader>
      </div>

      {/* Hiển thị bảng */}
      {data && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={selectAllCells}
                      onChange={handleSelectAll}
                      indeterminate={selected.length > 0 && selected.length < data.rows.length}
                    />
                  </TableCell>
                  {data.columns.map((column, index) => (
                    <TableCell key={index}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>
                      <Checkbox checked={isSelected(row)} onChange={() => handleSelect(row)} />
                    </TableCell>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box width="200px" marginTop={"2%"} mb={"2rem"}>
            <ButtonLangding
              width="10rem"
              variant="contained"
              type="submit"
              onClick={handleConfirm}
              nameButton="Lưu lại"
              bgColor="#71C043"
              hovercolor="#2BB557"
            />
          </Box>
        </>
      )}
    </div>
  );
}

export default ExcelTable;
