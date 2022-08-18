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

  Object.values(data).map((value) => {
    languagesSum += value;
  });

  return (
    <div className="languages-div flex space-x-2 px-4  ">
      {Object.entries(data).map((entry) => {
        return (
          <LanguageRatio
            language={entry}
            totalAmount={languagesSum}
            key={entry[0]}
          />
        );
      })}
    </div>
  );
};

export default Languages;
