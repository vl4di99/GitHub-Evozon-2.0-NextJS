import React, { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { userNameState } from "../../atoms/UserName";

function LandingPage({ userData }) {
  const [userName, setUserName] = useRecoilState(userNameState);

  console.log(userData);

  function handleChange(e) {
    setUserName(e.target.value);
    console.log(userName);
  }

  return (
    <section className="flex h-screen items-center justify-center flex-col ">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            Enter your GitHub username
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </section>
  );
}

export async function getServerSideProps() {
  const userGitUrl = `https://api.github.com/users/${userName}/repos`;
  const { data } = await axios.get(userGitUrl);

  console.log(data);

  if (!data) {
    return {
      notFound: true,
    };
  }

  const userData = data;

  return {
    props: {
      userData,
    },
  };
}

export default LandingPage;
