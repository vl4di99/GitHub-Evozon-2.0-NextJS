import { Avatar } from "@mui/material";
import axios from "axios";

function RepositoryName({ avatar }) {
  return (
    <div className={tailwindStyling.container}>
      <Avatar src={avatar} alt="avatar" />
    </div>
  );
}

export default RepositoryName;

export async function getServerSideProps(context) {
  const { data } = await axios({
    method: "get",
    url: `https://api.github.com/repos/${context.query.username}/${context.query.repoName}`,
    headers: {
      Authorization: `Bearer ${conte}`,
      "Content-Type": "application/json",
    },
  });
  console.log(data);

  return {
    props: { avatar: data.owner.avatar_url },
  };
}

const tailwindStyling = {
  container: "flex flex-col justify-start items-center min-h-screen",
};
