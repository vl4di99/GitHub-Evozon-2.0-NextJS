import { useState, useEffect } from "react";
import { Repo } from "./Repo";

export const ReposList = ({ filterBy, data }) => {
  const initialData = data;
  const [reposToShow, setReposToShow] = useState([]);

  useEffect(() => {
    console.log(data);
    if (initialData) {
      const newArr = initialData.filter((repo) =>
        repo.name.toLowerCase().includes(filterBy.toLowerCase())
      );
      setReposToShow(newArr);
    }
  }, [filterBy]);

  return (
    <div className="repos-container">
      {reposToShow.map((repo) => {
        return <Repo repo={repo} key={repo.id} />;
      })}
    </div>
  );
};
