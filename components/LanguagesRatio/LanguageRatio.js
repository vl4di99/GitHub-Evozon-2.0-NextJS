import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Typography } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";

export const LanguageRatio = ({ language, totalAmount }) => {
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

  return (
    <div className="flex flex-col w-16 items-center">
      <div className="w-12">
        <CircularProgressbar
          className="mb-4 "
          value={languagePercent}
          text={`${languagePercent}%`}
          styles={buildStyles({
            textColor: "#000",
            pathColor: getColor(),
          })}
        />
      </div>
      <Typography color="#6c757d" gutterBottom>
        {languageName}
      </Typography>
    </div>
  );
};
