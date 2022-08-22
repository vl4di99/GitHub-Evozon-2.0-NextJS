import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import Languages from "../LanguagesRatio/Languages";
import { useRecoilValue } from "recoil";
import { gitUser } from "../../atoms/repository";

export const ProfileCard = ({ repo }) => {
  const userURL = useRecoilValue(gitUser);
  const repoName = repo.name;
  const repoDescription = repo.description;
  const repoPrivate = repo.private;

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
          {repoName}
        </Typography>
        <Typography
          className="text-gray-600 font-mono"
          variant="h10 px-2 border-solid rounded-full border-2 absolute top-5 right-5"
        >
          {repoPrivate ? "Private" : "Public"}
        </Typography>
        <Typography className="text-gray-600 font-mono" variant="h10">
          {repoDescription}
        </Typography>

        <Languages repo={repo} />
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
