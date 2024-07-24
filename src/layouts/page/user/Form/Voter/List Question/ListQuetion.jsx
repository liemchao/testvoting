import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";

export default function ListQuestion() {
  return (
    <>
      <Card sx={{ maxHeight: 345, marginTop: "10px" }}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            Câu số 1:
          </Typography>
          <Typography gutterBottom variant="h3" component="div">
            Vì sao lại là khủng long?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="1" control={<Radio />} label="Vì đây là đáp án 1" />
                <FormControlLabel value="2" control={<Radio />} label="Vì đây là đáp án 2" />
                <FormControlLabel value="3" control={<Radio />} label="Vì đây là đáp án 3" />
                <FormControlLabel value="4" control={<Radio />} label="Vì đây là đáp án 4" />
              </RadioGroup>
            </FormControl>
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          marginTop: "10px",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            Câu số 2:
          </Typography>
          <Typography gutterBottom variant="h3" component="div">
            Khủng long đã làm gì?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Hành động 1 nè" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Hành động 2 nè" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Hành động 3 nè" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Hành động 4 nè" />
              <FormControlLabel disabled control={<Checkbox />} label="Đáp án đúng nè" />
            </FormGroup>
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          marginTop: "20px",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            Câu số 3:
          </Typography>
          <Typography gutterBottom variant="h3" component="div">
            Việc tương tác của Khủng Long đã ảnh hưởng đến ai?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="1" control={<Radio />} label="Vì đây là đáp án 1" />
                <FormControlLabel value="2" control={<Radio />} label="Vì đây là đáp án 2" />
                <FormControlLabel value="3" control={<Radio />} label="Vì đây là đáp án 3" />
                <FormControlLabel value="4" control={<Radio />} label="Vì đây là đáp án 4" />
              </RadioGroup>
            </FormControl>
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          marginTop: "20px",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            Câu số 4:
          </Typography>
          <Typography gutterBottom variant="h3" component="div">
            Vì sao Khủng Long lại làm như vậy?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Hành động 1 nè" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Hành động 2 nè" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Hành động 3 nè" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Hành động 4 nè" />
              <FormControlLabel disabled control={<Checkbox />} label="Đáp án đúng nè" />
            </FormGroup>
          </Typography>
        </CardContent>
      </Card>
      <FormControlLabel
        sx={{
          marginTop: 2,
          marginLeft: 2,
        }}
        value="end"
        control={<Checkbox />}
        label="Xác nhận lựa chọn kỹ rồi nha!"
        labelPlacement="end"
      />
      <Button
        variant="contained"
        sx={{
          marginTop: 2,
          // width: "200px",
          // height: "45px",
          float: "right",
        }}
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </>
  );
}
