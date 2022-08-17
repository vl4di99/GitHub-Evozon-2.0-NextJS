import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { LanguageRatio } from "./LanguageRatio";

const Languages = ({ repo }) => {
  const [data, setData] = useState([]);
  let languagesSum = 0;

  const getLanguages = async () => {
    await axios.get(repo.languages_url).then((res) => setData(res.data));
  };

  useEffect(() => {
    getLanguages();
  }, []);

  // const data = {
  //   JavaScript: 3071,
  //   CSS: 2659,
  //   HTML: 1530,
  // };

  Object.values(data).map((value) => {
    languagesSum += value;
  });

  return (
    <div className="languages-div flex space-x-2 px-4  ">
      {Object.entries(data).map((entry) => {
        return <LanguageRatio language={entry} totalAmount={languagesSum} />;
      })}
    </div>
  );
};

export default Languages;
