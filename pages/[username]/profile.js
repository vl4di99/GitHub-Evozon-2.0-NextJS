import React from "react";

import { getSession, useSession } from "next-auth/react";

import axios from "axios";

import { Avatar, Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { ProfileCardList } from "../../components/profile-cards/ProfileCardList";

function Profile({ data }) {
  const { data: session } = useSession();
  const userData = data.userData;
  const reposData = data.reposData;
  const userAvatar = data.userData?.avatar_url;
  const userName = data.userData?.name;
  const userLoginName = data.userData?.login;

  return (
    <Container className="w-screen h-screen">
      <Box className="flex pb-4">
        <Box className="flex flex-col justify-start mt-28 p-0 ">
          <Box className="ml-0 flex flex-col p-0 pr-20 sticky top-28">
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
          </Box>
        </Box>
        <Box className="mt-28">
          <Typography className="font-mono mb-2" variant="h5">
            Popular repositories
          </Typography>

          <ProfileCardList reposData={reposData} />
        </Box>
      </Box>
    </Container>
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

  return {
    props: {
      session,
      headersAx,
      userName,
      data: { userData, reposData },
    },
  };
}
