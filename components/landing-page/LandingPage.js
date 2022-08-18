import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CustomizedSnackbars from "../customized-snakebars/CustomizedSnakebars";

import { userNameState } from "../../atoms/UserName";

function LandingPage() {
  const [enterKeyPressed, setEnterKeyPressed] = useState(null);
  const [userExist, setUserExist] = useState(null);
  const [userDataResponse, setUserDataResponse] = useState([]);

  const getUserData = (userUrl) => {
    axios
      .get(userUrl)
      .then((response) => {
        setUserDataResponse(response.data);
        console.log("user exist");
        setUserExist(true);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);

          setUserDataResponse(error.response);
          setUserExist(false);
          console.log("no user found");

          console.log(userDataResponse);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const checkUserExist = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key was pressed");

      let userGitUrl = `https://api.github.com/users/${event.target.value}/repos`;
      getUserData(userGitUrl);
      setEnterKeyPressed(true);
    }
    //setEnterKeyPressed(false);
    console.log(userDataResponse);
  };

  return (
    <section className="flex h-screen items-center justify-center flex-col ">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            Enter your GitHub username
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            onKeyUp={checkUserExist}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <CustomizedSnackbars
        userExist={userExist}
        enterKeyPressed={enterKeyPressed}
      />
    </section>
  );
}

export default LandingPage;
