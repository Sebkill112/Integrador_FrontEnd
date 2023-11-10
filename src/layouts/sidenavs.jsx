import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import NavBar from './appBar';
import { useAppStore } from './appStore';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import BookIcon from '@mui/icons-material/Book';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import HomeIcon from '@mui/icons-material/Home';
const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidenavs() {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen)
  const user = JSON.parse(localStorage.getItem('user')); 


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Divider />
        <List>        
          {user.rol.codigo === 1 &&
        <ListItem disablePadding sx={{ display: 'block' }} onClick={()=> navigate("/libros")}>
              <ListItemButton
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="Libros" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            }
             {user.rol.codigo === 1 &&
            <ListItem disablePadding sx={{ display: 'block' }}  onClick={()=> navigate("/sedes")}>
              <ListItemButton
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AddHomeWorkIcon />
                </ListItemIcon>
                <ListItemText primary="Sedes" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            }
            {(user.rol.codigo === 1 || user.rol.codigo === 2) &&
            <ListItem disablePadding sx={{ display: 'block' }}onClick={()=> navigate("/prestamo")} >
              <ListItemButton
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <LibraryAddIcon />
                </ListItemIcon>
                <ListItemText primary="Prestamos" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            }
            {(user.rol.codigo === 1 || user.rol.codigo === 3) &&
            <ListItem disablePadding sx={{ display: 'block' }}onClick={()=> navigate("/retiro")} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <BookmarkAddedIcon />
                </ListItemIcon>
                <ListItemText primary="Retiros" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            }
             {(user.rol.codigo === 1 || user.rol.codigo === 3) &&
            <ListItem disablePadding sx={{ display: 'block' }}onClick={()=> navigate("/devolucion")} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <BookmarkRemoveIcon />
                </ListItemIcon>
                <ListItemText primary="Devoluciones" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            }
            {(user.rol.codigo === 1 || user.rol.codigo === 3) &&
            <ListItem disablePadding sx={{ display: 'block' }}onClick={()=> navigate("/retiro")} >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <BookmarkAddedIcon />
                </ListItemIcon>
                <ListItemText primary="Retiros" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            }
             {(user.rol.codigo === 1 || user.rol.codigo === 2) &&
            <><ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/reporte")}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PictureAsPdfIcon />
                </ListItemIcon>
                <ListItemText primary="Reporte Prestamo" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem><ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate("/reporteDev")}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <PictureAsPdfIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reporte Devoluciones" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem></>
}
        </List>
      </Drawer>
    </Box>
  );
}