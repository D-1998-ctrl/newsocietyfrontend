
import { useState, useEffect, useMemo, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, useMediaQuery, Box, Button, Typography, TextField, Drawer, Divider, } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, } from 'material-react-table';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import "react-toastify/dist/ReactToastify.css";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const PaymentVoucher = () => {
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
    setPaymentId('')
    setIsDrawerOpen(false);
    resetForm()
  };


  const [narration, setNarration] = useState(null);
  const [crAmount, setCrAmount] = useState('');
  const [drAmount, setDrAmount] = useState('');

  const [instDate, setInstDate] = useState(null);
  const [instNo, setInstNo] = useState('');
  const [chequeNo, setChequeNo] = useState('');
  const [paymentId, setPaymentId] = useState('');

  //Fetch Dr ledger
  const [debitLedOption, setDebitLedOption] = useState([]);
  const [selectedDebitLedOption, setSelectedDebitLedOption] = useState(null);

  const [date, setDate] = useState(new Date());

  const fetchDebitLedger = async () => {
    try {
      const response = await fetch(`${REACT_APP_URL}/Account`);
      const result = await response.json();

      // console.log("ledger info:", result);

      const options = result
        .filter((acc) => acc.groupId.groupCode !== 7)
        .map((acc) => ({
          value: acc._id,
          label: acc.accountName
        }));

      setDebitLedOption(options);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const [crLedOption, setCrLedOption] = useState([]);
  const [selectedCrLedOption, setSelectedCrLedOption] = useState('');

  const fetchCrLedger = async () => {
    try {
      const response = await fetch(`${REACT_APP_URL}/Account`);
      const result = await response.json();

      // console.log("ledger info:", result);

      const options = result
        .filter((acc) => acc.groupId?.groupCode === 7)
        .map((acc) => ({
          value: acc._id,
          label: acc.accountName
        }));

      setCrLedOption(options);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };


  //  transactionType
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

    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const formattedInstDate = moment(instDate).format("YYYY-MM-DD")
      const PaymentVoucherData = {
        date: formattedDate,
        drName: selectedDebitLedOption?._id || selectedDebitLedOption,
        nameOfCreditor: selectedCrLedOption?._id || selectedCrLedOption,
        amountPaidDr: Number(drAmount),
        amountPaidCr: Number(crAmount),
        bank: "MDCC Bank",
        transactionType: transactionType,
        instNo: instNo,
        chequeNo: chequeNo,
        instDate: formattedInstDate,
        narration: narration || "",
      };

      if (paymentId) {
        await axios.put(
          `${REACT_APP_URL}/PaymentVoucher/${paymentId}`,
          PaymentVoucherData
        );

        toast.success("Payment Voucher updated successfully!");
      } else {
        await axios.post(
          `${REACT_APP_URL}/PaymentVoucher`,
          PaymentVoucherData
        );

        toast.success("Payment Voucher created successfully!");
      }

      setIsDrawerOpen(false);
      resetForm();
      getPaymentVoucher();

    } catch (error) {
      console.error("Error saving Journal Voucher:", error);
      toast.error("Something went wrong while saving Journal Voucher");
    }
  };

  const resetForm = () => {
    setDate('')
    setInstDate('')
    setSelectedDebitLedOption('')
    setSelectedCrLedOption('')
    setDrAmount('')
    setCrAmount('')
    setNarration('')
    setTransactionType('')
    setChequeNo('')
    setInstNo('')
  }

  //get header
  const [paymentData, setPaymentData] = useState([]);

  const getPaymentVoucher = () => {
    const url = `${REACT_APP_URL}/PaymentVoucher`;
    // console.log(" URL:", url);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(data => {
        // console.log('data', data);
        setPaymentData(data);

      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDebitLedger();
    fetchCrLedger()
    getPaymentVoucher();
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
        accessorKey: 'date',
        header: 'Date',
        size: 150,
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
      },

      {
        accessorKey: 'drName.accountName',
        header: 'debit Ledger',
        size: 150,

      },


      {
        accessorKey: 'amountPaidDr',
        header: 'Debit Amount',
        size: 150,
      },

      {
        accessorKey: 'nameOfCreditor.accountName',
        header: 'credit Ledger',
        size: 150,

      },

      {
        accessorKey: 'amountPaidCr',
        header: 'Credit Amount',
        size: 150,
      },

      {
        accessorKey: 'transactionType',
        header: 'transaction Type',
        size: 150,
      },

      //
      {
        accessorKey: 'instNo',
        header: 'instNo',
        size: 150,
      },
      {
        accessorKey: 'chequeNo',
        header: 'cheque No',
        size: 150,
      },
      {
        accessorKey: 'instDate',
        header: 'instDate',
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('DD-MM-YYYY')}</span>,
        size: 150,
      },


      {
        accessorKey: 'narration',
        header: 'Narration',
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
              sx={{ background: '#1f5675' }}
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
    data: paymentData,
    enablePagination: true,
    muiTableHeadCellProps: {
      style: {
        backgroundColor: "#ecfbfd",
        color: "black",
        fontSize: "16px",
      },
    },


  });

  const handleEdit = async (PaymentData) => {
    // console.log("This row has been clicked:", PaymentData);

    setIsEditing(true);
    setPaymentId(PaymentData._id);
    setDate(PaymentData.date);
    setSelectedDebitLedOption(PaymentData.drName._id);
    setSelectedCrLedOption(PaymentData.nameOfCreditor._id);
    setDrAmount(PaymentData.amountPaidDr)
    setCrAmount(PaymentData.amountPaidCr)
    setTransactionType(PaymentData.transactionType);
    setInstNo(PaymentData.instNo);
    setChequeNo(PaymentData.chequeNo);
    setInstDate(PaymentData.instDate ? new Date(PaymentData.instDate) : null);
    setNarration(PaymentData.narration)
    setIsDrawerOpen(true);
  };

  const [openPreview, setOpenPreview] = useState(false);
  const handlePreview = async (PaymentData) => {
    setPreviewData(PaymentData);
    setOpenPreview(true);
    // console.log("PREVIEW DATA:", PaymentData);
  };

  //pdf preview
  const previewRef = useRef();

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;

    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);

    const PVNo = previewData?.PaymentVoucherNumber || "NA";

    pdf.save(`PaymentVoucher_${PVNo}.pdf`);
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
      // console.log(data);
      setOrgData(data[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  //delete JV
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteTemp = () => {
    const url = `${REACT_APP_URL}/PaymentVoucher/${paymentId}`;

    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        //console.log('data',data)
        toast.success(`deleted successfully!`);
        getPaymentVoucher();
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
        <Button ariant="contained" sx={{ background: 'var(--complementary-color)', color: '#fff', ml: 2,fontWeight:'bold' }} onClick={handleDrawerOpen}>Create Payment Vouchers</Button>
      </Box>

      <Box mt={4} m={2} >
        <MaterialReactTable
          table={table}

          muiTableHeadCellProps={{
            sx: { color: 'var(--primary-color)', },
          }}
        />
      </Box>

      {/* ///for preview///////// */}

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
                  Payment Voucher
                </DialogTitle>

                <Box
                  sx={{
                    // width: 500,

                    p: 2,
                    fontFamily: "serif",
                    background: "#fff"
                  }}
                >

                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, }}>
                    <Typography>
                      <b> Voucher No : {previewData?.PaymentVoucherNumber}</b>
                    </Typography>

                    <Typography>
                      <b>Voucher Date : {previewData?.date?.split("T")[0]}</b>

                    </Typography>
                  </Box>

                </Box>
                <Divider />

                <Typography mt={1} color='#144145'><b>DEBIT</b></Typography>

                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  pl: 2,
                  mt: 1,
                  mb: 5
                }}  >
                  <Box display="flex" justifyContent="space-between" width="100%">
                    <Typography>
                      <b>Debit Account: {previewData.drName.accountName}</b>
                    </Typography>

                    <Typography>
                      <b>Debit Amount: {previewData.amountPaidDr}</b>
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                {/*  */}

                <Typography mt={1} color='#144145'><b>Credit</b></Typography>

                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  pl: 2,
                  mt: 1,
                  mb: 5
                }}  >
                  <Box display="flex" justifyContent="space-between" width="100%">
                    <Typography>
                      <b>Credit Account: {previewData.drName.nameOfCreditor}</b>
                    </Typography>

                    <Typography>
                      <b>Credit Amount: {previewData.amountPaidCr}</b>
                    </Typography>
                  </Box>
                </Box>
                <Divider />

                <Box>
                  <Typography mt={1} color='#144145'><b>Payment Details</b></Typography>
                </Box>

                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  pl: 2,
                  mt: 1,
                  mb: 5
                }}  >
                  <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                    <Typography>
                      <b>Transaction Type: {previewData.transactionType}</b>
                    </Typography>

                    <Typography>
                      <b>Cheque No: {previewData.chequeNo}</b>
                    </Typography>



                    <Typography>
                      <b>Inst.No: {previewData.instNo}</b>
                    </Typography>



                    <Typography>
                      <b>Inst.Date: {previewData.instDate?.split("T")[0]} </b>
                    </Typography>
                  </Box>
                </Box>
                <Divider />



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
              fontWeight:'bold'
            }}
          >
            PAYMENT VOUCHER
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
              {isEditing ? "Update Payment Vouchers" : "Create Payment Vouchers"}
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

              <Box display={'flex'} mt={3} gap={5} >
                <Box flex={1}>
                  <Typography>Debit Accounts</Typography>
                  <Autocomplete
                    options={debitLedOption}
                    getOptionLabel={(option) => option.label || ""}
                    value={
                      debitLedOption.find(
                        (opt) => opt.value === selectedDebitLedOption
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      setSelectedDebitLedOption(newValue ? newValue.value : "");
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

                <Box flex={1}>
                  <Typography>
                    Dr Amount
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={drAmount}
                    
                    onChange={(e) => {
                      setDrAmount(e.target.value);
                      setCrAmount(e.target.value);
                    }}

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



              <Box display={'flex'} mt={3} gap={5} >
                <Box flex={1}>
                  <Typography>Cr Bank</Typography>
                  <Autocomplete
                    options={crLedOption}
                    getOptionLabel={(option) => option.label || ""}
                    value={
                      crLedOption.find(
                        (opt) => opt.value === selectedCrLedOption
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      setSelectedCrLedOption(newValue ? newValue.value : "");
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

                <Box flex={1}>
                  <Typography>
                    Cr Amount
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={crAmount}
                    InputProps={{ readOnly: true }}
                    // onChange={(e) => setCrAmount(e.target.value)}
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
              <Box textAlign={'center'} color={'#144145'} mt={3}><Typography><b>Bank Allocations</b></Typography></Box>

              <Box display={'flex'} mt={3} gap={5}>
                <Box flex={1} >
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

                <Box flex={1} >
                  <Typography>
                    cheque No
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={chequeNo}
                    onChange={(e) => setChequeNo(e.target.value)}
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



              <Box display={'flex'} mt={3} gap={5}>



                <Box flex={1} mt={2}>
                  {/* <Typography>Inst.Date</Typography> */}

                  <DatePicker
                    label="Inst.Date"
                    value={instDate ? new Date(instDate) : null}
                    onChange={(newValue) => setInstDate(newValue)}
                    format="dd/MM/yyyy"
                    slotProps={{
                      textField: { size: "small", },
                    }}
                  />
                </Box>

                <Box flex={1} >
                  <Typography>
                    Inst.No
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={instNo}
                    onChange={(e) => setInstNo(e.target.value)}
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
                sx={{ background: 'var(--secondary-color)', color: '#ffffff',fontWeight:'bold'  }}
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

export default PaymentVoucher

