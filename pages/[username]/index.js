import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { gitUser, limitAPI } from "../../atoms/repository";
import UserProfile from "../../components/Premium/UserProfile";
import { ReposList } from "../../components/ReposList";

function Repos({ url, data }) {
  const { data: session } = useSession();
  const [filterBy, setFilterBy] = useState("");
  const [userURL, setUserURL] = useRecoilState(gitUser);
  setUserURL(url);
  console.log(data);

  const handleChange = (event) => {
    setFilterBy(event.target.value);
  };

  return (
    data && (
      <Container sx={{ minHeight: "100vh" }}>
        {session && <UserProfile />}
        <Container sx={{ minHeight: "100vh" }}>
          <h1 className="text-4xl pt-8 pb-4">{url}'s repos</h1>
          <hr className="border-2 border-blue-500 rounded-md"></hr>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Filter through the repos"
            className="my-4 w-full lg:w-3/6"
            name="message"
            onChange={handleChange}
          />
          <ReposList filterBy={filterBy} data={data} />
        </Container>
      </Container>
    )
  );
}

export default Repos;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const url = context.params.username;
  let resData = {};

  if (session) {
    let headersAx = { Authorization: `Bearer ${session.accessToken}` };

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
