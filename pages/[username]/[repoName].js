import axios from "axios";
import UserProfile from "../../components/Premium/UserProfile";
import RepositoryInfo from "../../components/Premium/RepositoryInfo";
import { getSession } from "next-auth/react";

function RepositoryName({ url, resData, resContent, resCommits }) {
  return (
    <div className="flex flex-col">
      <UserProfile />
      <RepositoryInfo
        avatar={resData?.owner?.avatar_url}
        name={resData?.owner?.login}
        repo={resData}
        content={resContent}
        commits={resCommits}
      />
    </div>
  );
}

export default RepositoryName;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const url = "/" + context.params.username + "/" + context.params.repoName;
  let resData = {};
  let resContent = {};
  let resCommits = {};

  if (session) {
    const response = await axios({
      method: "get",
      url: `https://api.github.com/repos${url}`,
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    const responseContent = await axios({
      method: "get",
      url: `https://api.github.com/repos${url}/contents`,
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    const responseCommits = await axios({
      method: "get",
      url: `https://api.github.com/repos${url}/commits`,
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    await axios
      .all([response, responseContent, responseCommits])
      .then(
        axios.spread((...responses) => {
          resData = responses[0].data;
          resContent = responses[1].data;
          resCommits = responses[2].data;
        })
      )
      .catch((error) => console.log(error));
  }

  return {
    props: {
      url,
      resData: resData,
      resContent: resContent,
      resCommits: resCommits,
    },
  };
}
