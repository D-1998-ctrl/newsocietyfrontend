import { Box, } from "@mui/material";

import { NavLink, Outlet } from "react-router-dom";

const VoucherNav = () => {
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
                                backgroundColor: 'var(--secondary-color)',
                                color: "white",
                            },
                            "&.active": {
                                backgroundColor: '#1f5675',
                                color: "white",
                            },
                        }
                    }}
                >
                    <NavLink to="/voucher/journalvouchers">Journal Vouchers</NavLink>
                    <NavLink to="/voucher/receiptvouchers">Receipt Vouchers</NavLink>
                    <NavLink to="/voucher/purchasevoucher">Purchase Voucher</NavLink>
                    <NavLink to="/voucher/paymentvoucher">Payment Voucher</NavLink>
                    <NavLink to="/voucher/contravoucher">Contra Voucher</NavLink>

                </Box>
            </Box>
            <Box sx={{ pt: 5 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default VoucherNav;