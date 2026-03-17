import { useState, useEffect, useMemo, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, useMediaQuery, Box, Button, Typography, TextField, Drawer, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { toWords } from "number-to-words";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import "react-toastify/dist/ReactToastify.css";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios';
import jsPDF from "jspdf";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const Journalvouchers = () => {
  const REACT_APP_URL = process.env.REACT_APP_URL
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true); setIsEditing(false);
    resetForm()
  };

  const handleDrawerClose = () => {
    setReceiptId('')
    setIsDrawerOpen(false);
    resetForm()
  };

  // const [date, setDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [narration, setNarration] = useState('');
  const [crAmount, setCrAmount] = useState('');

  const [receiptId, setReceiptId] = useState('');
  const [instruDate, setInstruDate] = useState(null);
  const [instruNo, setInstruNo] = useState('');
  const [bankname, setBankName] = useState('');
  const [bankBranch, setBankBranch] = useState('');

  //Fetch Dr ledger
  const [debitLedOption, setDebitLedOption] = useState([]);
  const [selectedDebitLedOption, setSelectedDebitLedOption] = useState(null);

  const fetchDebitLedger = async () => {
    try {
      const response = await fetch(`${REACT_APP_URL}/Account`);
      const result = await response.json();

      const options = result
        .filter(
          (account) =>
            account.groupId && [7, 1].includes(account.groupId.groupCode)
        )
        .map((acc) => ({
          _id: acc._id,
          label: acc.accountName
        }));

      setDebitLedOption(options);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };


  //Fetch Cr ledger
  const [crLedOption, setCrLedOption] = useState([]);
  const [selectedCrLedOption, setSelectedCrLedOption] = useState(null);

  const fetchCrLedger = async () => {
    try {
      const [accountRes, memberRes] = await Promise.all([
        fetch(`${REACT_APP_URL}/Account`),
        fetch(`${REACT_APP_URL}/member`)
      ]);

      const accountData = await accountRes.json();
      const memberData = await memberRes.json();

      const accountOptions = accountData.map((acc) => ({
        _id: acc._id,
        label: acc.accountName,
        model: "Account"
      }));

      const memberOptions = memberData.map((mem) => ({
        _id: mem._id,
        label: mem.memberName,
        model: "Member"
      }));

      setCrLedOption([...accountOptions, ...memberOptions]);
    } catch (error) {
      console.error("Error fetching accounts or members:", error);
    }
  };

  //fetch Invoices
  const [invoice, setInvoice] = useState([])
  const [selectedInvoices, setselectedInvoices] = useState('')

  const fetchInvoice = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_URL}/InvoiceHeader`
      );
      const result = await response.json();

      console.log("ledger info:", result);


      const options = result.map((inv) => ({
        value: inv._id,
        label: inv.narration
      }));

      setInvoice(options);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  //transaction type 
  const [transactionType, setTransactionType] = useState("");
  const transactionTypeOptions = [
    { value: "cash", label: "Cash" },
    { value: "cheque", label: "Cheque" },
    { value: "neft", label: "NEFT" },
    { value: "rtgs", label: "RTGS" },
    { value: "upi", label: "UPI" }
  ];

  //create annd update  Invoice 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDebitLedOption || !selectedCrLedOption) {
      toast.error("Please select both Debit and Credit ledger");
      return;
    }

    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const formattedInstruDate = moment(instruDate).format("YYYY-MM-DD");

      const receiptVoucherData = {
        voucherDate: formattedDate,

        drAccount: {
          _id: selectedDebitLedOption?._id,
          accountName: selectedDebitLedOption?.label,
          drOrCr: "Dr"
        },

        crAccount: {
          _id: selectedCrLedOption?._id,
          accountName: selectedCrLedOption?.label,
          drOrCr: "Cr"
        },

        crAmount: Number(crAmount),
        referenceInvoice: selectedInvoices,
        transactionType: transactionType,
        instrumentNumber: instruNo,
        instrumentDate: formattedInstruDate,
        instrumentBank: bankname,
        instrumentBranch: bankBranch,
        narration: narration || ""
      };

      console.log("Payload sending:", receiptVoucherData);

      // ✅ UPDATE
      if (receiptId) {
        await axios.put(
          `${REACT_APP_URL}/RecieptVoucher/${receiptId}`,
          receiptVoucherData
        );

        toast.success("Receipt Voucher updated successfully!");
      }
      // ✅ CREATE
      else {
        await axios.post(
          `${REACT_APP_URL}/RecieptVoucher`,
          receiptVoucherData
        );

        toast.success("Receipt Voucher created successfully!");
      }

      setIsDrawerOpen(false);
      resetForm();
      getRecieptVoucher();

    } catch (error) {
      console.error("Error saving Receipt Voucher:", error);
      toast.error("Something went wrong while saving Receipt Voucher");
    }
  };

  const resetForm = () => {
    setDate('')
    setSelectedDebitLedOption('')
    setSelectedCrLedOption('')
    setselectedInvoices('')
    setTransactionType('')
    setInstruNo('')
    setInstruDate('')
    setBankName('')
    setBankBranch('')
    setCrAmount('')
    setNarration('')
  }

  //get header
  const [receiptData, setReceiptData] = useState([]);

  const getRecieptVoucher = () => {
    const url = `${REACT_APP_URL}/RecieptVoucher`;
    console.log(" URL:", url);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(data => {
        console.log('data', data);
        setReceiptData(data);

      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDebitLedger();
    fetchCrLedger()
    fetchInvoice()
    getRecieptVoucher();
    fetchOrgData()

  }, []);


  const [previewData, setPreviewData] = useState(null);

  const columns = useMemo(() => {
    return [
      {
        accessorKey: 'srNo',
        header: 'Sr No',
        size: 100,
        Cell: ({ row }) => row.index + 1,
      },


      {
        accessorKey: 'voucherDate',
        header: 'Date',
        size: 150,
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
      },

      {
        accessorKey: 'drAccount.accountName',
        header: 'debitLedger',
        size: 150,

      },

      {
        accessorKey: 'crAccount.accountName',
        header: 'credit Ledger',
        size: 150,

      },

      {
        accessorKey: 'crAmount',
        header: 'Credit Amount',
        size: 150,
      },

      {
        accessorKey: 'narration',
        header: 'Narration',
        size: 150,
      },

      {
        accessorKey: 'referenceInvoice.narration',
        header: 'Reference Invoice',
        size: 150,
      },


      {
        accessorKey: 'transactionType',
        header: 'transaction Type',
        size: 150,
      },

      {
        accessorKey: 'instrumentNumber',
        header: 'instrumentNumber',
        size: 150,
      },

      {
        accessorKey: 'instrumentDate',
        header: 'instrument Date',
        size: 150,
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
      },

      {
        accessorKey: 'instrumentBank',
        header: 'Bank Name',
        size: 150,
      },

      {
        accessorKey: 'instrumentBranch',
        header: 'Branch Name',
        size: 150,
      },

      {
        header: 'Actions',
        size: 200,
        Cell: ({ row }) => (
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              size="small"
               sx={{ background: 'var(--secondary-color)' }}
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </Button>


            <Button
              variant="contained"
              sx={{background: '#1f5675' }}
              size="small"
              onClick={() => handlePreview(row.original)}
            >
              Preview
            </Button>


          </Box>
        ),
      },

    ];
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: receiptData,
    enablePagination: true,
    muiTableHeadCellProps: {
      style: {
        backgroundColor: "#ecfbfd",
        color: "black",
        fontSize: "16px",
      },
    },


  });

  const handleEdit = async (rowData) => {
    console.log("This row has been clicked:", rowData);

    setIsEditing(true);
    setReceiptId(rowData._id);
    setDate(rowData.voucherDate);
    setCrAmount(rowData.crAmount)
    setTransactionType(rowData.transactionType)
    setInstruNo(rowData.instrumentNumber)
    setInstruDate(rowData.instrumentDate);
    setBankName(rowData.instrumentBank);
    setBankBranch(rowData.instrumentBranch);
    setNarration(rowData.narration);

    // ✅ set debitOption
    const debitOption = debitLedOption.find(
      (opt) => opt._id === rowData.drAccount._id
    );

    if (debitOption) {
      setSelectedDebitLedOption(debitOption);
    } else {
      setSelectedDebitLedOption({
        _id: rowData.drAccount._id,
        label: rowData.drAccount.accountName
      });
    }

    //set credit
    const creditOption = crLedOption.find(
      (opt) => opt._id === rowData.crAccount._id
    );

    if (creditOption) {
      setSelectedCrLedOption(crLedOption);
    } else {
      setSelectedCrLedOption({
        _id: rowData.crAccount._id,
        label: rowData.crAccount.accountName || creditOption.label
      });
    }



    //set Invoice
    // set Invoice
    const invoiceOption = invoice.find(
      (opt) => opt.value === rowData.referenceInvoice._id
    );

    if (invoiceOption) {
      setselectedInvoices(invoiceOption.value);
    } else {
      setselectedInvoices(rowData.referenceInvoice._id);
    }




    setIsDrawerOpen(true);
  };


  const [openPreview, setOpenPreview] = useState(false);
  const handlePreview = async (rowData) => {
    setPreviewData(rowData);
    setOpenPreview(true);
    console.log("PREVIEW DATA:", rowData);
  };

  //pdf preview
  const previewRef = useRef();
  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;

    const pdf = new jsPDF("p", "mm", "a4");

    const receiptNo = previewData?.receiptVoucherNumber || "NA";

    await pdf.html(element, {
      x: 10,
      y: 10,
      width: 190, // A4 width minus margins
      windowWidth: element.scrollWidth,
    });

    pdf.save(`Receiptvoucher${receiptNo}.pdf`);
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

  //delete JV
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteTemp = () => {
    const url = `${REACT_APP_URL}/RecieptVoucher/${receiptId}`;

    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        //console.log('data',data)
        toast.success(`deleted successfully!`);
        getRecieptVoucher();
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


  return (
    <Box>
      <Box>
        <Button ariant="contained" sx={{ background: 'var(--complementary-color)', color: '#fff', ml: 2 }} onClick={handleDrawerOpen}><b>Create Receipt Vouchers</b></Button>
      </Box>

      <Box mt={4} m={2} >
        <MaterialReactTable
          table={table}

          muiTableHeadCellProps={{
            sx: { color: 'var(--primary-color)', },
          }}
        />
      </Box>

      {/* ///for preview///////// */}.
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        fullWidth
        maxWidth={false}
        PaperProps={{
          sx: {
            width: "1000px",

          }
        }}
      >

        <DialogContent >
          {previewData && (
            <>
              <Box
                ref={previewRef}
                sx={{ textAlign: "center", p: 1, border: "1px solid black", }}>
                <Typography fontWeight={700}>
                  {orgData?.SocietyName}
                </Typography>
                <Typography variant="body2">
                  Reg.No.: {orgData?.Registration}
                </Typography>
                <Typography variant="body2">
                  {orgData?.AddressLine1}
                </Typography>


                <DialogTitle sx={{ textAlign: "center", fontWeight: 700, borderBottom: "1px solid black", }}>
                  Receipt Voucher
                </DialogTitle>


                <Box
                  sx={{
                    // width: 500,
                    // border: "1px solid black",
                    p: 2,
                    fontFamily: "serif",
                    background: "#fff"
                  }}
                >



                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, }}>
                    <Typography>
                      <b> Voucher No : {previewData?.receiptVoucherNumber}</b>
                    </Typography>

                    <Typography>
                      <b>Voucher Date : {previewData?.voucherDate?.split("T")[0]}</b>

                    </Typography>
                  </Box>

                  <Box mt={2}>
                    <Typography> Received with thanks from <b style={{ borderBottom: '1px solid black' }}>{previewData?.crAccount?.accountName} </b>  </Typography>
                  </Box>

                  <Box mt={1} color={'1px solid black'}>
                    <b>{previewData?.drAccount?.accountName}</b>
                  </Box>

                </Box>

                <Box display={'flex'} justifyContent={'space-between'} m={2}>
                  <Box>
                    <Typography><b>Transaction Type: {previewData.transactionType} </b></Typography>
                  </Box>

                  <Box>
                    <Typography><b>Instrument No: {previewData.instrumentNumber} </b></Typography>
                  </Box>


                  <Box>
                    <Typography><b>instrument Date: {previewData.instrumentDate?.split("T")[0]} </b></Typography>
                  </Box>

                  <Box>
                    <Typography><b>Bank Name: {previewData.instrumentBank} </b></Typography>
                  </Box>


                  <Box>
                    <Typography><b>Branch: {previewData.instrumentBranch} </b></Typography>
                  </Box>


                </Box>

                <Box m={2}>
                  <Box m={2}>
                    <TableContainer sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
                      <Table size="small">

                        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Description
                            </TableCell>

                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                              Amount (₹)
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>

                          {/* Data Row */}
                          <TableRow hover>
                            <TableCell>
                              {previewData.referenceInvoice?.narration || "No narration provided"}
                            </TableCell>

                            <TableCell align="right">
                              {previewData.crAmount || 0}
                            </TableCell>
                          </TableRow>

                          {/* Total Row */}
                          <TableRow sx={{ backgroundColor: "#fafafa" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Total
                            </TableCell>

                            <TableCell align="right" sx={{ fontWeight: "bold" }}>
                              ₹ {previewData.crAmount || 0}
                            </TableCell>
                          </TableRow>

                        </TableBody>

                      </Table>
                    </TableContainer>
                  </Box>
                </Box>

                <Box mt={2} m={2} >
                  <Typography mt={1}><b>Amount In Rupees : </b> {toWords(Number(previewData.crAmount))}  Rupees Only </Typography>

                  <b>Remark : Being amount received against society bill.*** </b>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={handleDownloadPDF}
            endIcon={<DownloadForOfflineIcon />}
            sx={{
              backgroundColor: "var(--secondary-color)",
              px: 2.5,
              py: 1,
              borderRadius: "6px",
            }}
          >
            Receipt Voucher
          </Button>


          <Button sx={{ borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)', fontWeight: 600, }} variant="outlined" onClick={() => setOpenPreview(false)}>
            Close
          </Button>


        </DialogActions>
      </Dialog>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            borderRadius: isSmallScreen ? "0" : "10px 0 0 10px",
            width: isSmallScreen ? "100%" : "50%",
            zIndex: 1000,
          },
        }}
      >

        <Box>
          <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ecfbfd' }}>

            <Typography m={2} fontWeight="bold" variant="h6" color='var(--primary-color)'>
              {isEditing ? "Update Receipt Vouchers" : "Create Receipt Vouchers"}
            </Typography>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDrawerClose} />
          </Box>
          <Divider />

          <Box m={2} >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box >
                <DatePicker
                  label="Date"
                  value={date ? new Date(date) : null}
                  onChange={(newValue) => setDate(newValue)}
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: { size: "small", },
                  }}
                />
              </Box>

              <Box mt={2}>
                <Typography>Debit Accounts</Typography>
                <Autocomplete
                  options={debitLedOption}
                  getOptionLabel={(option) => option.label || ""}
                  value={selectedDebitLedOption}
                  onChange={(event, newValue) => {
                    setSelectedDebitLedOption(newValue);
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


              <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>

                <Box sx={{ flex: 1 }}>
                  <Typography>CR Member Account</Typography>
                  <Autocomplete
                    options={crLedOption}
                    getOptionLabel={(option) => option.label || ""}
                    value={selectedCrLedOption}
                    onChange={(event, newValue) => {
                      setSelectedCrLedOption(newValue);
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

                <Box sx={{ flex: 1 }}>
                  <Typography>Cr Amount</Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={crAmount}
                    onChange={(e) => setCrAmount(e.target.value)}
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>

              </Box>

              <Box mt={2}>
                <Typography>Reference Invoice</Typography>
                <Autocomplete
                  options={invoice}
                  getOptionLabel={(option) => option.label || ""}
                  value={
                    invoice.find(
                      (opt) => opt.value === selectedInvoices
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    setselectedInvoices(newValue ? newValue.value : "");
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

              <Box textAlign={'center'} color={'#144145'} mt={2}><Typography><b>Bank Details</b></Typography></Box>

              <Box sx={{ display: 'flex', gap: 4, mt: 3 }}>

                <Box sx={{ flex: 1 }}>
                  <Typography>Transaction Type</Typography>

                  <Autocomplete
                    options={transactionTypeOptions}
                    getOptionLabel={(option) => option.label || ""}
                    value={
                      transactionTypeOptions.find(
                        (opt) => opt.value === transactionType
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      setTransactionType(newValue ? newValue.value : "");
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

                <Box sx={{ flex: 1 }}>
                  <Typography>Instrument Number</Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={instruNo}
                    onChange={(e) => setInstruNo(e.target.value)}
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>

                <Box sx={{ flex: 1, mt: 2 }}>
                  <DatePicker
                    label="Instrument Date"
                    value={instruDate ? new Date(instruDate) : null}
                    onChange={(newValue) => setInstruDate(newValue)}
                    format="dd/MM/yyyy"
                    slotProps={{
                      textField: { size: "small", fullWidth: true }
                    }}
                  />
                </Box>

              </Box>

              <Box sx={{ display: 'flex', gap: 4, mt: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>Bank Name</Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={bankname}
                    onChange={(e) => setBankName(e.target.value)}
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography>Bank Branch</Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={bankBranch}
                    onChange={(e) => setBankBranch(e.target.value)}
                    sx={{
                      '& .MuiInput-underline:after': {
                        borderBottomColor: '#144145',
                        borderBottomWidth: 1.5,
                      },
                    }}
                    focused
                  />
                </Box>

              </Box>


              <Box mt={3}>
                <Typography>Narration</Typography>

                <TextareaAutosize
                  minRows={1}
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1.5px solid #144145",
                    outline: "none",
                    padding: "8px 0",
                    fontFamily: "inherit",
                  }}
                />
              </Box>

              <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
              >
                <DialogTitle><b>Confirm Delete </b></DialogTitle>

                <DialogContent>
                  Are you sure you want to delete this Voucher?
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

            </LocalizationProvider>

          </Box>



          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2} mt={5} mb={5}>
            <Box>
              <Button
                sx={{ background: 'var(--secondary-color)',fontWeight:'bold' , color: '#ffffff' }}
                onClick={handleSubmit}
                variant="contained"
              >
                {isEditing ? "Update" : "Save"}
              </Button>
            </Box>

            <Box>
              <Button
                sx={{ borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }}
                onClick={handleDrawerClose} variant='outlined'><b>Cancel</b> </Button>
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

export default Journalvouchers
