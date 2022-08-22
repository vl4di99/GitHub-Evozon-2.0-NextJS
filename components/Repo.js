import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Typography } from "@mui/material";
import Languages from "./LanguagesRatio/Languages";
import { useRecoilValue } from "recoil";
import { gitUser } from "../atoms/repository";

export const Repo = ({ repo }) => {
  console.log("Repo is:    ", repo);
  const router = useRouter();
  const userURL = useRecoilValue(gitUser);

  const clickHandler = () => {
    router.push(`/${userURL}/${repo.name}`);
  };

  return (
    <Card
      className="mt-4 border-0 bg-slate-100 drop-shadow-md"
      variant="outlined"
    >
      <CardContent className="p-0 px-2">
        <Typography
          color="secondary"
          className="text-xl font-semibold mb-4 p-2"
        >
          {repo.name}
        </Typography>
        <Languages repo={repo} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={clickHandler}>
          More Details...
        </Button>
      </CardActions>
    </Card>
  );
};
