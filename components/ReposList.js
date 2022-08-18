import { useState, useEffect } from "react";
import { reposArr } from "../pages/mockRepos";
import { Repo } from "./Repo";

export const ReposList = ({ filterBy }) => {
  const [reposToShow, setReposToShow] = useState(reposArr);

  useEffect(() => {
    const newArr = reposArr.filter((repo) =>
      repo.name.toLowerCase().includes(filterBy.toLowerCase())
    );
    setReposToShow(newArr);
  }, [filterBy]);

  return (
    <div className="repos-container">
      {reposToShow.map((repo) => {
        return <Repo repo={repo} key={repo.id} />;
      })}
    </div>
  );
};
