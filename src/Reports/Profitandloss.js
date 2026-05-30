
// import { useState, useEffect } from 'react';
// import { DatePicker } from "@mui/x-date-pickers";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { Divider, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Button } from '@mui/material';
// import newlogo from '../imgs/companyLogo.png'


// const Profitandloss = () => {
//     const REACT_APP_URL = process.env.REACT_APP_URL
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const [profitlossData, setProfitlossData] = useState([]);   
//     const [previewOpen, setPreviewOpen] = useState(false);


//     const getProfitandloss = () => {

//         if (!fromDate || !toDate) {
//             alert("Please select From Date and To Date");
//             return; 
//         }

//         const formatDate = (date) => {
//             if (!date) return '';
//             return new Date(date).toLocaleDateString('en-CA');
//         };
//         const formattedFromDate = formatDate(fromDate);
//         const formattedToDate = formatDate(toDate);
//         const url = `${REACT_APP_URL}/Account/profit-loss/report/?fromDate=${formattedFromDate}&toDate=${formattedToDate}`;
//         // console.log("URL:", url);

//         const requestOptions = {
//             method: "GET",
//             redirect: "follow"
//         };

//         fetch(url, requestOptions)
//             .then((response) => response.json())
//             .then(data => {
//                 // console.log('data', data)
//                 setProfitlossData(data);
//                 setPreviewOpen(true)

//             })
//             .catch((error) => console.error(error));
//     };

//     //for org data 
//     const [orgData, setOrgData] = useState(null);
//     const fetchOrgData = async () => {
//         try {
//             const response = await fetch(`${REACT_APP_URL}/Organisation/`);

//             if (!response.ok) {
//                 throw new Error("Failed to fetch organization data");
//             }

//             const data = await response.json();
//             // console.log(data);
//             setOrgData(data[0]);
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     useEffect(() => {
//         fetchOrgData();
//     }, []);

//     const totalExpenses =
//         profitlossData?.expenseLedgers?.reduce(
//             (sum, item) => sum + (item.opening || 0),
//             0
//         ) || 0;

//     const totalIncome =
//         profitlossData?.incomeLedgers?.reduce(
//             (sum, item) => sum + (item.opening || 0),
//             0
//         ) || 0;

//     const netProfitLoss = totalIncome - totalExpenses;


    

//     return (
//         <Box>
//             <Box textAlign={'center'} mt={1}>
//                 <Typography sx={{ color: 'var(--primary-color)', }} variant='h4'><b>Profit And Loss Report</b></Typography>
//             </Box>

//             <Box sx={{ p: 5, height: 'auto' }}>

//                 <Box>
//                     <LocalizationProvider dateAdapter={AdapterDateFns}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', m: 1, gap: 2 }}>

//                             <Box flex={1} >
//                                 <Typography>From Date</Typography>
//                                 <DatePicker
//                                     value={fromDate ? new Date(fromDate) : null}
//                                     format="dd-MM-yyyy"
//                                     onChange={(newValue) => setFromDate(newValue)}
//                                     slotProps={{
//                                         textField: { size: "small", fullWidth: true },
//                                     }}
//                                 />
//                             </Box>



//                             <Box flex={1} >
//                                 <Typography>To Date</Typography>
//                                 <DatePicker
//                                     value={toDate ? new Date(toDate) : null}
//                                     format="dd-MM-yyyy"
//                                     onChange={(newValue) => setToDate(newValue)}
//                                     slotProps={{
//                                         textField: { size: "small", fullWidth: true },
//                                     }}
//                                 />
//                             </Box>

//                         </Box>



//                     </LocalizationProvider>
//                 </Box>

//                 <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5}>
//                     <Button
//                     sx={{ background: 'var(--secondary-color)' }}
//                         variant="contained"
//                         onClick={getProfitandloss}
//                     >
//                         <b>Get Profit & Loss Report </b>
//                     </Button>
//                 </Box>

//                 <Dialog
//                     open={previewOpen}
//                     onClose={() => setPreviewOpen(false)}
//                     maxWidth="xlg" fullWidth
//                 >
//                     <DialogTitle sx={{ textAlign: 'center' }}>
//                         <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
//                             <img src={newlogo} alt="Logo" style={{ width: "70px", }} />
//                             <Typography>{orgData?.SocietyName}</Typography>
//                         </Box>
//                         <Typography sx={{ mt: 1 }}>
//                             {orgData?.AddressLine1}
//                         </Typography>
//                         <Typography sx={{ fontWeight: 'bold', mt: 1 }}>
//                             Profit & Loss Report for  {fromDate ? new Date(fromDate).toLocaleDateString('en-GB') : '-'}  to  {toDate ? new Date(toDate).toLocaleDateString('en-GB') : '-'}
//                         </Typography>
//                         <Divider sx={{ mt: 1 }} />
//                     </DialogTitle>

//                     <DialogContent >
//                         <Box display="flex" gap={3} mt={2}>

//                             {/* EXPENSES - LEFT */}
//                             <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
//                                 <Typography variant="h6" mb={2}>Expenses</Typography>

//                                 {profitlossData?.expenseLedgers?.length > 0 ? (
//                                     profitlossData.expenseLedgers.map((item) => (
//                                         <Box
//                                             key={item._id}
//                                             display="flex"
//                                             justifyContent="space-between"
//                                             py={1}
//                                             borderBottom="1px solid #eee"
//                                         >
//                                             <Typography>{item.accountName}</Typography>
//                                             <Typography>₹ {item.opening}</Typography>
//                                         </Box>
//                                     ))
//                                 ) : (
//                                     <Typography>No expense records found</Typography>
//                                 )}
//                             </Paper>

//                             {/* INCOME - RIGHT */}
//                             <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
//                                 <Typography variant="h6" mb={2}>Income</Typography>

//                                 {profitlossData?.incomeLedgers?.length > 0 ? (
//                                     profitlossData.incomeLedgers.map((item) => (
//                                         <Box
//                                             key={item._id}
//                                             display="flex"
//                                             justifyContent="space-between"
//                                             py={1}
//                                             borderBottom="1px solid #eee"
//                                         >
//                                             <Typography>{item.accountName}</Typography>
//                                             <Typography>₹ {item.opening}</Typography>
//                                         </Box>
//                                     ))
//                                 ) : (
//                                     <Typography>No income records found</Typography>
//                                 )}
//                             </Paper>

//                         </Box>

//                         {/* SUMMARY */}
//                         <Paper elevation={3} sx={{ p: 2 }}>
//                             <Typography variant="h6">Summary</Typography>

//                             <Typography><strong>Total Income:</strong> ₹ {totalIncome.toFixed(2)}</Typography>

//                             <Typography>
//                                 <strong>Total Expenses:</strong>{" "}
//                                 ₹{netProfitLoss > 0
//                                     ? (totalExpenses + netProfitLoss).toFixed(2)
//                                     : totalExpenses.toFixed(2)}
//                             </Typography>

//                             <Typography sx={{ mt: 1 }} color={netProfitLoss >= 0 ? "green" : "red"}>
//                                 <strong>Net {netProfitLoss >= 0 ? "Profit" : "Loss"}:</strong>{" "}
//                                ₹ {Math.abs(netProfitLoss).toFixed(2)}
//                             </Typography>
//                         </Paper>

//                         {/* <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
//                             <Typography variant="h6" mb={2}>Summary</Typography>
//                             <Box sx={{ p: 3 }}>
//                                 <Box display="flex" justifyContent="space-between">
//                                     <Typography>
//                                         <strong>Total Expenses:</strong> ₹ {totalExpenses.toFixed(2)}
//                                     </Typography>

//                                     <Typography>
//                                         <strong>Total Income:</strong> ₹ {totalIncome.toFixed(2)}
//                                     </Typography>
//                                 </Box>

//                                 <Divider sx={{ my: 2 }} />

                                
//                                 <Typography>
//                                     <strong>
//                                         {netProfitLoss >= 0 ? "Net Profit" : "Net Loss"}:
//                                     </strong>{" "}
//                                     ₹ {Math.abs(netProfitLoss).toFixed(2)}
//                                 </Typography>

//                                 <Divider sx={{ my: 2 }} />

                               
//                                 <Box display="flex" justifyContent="space-between">
//                                     <Typography>
//                                         <strong>Adjusted Total Expenses:</strong>{" "}
//                                         ₹{" "}
//                                         {netProfitLoss > 0
//                                             ? (totalExpenses + netProfitLoss).toFixed(2)
//                                             : totalExpenses.toFixed(2)}
//                                     </Typography>

//                                     <Typography>
//                                         <strong>Adjusted Total Income:</strong>{" "}
//                                         ₹{" "}
//                                         {netProfitLoss < 0
//                                             ? (totalIncome + Math.abs(netProfitLoss)).toFixed(2)
//                                             : totalIncome.toFixed(2)}
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                         </Paper> */}

//                         {profitlossData?.boardMembers?.length > 0 && (
//                             <Box sx={{ p: 1, mt: 1 }}>
//                                 <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
//                                     {profitlossData?.boardMembers
//                                         .filter(member =>
//                                             ['President', 'Secretary', 'Treasurer'].includes(member.position)
//                                         )
//                                         .map((member, index) => (
//                                             <Box key={index} sx={{ textAlign: 'center', mx: 2 }}>
//                                                 {/* Name */}
//                                                 <Typography variant="body1">
//                                                     {member.name}
//                                                 </Typography>

//                                                 {/* Position */}
//                                                 <Typography variant="body1" fontWeight="bold">
//                                                     {member.position}
//                                                 </Typography>

//                                                 {/* Signature */}
//                                                 <Typography variant="body2" sx={{ mt: 2 }}>
//                                                     Signature:
//                                                 </Typography>
//                                                 <Box sx={{ borderBottom: '1px solid black', width: 200, mt: 4 }} />
//                                             </Box>
//                                         ))}
//                                 </Box>
//                             </Box>
//                         )}


//                     </DialogContent>
//                     <Divider />

//                     <DialogActions>
//                         <Button variant='contained' onClick={() => setPreviewOpen(false)} >
//                             Close
//                         </Button>
//                     </DialogActions>
//                 </Dialog>


//             </Box >
//         </Box >
//     );
// };

// export default Profitandloss;
import { useState, useEffect } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
    Divider, Paper, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, Typography, Button
} from '@mui/material';
import newlogo from '../imgs/companyLogo.png';
import Cookies from "js-cookie";

const Profitandloss = () => {
    const REACT_APP_URL = process.env.REACT_APP_URL;
    const societyId = Cookies.get("societyId");

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [profitlossData, setProfitlossData] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orgData, setOrgData] = useState(null);

    // ─── Fetch Organisation Data ───────────────────────────────────────────────
    const fetchOrgData = async () => {
        try {
            const response = await fetch(`${REACT_APP_URL}/Organisation/${societyId}`);
            if (!response.ok) throw new Error("Failed to fetch organization data");
            const data = await response.json();
            setOrgData(data);
        } catch (err) {
            console.error("Org fetch error:", err.message);
        }
    };

    useEffect(() => {
        fetchOrgData();
    }, []);

    // ─── Fetch Profit & Loss ───────────────────────────────────────────────────
    const getProfitandloss = async () => {
        if (!fromDate || !toDate) {
            alert("Please select From Date and To Date");
            return;
        }

        // Format date safely (avoids timezone shift)
        const formatDate = (date) => {
            const d = new Date(date);
            return d.toISOString().split('T')[0];
        };

        const formattedFromDate = formatDate(fromDate);
        const formattedToDate = formatDate(toDate);

        const url = `${REACT_APP_URL}/Account/reports/profit-loss/${societyId}?fromDate=${formattedFromDate}&toDate=${formattedToDate}`;

        console.log("Fetching URL:", url);
        setLoading(true);

        try {
            const response = await fetch(url, { method: "GET" });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response:", data);

            // Guard: ensure expected shape
            if (!data || typeof data !== 'object') {
                throw new Error("Unexpected response format");
            }

            setProfitlossData(data);
            setPreviewOpen(true);

        } catch (error) {
            console.error("Error fetching Profit & Loss:", error);
            alert(`Failed to fetch Profit & Loss data: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // ─── Calculations ──────────────────────────────────────────────────────────
    const totalExpenses =
        profitlossData?.expenseLedgers?.reduce(
            (sum, item) => sum + (item.opening || 0), 0
        ) ?? 0;

    const totalIncome =
        profitlossData?.incomeLedgers?.reduce(
            (sum, item) => sum + (item.opening || 0), 0
        ) ?? 0;

    // FIX: Simple subtraction — no manipulation of totals
    const netProfitLoss = totalIncome - totalExpenses;

    // ─── Render ────────────────────────────────────────────────────────────────
    return (
        <Box>
            {/* Page Title */}
            <Box textAlign="center" mt={1}>
                <Typography sx={{ color: 'var(--primary-color)' }} variant="h4">
                    <b>Profit And Loss Report</b>
                </Typography>
            </Box>

            <Box sx={{ p: 5, height: 'auto' }}>

                {/* Date Pickers */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box sx={{ display: 'flex', alignItems: 'center', m: 1, gap: 2 }}>

                        <Box flex={1}>
                            <Typography>From Date</Typography>
                            <DatePicker
                                value={fromDate ? new Date(fromDate) : null}
                                format="dd-MM-yyyy"
                                onChange={(newValue) => setFromDate(newValue)}
                                slotProps={{ textField: { size: "small", fullWidth: true } }}
                            />
                        </Box>

                        <Box flex={1}>
                            <Typography>To Date</Typography>
                            <DatePicker
                                value={toDate ? new Date(toDate) : null}
                                format="dd-MM-yyyy"
                                onChange={(newValue) => setToDate(newValue)}
                                slotProps={{ textField: { size: "small", fullWidth: true } }}
                            />
                        </Box>

                    </Box>
                </LocalizationProvider>

                {/* Submit Button */}
                <Box display="flex" alignItems="center" justifyContent="center" gap={2} mt={5}>
                    <Button
                        sx={{ background: 'var(--secondary-color)' }}
                        variant="contained"
                        onClick={getProfitandloss}
                        disabled={loading}
                    >
                        <b>{loading ? "Loading..." : "Get Profit & Loss Report"}</b>
                    </Button>
                </Box>

                {/* ── Dialog / Preview ─────────────────────────────────────────── */}
                <Dialog
                    open={previewOpen}
                    onClose={() => setPreviewOpen(false)}
                    maxWidth="lg"
                    fullWidth
                >
                    {/* Header */}
                    <DialogTitle sx={{ textAlign: 'center' }}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                            <img src={newlogo} alt="Logo" style={{ width: "70px" }} />
                            <Typography variant="h6">{orgData?.SocietyName}</Typography>
                        </Box>
                        <Typography sx={{ mt: 1 }}>{orgData?.AddressLine1}</Typography>
                        <Typography sx={{ fontWeight: 'bold', mt: 1 }}>
                            Profit & Loss Report — {' '}
                            {fromDate ? new Date(fromDate).toLocaleDateString('en-GB') : '-'} to {' '}
                            {toDate ? new Date(toDate).toLocaleDateString('en-GB') : '-'}
                        </Typography>
                        <Divider sx={{ mt: 1 }} />
                    </DialogTitle>

                    <DialogContent>
                        {/* Two-Column: Expenses | Income */}
                        <Box display="flex" gap={3} mt={2}>

                            {/* EXPENSES */}
                            <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
                                <Typography variant="h6" mb={2}>Expenses</Typography>

                                {profitlossData?.expenseLedgers?.length > 0 ? (
                                    profitlossData.expenseLedgers.map((item) => (
                                        <Box
                                            key={item._id}
                                            display="flex"
                                            justifyContent="space-between"
                                            py={1}
                                            borderBottom="1px solid #eee"
                                        >
                                            <Typography>{item.accountName}</Typography>
                                            <Typography>₹ {(item.opening || 0).toFixed(2)}</Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography color="text.secondary">No expense records found</Typography>
                                )}

                                {/* Expenses Total Row */}
                                {profitlossData?.expenseLedgers?.length > 0 && (
                                    <Box display="flex" justifyContent="space-between" pt={1} mt={1}>
                                        <Typography fontWeight="bold">Total</Typography>
                                        <Typography fontWeight="bold">₹ {totalExpenses.toFixed(2)}</Typography>
                                    </Box>
                                )}
                            </Paper>

                            {/* INCOME */}
                            <Paper elevation={3} sx={{ flex: 1, p: 2 }}>
                                <Typography variant="h6" mb={2}>Income</Typography>

                                {profitlossData?.incomeLedgers?.length > 0 ? (
                                    profitlossData.incomeLedgers.map((item) => (
                                        <Box
                                            key={item._id}
                                            display="flex"
                                            justifyContent="space-between"
                                            py={1}
                                            borderBottom="1px solid #eee"
                                        >
                                            <Typography>{item.accountName}</Typography>
                                            <Typography>₹ {(item.opening || 0).toFixed(2)}</Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography color="text.secondary">No income records found</Typography>
                                )}

                                {/* Income Total Row */}
                                {profitlossData?.incomeLedgers?.length > 0 && (
                                    <Box display="flex" justifyContent="space-between" pt={1} mt={1}>
                                        <Typography fontWeight="bold">Total</Typography>
                                        <Typography fontWeight="bold">₹ {totalIncome.toFixed(2)}</Typography>
                                    </Box>
                                )}
                            </Paper>

                        </Box>

                        {/* ── Summary ───────────────────────────────────────────────── */}
                        <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
                            <Typography variant="h6" mb={1}>Summary</Typography>

                            {/* FIX: straightforward totals — no extra arithmetic */}
                            <Box display="flex" justifyContent="space-between" py={0.5}>
                                <Typography><strong>Total Income:</strong></Typography>
                                <Typography>₹ {totalIncome.toFixed(2)}</Typography>
                            </Box>

                            <Box display="flex" justifyContent="space-between" py={0.5}>
                                <Typography><strong>Total Expenses:</strong></Typography>
                                <Typography>₹ {totalExpenses.toFixed(2)}</Typography>
                            </Box>

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="space-between" py={0.5}>
                                <Typography
                                    fontWeight="bold"
                                    color={netProfitLoss >= 0 ? "green" : "red"}
                                >
                                    Net {netProfitLoss >= 0 ? "Profit" : "Loss"}:
                                </Typography>
                                <Typography
                                    fontWeight="bold"
                                    color={netProfitLoss >= 0 ? "green" : "red"}
                                >
                                    ₹ {Math.abs(netProfitLoss).toFixed(2)}
                                </Typography>
                            </Box>
                        </Paper>

                        {/* ── Board Members Signatures ──────────────────────────────── */}
                        {profitlossData?.boardMembers?.length > 0 && (
                            <Box sx={{ p: 1, mt: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                                    {profitlossData.boardMembers
                                        .filter(member =>
                                            ['President', 'Secretary', 'Treasurer'].includes(member.position)
                                        )
                                        .map((member, index) => (
                                            <Box key={index} sx={{ textAlign: 'center', mx: 2 }}>
                                                <Typography variant="body1">{member.name}</Typography>
                                                <Typography variant="body1" fontWeight="bold">{member.position}</Typography>
                                                <Typography variant="body2" sx={{ mt: 2 }}>Signature:</Typography>
                                                <Box sx={{ borderBottom: '1px solid black', width: 200, mt: 4 }} />
                                            </Box>
                                        ))}
                                </Box>
                            </Box>
                        )}

                    </DialogContent>

                    <Divider />

                    <DialogActions>
                        <Button variant="contained" onClick={() => setPreviewOpen(false)}>
                            Close
                        </Button>
                    </DialogActions>

                </Dialog>

            </Box>
        </Box>
    );
};

export default Profitandloss;