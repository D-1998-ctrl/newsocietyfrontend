import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import GroupIcon from '@mui/icons-material/Group';

export const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardCustomizeRoundedIcon />,
    submenus: [],
  },


{
    title: "Members",
    path: '/members',
    icon: <GroupIcon />,
  },



  {
    title: "Invoice",
    path: '/invoice/billinvoice',
    icon: <ReceiptIcon />,
    submenus: [],
  },

  {
    title: "Audit Template",
    path: '/auditTemplate',
    icon: <DescriptionIcon />,
  },

  {
    title: "Reports",
    icon: <DescriptionIcon />,
    submenus: [
      {
        title: "Profit & Loss",
        path: "/profitloss",
        icon: <FiberManualRecordIcon sx={{ fontSize: 15 }} />,
      },

      {
        title: "Audit Report",
        path: "/auditreport",
        icon: <FiberManualRecordIcon sx={{ fontSize: 15 }} />,
      },

    ],
  },

];
