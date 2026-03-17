import {
    useState,
    useEffect
} from "react";
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Chip,
    Avatar
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Outlet, Link } from "react-router-dom";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import LogoutIcon from '@mui/icons-material/Logout';
import "./sidebar.css";
import { menuItems } from "../Components/menuItems";
import logo from '../imgs/companyLogo.png';
// import logonew from '../imgs/logo.png';
import logonew from '../imgs/LogoFour.png';
import user from '../imgs/user.png';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
// import LogoOne from "../imgs/LogoOne.png"
import LogoOne from "../imgs/LogoThree.png"

function Sidebar() {
    const API_URL = process.env.REACT_APP_URL
    console.log(API_URL)
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [orgData, setOrgData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrgData = async () => {
            try {
                const response = await fetch(`${API_URL}/Organisation/`);

                if (!response.ok) {
                    throw new Error("Failed to fetch organization data");
                }
                const data = await response.json();
                console.log(data)
                setOrgData(data[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrgData();
    }, [API_URL]);



    const handleToggleSidebar = () => {
        if (isSmallScreen) {
            setIsSidebarVisible(!isSidebarVisible);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    const handleToggleSubmenu = (path) => {
        setOpenMenu(openMenu === path ? null : path);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const logoutUser = () => {
        // sessionStorage.clear();
        navigate("/");
    };

    return (
        <div className="grid-container">
            <header className="header">

                <Box
                    component="header"
                    sx={{
                        display: "flex",
                        gap: 3,
                        flexDirection: isSmallScreen ? "column" : "row",
                        alignItems: isSmallScreen ? "flex-start" : "center",
                    }}
                >
                    <Box className="bar-icon">
                        <DensitySmallIcon
                            onClick={handleToggleSidebar}
                            style={{ fontSize: "1.8rem", cursor: "pointer" }}
                        />
                    </Box>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        flex={1}
                        m={isSmallScreen ? 0 : 2}
                        color="#000"
                        flexDirection={isSmallScreen ? "column" : "row"}
                        gap={isSmallScreen ? 2 : 0}
                    >
                        {/* LEFT: Society Info */}
                        <Box display="flex" flexDirection="column">
                            {loading ? (
                                <Typography variant="body1">Loading organization data...</Typography>
                            ) : error ? (
                                <Typography variant="body1" color="error">
                                    {error}
                                </Typography>
                            ) : orgData ? (
                                <>
                                    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                                        <Typography variant="body1" sx={{
                                            fontSize: { xs: "1rem", sm: "0.8rem" },
                                            fontWeight: 600,
                                        }}>
                                            <b>{orgData.SocietyName}</b>
                                        </Typography>
                                        {/* <Chip
                                            label={orgData.Registration}
                                            sx={{
                                                fontSize: { sm: '0.6rem' },
                                                backgroundColor: "#25D366",
                                                color: "#fff",
                                           
                                                height: { xs: "20px", sm: "16px" },
                                            }}
                                        /> */}
                                        <Chip
                                            label={orgData.Registration}
                                            sx={{
                                                fontSize: { sm: '0.6rem' },
                                                backgroundColor: "#25D366",
                                                color: "#fff",
                                                height: { xs: "20px", sm: "16px" },

                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",

                                                "& .MuiChip-label": {
                                                    padding: "0 6px",
                                                    lineHeight: 1,
                                                },
                                            }}
                                        />

                                    </Box>

                                    <Typography variant="body2" sx={{
                                        fontSize: { sm: "0.8rem" },

                                    }} >
                                        {`${orgData.AddressLine1}, ${orgData.AddressLine2}, ${orgData.AddressLine3}`}
                                    </Typography>

                                    <Typography variant="body2" sx={{
                                        fontSize: { sm: "0.8rem" },
                                    }}  >
                                        {`${orgData.State} - ${orgData.Pin}`}
                                    </Typography>
                                </>
                            ) : null}
                        </Box>

                        {/* RIGHT: Registration Details */}
                        {orgData && (
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems={isSmallScreen ? "flex-start" : "flex-end"}
                            >
                                <Typography variant="body1">
                                    <b>Registration Details</b>
                                </Typography>

                                <Box
                                    display="flex"
                                    gap={2}
                                    flexDirection={isSmallScreen ? "column" : "row"}

                                >
                                    <Typography variant="body2">
                                        <b>Date:</b> {formatDate(orgData.RegisteredDate)}
                                    </Typography>
                                    <Typography variant="body2">
                                        <b>No:</b> {orgData.Registration}
                                    </Typography>
                                    <Typography variant="body2">
                                        <b>Authority:</b> {orgData.RegisteringAuthority}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>


            </header>
            <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isSidebarVisible ? "show" : ""}`}>
                <IconButton onClick={handleToggleSidebar} className="toggle-button">
                    {isCollapsed ? <ChevronRight className="toggle-icon" /> : <ChevronLeft className="toggle-icon" />}
                </IconButton>
                <Box
                    component="aside"
                    style={{
                        width: isCollapsed ? "50px" : "225px",
                        padding: 5,
                        transition: "width 0.3s",
                    }}
                >
                    {/* <Box sx={{ pt: 3, display: "flex", alignItems: "center", justifyContent: "start", gap: 1 }}>
                        <div style={{ textAlign: "center" }}>
                            <img
                                src={isCollapsed ? logonew : LogoOne}
                                alt="logo"
                                style={{ height: "50px", margin: "0 auto", width: isCollapsed ? "50px" : "auto" }}
                            />
                        </div>
                        {!isCollapsed && <Typography variant="h5" className="company-name-text"></Typography>}
                    </Box> */}



                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            //  height: "250px",
                            //  backgroundColor: "#053e64",
                            borderRadius: "10px",
                            overflow: "hidden",

                        }}
                    >
                        <img
                            src={isCollapsed ? logonew : LogoOne}
                            alt="logo"
                            style={{
                                height: isCollapsed ? "60px" : "200px",
                                width: "auto",
                                objectFit: "contain"
                            }}
                        />
                    </div>
                    {/* <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
     height: "120px",
    // backgroundColor: "#053e64",
    // borderRadius: "10px",
    overflow: "hidden",
   
  }}
>
  <img
    src={isCollapsed ? logonew : LogoOne}
    alt="logo"
    style={{
      height: isCollapsed ? "70px" : "220px",
      width: "auto",
      objectFit: "contain"
    }}
  />
</div> */}



                    <Box className="sidebar-contents" sx={{ mt: 2 }}>
                        <List sx={{ cursor: "pointer" }}>
                            {menuItems.map((item, index) => (
                                <Box key={index}>
                                    <ListItem
                                        onClick={() => handleToggleSubmenu(item.path)}
                                        className="menu-item"
                                        sx={{
                                            mt: 1,
                                            color: 'black',
                                            borderRadius: "10px",
                                            transition: "background-color 0.3s, color 0.3s",
                                            "&:hover": {
                                                color: "#fff",
                                                // backgroundColor: "#2c85de",
                                                backgroundColor: "#1b90bb",
                                                ".menu-icon": {
                                                    color: "#fff",
                                                },
                                                ".menu-text": {
                                                    color: "#fff",
                                                },
                                            },
                                        }}
                                        component={item.submenus?.length ? "div" : Link}
                                        to={item.submenus?.length ? undefined : item.path}
                                    >
                                        <ListItemIcon sx={{ fontSize: "1.5rem" }} className="menu-icon">
                                            {item.icon}
                                        </ListItemIcon>
                                        {!isCollapsed && <ListItemText primary={item.title} sx={{ ml: -2 }} />}
                                        {!isCollapsed && item.submenus?.length > 0 && (
                                            <ListItemIcon sx={{ justifyContent: "end" }}>
                                                {openMenu === item.path ? <ExpandLess className="menu-icon" /> : <ExpandMore className="menu-icon" />}
                                            </ListItemIcon>
                                        )}
                                    </ListItem>
                                    {item.submenus?.length > 0 && (
                                        <Collapse in={openMenu === item.path} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {item.submenus.map((subItem, subIndex) => (
                                                    <ListItem
                                                        key={subIndex}
                                                        component={Link}
                                                        to={subItem.path}
                                                        className="menu-item"
                                                        sx={{
                                                            mt: 1,
                                                            borderRadius: "10px",
                                                            color: "#157497",
                                                            pl: 4,
                                                            transition: "background-color 0.3s, color 0.3s",
                                                            "&:hover": {
                                                                color: "#fff",
                                                                backgroundColor: "#157497",
                                                                ".menu-icon": {
                                                                    color: "#fff",
                                                                },
                                                                ".menu-text": {
                                                                    color: "#fff",
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <ListItemIcon sx={{ fontSize: "1.2rem" }} className="menu-icon">
                                                            {subItem.icon}
                                                        </ListItemIcon>
                                                        {!isCollapsed && <ListItemText primary={subItem.title} sx={{ ml: -2 }} className="menu-text" />}
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Collapse>
                                    )}
                                </Box>
                            ))}
                        </List>

                        <Box className="user-profile-section" sx={{ mt: 'auto', p: 2 }}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Avatar
                                    src={user}
                                    alt="User"
                                    sx={{
                                        width: 35,
                                        height: 35,
                                        border: '2px solid #046183'
                                        // #2c85de'
                                    }}
                                />
                                {!isCollapsed && (
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Chavan Diksha
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            Admin
                                        </Typography>
                                    </Box>
                                )}
                                {!isCollapsed && (
                                    <IconButton
                                        size="small"
                                        sx={{
                                            ml: 'auto',
                                            color: 'error.main',
                                            '&:hover': {
                                                backgroundColor: 'rgba(244, 67, 54, 0.08)'
                                            }
                                        }}
                                        onClick={logoutUser}
                                    >
                                        <LogoutIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </aside>
            <main className="main">
                <Box component="main">
                    <Outlet />
                </Box>
            </main>
        </div>
    );
}

export default Sidebar;