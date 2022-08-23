import * as React from "react";
import axios from "axios";

import { getSession, useSession } from "next-auth/react";

import { useState } from "react";

import { useRecoilState } from "recoil";
import { gitUser, limitAPI } from "../../atoms/repository";
import UserProfile from "../../components/Premium/UserProfile";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { ReposList } from "../../components/ReposList";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function Repos({ url, data }) {
  const { data: session } = useSession();
  const [filterBy, setFilterBy] = useState("");
  const [userURL, setUserURL] = useRecoilState(gitUser);
  setUserURL(url);

  const handleChange = (event) => {
    setFilterBy(event.target.value);
  };

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    data && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
        className="p-0"
      >
        <Container sx={{ minHeight: "100vh" }} className="p-0 min-w-full">
          {session && <UserProfile />}
          <div className="flex items-center justify-end">
            <p>{theme.palette.mode} mode</p>
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </div>
          <Container sx={{ minHeight: "100vh" }} className="p-0 ">
            {" "}
            <h1 className="text-4xl pt-8 pb-4">{url}&rsquo;s repos</h1>
            <hr className="border-2 border-fuchsia-700 rounded-md"></hr>
            <TextField
              id="demo-helper-text-misaligned-no-helper"
              label="Filter through the repos"
              className="my-4 w-full lg:w-3/6"
              name="message"
              onChange={handleChange}
              color="secondary"
            />
            <ReposList filterBy={filterBy} data={data} theme={theme} />
          </Container>
        </Container>
      </Box>
    )
  );
}

export default function ToggleColorMode({ url, data }) {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Repos url={url} data={data} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const url = context.params.username;
  let resData = {};
  let headersAx = {};

  if (session) {
    headersAx = { Authorization: `Bearer ${session.accessToken}` };

    const response = await axios({
      method: "get",
      url: `https://api.github.com/users/${url}/repos`,
      headers: headersAx,
    });
    resData = response.data;
  }

  return {
    props: {
      url,
      data: resData,
    },
  };
}
