import { Avatar, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { axiosHeaders, repoContent } from "../../atoms/repository";

function RepositoryInfo({ avatar, curUrl, name }) {
  const [repoC, setRepoC] = useRecoilState(repoContent);
  const headersAx = useRecoilValue(axiosHeaders);
  const getRepoContents = async () => {
    await axios({
      method: "get",
      url: `https://api.github.com/repos${curUrl}/contents`,
      headers: headersAx,
    }).then((res) => {
      setRepoC(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    if (repoC === null) getRepoContents();
  }, []);
  return (
    <div className="flex flex-col justify-start items-center bg-gradient-to-b from-slate-800 to-white">
      <Avatar
        src={avatar}
        alt="User Avatar"
        className="border-4 border-stone-800 w-52 h-52 mt-10"
      />
      <Typography variant="h5">{name}</Typography>
    </div>
  );
}

export default RepositoryInfo;
