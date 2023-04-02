import {
  Avatar,
  Box,
  Card,
  Fab,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { db } from "../../services/firebase/config";
import moment from "moment";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { getLocalStorage } from "../../utils";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  // background: "red",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: 300,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 300,
    },
  },
}));
const HomePage = () => {
  let role = getLocalStorage("role");
  const navigate = useNavigate();
  const [blogsList, setBlogsList] = useState([]);
  const [filterBlogsList, setFilterBlogsList] = useState([]);
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      const q = query(collection(db, "posts"));

      const querySnapshot = await getDocs(q);
      let temp = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        temp.push({ ...doc.data() });
      });
      setBlogsList(temp);
      setFilterBlogsList(temp);
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
  const searchBlogHandle = (e) => {
    let value = e.target.value;
    if (value) {
      let temp = blogsList.filter(
        (el) =>
          el.author.toLowerCase().includes(value.toLowerCase()) ||
          el.content?.toLowerCase().includes(value.toLowerCase()) ||
          el.title?.toLowerCase().includes(value.toLowerCase())
      );
      setFilterBlogsList([...temp]);
    } else {
      setFilterBlogsList([...blogsList]);
    }
  };
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={searchBlogHandle}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Grid>
        {filterBlogsList.length == 0 && (
          <Grid item xs={12}>
            <Typography textAlign={"center"} variant="h6">
              No Posts found.
            </Typography>
          </Grid>
        )}
        {filterBlogsList.map((el, i) => (
          <Grid item xs={12} sm={6} md={4}>
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
      {
        role=="author"?<Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 10, right: 10 }}
        onClick={createNewPostHandle}
      >
        <AddIcon />
      </Fab>:null
      }
    </>
  );
};

export default HomePage;
