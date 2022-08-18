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
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { axiosHeaders, repoContent } from "../../atoms/repository";
import RepoData from "./RepoData";

function RepositoryInfo({ avatar, curUrl, name }) {
  const [repoC, setRepoC] = useState([]);
  const headersAx = useRecoilValue(axiosHeaders);
  const getRepoContents = async () => {
    await axios({
      method: "get",
      url: `https://api.github.com/repos${curUrl}/contents`,
      headers: headersAx,
    }).then((res) => {
      setRepoC(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    getRepoContents();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-col justify-start items-center bg-gradient-to-b from-slate-400 to-white min-w-full">
        <Avatar
          src={avatar}
          alt="User Avatar"
          className="border-4 border-stone-800 w-52 h-52 mt-10"
        />
        <Typography variant="h5" className="mt-2">
          {name}
        </Typography>

        <Box className="flex justify-center m-5 min-w-full">
          <ThemeProvider
            theme={createTheme({
              palette: {
                text: { primary: "#24292f" },
                background: { default: "#fff", paper: "#f6f8fa" },
              },
            })}
          >
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
                sx={{
                  bgcolor: "#fff",
                  p: 2,
                }}
              >
                {repoC.map((element) => (
                  <RepoData
                    name={element.name}
                    html_url={element.html_url}
                    type={element.type}
                  />
                ))}
              </Box>
            </Paper>
          </ThemeProvider>
        </Box>
      </div>
    </div>
  );
}

export default RepositoryInfo;