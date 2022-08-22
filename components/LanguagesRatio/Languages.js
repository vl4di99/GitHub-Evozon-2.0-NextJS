import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { axiosHeaders } from "../../atoms/repository";
import { LanguageRatio } from "./LanguageRatio";

const Languages = ({ repo }) => {
  const [data, setData] = useState([]);
  const headersAx = useRecoilValue(axiosHeaders);

  const getLanguages = async () => {
    await axios
      .get({
        method: "get",
        url: repo.languages_url,
        headers: headersAx,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
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
          />
        );
      })}
    </div>
  );
};

export default Languages;
