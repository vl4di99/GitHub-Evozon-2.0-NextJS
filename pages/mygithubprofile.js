import React, { Fragment } from "react";

import { getSession } from "next-auth/react";

import axios from "axios";

import { Avatar, Box, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { Container } from "@mui/system";

import { ProfileCardList } from "../components/profile-cards/ProfileCardList";
import UserProfile from "../components/Premium/UserProfile";

function Profile({ data }) {
  const userData = data.userData;
  const reposData = data.reposData;
  const userAvatar = userData?.avatar_url;
  const userName = userData?.name;
  const userLoginName = userData?.login;
  const userLocation = userData?.location;
  const userFollowers = userData?.followers;
  const userFollowing = userData?.following;

  return (
    <Fragment>
      <UserProfile className="fixed top-0 right-0 w-full " />
      <Container className="w-screen h-screen">
        <Box className="flex pb-4 flex-wrap sm:flex-nowrap">
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
              <Typography className="text-gray-600 font-mono mt-4" variant="h7">
                <PlaceIcon className="w-4 h-5" />
                {userLocation}
              </Typography>
              <Typography className="text-gray-600 font-mono text-sm pl-1">
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

            <ProfileCardList reposData={reposData} />
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
}

export default Profile;

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
