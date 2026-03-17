
import { useState, useEffect, useMemo, } from 'react';
import { Select, MenuItem, FormControl, RadioGroup, FormControlLabel, Radio, Autocomplete, useMediaQuery, Box, Button, Typography, TextField, Drawer, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import "react-toastify/dist/ReactToastify.css";
import EventNoteIcon from '@mui/icons-material/EventNote';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Ledgers = () => {
    const REACT_APP_URL = process.env.REACT_APP_URL
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [accountName, setAccountName] = useState('');
    const [openingBal, setOpeningBal] = useState(0);
    const [debitCredit, setDebitCredit] = useState('DR');
    const [typeCode, setTypeCode] = useState('');

    //fetch Group
    const [groupOption, setGroupOption] = useState([]);
    const [selectedGroupOption, setSelectedGroupOption] = useState('');

    const fetchGroups = async () => {
        try {
            const response = await fetch(
                `${REACT_APP_URL}/AccountGroup`
            );
            const result = await response.json();

            // console.log("ledger info:", result);

            const options = result.map((groupAcc) => ({
                value: groupAcc._id,
                label: groupAcc.groupName
            }));

            setGroupOption(options);
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    };

    const [subgroupOptions, setSubGruopOption] = useState([])
    const [selectedSubGroupOption, setselectedSubGroupOption] = useState('')

    const fetchSubGroups = async () => {
        try {
            const response = await fetch(
                `${REACT_APP_URL}/AccountSubGroup/subgroups/`
            );
            const result = await response.json();

            // console.log("ledger info:", result);

            const options = result.map((subgroupAcc) => ({
                value: subgroupAcc._id,
                label: subgroupAcc.subgroupName
            }));

            setSubGruopOption(options);
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    };

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
        setIsEditing(false);
        resetForm()
    };

    const handleDrawerClose = () => {
        setAccountId('')
        setIsDrawerOpen(false);
        resetForm()
    };

    //get Account
    const [accountData, setAccountData] = useState([]);
    const fetchAccountData = async () => {
        try {
            const response = await fetch(`${REACT_APP_URL}/Account/`);

            if (!response.ok) {
                throw new Error("Failed to fetch organization data");
            }

            const data = await response.json();
            console.log("data", data);
            setAccountData(data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const [accountId, setAccountId] = useState('')

    const handleEdit = async (rowData) => {
        console.log("This row has been clicked:", rowData);
        setIsEditing(true);
        setAccountId(rowData._id)
        setAccountName(rowData.accountName)
        // setSelectedGroupOption(rowData.groupName)
        setSelectedGroupOption(rowData.groupId?._id || rowData.groupId);
        setselectedSubGroupOption(rowData.subGroupId)
        setOpeningBal(rowData.opening)
        setDebitCredit(rowData.drOrCr)
        setTypeCode(rowData.typeCode)
        setIsDrawerOpen(true);
    };

    const columns = useMemo(() => {
        return [
            {
                accessorKey: 'sr No',
                header: 'Sr No',
                size: 100,
                Cell: ({ row }) => row.index + 1,
            },

            {
                accessorKey: 'accountName',
                header: 'Account Name',
                size: 150,
            },

            {
                accessorKey: 'groupId.groupName',
                header: 'GroupName Name',
                size: 150,
            },

            {
                accessorKey: 'opening',
                header: 'Opening Bal',
                size: 150,
            },

            {
                accessorKey: 'drOrCr',
                header: 'Debit / credit',
                size: 150,
            },


            {
                accessorKey: 'typeCode',
                header: 'TypeCode',
                size: 150,
            },
        ];
    }, []);

    const table = useMaterialReactTable({
        columns,
        data: accountData,
        enablePagination: true,

        muiTableHeadCellProps: {
            style: {
                backgroundColor: "#ecfbfd",
                color: "black",
                fontSize: "16px",
            },
        },

        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => handleEdit(row.original),
            sx: {
                cursor: 'pointer',
            },
        }),
    });


    //create and update Account
    const handleSubmit = async () => {
        try {
            const url = isEditing
                ? `${REACT_APP_URL}/Account/${accountId}`
                : `${REACT_APP_URL}/Account`;

            const method = isEditing ? "PATCH" : "POST";

            const accountData = {
                accountName: accountName,
                groupId: selectedGroupOption,
                subGroupId: selectedSubGroupOption,
                opening: openingBal,
                drOrCr: debitCredit,
                typeCode: typeCode,

            };

            const accountResponse = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(accountData)
            });

            const accountResult = await accountResponse.json();
            console.log("Account saved:", accountResult);
            if (!accountResponse.ok) {
                throw new Error(accountResult.message || "Account save failed");
            }

            toast.success(
                isEditing
                    ? "Ledger updated successfully"
                    : "Ledger created successfully"
            );

            handleDrawerClose();
            fetchAccountData()
            resetForm()
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message);
        }
    };

    //delete member
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleDeleteTemp = () => {
        const url = `${REACT_APP_URL}/Account/${accountId}`;

        fetch(url, { method: "DELETE" })
            .then((response) => response.json())
            .then((data) => {
                //console.log('data',data)
                toast.success(`${accountName} deleted successfully!`);
                fetchAccountData();
                handleDrawerClose();
                resetForm();
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to delete template");
            });
    };

    const handleConfirmDelete = () => {
        handleDeleteTemp();
        setOpenDeleteDialog(false);
    };

    useEffect(() => {
        fetchAccountData()
        fetchGroups()
        fetchSubGroups()

    }, []);

    const resetForm = () => {
        setAccountName('')
        setSelectedGroupOption('')
        setselectedSubGroupOption('')
        setOpeningBal('')
        setDebitCredit('')
        setTypeCode('')

    }


    //get all vouchers
    const [vouchers, setVouchers] = useState([]);
    const [open, setOpen] = useState(false);

    const getVoucherByLedgerId = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${REACT_APP_URL}/Voucher/ledger/${accountId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setVouchers(result);
                setOpen(true)
            })
            .catch((error) => console.error(error));
    }

    const generatePDF = () => {
        const doc = new jsPDF();

        // Calculate totals
        const totalCr = vouchers.reduce(
            (total, v) => total + (v.CrAmount ? Number(v.CrAmount) : 0),
            0
        );

        const totalDr = vouchers.reduce(
            (total, v) => total + (v.DrAmount ? Number(v.DrAmount) : 0),
            0
        );

        const closingBalance = totalDr - totalCr;

        // Title
        doc.setFontSize(16);
        doc.text("Voucher List", 14, 15);

        doc.setFontSize(12);
        doc.text(`Account Name: ${accountName}`, 14, 25);

        // Prepare table body
        const tableBody = vouchers.map(v => [
            v.VoucherNumber,
            v.VoucherType,
            v.CrAmount || 0,
            v.DrAmount || 0,
            v.EntryType,
            new Date(v.createdAt).toLocaleString()
        ]);

        // Add totals rows
        tableBody.push(
            ["", "", "", "", "", ""],
            ["", "Total Credit", totalCr, "", "", ""],
            ["", "Total Debit", "", totalDr, "", ""],
            ["", "Closing Balance", closingBalance, "", "", ""]
        );

        autoTable(doc, {
            startY: 35,
            head: [[
                "Voucher No",
                "Voucher Type",
                "Credit",
                "Debit",
                "Dr/Cr",
                "Created At"
            ]],
            body: tableBody,
            theme: "grid",
            styles: {
                fontSize: 9
            },

            // 🔥 Make totals bold
            didParseCell: function (data) {
                const rowIndex = data.row.index;

                // last 3 rows (totals)
                if (rowIndex >= tableBody.length - 3) {
                    data.cell.styles.fontStyle = "bold";
                }
            }
        });

        doc.save(`${accountName}_Voucher_List.pdf`);
    };

    return (
        <Box mt={2}>

            <Box textAlign={'center'}>
                <Typography
                    sx={{ color: 'var(--primary-color)' }}
                    variant="h4"
                >
                    <b>Ledgers</b>
                </Typography>
            </Box>

            <Box>
                <Button ariant="contained" sx={{
                    // background: '#1b575c',
                    background: 'var(--complementary-color)',
                    color: '#fff',
                    ml: 2
                }} onClick={handleDrawerOpen}><b>Create Ledgers</b></Button>
            </Box>


            <Box mt={4} m={2} >
                <MaterialReactTable
                    table={table}

                    muiTableHeadCellProps={{
                        sx: { color: 'var(--primary-color)', },
                    }}
                />
            </Box>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    sx: {
                        borderRadius: isSmallScreen ? "0" : "10px 0 0 10px",
                        width: isSmallScreen ? "100%" : "60%",
                        zIndex: 1000,
                    },
                }}
            >

                <Box>
                    <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ecfbfd' }}>
                        <Typography m={2} color='var(--primary-color)' fontWeight="bold" variant="h6">
                            {isEditing ? "Update Ledgers" : "Create Ledgers"}
                        </Typography>
                        <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDrawerClose} />
                    </Box>
                    <Divider />

                    <Box m={2}>
                        <Box mt={2}>
                            <Typography>
                                Account Name
                            </Typography>

                            <TextField
                                fullWidth
                                variant="standard"
                                size="small"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                                sx={{
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: '#144145',
                                        borderBottomWidth: 1.5,
                                    },
                                }}
                                focused
                            />
                        </Box>

                        <Box mt={2}>
                            <Typography>Groups</Typography>
                            <Autocomplete
                                options={groupOption}
                                getOptionLabel={(option) => option.label || ""}
                                value={
                                    groupOption.find(
                                        (opt) => opt.value === selectedGroupOption
                                    ) || null
                                }
                                onChange={(event, newValue) => {
                                    setSelectedGroupOption(newValue ? newValue.value : "");
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        size="small"
                                        sx={{

                                            '& .MuiInput-underline:after': {
                                                borderBottomWidth: 1.5,
                                                borderBottomColor: '#144145',
                                            },
                                        }}
                                        focused
                                    />
                                )}
                            />
                        </Box>

                        <Box mt={2}>
                            <Typography>Sub Groups</Typography>
                            <Autocomplete
                                options={subgroupOptions}
                                getOptionLabel={(option) => option.label || ""}
                                value={
                                    subgroupOptions.find(
                                        (opt) => opt.value === selectedSubGroupOption
                                    ) || null
                                }
                                onChange={(event, newValue) => {
                                    setselectedSubGroupOption(newValue ? newValue.value : "");
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        size="small"
                                        sx={{

                                            '& .MuiInput-underline:after': {
                                                borderBottomWidth: 1.5,
                                                borderBottomColor: '#144145',
                                            },
                                        }}
                                        focused
                                    />
                                )}
                            />
                        </Box>

                        <Box mt={2}>
                            <Typography>
                                Opening Balance
                            </Typography>

                            <TextField
                                fullWidth
                                variant="standard"
                                size="small"
                                value={openingBal}
                                onChange={(e) => setOpeningBal(e.target.value)}
                                sx={{
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: '#144145',
                                        borderBottomWidth: 1.5,
                                    },
                                }}
                                focused
                            />
                        </Box>

                        <Box mt={2}>
                            <FormControl>
                                <Typography>Select Debit / Credit</Typography>

                                <RadioGroup
                                    row
                                    value={debitCredit}
                                    onChange={(e) => setDebitCredit(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="DR"
                                        control={<Radio />}
                                        label="Debit"
                                    />

                                    <FormControlLabel
                                        value="CR"
                                        control={<Radio />}
                                        label="Credit"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                        <Box mt={2}>
                            <Typography>Type Code</Typography>

                            <FormControl
                                fullWidth
                                variant="standard"
                                sx={{
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: '#144145',
                                        borderBottomWidth: 1.5,
                                    },
                                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                        borderBottomColor: '#144145',
                                    },
                                }}
                            >
                                <Select
                                    name="typeCode"
                                    displayEmpty
                                    value={typeCode}
                                    onChange={(e) => setTypeCode(e.target.value)}
                                >
                                    <MenuItem value="" disabled>
                                        Select Type Code
                                    </MenuItem>
                                    <MenuItem value="Balance Sheet">Balance Sheet</MenuItem>
                                    <MenuItem value="Profit and Loss Account">
                                        Profit and Loss Account
                                    </MenuItem>
                                    <MenuItem value="Trading Account">Trading Account</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>


                    </Box>
                    {/* Dialog for Delete Accounts */}
                    <Dialog
                        open={openDeleteDialog}
                        onClose={() => setOpenDeleteDialog(false)}
                    >
                        <DialogTitle><b>Confirm Delete </b></DialogTitle>

                        <DialogContent>
                            Are you sure you want to delete
                            <b> {accountName}</b>

                        </DialogContent>

                        <DialogActions>
                            <Button
                                sx={{ background: '#185259', color: '#ffffff' }}
                                onClick={() => setOpenDeleteDialog(false)}
                                variant="contained"
                            >
                                No
                            </Button>

                            <Button sx={{ borderColor: '#185259' }}

                                variant="outlined"
                                onClick={handleConfirmDelete}
                            >
                                <DeleteIcon color="error" />
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* Dialog for Vouchers */}
                    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">

                        <DialogTitle>Voucher List</DialogTitle>
                        <Box sx={{ ml: 3 }}>Account Name : <b>{accountName}</b></Box>

                        <DialogContent>
                            {vouchers.length > 0 && (
                                <>
                                    <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr>
                                                <th>Voucher Number</th>
                                                <th>Voucher Type</th>
                                                <th>Cr Amount</th>
                                                <th>Dr Amount</th>
                                                <th>DrOrCr</th>
                                                <th>Created At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vouchers.map((voucher) => (
                                                <tr key={voucher._id}>
                                                    <td>{voucher.VoucherNumber}</td>
                                                    <td>{voucher.VoucherType}</td>
                                                    <td>{voucher.CrAmount}</td>
                                                    <td>{voucher.DrAmount}</td>
                                                    <td>{voucher.EntryType}</td>
                                                    <td>{new Date(voucher.createdAt).toLocaleString()}</td>


                                                </tr>


                                            ))}
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <td></td>
                                                <td style={{ textAlign: "right", fontWeight: "bold" }}>Total Credit</td>
                                                <td style={{ fontWeight: "bold" }}>
                                                    {
                                                        vouchers.reduce((total, v) => total + (v.CrAmount ? Number(v.CrAmount) : 0), 0)
                                                    }
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td style={{ textAlign: "right", fontWeight: "bold" }}>Total Debit</td>
                                                <td></td>
                                                <td style={{ fontWeight: "bold" }}>
                                                    {
                                                        vouchers.reduce((total, v) => total + (v.DrAmount ? Number(v.DrAmount) : 0), 0)
                                                    }
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            <tr>
                                                <td></td>
                                                <td style={{ textAlign: "right", fontWeight: "bold" }}>Closing Balance</td>
                                                <td colSpan={2} style={{ fontWeight: "bold" }}>
                                                    {
                                                        (() => {
                                                            const totalCr = vouchers.reduce((total, v) => total + (v.CrAmount ? Number(v.CrAmount) : 0), 0);
                                                            const totalDr = vouchers.reduce((total, v) => total + (v.DrAmount ? Number(v.DrAmount) : 0), 0);
                                                            return totalDr - totalCr;
                                                        })()
                                                    }
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tfoot>



                                    </table>

                                    <Button
                                        variant="outlined"

                                        onClick={() => generatePDF(vouchers)}
                                        style={{ marginTop: "20px" }}
                                    >
                                        Export as PDF
                                    </Button>
                                </>
                            )}
                        </DialogContent>
                    </Dialog>

                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5} mb={5}>
                        <Box>
                            <Button
                                sx={{
                                    // background: '#10370d', color: '#ffffff' 
                                     background: 'var(--secondary-color)',
                                    
                                    color: '#fff',
                                    fontWeight:'bold'
                                }}
                                onClick={handleSubmit}
                                variant="contained"
                            >
                                {isEditing ? "Update" : "Save"}
                            </Button>
                        </Box>

                        <Box>
                            {isEditing && (
                                <Button
                                    sx={{ 
                                       background: 'var(--secondary-color)',
                                        color: '#ffffff',
                                        fontWeight:'bold'
                                     }}
                                    onClick={getVoucherByLedgerId}
                                    variant="contained"
                                > <EventNoteIcon /> show entries
                                </Button>
                            )}

                        </Box>

                        <Box>
                            {isEditing && (
                                <Button color="error" variant="contained"
                                    onClick={() => setOpenDeleteDialog(true)}
                                >
                                    Delete
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    )
}

export default Ledgers

