import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { LanguageRatio } from "./LanguageRatio";

const Languages = ({ repo, mode }) => {
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  const getLanguages = async () => {
    await axios({
      method: "get",
      url: repo.languages_url,
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getLanguages();
  }, [session]);

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
