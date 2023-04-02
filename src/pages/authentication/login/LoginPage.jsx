import {
  Alert,
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";

import { getFirestore } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { app, auth, db } from "../../../services/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { setLocalStorage, validateEmail } from "../../../utils";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: false });
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const onChangeFormHandler = (e, type) => {
    if (type == "password") {
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
    }
  };
  const loginHandle = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          let data = docSnap.data();
          setLocalStorage("role", data.role);
          setLocalStorage("name", data.name);
          setLocalStorage("uid", data.uid);
          setLocalStorage("email", data.email);
          setLocalStorage("logged", true);
          navigate("/home");
        } else {
          console.log("No such document!");
        }
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
                Login to your account
              </Typography>
            </Box>

            <Box>
              <TextField
                label="Email"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => onChangeFormHandler(e, "email")}
                error={error.email}
                helperText={error.email && "Email Id not valid"}
              ></TextField>
            </Box>
            <Box my={3}>
              <TextField
                label="Password"
                fullWidth
                size="small"
                type={"Password"}
                value={password}
                onChange={(e) => onChangeFormHandler(e, "password")}
              ></TextField>
            </Box>

            <Box my={3}>
              <Typography
                fontSize={"0.9rem"}
                onClick={() => navigate("/register")}
                style={{ cursor: "pointer" }}
                textAlign={"center"}
                color={"blue"}
              >
                No Account? Sign Up here
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent="center" pb={2}>
              <Button
                size="small"
                variant="contained"
                onClick={loginHandle}
                disabled={!email || !password || error.email}
              >
                Login
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

export default LoginPage;
