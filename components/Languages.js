import { CircularProgress } from "@mui/material";
import axios from "axios";

export const Languages = ({ languages }) => {
  if (languages.hasOwnProperty("JavaScript")) {
    return <CircularProgress variant="determinate" value={25} />;
  }
};
