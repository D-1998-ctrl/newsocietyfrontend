
import { useState, useEffect, useMemo, useRef } from 'react';
import { InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Autocomplete, useMediaQuery, Box, Button, Typography, TextField, Drawer, Divider, } from '@mui/material';
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

const PurchaseVoucher = () => {
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
    setPurchaseId('')
    setIsDrawerOpen(false);
    resetForm()
  };


  const [narration, setNarration] = useState(null);
  const [crAmount, setCrAmount] = useState('');
  const [drAmount, setDrAmount] = useState('');
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [reffBillNo, setReffBillNo] = useState("");
  const [TDSPayble, setTDSPayble] = useState('');
  const [BillDate, setBillDate] = useState(null);
  const [billPeriod, setBillPeriod] = useState('');
  const [purchaseId, setPurchaseId] = useState('');


  //calculate CGST And SGST
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setDrAmount(value);

    const amount = parseFloat(value) || 0;

    const cgstValue = (amount * 9) / 100;
    const sgstValue = (amount * 9) / 100;

    setCgst(cgstValue.toFixed(2));
    setSgst(sgstValue.toFixed(2));
  };

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
        .filter((acc) => acc.groupId.groupCode === 25)
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
        .filter((acc) => acc.groupId?.groupCode === 2)
        .map((acc) => ({
          value: acc._id,
          label: acc.accountName
        }));

      setCrLedOption(options);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };



  //create annd update  Invoice 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const formattedBillDate = moment(BillDate).format("YYYY-MM-DD")
      const PurchaseVoucherData = {
        date: formattedDate,
        refBillNo: reffBillNo,
        drNameOfLedger: selectedDebitLedOption?._id || selectedDebitLedOption,
        crNameOfCreditor: selectedCrLedOption?._id || selectedCrLedOption,
        amount: Number(drAmount),
        amountOfBill: Number(crAmount),
        crTdsPayable: TDSPayble,
        sgst: sgst,
        cgst: cgst,
        billPeriod: billPeriod,
        isregisterd: 'true',
        billDate: formattedBillDate,
        narration: narration || "",
      };

      if (purchaseId) {
        await axios.put(
          `${REACT_APP_URL}/PurchaseVoucher/${purchaseId}`,
          PurchaseVoucherData
        );

        toast.success("Purchase Voucher updated successfully!");
      } else {
        await axios.post(
          `${REACT_APP_URL}/PurchaseVoucher`,
          PurchaseVoucherData
        );

        toast.success("Purchase Voucher created successfully!");
      }

      setIsDrawerOpen(false);
      resetForm();
      getPurchaseVoucher();

    } catch (error) {
      console.error("Error saving Purchase Voucher:", error);
      toast.error("Something went wrong while saving Purchase Voucher");
    }
  };

  const resetForm = () => {
    setDate('')
    setSelectedDebitLedOption('')
    setSelectedCrLedOption('')
    setDrAmount('')
    setCrAmount('')
    setReffBillNo('')
    setNarration('')
    setTDSPayble('')
    setCgst('')
    setSgst('')
    setBillPeriod('')
    setBillDate('')
  }

  //get header
  const [purchaseData, setPurchaseData] = useState([]);

  const getPurchaseVoucher = () => {
    const url = `${REACT_APP_URL}/PurchaseVoucher`;
    // console.log(" URL:", url);
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(data => {
        // console.log('data', data);
        setPurchaseData(data.data);

      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDebitLedger();
    fetchCrLedger()
    getPurchaseVoucher();
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
        accessorKey: 'crNameOfCreditor.accountName',
        header: 'Cr Ledger',
        size: 150,

      },


      {
        accessorKey: 'amountOfBill',
        header: 'Cr Amount',
        size: 150,
      },

      {
        accessorKey: 'drNameOfLedger.accountName',
        header: 'Debit Ledger',
        size: 150,

      },

      {
        accessorKey: 'amount',
        header: 'Debit Amount',
        size: 150,
      },

      {
        accessorKey: 'billPeriod',
        header: 'Bill Period',
        size: 150,
      },

      {
        accessorKey: 'billDate',
        header: 'billDate',
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
    data: purchaseData,
    enablePagination: true,
    muiTableHeadCellProps: {
      style: {
        backgroundColor: "#ecfbfd",
        color: "black",
        fontSize: "16px",
      },
    },


  });

  const handleEdit = async (VoucherData) => {
    // console.log("This row has been clicked:", VoucherData);

    setIsEditing(true);
    setPurchaseId(VoucherData._id);
    setDate(VoucherData.date);
    setSelectedDebitLedOption(VoucherData.drNameOfLedger._id);
    setSelectedCrLedOption(VoucherData.crNameOfCreditor._id);
    setReffBillNo(VoucherData.refBillNo)
    setTDSPayble(VoucherData.crTdsPayable)
    setDrAmount(VoucherData.amount)
    setCrAmount(VoucherData.amountOfBill)
    setCgst(VoucherData.cgst)
    setSgst(VoucherData.sgst)
    setBillPeriod(VoucherData.billPeriod)
    setBillDate(VoucherData.billDate ? new Date(VoucherData.billDate) : null);
    setNarration(VoucherData.narration)
    setIsDrawerOpen(true);

  };

  const [openPreview, setOpenPreview] = useState(false);
  const handlePreview = async (VoucherData) => {
    setPreviewData(VoucherData);
    setOpenPreview(true);
    // console.log("PREVIEW DATA:", VoucherData);
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

    const purchaseVNo = previewData?.purchasevoucherNumber || "NA";

    pdf.save(` PurchaseVOUCHER${purchaseVNo}.pdf`);
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
    const url = `${REACT_APP_URL}/PurchaseVoucher/${purchaseId}`;

    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        //console.log('data',data)
        toast.success(`deleted successfully!`);
        getPurchaseVoucher();
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
        <Button ariant="contained" sx={{ background: 'var(--complementary-color)', color: '#fff', ml: 2 }} onClick={handleDrawerOpen}><b>Create Purchase Vouchers</b></Button>
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
                  Purchase Voucher
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
                      <b> Voucher No : {previewData?.purchasevoucherNumber}</b>
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
                      <b>Debit Account: {previewData.drNameOfLedger.accountName}</b>
                    </Typography>

                    <Typography>
                      <b>Debit Amount: {previewData.amount}</b>
                    </Typography>

                    <Typography>
                      <b>CGST @9%: {previewData.cgst}</b>
                    </Typography>

                    <Typography>
                      <b>SGST @9%: {previewData.sgst}</b>
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
                      <b>Credit Account: {previewData.crNameOfCreditor.accountName}</b>
                    </Typography>

                    <Typography>
                      <b>Credit Amount: {previewData.amountOfBill}</b>
                    </Typography>
                  </Box>
                </Box>
                <Divider />

                <Box>
                  <Typography mt={1} color='#144145'><b>Transaction Details</b></Typography>
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
                      <b>Ref Bill No: {previewData.refBillNo} </b>
                    </Typography>

                    <Typography>
                      <b>Bill Period: {previewData.billPeriod} </b>
                    </Typography>

                    <Typography>
                      <b>Bill Date: {previewData.billDate?.split("T")[0]} </b>
                    </Typography>
                  </Box>
                </Box>
                <Divider />

                <Box mb={6} m={1}>
                  <Typography>
                    <b>Narration: {previewData.narration} </b>
                  </Typography>
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
            Purchase VOUCHER
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
              {isEditing ? "Update Purchase Vouchers" : "Create Purchase Vouchers"}
            </Typography>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleDrawerClose} />
          </Box>
          <Divider />

          <Box m={2} >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box display={'flex'} mt={3} gap={5}>

                <Box flex={1}>
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

                <Box flex={1}>
                  <Typography>
                    Reff Bill No
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={reffBillNo}
                    onChange={(e) => setReffBillNo(e.target.value)}
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
                  <Typography>Cr Name Of Creditor</Typography>
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
                    Amount Of Bill
                  </Typography>

                  <TextField
                    fullWidth
                    type='number'
                    variant="standard"
                    size="small"
                    value={crAmount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <span style={{ color: "#000000", fontWeight: "bold" }}>₹</span>
                        </InputAdornment>
                      ),
                    }}

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

              <Box display={'flex'} mt={3} gap={5} >
                <Box flex={1}>
                  <Typography>Dr Name Of Ledger</Typography>
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
                    Amount
                  </Typography>

                  <TextField
                    fullWidth
                    type='number'
                    variant="standard"
                    size="small"
                    value={drAmount}
                    onChange={handleAmountChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <span style={{ color: "#000000", fontWeight: "bold" }}>₹</span>
                        </InputAdornment>
                      ),
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
                  <Typography>
                    CGST @ 9%
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={cgst}

                    InputProps={{
                      startAdornment: (

                        <InputAdornment position="start" sx={{ color: "#161616" }}>
                          <b>₹</b>
                        </InputAdornment>
                      ),
                      readOnly: true
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

                <Box flex={1}>
                  <Typography>
                    SGST  @ 9%
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={sgst}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ color: "#161616" }}>
                          <b>₹</b>
                        </InputAdornment>
                      ),
                      readOnly: true
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




              {/*  */}

              <Box display={'flex'} mt={3} gap={5}>
                <Box flex={1} mt={2}>
                  <DatePicker
                    label="Bill Date"
                    value={BillDate ? new Date(date) : null}
                    onChange={(newValue) => setBillDate(newValue)}
                    format="dd/MM/yyyy"
                    slotProps={{
                      textField: { size: "small", },
                    }}
                  />
                </Box>


                <Box flex={1}>
                  <Typography>
                    Bill Period
                  </Typography>

                  <TextField
                    fullWidth
                    variant="standard"
                    size="small"
                    value={billPeriod}


                    onChange={(e) => setBillPeriod(e.target.value)}
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
                <Typography>
                  CR:TDS Payble
                </Typography>

                <TextField
                  fullWidth
                  type='number'
                  variant="standard"
                  size="small"
                  value={TDSPayble}
                  onChange={(e) => setTDSPayble(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: "#161616" }}>
                        <b>₹</b>
                      </InputAdornment>
                    ),
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
                sx={{ background: 'var(--secondary-color)', fontWeight: 'bold', color: '#ffffff' }}
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

export default PurchaseVoucher


