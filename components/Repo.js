import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Typography, CircularProgress } from "@mui/material";
import Languages from "./LanguagesRatio/Languages";

export const Repo = ({ repo }) => {
  return (
    <Card
      className="mt-4 border-0 bg-slate-100 drop-shadow-md"
      variant="outlined"
    >
      <CardContent className="p-0 px-2">
        <Typography color="#455a64" className="text-xl font-semibold mb-4 p-2">
          {repo.name}
        </Typography>
        <Languages repo={repo} />
      </CardContent>
      <CardActions>
        <Button size="small">details</Button>
      </CardActions>
    </Card>
  );
};
