import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Button,
  Box,
} from "@mui/material";

const CommentList = ({ comments }) => (
  <List>
    {comments.map((comment, index) => (
      <ListItem key={index}>
        <ListItemAvatar>
          <Avatar src={comment.avatar} />
        </ListItemAvatar>
        <ListItemText primary={comment.author} secondary={comment.content} />
      </ListItem>
    ))}
  </List>
);

const CommentInput = ({ onSubmit }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ author, content });
    setAuthor("");
    setContent("");
  };

  return (
    <Box display={"flex"} sx={{ gap: 2 }}>
      <Avatar sx={{ mt: 1 }} src="/path/to/avatar.jpg" alt="Avatar" />

      <form onSubmit={handleSubmit}>
        {/* <TextField
        label="Your name"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        required
      /> */}
        <TextField
          label="Đánh giá của bạn"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
        />

        <Button sx={{ mt: 1, marginLeft: 2 }} type="submit" variant="contained" color="warning">
          Gửi
        </Button>
      </form>
    </Box>
  );
};

const CommentSection = () => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <>
      <Box mt={2}>
        <CommentInput onSubmit={handleCommentSubmit} />
        <CommentList comments={comments} />
      </Box>
    </>
  );
};

export default CommentSection;
