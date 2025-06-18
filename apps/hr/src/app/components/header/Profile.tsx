import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LogoIcon from "../../assets/icon/logoicon.png";

import { useAuth } from "@/app/hooks/useAuth";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import ProgressLoading from "../shared/ProgressLoading";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { auth, signOut } = useAuth();
  
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    handleClose2();
    signOut();
  };

  return (
    <Box>
      {auth.loading && <ProgressLoading />}
      <IconButton
        size="large"
        aria-label="profile menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "400px",
          },
        }}
      >
        <Stack alignItems='center'>
          <Avatar
            src="/images/profile/user-1.jpg"
            alt="image"
            sx={{
              width: 65,
              height: 65,
            }}
          />
          <Typography variant="body1">{auth.user?.first_name} {auth.user?.middle_name} {auth.user?.last_name}</Typography>
        </Stack>
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            onClick={handleLogout} // Use handleLogout here
            variant="outlined"
            color="primary"
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
