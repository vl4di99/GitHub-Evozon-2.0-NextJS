import axios from "axios";
import { useEffect, useState } from "react";
import { LanguageRatio } from "./LanguageRatio";

const Languages = ({ repo, mode }) => {
  const [data, setData] = useState([]);

  const getLanguages = async () => {
    await axios.get(repo.languages_url).then((res) => setData(res.data));
  };

  useEffect(() => {
    getLanguages();
  }, [repo]);

  const initialValue = 0;
  const languagesSum = Object.values(data).reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  return (
    <div className="languages-div flex space-x-2 px-4 self-center">
      {Object.entries(data).map((entry) => {
        return (
          <LanguageRatio
            language={entry}
            totalAmount={languagesSum}
            key={entry[0]}
            mode={mode}
          />
        );
      })}
    </div>
  );
};

export default Languages;
