import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MainComponent from '../MainComponent/Main';
import { logout } from '../../slices/authSlice'; // Adjust the import path as needed
import './SideBar.css';
import { useDispatch } from 'react-redux';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const PersistentDrawerLeft = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: 'transparent' }}>
        <Toolbar sx={{ 
          background: '#173246',
          display: 'flex',
          justifyContent: 'space-between',
          width: 'auto' 
          }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ 
            display: 'flex', 
            padding: '0 2%',
            alignItems: 'center', 
            justifyContent: 'space-between' 
            }}>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#173246',
            color: '#fff',
            textAlign:'center',
            display: 'flex',
            flexDirection: 'column'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className="encloned" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 0, textAlign: 'center' }}>
          <h3 style={{ textAlign: 'center', margin: '0 auto' }}>SHOP-A-LOT</h3>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} sx={{ color: '#fff' }}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
        </div>
        <Divider />
        <List>
          {['Groceries', 'Office Supplies', 'Cleaning Products', 'Electronics'].map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton onClick={() => handleCategoryClick(category)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Books', 'Gardening Supplies', 'Pet Supplies', 'Health & Wellness'].map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton onClick={() => handleCategoryClick(category)}>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Fitness', 'Kitchen Gadgets', 'Toys', 'Office Furniture'].map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton onClick={() => handleCategoryClick(category)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Travel Essentials', 'Arts & Crafts', 'Seasonal Decor', 'Personal Care'].map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton onClick={() => handleCategoryClick(category)}>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <div className="Logout">
          <button onClick={handleLogout} style={{
            background: 'red',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>LOGOUT</button>
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography variant="div">
          <MainComponent selectedCategory={selectedCategory} />
        </Typography>
        <Typography paragraph>
          {/* Additional content here */}
        </Typography>
      </Main>
    </Box>
  );
}

export default PersistentDrawerLeft;
