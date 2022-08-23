import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export const DirectoryContent = ({ dirContent }) => {
  console.log(dirContent);
  return (
    <div>
      {dirContent.map((element) => {
        console.log(element);
        return (
          <ListItem disablePadding>
            <ListItemButton sx={{ p: 1 }}>
              <ListItemIcon sx={{ color: "inherit" }}>
                {element.type == "dir" && <FolderIcon color="secondary" />}
                {element.type == "file" && <InsertDriveFileIcon />}
              </ListItemIcon>
              <ListItemText
                primary={element.name}
                primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </div>
  );
};
