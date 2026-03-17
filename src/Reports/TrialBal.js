
import { useState, useMemo } from 'react';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Dialog, DialogActions, DialogContent, Box, Typography, Button } from '@mui/material';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import PrintIcon from '@mui/icons-material/Print';
import "jspdf-autotable";
import { useMaterialReactTable, } from "material-react-table";
import { MaterialReactTable, } from 'material-react-table';


const TrialBal = () => {
    const REACT_APP_URL = process.env.REACT_APP_URL
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [trialBalData, setTrialBalData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);


    const getTrialReport = () => {

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

        const url = `${REACT_APP_URL}/Voucher/trialbal?fromDate=${formattedFromDate}&toDate=${formattedToDate}`;
        console.log("url", url);

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log("API Data:", data);
                setTrialBalData(data);
                setShowTable(true);
                setPreviewOpen(true);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };


    const handleGetTrialReport = () => {
        if (!fromDate || !toDate) {
            alert("Please select both From Date and To Date.");
            return;
        }
        getTrialReport();
    };

    const columns = useMemo(() => {
        return [

            {
                accessorKey: 'srNo',
                header: 'Sr No',
                size: 100,
                Cell: ({ row }) => row.index + 1,
            },

            {
                accessorKey: 'ledgerName',
                header: 'Account Name',
                size: 50,

            },

            {
                accessorKey: 'opening',
                header: 'Opening Balance',
                size: 50,

            },

            {
                accessorKey: 'TotalDrAmount',
                header: 'Debit Amount',
                size: 50,

                Cell: ({ cell }) => cell.getValue() || "-",
            },

            {
                accessorKey: 'TotalCrAmount',
                header: 'Credit Amount',
                size: 50,
                Cell: ({ cell }) => cell.getValue() || "-",
            },

          
            {
                accessorKey: 'closingBalance',
                header: 'Closing Balance',
                size: 50,
              
            }
        ];
    }, []);

    const table = useMaterialReactTable({
        columns,
        data: trialBalData,
        enablePagination: true,
        muiTableHeadCellProps: {
            style: {
                backgroundColor: "#E9ECEF",
                color: "black",
                fontSize: "16px",
            },
        },
    });

    //

    const totalDebit = trialBalData.reduce((sum, row) => sum + (row.TotalDrAmount || 0), 0);
    const totalCredit = trialBalData.reduce((sum, row) => sum + (row.TotalCrAmount || 0), 0);





    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "A4"
        });

        // Title
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Trial Balance Report", 40, 40);

        // Date range
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text(`From: ${fromDate}  To: ${toDate}`, 40, 60);

        const tableColumn = ["Ledger Name", "Opening", "Debit", "Credit", "Closing"];
        const tableRows = [];

        trialBalData.forEach((row) => {
            const closing = (Number(row.opening || 0) + Number(row.debit || 0) - Number(row.credit || 0)).toFixed(2);
            tableRows.push([
                row.ledgerName,
                (row.opening || 0).toFixed(2),
                (row.debit || 0).toFixed(2),
                (row.credit || 0).toFixed(2),
                closing
            ]);
        });

        // Add Grand Total row
        const totalRow = [
            // totals.ledgerName,
            // totals.opening.toFixed(2),
            // totals.debit.toFixed(2),
            // totals.credit.toFixed(2),
            // totals.closingBal.toFixed(2)
        ];
        tableRows.push(totalRow);

        autoTable(doc, {
            startY: 80,
            head: [tableColumn],
            body: tableRows,
            theme: "grid",

            headStyles: {
                fillColor: [240, 240, 240],
                textColor: 0,
                fontStyle: "bold"
            },

            styles: {
                font: "helvetica",
                fontSize: 10
            },

            didParseCell: (data) => {

                if (data.row.index === tableRows.length - 1) {
                    data.cell.styles.fillColor = [240, 240, 240];
                    data.cell.styles.fontStyle = "bold";
                    data.cell.styles.textColor = 0;
                }
            }
        });

        doc.save("Trial_Balance_Report.pdf");
    };

    return (
        <Box>
            <Box textAlign={'center'} mt={1}>
                <Typography sx={{ color: 'var(--primary-color)', }} variant='h4'><b>Trial Balance</b></Typography>
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
                        sx={{ background: 'var(--secondary-color)' }}
                        variant="contained"
                        onClick={handleGetTrialReport}
                    >
                      <b> Get Trial Balance</b> 
                    </Button>
                </Box>

                {showTable && trialBalData.length === 0 && (
                    <Typography textAlign="center" mt={5} color="error">
                        No data found for the selected details.
                    </Typography>
                )}

                {/* table */}

                <>
                    {showTable && trialBalData.length > 0 && (
                        <>
                            <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="xlg" fullWidth>

                                <DialogContent dividers>
                                    <Box>
                                        {trialBalData.length > 0 ? (
                                            <Box>

                                                <Box>
                                                    <MaterialReactTable table={table}
                                                        enableColumnResizing
                                                        muiTableHeadCellProps={{
                                                            sx: { color: 'var(--primary-color)', },
                                                        }}
                                                    />
                                                </Box>


                                            </Box>
                                        ) : (
                                            <Typography>No data to preview</Typography>
                                        )}
                                    </Box>
                                </DialogContent>

                                <DialogActions sx={{ p: 0 }}>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        width="100%"
                                        sx={{ borderTop: "2px solid #ddd", backgroundColor: "#f8f9fa", p: 2 }}
                                    >

                                        <Box display="flex" gap={2}>

                                            <Button
                                                onClick={generatePDF}
                                                color="primary" ><PrintIcon sx={{ fontSize: 35 }} />

                                            </Button>

                                            <Button
                                                variant="contained"
                                                onClick={() => setPreviewOpen(false)}
                                                color="primary"
                                            >
                                                Close
                                            </Button>
                                        </Box>


                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Grand Total:

                                            Debit {totalDebit.toLocaleString()} |
                                            Credit {totalCredit.toLocaleString()}

                                        </Typography>
                                    </Box>
                                </DialogActions>
                            </Dialog>
                        </>
                    )}

                </>
            </Box >
        </Box >
    );
};

export default TrialBal;
