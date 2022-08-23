import Card from "@mui/material/Card";
import { Typography, Box } from "@mui/material";
import languageColors from "../../jsonData/languageColors.json";
import { useEffect, useState } from "react";

export const ProfileCard = ({ repo, mainLanguage }) => {
  const [languageColor, setLanguageColor] = useState();
  const repoName = repo.name;
  const repoDescription = repo.description;
  const repoPrivate = repo.private;

  useEffect(() => {
    setLanguageColor(languageColors[mainLanguage]);
  }, []);

  return (
    <Card
      className=" border-0 bg-slate-100 drop-shadow-md min-w-md flex flex-col justify-between"
      variant="outlined"
    >
      <Typography color="secondary" className="text-xl font-semibold p-2">
        {repoName}
      </Typography>
      <Typography
        className="text-gray-600 font-mono hidden sm:inline-block"
        variant="h10 px-2 border-solid rounded-full border-2 absolute top-1 right-1 m-1"
      >
        {repoPrivate ? "Private" : "Public"}
      </Typography>
      <Typography
        className="text-gray-600 font-mono p-2"
        sx={{ display: "inline-block" }}
        variant="h10"
      >
        {repoDescription ? repoDescription : "No description"}
      </Typography>
      <Box className="p-2">
        {mainLanguage ? (
          <Typography
            className="w-3 h-3 rounded-full inline-block mr-1"
            style={{ backgroundColor: `${languageColor}` }}
            component="span"
            sx={{ display: "inline-block" }}
          ></Typography>
        ) : (
          ""
        )}
        <Typography className="text-gray-600 font-mono" variant="h10">
          {mainLanguage ? mainLanguage : "No language used"}
        </Typography>
      </Box>
    </Card>
  );
};
