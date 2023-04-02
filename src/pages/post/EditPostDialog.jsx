import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const EditPostDialog = ({ open = false, onClose, data = {}, ...props }) => {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  useEffect(() => {
    setTitle(data.title);
    setContent(data.content);
  }, [data]);
  // console.log(data);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Box>
          <TextField
            label="Title"
            size="small"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
        </Box>
        <Box my={3}>
          <TextField
            label="Content"
            fullWidth
            size="small"
            rows={3}
            multiline={true}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></TextField>
        </Box>
        <Box mt={2} display={"flex"} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.onEdit(title, content)}
          >
            Edit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
