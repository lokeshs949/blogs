import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../utils";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import EditIcon from "@mui/icons-material/Edit";
import EditPostDialog from "./EditPostDialog";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase/config";

const PostPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let uid = getLocalStorage("uid");

  let role = getLocalStorage("role");
  let postId = location.state?.data?.id;
  const [data, setData] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  useEffect(() => {
    fetchPost();
  }, [postId]);
  const fetchPost = async (id) => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  const onCloseEditDialog = () => {
    setEditOpen(false);
  };
  const deletePostHandle = async () => {
    await deleteDoc(doc(db, "posts", postId));
    navigate("/home", { replace: true });
  };
  const editPostHandle = async (title, content) => {
    const washingtonRef = doc(db, "posts", data.id);

    await updateDoc(washingtonRef, {
      title,
      content,
    });
    fetchPost();
    setEditOpen(false);
  };
  return (
    <Box p={2}>
      <Box>
        <Box mb={2}>
          <Typography textTransform={"capitalize"} variant="h5">
            {data.title}
          </Typography>
          <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
            {moment(new Date(data.date)).format("DD-MM-YYYY")}
          </div>
        </Box>

        <div>{data.content}</div>
        <Box
          display={"flex"}
          justifyContent="right"
          alignItems={"center"}
          mt={2}
        >
          <Typography textTransform={"capitalize"} textAlign={"right"}>
            - {data.author}
          </Typography>
          &nbsp;
          <Avatar style={{ width: 20, height: 20 }} />
        </Box>
        {role == "admin" && (
          <Box mt={4} display={"flex"} justifyContent={"center"}>
            <Button
              onClick={() => setEditOpen(true)}
              variant="contained"
              color="primary"
              startIcon={<AiFillEdit />}
            >
              Edit
            </Button>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <Button
              onClick={deletePostHandle}
              variant="contained"
              color="secondary"
              startIcon={<AiFillDelete />}
            >
              Delete
            </Button>
          </Box>
        )}
        {role == "author" && uid == data.uid && (
          <Box mt={4} display={"flex"} justifyContent={"center"}>
            <Button
              onClick={() => setEditOpen(true)}
              variant="contained"
              color="primary"
              startIcon={<AiFillEdit />}
            >
              Edit
            </Button>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <Button
              onClick={deletePostHandle}
              variant="contained"
              color="secondary"
              startIcon={<AiFillDelete />}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
      <EditPostDialog
        open={editOpen}
        onClose={onCloseEditDialog}
        data={data}
        onEdit={editPostHandle}
      />
    </Box>
  );
};

export default PostPage;
