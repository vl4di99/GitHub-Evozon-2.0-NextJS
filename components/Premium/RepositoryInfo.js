import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { axiosHeaders, repoInfo } from "../../atoms/repository";
import Languages from "../LanguagesRatio/Languages";
import RepoData from "./RepoData";

function RepositoryInfo({ avatar, name, content, commits }) {
  const repo = useRecoilValue(repoInfo);
  const [, setRepoCommits] = useState([]);

  useEffect(() => {
    setRepoCommits(commits);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-col justify-start items-center bg-gradient-to-b from-slate-400 to-white min-w-full">
        <Avatar
          src={avatar}
          alt="User Avatar"
          className="border-4 border-fuchsia-900 w-52 h-52 m-8"
        />
        <Typography variant="h5">{name}</Typography>

        <Box className="flex justify-center m-5 w-8/12">
          <ThemeProvider
            theme={createTheme({
              palette: {
                text: { primary: "#24292f" },
                background: { default: "#fff", paper: "#f6f8fa" },
              },
            })}
          >
            <Container maxWidth={false}>
              <Paper elevation={10}>
                <ListItem component="div" disablePadding>
                  <ListItemButton sx={{ height: 56 }}>
                    <ListItemText
                      primary="Repo Content"
                      primaryTypographyProps={{
                        fontWeight: "medium",
                        variant: "body2",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <Box
                  className="flex flex-col"
                  sx={{
                    bgcolor: "#fff",
                    p: 2,
                  }}
                >
                  {content?.map((element) => (
                    <RepoData
                      name={element.name}
                      html_url={element.html_url}
                      type={element.type}
                      key={element.sha}
                    />
                  ))}
                  {repo ? <Languages repo={repo} className="flex" /> : null}
                </Box>
              </Paper>
            </Container>
          </ThemeProvider>
        </Box>
      </div>
    </div>
  );
}

export default RepositoryInfo;
