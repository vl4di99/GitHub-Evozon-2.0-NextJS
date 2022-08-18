import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

function RepoData({ name, html_url, type }) {
  let dirType;
  let fileType;

  if (type == "dir") {
    dirType = type;
  } else if (type == "file") {
    fileType = type;
  }
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ p: 1 }} href={html_url}>
        <ListItemIcon sx={{ color: "inherit" }}>
          {dirType && <FolderIcon color="primary" />}
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
