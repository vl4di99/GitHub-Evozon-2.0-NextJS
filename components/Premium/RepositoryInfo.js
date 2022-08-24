import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";

import { useEffect, useState } from "react";
import Languages from "../LanguagesRatio/Languages";
import RepoData from "./RepoData";

function RepositoryInfo({ avatar, name, content, commits, repo }) {
  const [, setRepoCommits] = useState([]);
  const currentDate = new Date();
  const commitDate = new Date(commits[0]?.commit.committer.date);
  const difference_Bet_Dates = Math.ceil(
    (currentDate.getTime() - commitDate.getTime()) / (1000 * 3600 * 24)
  );

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

        <Box className="flex justify-center m-5 w-fit">
          <ThemeProvider
            theme={createTheme({
              palette: {
                text: { primary: "#24292f" },
                background: { default: "#fff", paper: "#f6f8fa" },
              },
            })}
          >
            <Container>
              <Paper elevation={10}>
                <ListItem
                  component="div"
                  disablePadding
                  className="flex flex-row min-w-full items-center"
                >
                  <ListItemButton className="flex flex-row min-w-full justify-between cursor-default ">
                    <Box className="flex flex-row items-center justify-center">
                      <Avatar
                        src={commits[0]?.committer.avatar_url}
                        alt="Committer image"
                        className="w-7 h-7"
                      />
                      <Typography
                        variant="h7"
                        className="hover:underline m-3 min-w-fit"
                      >
                        <b>{commits[0]?.committer.login}</b>
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className="hover:underline hover:text-blue-700 m-2"
                      >
                        <a href={commits[0]?.html_url}>
                          {commits[0]?.commit.message.length > 150
                            ? commits[0]?.commit.message.slice(0, 150) + "..."
                            : commits[0]?.commit.message}
                        </a>
                      </Typography>
                    </Box>
                    <Box className="flex flex-row items-center justify-center">
                      <Typography
                        variant="subtitle2"
                        className="flex hover:text-blue-700 m-2"
                      >
                        <a href={commits[0]?.html_url}>
                          <u>{commits[0]?.sha.slice(0, 7)}</u>
                        </a>
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className="flex hover:text-blue-700 hover:underline m-2"
                      >
                        <a href={commits[0]?.html_url}>
                          <b>{difference_Bet_Dates}</b>&nbsp;days ago
                        </a>
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className="flex hover:text-blue-700"
                      >
                        <HistoryIcon className="mr-1" />
                        <b>{commits.length} </b>&nbsp;commits
                      </Typography>
                    </Box>
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
                      element={element}
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
