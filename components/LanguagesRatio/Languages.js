import axios from "axios";
import { useEffect, useState } from "react";
import { LanguageRatio } from "./LanguageRatio";

const Languages = ({ repo }) => {
  console.log("repo in languages is...");
  console.log(repo);

  const [data, setData] = useState([]);

  const getLanguages = async () => {
    await axios.get(repo.languages_url).then((res) => setData(res.data));
  };

  useEffect(() => {
    getLanguages();
  }, []);
  console.log("data is");
  console.log(data);

  console.log(Object.values(data));
  const initialValue = 0;
  const languagesSum = Object.values(data).reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );
  // Object.values(data).map((amount) => {
  //   setLanguagesSum(languagesSum + amount);
  // });
  console.log(languagesSum);
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
