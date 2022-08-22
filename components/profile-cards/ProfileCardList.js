import { useState, useEffect } from "react";
import { ProfileCard } from "./ProfileCard";

import { Box } from "@mui/material";

export const ProfileCardList = ({ reposData }) => {
  const [reposToShow, setReposToShow] = useState(reposData);

  return (
    <Box className="repos-container">
      {reposToShow.map((repo) => {
        return <ProfileCard repo={repo} key={repo.id} />;
      })}
    </Box>
  );
};
