import { reposArr } from "../pages/mockRepos";
import { Repo } from "./Repo";

export const ReposList = () => {
  return (
    <div className="repos-container">
      {reposArr.map((repo) => {
        return <Repo repo={repo} key={repo.id} />;
      })}
    </div>
  );
};
