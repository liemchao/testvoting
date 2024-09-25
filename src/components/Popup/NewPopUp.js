import { Dialog, DialogContent, DialogTitle, Grid, Paper, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ButtonCustomize from "assets/theme/components/button/ButtonCustomize";
import Controls from "components/Control/Controls";
import TextArea from "components/Control/TextArea";
import Select from "components/Control/Select";
import Input from "components/Control/Input";
import PageHeader from "components/Layout/PageHeader";
import Iconify from "assets/theme/components/icon/Iconify";

const schema = yup.object().shape({});

//geticon link https://icon-sets.iconify.design/
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
//hih
export default function NewPopUp(props) {
  const { OpenPopUp, SetOpenPopUp } = props;
  const [input, setInput] = useState([]);

  const handleClose = () => {
    SetOpenPopUp(false);
  };

  function _treat(e) {
    const { files } = e.target;
    let images = [];
    const selecteds = [...[...files]];

    return selecteds.forEach((i) => images.push(URL.createObjectURL(i))), setInput(images);
  }
  const getOptions = () => [
    { id: "active", title: "Đang hoạt động" },
    { id: "inActive", title: "Trạng thái ẩn" },
    { id: "All", title: "Không hoạt động" },
  ];

  const formik = useFormik({
    validationSchema: schema,
    validateOnMount: true,
    validateOnBlur: true,
    initialValues: {},
    onSubmit: async (values) => {
      const data = {};
      try {
        
      } catch (error) {
        handleClose();
      }
    },
  });

  return (
    <Paper>
      <Dialog maxWidth="md" open={OpenPopUp} onClose={handleClose}>
        <DialogTitle>
          <PageHeader
            title="Tạo mới chiến dịch"
            subTitle="Tạo chiến dịch cho riêng bạn"
            icon={getIcon("gala:add")}
          />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: "background.paper",
                m: 1,
                display: "flex",
                justifyContent: "center",
                boxShadow: 12,
                paddingLeft: "7%",
                maxWidth: "xl",
                // marginLeft: "20%",
              }}
            >
              {/* // à nhớ bỏ cái form ở đây thì nó mới hiểu và làm onsubmit đc */}

              <Box
                sx={{ float: "left", width: "60%", flexGrow: 1, mt: "2rem" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Grid container spacing={1.5}>
                  <Grid item xs={12}>
                    <Input
                      required
                      variant="outlined"
                      name="name"
                      label="Tên Chiến Dịch"
                      value={""}
                      onChange={(e) => {}}
                    />
                    {/* nếu sai thì nó đỏ */}
                    {/* {formik.touched.name && formik.errors.name && (
                      <FormHelperText error id="standard-weight-helper-text-username-login">
                        {formik.errors.name}
                      </FormHelperText>
                    )} */}
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      variant="outlined"
                      name="price"
                      required
                      label="Thời gian kết thúc"
                      value=""
                      onChange={(e) => {}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        // display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Select
                        name="foodCategoryId"
                        required
                        label="Trạng thái"
                        width="14rem"
                        height="10rem"
                        onChange={(e) => {
                          console.log(e);
                        }}
                        options={getOptions()}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextArea
                      columns={12}
                      width="85%"
                      row={6}
                      maxRows={6}
                      multiline
                      variant="outlined"
                      required
                      label="Mô tả"
                      name="description"
                      // value=""
                      //   onChange={(e) => {}}
                    />
                  </Grid>

                  <Box width="200px" marginTop={"10%"} ml={"12rem"} mb={"2rem"}>
                    <ButtonCustomize
                      variant="contained"
                      type="submit"
                      nameButton="Thêm"
                      bgColor="#F6911B"
                    />
                  </Box>
                </Grid>
              </Box>

              <Box sx={{ float: "left", width: "30%", mt: "2rem" }}>
                <label htmlFor="contained-button-file">
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={_treat}
                    style={{ display: "none" }}
                  />
                  <Button variant="contained" component="span" sx={{ marginLeft: "10%" }}>
                    Tải lên...
                  </Button>
                  <Box
                    sx={{
                      height: 165,
                      width: 165,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                      marginTop: "10%",
                      marginLeft: "11%",
                    }}
                  >
                    {/* hiển thị hình lên  */}
                    {input.map((i) => (
                      <img key={i} src={i} alt="hihi" />
                    ))}
                  </Box>
                </label>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
