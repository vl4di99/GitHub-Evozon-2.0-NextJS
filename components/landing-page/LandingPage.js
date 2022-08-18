import React, { useRef, useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CustomizedSnackbars from "../customized-snakebars/CustomizedSnakebars";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";

function LandingPage() {
  const [functionEntered, setFunctionEntered] = useState(false);
  const [userExist, setUserExist] = useState(null);
  const [userDataResponse, setUserDataResponse] = useState([]);
  const enteredUsername = useRef();

  const router = useRouter();

  const getUserData = (userUrl) => {
    axios
      .get(userUrl)
      .then((response) => {
        setUserDataResponse(response.data);
        // console.log(response.data);
        setUserExist(true);
        setFunctionEntered(true);
        router.push(`/${enteredUsername.current.value}`);
      })
      .catch(function (error) {
        if (error.response) {
          setUserDataResponse(error.response);
          setUserExist(false);
          setFunctionEntered(true);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const checkUserExist = () => {
    let userGitUrl = `https://api.github.com/users/${enteredUsername.current.value}/repos`;
    getUserData(userGitUrl);
    console.log(userDataResponse);
  };

  return (
    <section className="flex h-screen items-center justify-center flex-col ">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <InputLabel htmlFor="input-with-icon-adornment">
          Enter your GitHub username
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          inputRef={enteredUsername}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={checkUserExist}
        >
          Send
        </Button>
      </Box>
      {functionEntered && <CustomizedSnackbars userExist={userExist} />}
    </section>
  );
}

export default LandingPage;
