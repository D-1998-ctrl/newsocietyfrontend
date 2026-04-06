import { Box, } from "@mui/material";

import { NavLink, Outlet } from "react-router-dom";

const InvoicesNav = () => {
  return (
    <Box>

      <Box >
        <Box

          sx={{
            display: "flex",

            mt: 3,
            flexWrap: "wrap",
            justifyContent: "space-around",
            "& a": {
              // Styling for the NavLink components
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              color: 'var(--secondary-color)',
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
                color: "white",
              },
              "&.active": {
                backgroundColor: "#1f5675",
                color: "white",
              },
            }
          }}
        >
          <NavLink to="/invoice/billinvoice">Bill Invoice</NavLink>
          <NavLink to="/invoice/CreateService">Create Service</NavLink>
          <NavLink to="/invoice/InvoiceTemplate">Invoice Template</NavLink>
          <NavLink to="/invoice/DemoInvoice">Demo Invoice</NavLink>


        </Box>
      </Box>
      <Box sx={{ pt: 5 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default InvoicesNav;

