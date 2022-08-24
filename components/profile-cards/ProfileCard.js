import Card from "@mui/material/Card";
import { Typography, Box, Snackbar, Alert } from "@mui/material";
import languageColors from "../../jsonData/languageColors.json";
import { useEffect, useState } from "react";
import { indigo } from "@mui/material/colors";

export const ProfileCard = ({ repo, mainLanguage, theme }) => {
  const [languageColor, setLanguageColor] = useState();
  const [open, setOpen] = useState(false);
  const repoName = repo.name;
  const repoDescription = repo.description;
  const repoPrivate = repo.private;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setLanguageColor(languageColors[mainLanguage]);
  }, []);

  const mode = theme.palette.mode;
  let color = indigo[50];
  let textColor = "text-gray-600";
  let languageTextColor = "text-gray-600";

  if (mode === "dark") {
    color = "rgba(127, 17, 224, 0.2)";
    textColor = "white";
    languageTextColor = "#9a8c98";
  }

  return (
    <Card
      className=" border-0  drop-shadow-md min-w-fit flex flex-col justify-between"
      sx={{ backgroundColor: color }}
      variant="outlined"
    >
      <Box className="flex justify-between">
        <Typography
          color="secondary"
          className="text-xl font-semibold ml-2 pt-1 "
        >
          <a href={repo.html_url} className="hover:underline">
            {repoName}
          </a>
        </Typography>
        <Box>
          <Typography
            className="font-mono hidden sm:inline-block "
            variant="h10 px-2 border-solid rounded-full border-2 m-1.5"
            sx={{ color: textColor }}
          >
            {repoPrivate ? "Private" : "Public"}
          </Typography>
        </Box>
      </Box>
      <Typography
        className="font-mono p-2"
        sx={{ display: "inline-block", color: textColor }}
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
        <Typography
          className="font-mono"
          variant="h10"
          sx={{ color: languageTextColor }}
        >
          {mainLanguage ? mainLanguage : "No language used"}
        </Typography>
      </Box>
      <Box
        className="border-2 border-amber-300 self-center min-w-fit m-1 rounded-2xl p-1 bg-orange-50 hover:bg-orange-200 hover:cursor-pointer"
        onClick={() => navigator.clipboard.writeText(repo.clone_url)}
      >
        <Typography
          className="rounded-full inline-block "
          variant="h6"
          onClick={() => {
            navigator.clipboard.writeText(repo.clone_url);
            handleClick();
          }}
        >
          Clone
        </Typography>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        className="self-center"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Link copied to clipboard
        </Alert>
      </Snackbar>
    </Card>
  );
};
