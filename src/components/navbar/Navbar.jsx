import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { deleteLocalStorage, getLocalStorage } from "../../utils";

export default function NavBar() {
  const navigate = useNavigate();
  let name = getLocalStorage("name");
  let role = getLocalStorage("role");
  const [userAnchorEl, setUserAnchorEl] = React.useState(null);
  const [AnchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(userAnchorEl);
  const handleClickUserMenu = (event) => {
    setUserAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setUserAnchorEl(null);
  };
  const openMenu = Boolean(AnchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    deleteLocalStorage("uid");
    deleteLocalStorage("logged");
    deleteLocalStorage("role");
    deleteLocalStorage("name");
    deleteLocalStorage("email");
    navigate("/login");
    handleCloseUserMenu();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={(e) => role == "author" && handleClickMenu(e)}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: {
                flexGrow: 1,
                xs: "none",
                sm: "flex",
                alignItems: "center",
              },
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => navigate("/home")}
              sx={{
                cursor: "pointer",
                marginRight: 1.5,
              }}
            >
              BLOGIST
            </Typography>
            {role == "author" && (
              <Typography
                noWrap
                component="div"
                onClick={() => navigate("my-posts")}
                sx={{
                  cursor: "pointer",
                }}
              >
                My Posts
              </Typography>
            )}
          </Box>

          <Avatar
            style={{ marginLeft: 10, cursor: "pointer" }}
            onClick={(e) => handleClickUserMenu(e)}
          />
          <Menu
            id="basic-menu"
            anchorEl={AnchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              style={{ textTransform: "capitalize" }}
              onClick={(e) => {
                navigate("/my-posts");
                handleCloseMenu(e);
              }}
            >
              My Posts
            </MenuItem>
          </Menu>
          <Menu
            id="basic-menu"
            anchorEl={userAnchorEl}
            open={open}
            onClose={handleCloseUserMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              style={{ textTransform: "capitalize" }}
              onClick={handleCloseUserMenu}
            >
              {name}
            </MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
