import axios from "axios";
import UserProfile from "../../components/Premium/UserProfile";
import RepositoryInfo from "../../components/Premium/RepositoryInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { repoInfo, axiosHeaders } from "../../atoms/repository";

function RepositoryName() {
  const router = useRouter();
  const path = router.asPath;

  const [response, setResponse] = useRecoilState(repoInfo);
  const headersAx = useRecoilValue(axiosHeaders);

  const getRepo = async () => {
    await axios({
      method: "get",
      url: `https://api.github.com/repos${path}`,
      headers: headersAx,
    })
      .then((res) => {
        setResponse(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    getRepo();
  }, []);

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
}

export default RepositoryName;
