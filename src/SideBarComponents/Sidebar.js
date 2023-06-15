import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListSubheader from "@mui/material/ListSubheader";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Reno from "../reno-systems.png";
import Profile from "../Profile.png";
import moment from 'moment/moment';

const drawerWidth = 250;
const data = [{ label: "Users" }, { label: "Profiles" }, { label: "Group" }];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: "0 50px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar(props) {
  const [open, setOpen] = React.useState(false);
  const [list1, setOpenList1] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleList1Open = () => {
    setOpenList1(!list1);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ ...(!open && { display: "none" }) }} />
          </IconButton>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <DrawerHeader>
            <div
              style={{
                width: "1440px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div>
                <h4>
                  Good Morning! <span style={{color:'#888',}}>{moment().format("ddd MMM DD, YYYY LT")}</span>
                </h4>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <IconButton>
                  <HelpOutlineIcon />
                </IconButton>
                <IconButton>
                  <NotificationsIcon />
                  <span className="notification">9+</span>
                </IconButton>
                <span
                  style={{ paddingLeft: "10px", borderLeft: "1px solid #ccc" }}
                >
                  Nader Amer
                </span>
                <img
                  src={Profile}
                  alt="Profile"
                  style={{ border: "0", borderRadius: "20px", height: "24px" }}
                />
                <IconButton>
                  <ExpandMore />
                </IconButton>
              </div>
            </div>
          </DrawerHeader>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#050e2d",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <img src={Reno} alt="Reno System Logo" />
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            borderRadius: "100px",
            margin: "0 10px",
            paddingLeft: "20px",
          }}
        >
          <InputBase
            placeholder="Quick access"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Divider />
        <List sx={{ color: "#828796" }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon sx={{ color: "#828796" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </List>
        <Divider />
        <List sx={{ color: "#828796" }}>
          <ListSubheader
            component="div"
            id="sub-header"
            sx={{ backgroundColor: "#050e2d", color: "#828796" }}
          >
            Settings
          </ListSubheader>
          <ListItemButton>
            <ListItemText primary="ATM Settings" />
            <ExpandMore />
          </ListItemButton>

          <ListItemButton>
            <ListItemText primary="Business Setup" />
            <ExpandMore />
          </ListItemButton>

          <ListItemButton onClick={handleList1Open}>
            <ListItemText primary="User Management" />
            {list1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {list1 &&
            data.map((item) => (
              <ListItemButton
                key={item.label}
                sx={{
                  py: 0,
                  px: "2em",
                  minHeight: 32,
                  color: "rgba(255,255,255,.8)",
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                />
              </ListItemButton>
            ))}

          <ListItemButton>
            <ListItemText primary="License Management" />
          </ListItemButton>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
}
