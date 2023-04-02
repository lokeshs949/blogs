import { async } from "@firebase/util";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { db } from "../../services/firebase/config";
import { doc, setDoc, collection } from "firebase/firestore";
import { getLocalStorage } from "../../utils";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createPostHandle = async () => {
    let author = getLocalStorage("name");
    let uid = getLocalStorage("uid");
    const newDocRef = doc(collection(db, "posts"));

    await setDoc(doc(db, "posts", newDocRef.id), {
      title,
      content,
      author,
      id: newDocRef.id,
      date: new Date().getTime(),
      uid,
    });
    navigate("/home");
  };

  return (
    <Box mt={5}>
      <Container maxWidth="sm">
        <Paper elevation={3}>
          <Box p={2}>
            <Box mb={2}>
              <Typography textAlign={"center"} fontWeight="bold">
                Create Post
              </Typography>
            </Box>
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
            <Box display={"flex"} justifyContent="center" pb={2}>
              <Button
                size="small"
                variant="contained"
                onClick={createPostHandle}
                disabled={!title || !content}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreatePostPage;
