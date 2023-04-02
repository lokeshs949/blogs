import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";

import { getFirestore } from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { app, auth } from "../../../services/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../../utils";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [name, setName] = useState("");
  const [error, setError] = useState({
    email: false,
    name: false,
    password: false,
  });
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onChangeFormHandler = (e, type) => {
    if (type == "password") {
      let value = e.target.value?.trim();
      if (value) {
        if (value.length >= 6) {
          setError((prev) => ({ ...prev, password: false }));
        } else setError((prev) => ({ ...prev, password: true }));
      } else {
        setError((prev) => ({ ...prev, password: false }));
      }
      setPassword(e.target?.value);
    } else if (type == "email") {
      let value = e.target.value;
      let check = validateEmail(e.target.value);
      if (value) {
        if (check) {
          setError((prev) => ({ ...prev, email: false }));
        } else setError((prev) => ({ ...prev, email: true }));
      } else {
        setError((prev) => ({ ...prev, email: false }));
      }

      setEmail(e.target?.value);
    } else if (type == "role") {
      setRole(e.target?.value);
    } else if (type == "name") {
      setName(e.target?.value);
    }
  };
  const signUpHandle = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const db = getFirestore(app);
        await setDoc(doc(db, "users", user?.uid), {
          email: user?.email,
          name: name,
          uid: user?.uid,
          role,
        });
        setEmail("");
        setPassword("");
        setRole("");
        setName("");

        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setOpenError(true);
        setErrorMessage(errorMessage);
      });
  };
  const handleCloseError = () => {
    setOpenError(false);
    setErrorMessage("");
  };
  return (
    <Box mt={5}>
      <Container maxWidth="xs">
        <Paper elevation={1}>
          <Box px={2}>
            <Box pt={2} mb={2}>
              <Typography
                textAlign={"center"}
                fontWeight="bold"
                fontSize={"1.2rem"}
              >
                Create Your Account
              </Typography>
            </Box>
            <Box my={3}>
              <TextField
                label="Name"
                size="small"
                fullWidth
                value={name}
                onChange={(e) => onChangeFormHandler(e, "name")}
              ></TextField>
            </Box>
            <Box>
              <TextField
                label="Email"
                size="small"
                fullWidth
                value={email}
                error={error.email}
                helperText={error.email && "Email not valid"}
                onChange={(e) => onChangeFormHandler(e, "email")}
              ></TextField>
            </Box>
            <Box my={3}>
              <TextField
                label="Password"
                fullWidth
                size="small"
                type={"Password"}
                error={error.password}
                value={password}
                helperText={"Password should be of min 6 characters"}
                onChange={(e) => onChangeFormHandler(e, "password")}
              ></TextField>
            </Box>
            <Box my={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  onChange={(e) => onChangeFormHandler(e, "role")}
                >
                  {["admin", "author", "reader"].map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box my={3}>
              <Typography
                fontSize={"0.9rem"}
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
                textAlign={"center"}
                color={"blue"}
              >
                Alread a user? Sign Up here
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent="center" pb={2}>
              <Button
                size="small"
                variant="contained"
                onClick={signUpHandle}
                disabled={
                  !name ||
                  !email ||
                  !role ||
                  !password ||
                  error.email ||
                  error.name ||
                  error.password
                }
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Snackbar
        open={openError}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterPage;
