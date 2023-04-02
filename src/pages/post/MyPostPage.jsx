import { Avatar, Box, Card, Fab, Grid, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase/config";
import styles from "./styles.module.scss";
import AddIcon from "@mui/icons-material/Add";
import { getLocalStorage } from "../../utils";

const MyPostPage = () => {
  let uid = getLocalStorage("uid");
  const navigate = useNavigate();
  const [blogsList, setBlogsList] = useState([]);
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      const q = query(collection(db, "posts"), where("uid", "==", uid));

      const querySnapshot = await getDocs(q);
      let temp = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        temp.push({ ...doc.data() });
      });
      setBlogsList(temp);
    } catch (error) {
      console.log(error);
    }
  };
  const onClickPostHandle = (data) => {
    navigate("/post", { state: { data: { ...data } } });
  };
  const createNewPostHandle = () => {
    navigate("/create");
  };
  return (
    <>
      <Grid container>
        {blogsList.length == 0 && (
          <Grid item xs={12}>
            <Typography textAlign={"center"} variant="h6">
              No Posts found.
            </Typography>
          </Grid>
        )}
        {blogsList.map((el, i) => (
          <Grid item xs={12} sm={6} md={3}>
            <Box p={2}>
              <Card
                style={{
                  overflow: "hidden",
                  cursor: "pointer",
                  padding: 10,
                  height: 250,
                  position: "relative",
                }}
                onClick={() => onClickPostHandle(el)}
              >
                <Box mb={2}>
                  <Typography textTransform={"capitalize"} variant="h5">
                    {el.title}
                  </Typography>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                    {moment(new Date(el.date)).format("DD-MM-YYYY")}
                  </div>
                </Box>

                <div className={styles.cutText}>{el.content}</div>
                <Box
                  display={"flex"}
                  justifyContent="right"
                  alignItems={"center"}
                  style={{ position: "absolute", bottom: 0, right: 10 }}
                >
                  <Typography textTransform={"capitalize"} textAlign={"right"}>
                    - {el.author}
                  </Typography>
                  &nbsp;
                  <Avatar style={{ width: 20, height: 20 }} />
                </Box>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 10, right: 10 }}
        onClick={createNewPostHandle}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default MyPostPage;
