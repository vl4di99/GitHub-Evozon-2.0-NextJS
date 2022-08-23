import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import axios from "axios";
import { useState } from "react";

function RepoData({ name, html_url, type, element }) {
  let dirType;
  let fileType;

  if (type == "dir") {
    dirType = type;
  } else if (type == "file") {
    fileType = type;
  }

  const [code, setCode] = useState({});

  const handleClick = async () => {
    console.log(element.type);
    // const res = await axios.get(element.download_url);
    // console.log(res);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ p: 1 }} onClick={handleClick}>
        <ListItemIcon sx={{ color: "inherit" }}>
          {dirType && <FolderIcon color="secondary" />}
          {fileType && <InsertDriveFileIcon />}
        </ListItemIcon>
        <ListItemText
          primary={name}
          primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default RepoData;
