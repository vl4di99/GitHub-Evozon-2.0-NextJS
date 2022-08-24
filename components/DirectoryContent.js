import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export const DirectoryContent = ({ dirContent }) => {
  const redirect = (url) => {
    window.open(url);
  };
  return (
    <div>
      {dirContent.map((element) => {
        return (
          <ListItem disablePadding key={element.sha}>
            <ListItemButton
              sx={{ p: 1 }}
              onClick={() => redirect(dirContent[0].html_url)}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                {element.type == "dir" && <FolderIcon color="secondary" />}
                {element.type == "file" && <InsertDriveFileIcon />}
              </ListItemIcon>
              <ListItemText
                primary={element.name}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: "medium",
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </div>
  );
};
