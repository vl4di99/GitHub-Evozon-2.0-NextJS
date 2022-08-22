import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import gitLogoWhite from "../../images/gitLogoWhite.png";

function UserProfile() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex flex-row items-center justify-between p-3 bg-[#24292f] pl-5 pr-5">
      <div className="flex flex-row justify-center items-center">
        <Avatar
          src="https://pngset.com/images-original/github-icon-white-github-icon-black-background-symbol-logo-trademark-steering-wheel-transparent-png-842663.png"
          alt="White Git Logo"
        />
      </div>
      <div className="flex flex-row justify-end items-center">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar
            src={session.picture}
            alt="Premium user picture"
            className="border-y-fuchsia-100 border-2"
          />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem>
            <Typography variant="subtitle2" className="mr-5">
              Signed in as <b>{session.name}</b>
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleSignOut}>
            Logout <LogoutIcon className="ml-5" />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default UserProfile;
