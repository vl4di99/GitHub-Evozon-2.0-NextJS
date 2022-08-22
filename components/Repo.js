import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Typography } from "@mui/material";
import Languages from "./LanguagesRatio/Languages";
import { useRecoilValue } from "recoil";
import { gitUser } from "../atoms/repository";
import { indigo } from "@mui/material/colors";

export const Repo = ({ repo, theme }) => {
  const router = useRouter();
  const userURL = useRecoilValue(gitUser);

  const clickHandler = () => {
    router.push(`/${userURL}/${repo.name}`);
  };
  const mode = theme.palette.mode;
  let color = indigo[50];
  if (mode === "dark") {
    color = "rgba(127, 17, 224, 0.2)";
  }

  return (
    <Card
      className="mt-4 border-0 drop-shadow-md"
      sx={{ backgroundColor: color }}
      variant="outlined"
    >
      <CardContent className="p-0 px-2">
        <Typography
          color="secondary"
          className="text-xl font-semibold mb-4 p-2"
        >
          {repo.name}
        </Typography>
        <Languages repo={repo} mode={mode} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={clickHandler}>
          details
        </Button>
      </CardActions>
    </Card>
  );
};
