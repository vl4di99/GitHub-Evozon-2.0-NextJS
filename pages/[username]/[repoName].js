import { Avatar } from "@mui/material";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import UserProfile from "../../components/Premium/UserProfile";
import RepositoryInfo from "../../components/Premium/RepositoryInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { repoInfo, axiosHeaders } from "../../atoms/repository";

function RepositoryName({ headersAx }) {
  const { data: session } = useSession();
  const router = useRouter();
  const path = router.asPath;

  const [response, setResponse] = useRecoilState(repoInfo);
  const [axiosH, setAxiosH] = useRecoilState(axiosHeaders);

  const getRepo = async () => {
    await axios({
      method: "get",
      url: `https://api.github.com/repos${path}`,
      headers: headersAx,
    }).then((res) => {
      setResponse(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    setAxiosH(headersAx);
    getRepo();
  }, []);

  if (session) {
    return (
      <div className="flex flex-col">
        <UserProfile />
        <RepositoryInfo
          avatar={response?.owner?.avatar_url}
          name={response?.owner?.login}
          curUrl={path}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-start items-center min-h-screen"></div>
    );
  }
}

export default RepositoryName;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let headersAx = {};
  if (session) {
    headersAx = { Authorization: `Bearer ${session.accessToken}` };
  }

  return {
    props: {
      session,
      headersAx,
    },
  };
}
