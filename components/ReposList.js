import { useState, useEffect } from "react";
import { Repo } from "./Repo";

export const ReposList = ({ filterBy, data, theme }) => {
  const initialData = data;
  const [reposToShow, setReposToShow] = useState(data);

  useEffect(() => {
    const newArr = initialData.filter((repo) =>
      repo.name.toLowerCase().includes(filterBy.toLowerCase())
    );
    setReposToShow(newArr);
  }, [filterBy]);

  return (
    <div className="repos-container">
      {reposToShow.map((repo) => {
        return <Repo repo={repo} key={repo.id} theme={theme} />;
      })}
    </div>
  );
};
