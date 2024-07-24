import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleGetCandidateByIdCampaign } from "context/redux/action/action";

export default function ListCandidate(props) {
  const { OpenDialog, SetOpenDialog, id } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    SetOpenDialog(false);
  };

  useEffect(() => {
    const callAPI = async () => {
      await dispatch(handleGetCandidateByIdCampaign(id));
    };
    callAPI();
  }, [dispatch, id]);

  const listcandidate = useSelector((state) => {
    return state.candidateList;
  });

  return (
    <div>
      <Dialog open={OpenDialog} onClose={handleClose}>
        <DialogTitle>Danh sách ứng cử viên</DialogTitle>
        <DialogContent>
          {listcandidate.length === 0 ? (
            <List>
              <ListItemText primary={"Không có ứng cử viên nào"} />
            </List>
          ) : (
            <List>
              {listcandidate.map((person, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src={person.avatarUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={person.fullName} secondary={"Giáo dục FPT"} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
