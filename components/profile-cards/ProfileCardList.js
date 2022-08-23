import { useState } from "react";
import { ProfileCard } from "./ProfileCard";

import { Box } from "@mui/material";

export const ProfileCardList = ({ reposData }) => {
  const [reposToShow, setReposToShow] = useState(reposData);

  //    Sortare in functie de data creata a repo-ului in ordine descendenta
  //
  //   useEffect(() => {
  //     setReposToShow(
  //       reposData.sort((repoOne, repoTwo) => {
  //         const repoOneCreatedAt = new Date(repoOne.created_at);
  //         const repoTwoCreatedAt = new Date(repoTwo.created_at);

  //         return repoTwoCreatedAt.getTime() - repoOneCreatedAt.getTime();
  //       })
  //     );
  //   }, []);

  return (
    <Box className="repos-container grid grid-cols-2 gap-4">
      {reposToShow.map((repo, index) => {
        const nrOfReposDisplayed = 8;
        if (index < nrOfReposDisplayed) {
          const mainLanguage = repo.language;

          return (
            <ProfileCard
              mainLanguage={mainLanguage}
              repo={repo}
              key={repo.id}
            />
          );
        } else return;
      })}
    </Box>
  );
};
