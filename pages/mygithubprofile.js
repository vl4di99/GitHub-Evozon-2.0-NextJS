import React, { Fragment } from "react";

import { getSession } from "next-auth/react";

import axios from "axios";

import { Avatar, Box, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { Container } from "@mui/system";

import { ProfileCardList } from "../components/profile-cards/ProfileCardList";
import UserProfile from "../components/Premium/UserProfile";

import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function Profile({ data }) {
  const userData = data.userData;
  const reposData = data.reposData;
  const userAvatar = userData?.avatar_url;
  const userName = userData?.name;
  const userLoginName = userData?.login;
  const userLocation = userData?.location;
  const userFollowers = userData?.followers;
  const userFollowing = userData?.following;

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const mode = theme.palette.mode;
  let textColor = "text-gray-600";
  if (mode === "dark") {
    textColor = "#9a8c98";
  }

  return (
    <Fragment>
      <Box className=" w-full">
        <UserProfile />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          // alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
      >
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
        <Container className="w-screen min-h-screen">
          <Box className="flex pb-4 flex-wrap sm:flex-nowrap">
            <Box className="flex flex-col justify-start mt-28 p-0 ">
              <Box className="ml-0 flex flex-col p-0 pr-20 sticky top-28">
                <Avatar
                  src={userAvatar}
                  alt="User Avatar"
                  className="border-4 border-fuchsia-900 w-64 h-64 "
                />
                <Typography className="font-mono mt-6" variant="h5">
                  {userName}
                </Typography>
                <Typography
                  className="font-mono"
                  variant="h6"
                  sx={{ color: textColor }}
                >
                  {userLoginName}
                </Typography>
                <Typography
                  className="font-mono mt-4"
                  sx={{ color: textColor }}
                  variant="h7"
                >
                  <PlaceIcon className="w-4 h-5" />
                  {userLocation}
                </Typography>
                <Typography
                  className="font-mono text-sm pl-1"
                  sx={{ color: textColor }}
                >
                  {userFollowers == 1
                    ? `${userFollowers} follower`
                    : `${userFollowers} followers`}{" "}
                  | {`${userFollowing} following`}
                </Typography>
              </Box>
            </Box>
            <Box className="mt-28">
              <Typography className="font-mono mb-2" variant="h5">
                Popular repositories
              </Typography>

              <ProfileCardList reposData={reposData} theme={theme} />
            </Box>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
}

// export default Profile;

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
        <Profile data={data} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let userData = {};
  let reposData = {};
  let headersAx = {};
  let userName = "";

  if (session) {
    headersAx = { Authorization: `Bearer ${session.accessToken}` };
    const gitUserName = await axios({
      method: "get",
      url: `https://api.github.com/user/${session.userId}`,
      headers: headersAx,
    });

    userName = gitUserName.data.login;

    const userResponse = await axios
      .all([
        axios({
          method: "get",
          url: `https://api.github.com/users/${userName}`,
          headers: headersAx,
        }),
        axios({
          method: "get",
          url: `https://api.github.com/users/${userName}/repos`,
          headers: headersAx,
        }),
      ])
      .then(
        axios.spread((...responses) => {
          const userResponse = responses[0];
          const reposResponse = responses[1];

          userData = userResponse.data;
          reposData = reposResponse.data;
        })
      )
      .catch((errors) => console.log(errors));
  }

  return {
    props: {
      session,
      headersAx,
      userName,
      data: { userData, reposData },
    },
  };
}
