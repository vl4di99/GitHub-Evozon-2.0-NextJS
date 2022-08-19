import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import checkHeaders from "../../hooks/checkHeaders";
import { LanguageRatio } from "./LanguageRatio";

const Languages = ({ repo }) => {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  let languagesSum = 0;

  const getLanguages = async () => {
    let header = checkHeaders(session);
    await axios
      .get({
        method: "get",
        url: repo.languages_url,
        headers: header,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
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
