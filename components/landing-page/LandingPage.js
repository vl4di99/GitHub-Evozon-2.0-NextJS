import React, { useRef, useState } from "react";
import axios from "axios";

import { useRouter } from "next/router";
import Image from "next/image";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CustomizedSnackbars from "../customized-snakebars/CustomizedSnakebars";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LoginIcon from "@mui/icons-material/Login";

import githubIcon from "../../images/github-icon.png";
import githubBackground from "../../images/github-background.jpg";

function LandingPage() {
  const [functionEntered, setFunctionEntered] = useState(false);
  const [userExist, setUserExist] = useState(null);
  const [userDataResponse, setUserDataResponse] = useState([]);
  const enteredUsername = useRef();

  const router = useRouter();

  const getUserData = (userUrl, userName) => {
    axios
      .get(userUrl)
      .then((response) => {
        setUserDataResponse(response.data);
        // console.log(response.data);
        setUserExist(true);
        setFunctionEntered(true);
        router.push(`/${userName}`);
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
    const userName = enteredUsername.current.value;
    let userGitUrl = `https://api.github.com/users/${userName}/repos`;
    getUserData(userGitUrl, userName);
    console.log(userDataResponse);
    setFunctionEntered(false);
  };

  return (
    <section className="flex h-screen items-center justify-center flex-col ">
      <Image
        src={githubBackground}
        alt="github background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="z-0"
      />
      <div className="absolute rounded-lg bg-black bg-opacity-10 top-[160px] bg-radiu">
        <Box sx={{ "& > :not(style)": { m: 1 } }} className="">
          <InputLabel
            htmlFor="input-with-icon-adornment"
            className="pl-2px text-black m-0  flex flex-col items-center font-bold text-lg"
          >
            GitHub username
          </InputLabel>
          <Input
            className="text-fuchsia-800 text-lg "
            id="input-with-icon-adornment"
            inputRef={enteredUsername}
            color="secondary"
            startAdornment={
              <InputAdornment position="start">
                <Image
                  src={githubIcon}
                  alt="git logo"
                  width="30px"
                  height="30px"
                  className="m-0 -pl-2 font-bold"
                />
              </InputAdornment>
            }
          />
          <Button
            variant="contained"
            endIcon={<LoginIcon />}
            onClick={checkUserExist}
            className="bg-gradient-to-b from-fuchsia-900 to-purple-900 text-sm m-0 p-1 "
          >
            Search
          </Button>
        </Box>
      </div>
      {functionEntered && <CustomizedSnackbars userExist={userExist} />}
    </section>
  );
}

export default LandingPage;
