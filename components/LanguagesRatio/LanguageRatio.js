import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Typography } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";

export const LanguageRatio = ({ language, totalAmount, mode }) => {
  const [languageName, languageAmount] = language;

  const calculatePercent = () => {
    return (languageAmount * 100) / totalAmount;
  };

  const languagePercent = calculatePercent().toFixed(1);

  function getColor() {
    switch (languageName) {
      case "JavaScript":
        return "#F7DF1C";
      case "HTML":
        return "#DC4A25";
      case "CSS":
        return "#264BDD";
    }
  }
  let languageColor = "#4a4e69";
  let percentColor = "black";
  if (mode == "dark") {
    languageColor = "#9a8c98";
    percentColor = "#A0A3BB";
  }
  return (
    <div className="flex flex-col w-16 items-center">
      <div className="w-12">
        <CircularProgressbar
          className="mb-4 "
          value={languagePercent}
          text={`${languagePercent}%`}
          styles={buildStyles({
            textColor: percentColor,
            pathColor: getColor(),
          })}
        />
      </div>
      <Typography color={languageColor} gutterBottom>
        {languageName}
      </Typography>
    </div>
  );
};
