import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DirectoryContent } from "../DirectoryContent";

import { useState } from "react";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { DirectoryContet } from "../DirectoryContent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

function RepoData({ name, html_url, type, element }) {
  console.log(element);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    handleClick();
  };
  const handleClose = () => setOpen(false);

  let dirType;
  let fileType;

  if (type == "dir") {
    dirType = type;
  } else if (type == "file") {
    fileType = type;
  }

  const [code, setCode] = useState("");
  const [dirContent, setDirContent] = useState([]);

  const handleClick = async () => {
    if (element.type === "file") {
      const res = await axios.get(element.download_url);
      const fileData = res.data;
      setCode(fileData);
    } else if (element.type === "dir") {
      const res = await axios.get(element.url);
      const contentArr = res.data;
      setDirContent(contentArr);
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ p: 1 }} onClick={handleOpen}>
        <ListItemIcon sx={{ color: "inherit" }}>
          {dirType && <FolderIcon color="secondary" />}
          {fileType && <InsertDriveFileIcon />}
        </ListItemIcon>
        <ListItemText
          primary={name}
          primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
        />
      </ListItemButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex flex-col ">
          <IconButton
            aria-label="close"
            color="secondary"
            className="flex self-end"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="secondary"
          >
            {element.name}
          </Typography>
          {element.type === "file" ? (
            !element.name.includes("package") ? (
              element.name.includes(".png") ? (
                <img
                  src={element.download_url}
                  className="max-w-sm flex self-center"
                />
              ) : (
                <pre>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2 }}
                    className="max-h-96 overflow-auto"
                    color="#6c757d"
                  >
                    <code>{code}</code>
                  </Typography>
                </pre>
              )
            ) : (
              <Typography>Sorry, this file is too big to show</Typography>
            )
          ) : (
            <DirectoryContent dirContent={dirContent} />
          )}
        </Box>
      </Modal>
    </ListItem>
  );
}

export default RepoData;
