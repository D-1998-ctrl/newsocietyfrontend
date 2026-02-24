
import { useState, useEffect } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Divider, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Button } from '@mui/material';
import newlogo from '../imgs/companyLogo.png'


const Profitandloss = () => {
    const REACT_APP_URL = process.env.REACT_APP_URL
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [profitlossData, setProfitlossData] = useState([]);   
    const [previewOpen, setPreviewOpen] = useState(false);


    const getProfitandloss = () => {

        if (!fromDate || !toDate) {
            alert("Please select From Date and To Date");
            return; 
        }

        const formatDate = (date) => {
            if (!date) return '';
            return new Date(date).toLocaleDateString('en-CA');
        };
        const formattedFromDate = formatDate(fromDate);
        const formattedToDate = formatDate(toDate);
        const url = `${REACT_APP_URL}/Account/profit-loss/report/?fromDate=${formattedFromDate}&toDate=${formattedToDate}`;
        // console.log("URL:", url);

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then(data => {
                console.log('data', data)
                setProfitlossData(data);
                setPreviewOpen(true)

            })
            .catch((error) => console.error(error));
    };

    //for org data 
    const [orgData, setOrgData] = useState(null);
    const fetchOrgData = async () => {
        try {
            const response = await fetch(`${REACT_APP_URL}/Organisation/`);

            if (!response.ok) {
                throw new Error("Failed to fetch organization data");
            }

            const data = await response.json();
            console.log(data);
            setOrgData(data[0]);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchOrgData();
    }, []);

    const totalExpenses =
        profitlossData?.expenseLedgers?.reduce(
            (sum, item) => sum + (item.opening || 0),
            0
        ) || 0;

    const totalIncome =
        profitlossData?.incomeLedgers?.reduce(
            (sum, item) => sum + (item.opening || 0),
            0
        ) || 0;

    const netProfitLoss = totalIncome - totalExpenses;


    

    return (
        <Box>
            <Box textAlign={'center'} mt={1}>
                <Typography sx={{ color: '#157497', }} variant='h4'><b>Profit And Loss Report</b></Typography>
            </Box>

            <Box sx={{ p: 5, height: 'auto' }}>

                <Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ display: 'flex', alignItems: 'center', m: 1, gap: 2 }}>

                            <Box flex={1} >
                                <Typography>From Date</Typography>
                                <DatePicker
                                    value={fromDate ? new Date(fromDate) : null}
                                    format="dd-MM-yyyy"
                                    onChange={(newValue) => setFromDate(newValue)}
                                    slotProps={{
                                        textField: { size: "small", fullWidth: true },
                                    }}
                                />
                            </Box>



                            <Box flex={1} >
                                <Typography>To Date</Typography>
                                <DatePicker
                                    value={toDate ? new Date(toDate) : null}
                                    format="dd-MM-yyyy"
                                    onChange={(newValue) => setToDate(newValue)}
                                    slotProps={{
                                        textField: { size: "small", fullWidth: true },
                                    }}
                                />
                            </Box>

                        </Box>



                    </LocalizationProvider>
                </Box>

                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5}>
                    <Button
                    sx={{ background: '#1b575c' }}
                        variant="contained"
                        onClick={getProfitandloss}
                    >
                        Get Profit & Loss Report
                    </Button>
                </Box>

                <Dialog
                    open={previewOpen}
                    onClose={() => setPreviewOpen(false)}
                    maxWidth="xlg" fullWidth
                >
                    <DialogTitle sx={{ textAlign: 'center' }}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                            <img src={newlogo} alt="Logo" style={{ width: "70px", }} />
                            <Typography>{orgData?.SocietyName}</Typography>
                        </Box>
                        <Typography sx={{ mt: 1 }}>
                            {orgData?.AddressLine1}
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold', mt: 1 }}>
                            Profit & Loss Report for  {fromDate ? new Date(fromDate).toLocaleDateString('en-GB') : '-'}  to  {toDate ? new Date(toDate).toLocaleDateString('en-GB') : '-'}
                        </Typography>
                        <Divider sx={{ mt: 1 }} />
                    </DialogTitle>

                    <DialogContent >
                        <Box display="flex" gap={3} mt={2}>

                            {/* EXPENSES - LEFT */}
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
                                            <Typography>₹ {item.opening}</Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography>No expense records found</Typography>
                                )}
                            </Paper>

                            {/* INCOME - RIGHT */}
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
                                            <Typography>₹ {item.opening}</Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography>No income records found</Typography>
                                )}
                            </Paper>

                        </Box>

                        {/* SUMMARY */}
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6">Summary</Typography>

                            <Typography><strong>Total Income:</strong> ₹ {totalIncome.toFixed(2)}</Typography>

                            <Typography>
                                <strong>Total Expenses:</strong>{" "}
                                ₹{netProfitLoss > 0
                                    ? (totalExpenses + netProfitLoss).toFixed(2)
                                    : totalExpenses.toFixed(2)}
                            </Typography>

                            <Typography sx={{ mt: 1 }} color={netProfitLoss >= 0 ? "green" : "red"}>
                                <strong>Net {netProfitLoss >= 0 ? "Profit" : "Loss"}:</strong>{" "}
                               ₹ {Math.abs(netProfitLoss).toFixed(2)}
                            </Typography>
                        </Paper>

                        {/* <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
                            <Typography variant="h6" mb={2}>Summary</Typography>
                            <Box sx={{ p: 3 }}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>
                                        <strong>Total Expenses:</strong> ₹ {totalExpenses.toFixed(2)}
                                    </Typography>

                                    <Typography>
                                        <strong>Total Income:</strong> ₹ {totalIncome.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                
                                <Typography>
                                    <strong>
                                        {netProfitLoss >= 0 ? "Net Profit" : "Net Loss"}:
                                    </strong>{" "}
                                    ₹ {Math.abs(netProfitLoss).toFixed(2)}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                               
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>
                                        <strong>Adjusted Total Expenses:</strong>{" "}
                                        ₹{" "}
                                        {netProfitLoss > 0
                                            ? (totalExpenses + netProfitLoss).toFixed(2)
                                            : totalExpenses.toFixed(2)}
                                    </Typography>

                                    <Typography>
                                        <strong>Adjusted Total Income:</strong>{" "}
                                        ₹{" "}
                                        {netProfitLoss < 0
                                            ? (totalIncome + Math.abs(netProfitLoss)).toFixed(2)
                                            : totalIncome.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper> */}

                        {profitlossData?.boardMembers?.length > 0 && (
                            <Box sx={{ p: 1, mt: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                                    {profitlossData?.boardMembers
                                        .filter(member =>
                                            ['President', 'Secretary', 'Treasurer'].includes(member.position)
                                        )
                                        .map((member, index) => (
                                            <Box key={index} sx={{ textAlign: 'center', mx: 2 }}>
                                                {/* Name */}
                                                <Typography variant="body1">
                                                    {member.name}
                                                </Typography>

                                                {/* Position */}
                                                <Typography variant="body1" fontWeight="bold">
                                                    {member.position}
                                                </Typography>

                                                {/* Signature */}
                                                <Typography variant="body2" sx={{ mt: 2 }}>
                                                    Signature:
                                                </Typography>
                                                <Box sx={{ borderBottom: '1px solid black', width: 200, mt: 4 }} />
                                            </Box>
                                        ))}
                                </Box>
                            </Box>
                        )}


                    </DialogContent>
                    <Divider />

                    <DialogActions>
                        <Button variant='contained' onClick={() => setPreviewOpen(false)} >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>


            </Box >
        </Box >
    );
};

export default Profitandloss;
