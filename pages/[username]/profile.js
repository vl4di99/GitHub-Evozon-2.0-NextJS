import React from "react";

import { getSession, useSession } from "next-auth/react";

import axios from "axios";

import { Avatar, Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { StyledEngineProvider } from "@mui/material/styles";

import { ProfileCardList } from "../../components/profile-cards/ProfileCardList";

function Profile({ data }) {
  const { data: session } = useSession();
  const reposData = data.reposData;
  const userAvatar = data.userData?.avatar_url;
  const userName = data.userData?.name;
  const userLoginName = data.userData?.login;

  return (
    <StyledEngineProvider injectFirst>
      <Container>
        <Box className="flex flex-col flex-start align-center m-0 p-0">
          <Box className="ml-16">
            <Avatar
              src={userAvatar}
              alt="User Avatar"
              className="border-4 border-fuchsia-900 w-64 h-64 "
            />
            <Typography className="font-mono" variant="h5">
              {userName}
            </Typography>
            <Typography className="text-gray-600 font-mono" variant="h6">
              {userLoginName}
            </Typography>
            <Typography className="font-mono" variant="h5">
              Popular repositories
            </Typography>
            <ProfileCardList reposData={reposData} />
          </Box>
        </Box>
      </Container>
    </StyledEngineProvider>
  );
}

export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userName = context.params.username;
  let userData = {};
  let reposData = {};
  let headersAx = {};

  if (session) {
    headersAx = { Authorization: `Bearer ${session.accessToken}` };

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

  const reposResponse = await axios;

  return {
    props: {
      session,
      headersAx,
      userName,
      data: { userData, reposData },
    },
  };
}
