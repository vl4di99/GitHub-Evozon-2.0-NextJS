import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Typography, CircularProgress } from "@mui/material";
import { Languages } from "./Languages";

import axios from "axios";

export const Repo = ({ repo }) => {
  const getLanguages = async () => {
    const res = await axios.get(repo.languages_url);
    return res.data;
  };

  const languages = getLanguages();
  return (
    <Card
      sx={{ minWidth: 275 }}
      className="mt-4 border-none bg-slate-100 drop-shadow-md
      "
      variant="outlined"
    >
      <CardContent>
        <Typography color="#455a64" gutterBottom>
          {repo.name}
        </Typography>
        <Languages languages={languages} />
      </CardContent>
      <CardActions>
        <Button size="small">details</Button>
      </CardActions>
    </Card>
  );
};
