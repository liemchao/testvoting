import { read, utils } from "xlsx";

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const binaryData = event.target.result;
        const workbook = read(binaryData, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = utils.sheet_to_json(worksheet, { header: 1 });
        const columns = data[0];
        const rows = data.slice(1);
        resolve({ columns, rows });
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsBinaryString(file);
  });
};
